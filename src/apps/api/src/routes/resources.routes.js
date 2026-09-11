import { Router } from 'express';
import mongoose from 'mongoose';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/apiResponse.js';
import { QRCodeBatch } from '../modules/uploads/model.js';
import { Product } from '../modules/products/model.js';

const RESOURCE_MODELS = {
  users: 'User',
  customers: 'Customer',
  products: 'Product',
  collections: 'Collection',
  orders: 'Order',
  carts: 'Cart',
  wishlists: 'Wishlist',
  payments: 'Payment',
  categories: 'Category',
  tags: 'Tag',
  media: 'Media',
  stories: 'Story',
  heritage: 'Heritage',
  community: 'CommunityMember',
  contributions: 'Contribution',
  challenges: 'Challenge',
  submissions: 'Submission',
  events: 'Event',
  labProjects: 'LabProject',
  openCalls: 'OpenCall',
  keepers: 'Keeper',
  archives: 'Archive',
  legacies: 'Legacy',
  votingSessions: 'VotingSession',
  votes: 'Vote',
  legacyRewards: 'LegacyReward',
  keeperInvitations: 'KeeperInvitation',
  notifications: 'Notification',
  productPassports: 'ProductPassport',
  productionTemplates: 'ProductionTemplate',
  generatedAssets: 'GeneratedAsset',
  batchJobs: 'BatchJob',
  qrCodeBatches: 'QRCodeBatch',
  printPresets: 'PrintPreset',
  auditLogs: 'AuditLog',
  globalSettings: 'GlobalSetting',
  analyticEvents: 'AnalyticEvent',
  styleGuides: 'StyleGuide',
  recommendationHubs: 'RecommendationHub',
};

const serialize = (document) => {
  const plain = typeof document.toObject === 'function' ? document.toObject({ virtuals: true }) : document;
  const normalized = JSON.parse(JSON.stringify(plain));
  normalized.id = String(normalized._id ?? normalized.id);
  delete normalized._id;
  delete normalized.__v;
  return normalized;
};

const getModel = (resource) => {
  const modelName = RESOURCE_MODELS[resource];
  if (!modelName) {
    throw new AppError(`Unknown resource: ${resource}`, 404);
  }

  const model = mongoose.models[modelName];
  if (!model) {
    throw new AppError(`Model not registered: ${modelName}`, 500);
  }

  return model;
};

const buildFilter = (query) => {
  const filter = { ...query };
  delete filter.limit;
  delete filter.skip;
  delete filter.sort;
  delete filter.search;
  return filter;
};

export const resourcesRouter = Router();

resourcesRouter.get('/qrCodeBatches/summary', asyncHandler(async (_request, response) => {
  const batches = await QRCodeBatch.find().sort({ createdAt: -1 });
  const summary = batches.map(batch => {
    const codes = batch.codes ?? [];
    const usedCount = codes.filter(code => code.status === 'assigned').length;
    return serialize({
      ...batch.toObject(),
      usedCount,
      blankCount: codes.filter(code => code.status === 'generated').length,
    });
  });
  return response.status(200).json(successResponse('QR series retrieved successfully', summary));
}));

resourcesRouter.post('/qrCodeBatches/assign', asyncHandler(async (request, response) => {
  const { identifier, productId } = request.body;
  if (!identifier || !productId) throw new AppError('QR identifier and product are required', 400);

  const product = await Product.findById(productId);
  if (!product) throw new AppError('Product not found', 404);

  const batch = await QRCodeBatch.findOne({ 'codes.identifier': String(identifier).trim().toUpperCase() });
  if (!batch) throw new AppError('QR code not found', 404);

  const code = batch.codes.find(item => item.identifier === String(identifier).trim().toUpperCase());
  if (!code) throw new AppError('QR code not found', 404);
  if (code.status === 'assigned') throw new AppError('QR code is already assigned', 409);
  code.status = 'assigned';
  code.assignedProductId = product._id;
  code.assignedProductName = product.name;
  code.assignedAt = new Date();
  await batch.save();

  return response.status(200).json(successResponse('QR code assigned successfully', serialize(batch)));
}));

resourcesRouter.get('/:resource', asyncHandler(async (request, response) => {
  const Model = getModel(request.params.resource);
  const filter = buildFilter(request.query);
  const docs = await Model.find(filter).sort({ createdAt: -1 });
  return response.status(200).json(successResponse('Resources retrieved successfully', docs.map(serialize)));
}));

resourcesRouter.get('/:resource/:id', asyncHandler(async (request, response) => {
  const Model = getModel(request.params.resource);
  const doc = await Model.findById(request.params.id);
  if (!doc) {
    throw new AppError('Resource not found', 404);
  }
  return response.status(200).json(successResponse('Resource retrieved successfully', serialize(doc)));
}));

resourcesRouter.post('/:resource', asyncHandler(async (request, response) => {
  const Model = getModel(request.params.resource);
  const doc = await Model.create(request.body);
  return response.status(201).json(successResponse('Resource created successfully', serialize(doc)));
}));

resourcesRouter.patch('/:resource/:id', asyncHandler(async (request, response) => {
  const Model = getModel(request.params.resource);
  const doc = await Model.findByIdAndUpdate(request.params.id, request.body, { new: true });
  if (!doc) {
    throw new AppError('Resource not found', 404);
  }
  return response.status(200).json(successResponse('Resource updated successfully', serialize(doc)));
}));

resourcesRouter.delete('/:resource/:id', asyncHandler(async (request, response) => {
  const Model = getModel(request.params.resource);
  const doc = await Model.findByIdAndDelete(request.params.id);
  if (!doc) {
    throw new AppError('Resource not found', 404);
  }
  return response.status(200).json(successResponse('Resource deleted successfully', { id: request.params.id }));
}));