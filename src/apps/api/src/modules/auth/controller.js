import { authService } from './service.js';
import { successResponse } from '../../utils/apiResponse.js';
import { AppError } from '../../utils/AppError.js';

export const authController = {
  login: async (request, response) => {
    const result = await authService.login(request.body);
    if (!result) {
      throw new AppError('Invalid email or password', 401);
    }

    return response.status(200).json(successResponse('Login successful', result));
  },

  register: async (request, response) => {
    const result = await authService.register(request.body);
    if (!result) {
      throw new AppError('Email already exists', 409);
    }

    return response.status(201).json(successResponse('Registration successful', result));
  },

  registerKeeper: async (request, response) => {
    const result = await authService.registerKeeper(request.body);
    if (!result) {
      throw new AppError('Email already exists', 409);
    }

    return response.status(201).json(successResponse('Verification code sent', result));
  },

  loginKeeper: async (request, response) => {
    const result = await authService.loginKeeper(request.body);
    if (!result) {
      throw new AppError('Invalid credentials or email not verified', 401);
    }

    return response.status(200).json(successResponse('Keeper login successful', result));
  },

  verifyKeeperEmail: async (request, response) => {
    const result = await authService.verifyKeeperEmail(request.body);
    if (!result) {
      throw new AppError('Invalid or expired verification code', 400);
    }

    return response.status(200).json(successResponse('Email verified', result));
  },
};
