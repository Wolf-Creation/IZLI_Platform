import { Router } from 'express';
import mongoose from 'mongoose';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { successResponse } from '../utils/apiResponse.js';

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
  printPresets: 'PrintPreset',
  auditLogs: 'AuditLog',
  globalSettings: 'GlobalSetting',
  analyticEvents: 'AnalyticEvent',
  styleGuides: 'StyleGuide',
  recommendationHubs: 'RecommendationHub',
};

const serialize = (document) => {
  const plain = document.toObject({ virtuals: true });
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