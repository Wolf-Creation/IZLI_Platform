import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { env } from '../../config/env.js';
import { authRepository } from './repository.js';
import { usersRepository } from '../users/repository.js';
import { customersRepository } from '../customers/repository.js';

const accessTokenOptions = { expiresIn: '15m' };
const refreshTokenOptions = { expiresIn: '30d' };

export const authService = {
  login: async ({ email, password }) => {
    const [user, customer] = await Promise.all([
      usersRepository.findByEmail(email),
      customersRepository.findByEmail(email),
    ]);

    const account = user ?? customer;
    if (!account) {
      return null;
    }

    const matches = await bcrypt.compare(password, account.password);
    if (!matches) {
      return null;
    }

    const normalized = user
      ? account.toObject()
      : {
          ...account.toObject(),
          displayName: `${account.firstName} ${account.lastName}`.trim(),
          role: 'viewer',
        };

    const { accessToken, refreshToken } = await authService.issueTokens(account);

    return {
      user: {
        id: String(normalized._id),
        email: normalized.email,
        displayName: normalized.displayName,
        avatarUrl: normalized.avatarUrl,
        role: normalized.role,
        status: normalized.status,
        createdAt: normalized.createdAt,
        lastActiveAt: new Date().toISOString(),
      },
      accessToken,
      refreshToken,
      accountType: user ? 'user' : 'customer',
    };
  },

  register: async ({ email, password, name }) => {
    const existingUser = await usersRepository.findByEmail(email);
    const existingCustomer = await customersRepository.findByEmail(email);

    if (existingUser || existingCustomer) {
      return null;
    }

    const [firstName, ...rest] = String(name || 'New Member').split(' ');
    const lastName = rest.join(' ').trim() || 'Member';

    const customer = await customersRepository.create({
      email,
      password,
      firstName,
      lastName,
      segment: 'new',
      ordersCount: 0,
      totalSpend: 0,
      currency: 'EUR',
      wishlistIds: [],
      tags: [],
      status: 'active',
      emailVerified: false,
    });

    const { accessToken, refreshToken } = await authService.issueTokens(customer);

    return {
      user: {
        id: String(customer._id),
        email: customer.email,
        displayName: `${customer.firstName} ${customer.lastName}`.trim(),
        avatarUrl: customer.avatarUrl,
        role: 'viewer',
        status: 'active',
        createdAt: customer.createdAt,
        lastActiveAt: new Date().toISOString(),
      },
      accessToken,
      refreshToken,
      accountType: 'customer',
    };
  },

  issueTokens: async (user) => {
    const tokenPayload = {
      sub: String(user._id),
      role: user.role || 'viewer',
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
