import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { authRepository } from './repository.js';

const accessTokenOptions = { expiresIn: '15m' };
const refreshTokenOptions = { expiresIn: '30d' };

export const authService = {
  issueTokens: async (user) => {
    const tokenPayload = {
      sub: String(user._id),
      role: user.role,
      email: user.email,
    };

    const accessToken = jwt.sign(tokenPayload, env.jwtSecret, accessTokenOptions);
    const refreshToken = jwt.sign(tokenPayload, env.jwtRefreshSecret, refreshTokenOptions);

    await authRepository.createSession({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken };
  },
};
