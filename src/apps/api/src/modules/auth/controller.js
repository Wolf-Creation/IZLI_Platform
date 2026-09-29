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

  getAdminProfile: async (request, response) => {
    const result = await authService.getAdminProfile(request.user);
    if (!result) throw new AppError('Admin account not found', 404);
    return response.status(200).json(successResponse('Admin profile retrieved', result));
  },

  getKeeperProfile: async (request, response) => {
    const result = await authService.getKeeperProfile(request.user);
    if (!result) throw new AppError('Keeper profile not found', 404);
    return response.status(200).json(successResponse('Keeper profile retrieved', result));
  },

  updateKeeperProfile: async (request, response) => {
    const result = await authService.updateKeeperProfile(request.user, request.body);
    if (!result) throw new AppError('Keeper profile not found', 404);
    return response.status(200).json(successResponse('Keeper profile updated', result));
  },

  updateKeeperSecurity: async (request, response) => {
    const result = await authService.updateKeeperSecurity(request.user, request.body);
    if (!result) throw new AppError('Keeper profile not found', 404);
    if (result.invalidCurrentPassword) throw new AppError('Current password is incorrect', 400);
    return response.status(200).json(successResponse('Keeper security updated', result));
  },

  updateAdminProfile: async (request, response) => {
    const result = await authService.updateAdminProfile(request.user, request.body);
    if (!result) throw new AppError('Admin account not found', 404);
    return response.status(200).json(successResponse('Admin profile updated', result));
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

  verifyKeeperLogin: async (request, response) => {
    const result = await authService.verifyKeeperLogin(request.body);
    if (!result) throw new AppError('Invalid or expired security code', 400);
    return response.status(200).json(successResponse('Keeper login verified', result));
  },

  verifyKeeperEmail: async (request, response) => {
    const result = await authService.verifyKeeperEmail(request.body);
    if (!result) {
      throw new AppError('Invalid or expired verification code', 400);
    }

    return response.status(200).json(successResponse('Email verified', result));
  },

  requestKeeperPasswordReset: async (request, response) => {
    const result = await authService.requestKeeperPasswordReset(request.body);
    return response.status(200).json(successResponse('Password recovery code sent', result));
  },

  resetKeeperPassword: async (request, response) => {
    const result = await authService.resetKeeperPassword(request.body);
    if (!result) {
      throw new AppError('Invalid or expired password recovery code', 400);
    }

    return response.status(200).json(successResponse('Password updated', result));
  },
};
