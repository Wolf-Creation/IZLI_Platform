import { authService } from './service.js';
import { successResponse } from '../../utils/apiResponse.js';

export const authController = {
  login: async (_request, response) => {
    const tokens = await authService.issueTokens({
      _id: '000000000000000000000000',
      email: 'demo@izli.local',
      role: 'Admin',
    });

    return response.status(200).json(successResponse('Login successful', tokens));
  },
};
