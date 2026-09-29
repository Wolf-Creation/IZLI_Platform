import { AppError } from '../../utils/AppError.js';

export const COLLECTION_TYPES = ['LEGACY', 'STUDIO', 'ESSENTIALS', 'COMMUNITY_LAB'];

export const normalizeSlug = (value) => String(value ?? '')
	.normalize('NFD')
	.replace(/[\u0300-\u036f]/g, '')
	.toLowerCase()
	.trim()
	.replace(/[^a-z0-9]+/g, '-')
	.replace(/^-+|-+$/g, '');

export const validateCollectionInput = (input, { partial = false } = {}) => {
	const allowedFields = ['name', 'slug', 'type', 'tagline', 'shortDescription', 'description', 'coverImage', 'heroImage', 'displayOrder', 'isFeatured', 'isActive', 'status'];
	const data = Object.fromEntries(Object.entries(input ?? {}).filter(([field]) => allowedFields.includes(field)));
	if (data.name !== undefined) data.name = String(data.name).trim();
	if (data.slug !== undefined || data.name !== undefined) data.slug = normalizeSlug(data.slug || data.name);

	const requiredFields = ['name', 'slug', 'type', 'tagline', 'shortDescription', 'displayOrder'];
	if (!partial) {
		for (const field of requiredFields) {
			if (data[field] === undefined || data[field] === '') throw new AppError(`${field} is required`, 400);
		}
	}
	if (data.name !== undefined && !data.name) throw new AppError('name is required', 400);
	if (data.slug !== undefined && !data.slug) throw new AppError('slug is invalid', 400);
	if (data.type !== undefined && !COLLECTION_TYPES.includes(data.type)) throw new AppError('type is invalid', 400);
	if (data.displayOrder !== undefined) {
		data.displayOrder = Number(data.displayOrder);
		if (!Number.isFinite(data.displayOrder) || data.displayOrder < 1) throw new AppError('displayOrder must be a positive number', 400);
	}
	for (const field of ['isActive', 'isFeatured']) {
		if (data[field] !== undefined && typeof data[field] !== 'boolean') throw new AppError(`${field} must be a boolean`, 400);
	}
	for (const field of ['tagline', 'shortDescription', 'description']) {
		if (data[field] !== undefined) data[field] = String(data[field]).trim();
	}
	for (const field of ['name', 'slug', 'type', 'tagline', 'shortDescription']) {
		if (data[field] !== undefined && data[field] === '') throw new AppError(`${field} is required`, 400);
	}
	for (const field of ['coverImage', 'heroImage']) {
		if (data[field] !== undefined && data[field] !== null && typeof data[field] !== 'string') {
			throw new AppError(`${field} must be a URL or null`, 400);
		}
	}
	if (data.isActive !== undefined) data.status = data.isActive ? 'active' : 'draft';
	if (data.status !== undefined && !['active', 'draft', 'archived'].includes(data.status)) {
		throw new AppError('status is invalid', 400);
	}
	if (data.status !== undefined && data.isActive === undefined) data.isActive = data.status === 'active';

	return data;
};

export const collectionsValidator = { normalizeSlug, validateCollectionInput };

