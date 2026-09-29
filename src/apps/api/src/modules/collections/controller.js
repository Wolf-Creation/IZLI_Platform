import { collectionsService } from './service.js';
import { successResponse } from '../../utils/apiResponse.js';

export const collectionsController = {
	listPublic: async (_request, response) => response.status(200).json(successResponse('Collections retrieved successfully', await collectionsService.listPublic())),
	getPublic: async (request, response) => response.status(200).json(successResponse('Collection retrieved successfully', await collectionsService.getPublicBySlug(request.params.slug))),
	listAdmin: async (_request, response) => response.status(200).json(successResponse('Collections retrieved successfully', await collectionsService.listAdmin())),
	create: async (request, response) => response.status(201).json(successResponse('Collection created successfully', await collectionsService.create(request.body))),
	update: async (request, response) => response.status(200).json(successResponse('Collection updated successfully', await collectionsService.update(request.params.id, request.body))),
	remove: async (request, response) => response.status(200).json(successResponse('Collection deleted successfully', await collectionsService.remove(request.params.id))),
};

