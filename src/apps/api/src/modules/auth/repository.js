import { AuthSession } from './model.js';

export const authRepository = {
  createSession: (payload) => AuthSession.create(payload),
  findSessionByRefreshToken: (refreshToken) => AuthSession.findOne({ refreshToken }),
  deleteSessionByRefreshToken: (refreshToken) => AuthSession.deleteOne({ refreshToken }),
};
