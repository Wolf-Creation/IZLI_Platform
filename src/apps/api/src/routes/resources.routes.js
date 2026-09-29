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

const syncProductCollections = async (productId, collectionIds = [], previousCollectionIds = [], collectionId, previousCollectionId) => {
  const Collection = mongoose.models.Collection;
  if (!Collection) return;

  const nextIds = [...new Set((collectionId ? [collectionId] : collectionIds ?? []).map(String))];
  const previousIds = [...new Set((previousCollectionId ? [previousCollectionId] : previousCollectionIds ?? []).map(String))];
  const removedIds = previousIds.filter(id => !nextIds.includes(id));
  const addedIds = nextIds.filter(id => !previousIds.includes(id));

  if (removedIds.length > 0) {
    await Collection.updateMany(
      { _id: { $in: removedIds } },
      { $pull: { productIds: productId } },
    );
  }

  if (addedIds.length > 0) {
    await Collection.updateMany(
      { _id: { $in: addedIds } },
      { $addToSet: { productIds: productId } },
    );
  }
};

const writeProductAudit = async (request, productId, action, diff = {}) => {
  const AuditLog = mongoose.models.AuditLog;
  if (!AuditLog) return;
  await AuditLog.create({
    actorId: request.user?.userId,
    actorEmail: request.user?.email || 'system',
    action,
    entityType: 'Product',
    entityId: productId,
    diff,
    ip: request.ip,
    userAgent: request.get('user-agent'),
  });
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
  if (request.params.resource === 'collections') throw new AppError('Use /api/admin/collections to manage collections', 403);
  const Model = getModel(request.params.resource);
  if (request.params.resource === 'products') {
    request.body.sku = String(request.body.sku || '').trim().toUpperCase();
    const duplicateSku = await Model.exists({ sku: request.body.sku });
    if (duplicateSku) throw new AppError('SKU already exists', 409);
  }
  if (request.params.resource === 'products' && request.body.status === 'published') validateProductPublish(request.body);
  const doc = await Model.create(request.body);
  if (request.params.resource === 'products') {
    await syncProductCollections(doc._id, doc.collectionIds, [], doc.collectionId);
    await writeProductAudit(request, doc._id, 'Product created', { object: doc.name });
  }
  return response.status(201).json(successResponse('Resource created successfully', serialize(doc)));
}));

resourcesRouter.patch('/:resource/:id', asyncHandler(async (request, response) => {
  if (request.params.resource === 'collections') throw new AppError('Use /api/admin/collections to manage collections', 403);
  const Model = getModel(request.params.resource);
  if (request.params.resource === 'products' && request.body.sku) {
    request.body.sku = String(request.body.sku).trim().toUpperCase();
    const duplicateSku = await Model.exists({ sku: request.body.sku, _id: { $ne: request.params.id } });
    if (duplicateSku) throw new AppError('SKU already exists', 409);
  }
  const existing = request.params.resource === 'products' ? await Model.findById(request.params.id) : null;
  if (request.params.resource === 'products' && request.body.status === 'published') validateProductPublish({ ...existing?.toObject(), ...request.body });
  if (request.params.resource === 'collections' && request.body.productIds) {
    const Product = mongoose.models.Product;
    if (Product) {
      await Product.updateMany(
        { collectionIds: request.params.id },
        { $pull: { collectionIds: request.params.id } },
      );
      await Product.updateMany(
        { collectionId: request.params.id },
        { $unset: { collectionId: 1 } },
      );
      await Product.updateMany(
        { _id: { $in: request.body.productIds } },
        { $addToSet: { collectionIds: request.params.id }, $set: { collectionId: request.params.id } },
      );
    }
  }
  const doc = await Model.findByIdAndUpdate(request.params.id, request.body, { new: true });
  if (!doc) {
    throw new AppError('Resource not found', 404);
  }
  if (request.params.resource === 'products') {
    await syncProductCollections(doc._id, doc.collectionIds, existing?.collectionIds, doc.collectionId, existing?.collectionId);
    const previousPieces = existing?.inventoryPieces ?? [];
    const currentPieces = doc.inventoryPieces ?? [];
    await writeProductAudit(request, doc._id, 'Product updated', { object: doc.name, fields: Object.keys(request.body) });
    if (request.body.releaseNumber && request.body.releaseNumber !== existing?.releaseNumber) {
      await writeProductAudit(request, doc._id, `Release ${request.body.releaseNumber} created`, { object: `Release ${request.body.releaseNumber}` });
    }
    if (currentPieces.length > previousPieces.length) {
      for (const piece of currentPieces.slice(previousPieces.length)) {
        await writeProductAudit(request, doc._id, 'Piece created', { object: piece.id, variantId: piece.variantId, status: piece.status });
      }
    }
  }
  return response.status(200).json(successResponse('Resource updated successfully', serialize(doc)));
}));

resourcesRouter.delete('/:resource/:id', asyncHandler(async (request, response) => {
  if (request.params.resource === 'collections') throw new AppError('Use /api/admin/collections to manage collections', 403);
  const Model = getModel(request.params.resource);
  const doc = await Model.findById(request.params.id);
  if (!doc) {
    throw new AppError('Resource not found', 404);
  }
  if (request.params.resource === 'products') {
    const QRCode = mongoose.models.QRCode;
    if (QRCode) {
      const assignedQrCount = await QRCode.countDocuments({ productId: doc._id, status: { $ne: 'unassigned' } });
      if (assignedQrCount > 0) {
        throw new AppError('Product cannot be deleted because it has assigned QR codes. Archive it instead.', 409);
      }
    }
    await syncProductCollections(doc._id, [], doc.collectionIds, null, doc.collectionId);
  }
  await Model.deleteOne({ _id: doc._id });
  return response.status(200).json(successResponse('Resource deleted successfully', { id: request.params.id }));
}));

function validateProductPublish(product) {
  const missing = [];
  if (!String(product.name || '').trim()) missing.push('product name');
  if (!String(product.sku || '').trim()) missing.push('SKU');
  if (!product.universe) missing.push('universe');
  if (!product.categoryIds?.length) missing.push('category');
  if (!product.collectionId && !product.collectionIds?.length) missing.push('collection');
  if (!product.colorways?.length) missing.push('color');
  if (!product.sizes?.length) missing.push('size');
  if (!(Number(product.price) > 0)) missing.push('price');
  if (!String(product.coverImageUrl || '').trim()) missing.push('main image');
  if (!String(product.releaseNumber || '').trim()) missing.push('release');
  if (missing.length) {
    throw new AppError(`Product cannot be published. Missing: ${missing.join(', ')}`, 400);
  }
}