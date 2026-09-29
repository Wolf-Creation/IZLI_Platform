import { Collection } from './model.js';
import { Product } from '../products/model.js';

export const collectionsRepository = {
	findPublic: () => Collection.find({ isActive: true }).sort({ displayOrder: 1, name: 1 }).lean(),
	findAll: () => Collection.find({ type: { $exists: true } }).sort({ displayOrder: 1, name: 1 }).lean(),
	findBySlug: (slug) => Collection.findOne({ slug, isActive: true }).lean(),
	findById: (id) => Collection.findById(id),
	create: (data) => Collection.create(data),
	update: (id, data) => Collection.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }),
	delete: (id) => Collection.deleteOne({ _id: id }),
	findProducts: (collection) => Product.find({
		status: 'published',
		$or: [
			{ collectionId: collection._id },
			{ collectionIds: collection._id },
		],
	}).sort({ createdAt: -1 }).lean(),
};

