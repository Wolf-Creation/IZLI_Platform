import { successResponse } from '../../utils/apiResponse.js';
import { usersService } from './service.js';

export const usersController = {
  listUsers: async (_request, response) => {
    const users = await usersService.listUsers();
    return response.status(200).json(successResponse('Users retrieved successfully', users));
  },

  createUser: async (request, response) => {
    const user = await usersService.createUser(request.body);
    return response.status(201).json(successResponse('User created successfully', user));
  },
};
