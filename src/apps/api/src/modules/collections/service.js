import mongoose from 'mongoose';
import { collectionsRepository } from './repository.js';
import { normalizeSlug, validateCollectionInput } from './validator.js';
import { AppError } from '../../utils/AppError.js';

const publicCollection = (document) => {
	if (!document) return document;
	const plain = typeof document.toObject === 'function' ? document.toObject() : document;
	const collection = { ...plain, id: String(plain._id) };
	collection.coverImage ??= collection.coverImageUrl || null;
	collection.coverImageUrl ??= collection.coverImage || '';
	delete collection.__v;
	return collection;
};

const conflictError = (error) => {
	if (error?.code === 11000) throw new AppError('Collection slug already exists', 409);
	throw error;
};

const UNIVERSE_FOR_TYPE = {
	LEGACY: 'Heritage',
	STUDIO: 'Studio',
	ESSENTIALS: 'Essentials',
	COMMUNITY_LAB: 'Community Lab',
};

export const collectionsService = {
	listPublic: async () => (await collectionsRepository.findPublic()).map(publicCollection),
	listAdmin: async () => (await collectionsRepository.findAll()).map(publicCollection),
	getPublicBySlug: async (slug) => {
		const collection = await collectionsRepository.findBySlug(normalizeSlug(slug));
		if (!collection) throw new AppError('Collection not found', 404);
		const products = await collectionsRepository.findProducts(collection);
		return {
			collection: publicCollection(collection),
			products: products.map(product => ({ ...product, id: String(product._id), collectionId: product.collectionId ? String(product.collectionId) : undefined })),
		};
	},
	create: async (input) => {
		const data = validateCollectionInput(input);
		data.coverImage ??= null;
		data.heroImage ??= null;
		data.status ??= 'active';
		data.isActive ??= data.status === 'active';
		data.isFeatured ??= false;
		data.universe = UNIVERSE_FOR_TYPE[data.type];
		data.season = 'Permanent';
		data.productIds ??= [];
		try {
			return publicCollection(await collectionsRepository.create(data));
		} catch (error) {
			conflictError(error);
		}
	},
	update: async (id, input) => {
		if (!mongoose.isValidObjectId(id)) throw new AppError('Collection not found', 404);
		const data = validateCollectionInput(input, { partial: true });
		if (data.type) data.universe = UNIVERSE_FOR_TYPE[data.type];
		try {
			const collection = await collectionsRepository.update(id, data);
			if (!collection) throw new AppError('Collection not found', 404);
			return publicCollection(collection.toObject());
		} catch (error) {
			conflictError(error);
		}
	},
	remove: async (id) => {
		if (!mongoose.isValidObjectId(id)) throw new AppError('Collection not found', 404);
		const collection = await collectionsRepository.findById(id);
		if (!collection) throw new AppError('Collection not found', 404);
		const Product = mongoose.model('Product');
		await Product.updateMany({ collectionId: collection._id }, { $unset: { collectionId: 1 } });
		await Product.updateMany({ collectionIds: collection._id }, { $pull: { collectionIds: collection._id } });
		for (const modelName of ['Keeper', 'Legacy']) {
			const RelatedModel = mongoose.models[modelName];
			if (RelatedModel) await RelatedModel.updateMany({ collectionIds: collection._id }, { $pull: { collectionIds: collection._id } });
		}
		await collectionsRepository.delete(id);
		return { id };
	},
};

