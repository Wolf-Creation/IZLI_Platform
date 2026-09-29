import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { env } from '../../config/env.js';
import { authRepository } from './repository.js';
import { usersRepository } from '../users/repository.js';
import { customersRepository } from '../customers/repository.js';
import { CommunityMember } from '../community/model.js';
import { Keeper } from '../keepers/model.js';
import crypto from 'node:crypto';
import nodemailer from 'nodemailer';

const accessTokenOptions = { expiresIn: '15m' };
const adminAccessTokenOptions = { expiresIn: '1h' };
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

    if (!user && account.twoFactorEnabled) {
      const code = String(crypto.randomInt(100000, 1000000));
      account.twoFactorCode = code;
      account.twoFactorExpires = new Date(Date.now() + 15 * 60 * 1000);
      await account.save();
      try {
        await sendKeeperLoginCodeEmail(account.email, account.firstName, code);
      } catch (error) {
        console.error('[Customer 2FA] Email delivery failed:', error.message);
      }
      const result = { email: account.email, twoFactorRequired: true };
      if (process.env.NODE_ENV !== 'production' && !process.env.SMTP_HOST) result.devCode = code;
      return result;
    }

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

  getAdminProfile: async (sessionUser) => {
    const user = await usersRepository.findById(sessionUser.sub);
    if (!user || !['admin', 'owner'].includes(user.role)) return null;
    return { id: String(user._id), email: user.email, displayName: user.displayName, role: user.role, status: user.status };
  },

  getKeeperProfile: async (sessionUser) => {
    const customer = await customersRepository.findById(sessionUser.sub);
    if (!customer) return null;
    return {
      id: String(customer._id),
      email: customer.email,
      firstName: customer.firstName,
      lastName: customer.lastName,
      gender: customer.gender,
      phone: customer.phone,
      governorate: customer.governorate,
      age: customer.age,
      twoFactorEnabled: customer.twoFactorEnabled,
      avatarUrl: customer.avatarUrl,
      createdAt: customer.createdAt,
    };
  },

  updateKeeperProfile: async (sessionUser, data) => {
    const customer = await customersRepository.findById(sessionUser.sub);
    if (!customer) return null;

    const fields = ['firstName', 'lastName', 'gender', 'phone', 'governorate', 'age'];
    for (const field of fields) {
      if (data[field] !== undefined) customer[field] = field === 'age' ? Number(data[field]) : String(data[field]).trim();
    }
    await customer.save();
    return authService.getKeeperProfile(sessionUser);
  },

  updateKeeperSecurity: async (sessionUser, { twoFactorEnabled, currentPassword, newPassword }) => {
    const customer = await customersRepository.findById(sessionUser.sub).select('+password');
    if (!customer) return null;

    if (newPassword) {
      const matches = await bcrypt.compare(String(currentPassword || ''), customer.password);
      if (!matches) return { invalidCurrentPassword: true };
      customer.password = String(newPassword);
    }

    if (twoFactorEnabled !== undefined) {
      customer.twoFactorEnabled = Boolean(twoFactorEnabled);
      if (!customer.twoFactorEnabled) {
        customer.twoFactorCode = undefined;
        customer.twoFactorExpires = undefined;
      }
    }

    await customer.save();
    return authService.getKeeperProfile(sessionUser);
  },

  updateAdminProfile: async (sessionUser, { email, password, displayName }) => {
    const user = await usersRepository.findById(sessionUser.sub).select('+password');
    if (!user || !['admin', 'owner'].includes(user.role)) return null;
    if (email) user.email = String(email).trim().toLowerCase();
    if (displayName) user.displayName = String(displayName).trim();
    if (password) user.password = String(password);
    await user.save();
    return { id: String(user._id), email: user.email, displayName: user.displayName, role: user.role, status: user.status };
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

  registerKeeper: async ({ email, password, firstName, lastName, gender, phone, governorate, age }) => {
    const existingUser = await usersRepository.findByEmail(email);
    const existingCustomer = await customersRepository.findByEmail(email);
    if (existingUser || existingCustomer) return null;

    const verificationCode = String(crypto.randomInt(100000, 1000000));
    const customer = await customersRepository.create({
      email, password, firstName, lastName, gender, phone, governorate, age,
      segment: 'new', ordersCount: 0, totalSpend: 0, currency: 'EUR', wishlistIds: [], tags: [],
      status: 'active', emailVerified: false,
      emailVerificationCode: verificationCode,
      emailVerificationExpires: new Date(Date.now() + 15 * 60 * 1000),
    });

    try {
      await sendKeeperVerificationEmail(email, firstName, verificationCode);
    } catch (error) {
      console.error('[Keeper verification] Email delivery failed:', error.message);
    }
    const result = { email: customer.email, verificationRequired: true };
    if (process.env.NODE_ENV !== 'production' && !process.env.SMTP_HOST) result.devCode = verificationCode;
    return result;
  },

  loginKeeper: async ({ email, password }) => {
    const customer = await customersRepository.findByEmailWithTwoFactor(email);
    if (!customer || !customer.emailVerified) return null;
    const matches = await bcrypt.compare(password, customer.password);
    if (!matches) return null;

    if (customer.twoFactorEnabled) {
      const code = String(crypto.randomInt(100000, 1000000));
      customer.twoFactorCode = code;
      customer.twoFactorExpires = new Date(Date.now() + 15 * 60 * 1000);
      await customer.save();
      try {
        await sendKeeperLoginCodeEmail(customer.email, customer.firstName, code);
      } catch (error) {
        console.error('[Keeper 2FA] Email delivery failed:', error.message);
      }
      const result = { email: customer.email, twoFactorRequired: true };
      if (process.env.NODE_ENV !== 'production' && !process.env.SMTP_HOST) result.devCode = code;
      return result;
    }

    const { accessToken, refreshToken } = await authService.issueTokens(customer);
    return {
      user: { id: String(customer._id), email: customer.email, displayName: `${customer.firstName} ${customer.lastName}`, role: 'viewer', status: 'active', createdAt: customer.createdAt, lastActiveAt: new Date().toISOString() },
      accessToken,
      refreshToken,
    };
  },

  verifyKeeperLogin: async ({ email, code }) => {
    const customer = await customersRepository.findByEmailWithTwoFactor(email);
    if (!customer || !customer.emailVerified || !customer.twoFactorEnabled || customer.twoFactorCode !== String(code) || !customer.twoFactorExpires || customer.twoFactorExpires < new Date()) return null;

    customer.twoFactorCode = undefined;
    customer.twoFactorExpires = undefined;
    await customer.save();
    const { accessToken, refreshToken } = await authService.issueTokens(customer);
    return {
      user: { id: String(customer._id), email: customer.email, displayName: `${customer.firstName} ${customer.lastName}`, role: 'viewer', status: 'active', createdAt: customer.createdAt, lastActiveAt: new Date().toISOString() },
      accessToken,
      refreshToken,
    };
  },

  verifyKeeperEmail: async ({ email, code }) => {
    const customer = await customersRepository.findByEmailWithVerification(email);
    if (!customer || customer.emailVerified || customer.emailVerificationCode !== String(code) || !customer.emailVerificationExpires || customer.emailVerificationExpires < new Date()) return null;

    customer.emailVerified = true;
    customer.emailVerificationCode = undefined;
    customer.emailVerificationExpires = undefined;
    await customer.save();
    const displayName = `${customer.firstName} ${customer.lastName}`.trim();
    let member = await CommunityMember.findOne({ email: customer.email });
    if (!member) {
      member = await CommunityMember.create({
        customerId: customer._id,
        displayName,
        email: customer.email,
        location: customer.governorate,
        level: 3,
        status: 'active',
        lastActiveAt: new Date(),
      });
    }
    customer.keeperCircleMemberId = member._id;
    await customer.save();
    const existingKeeper = await Keeper.findOne({ memberId: member._id });
    if (!existingKeeper) {
      await Keeper.create({ memberId: member._id, level: 'keeper', acceptedAt: new Date() });
    }
    const { accessToken, refreshToken } = await authService.issueTokens(customer);
    return {
      user: { id: String(customer._id), email: customer.email, displayName: `${customer.firstName} ${customer.lastName}`, role: 'viewer', status: 'active', createdAt: customer.createdAt, lastActiveAt: new Date().toISOString() },
      accessToken,
      refreshToken,
    };
  },

  requestKeeperPasswordReset: async ({ email }) => {
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const customer = await customersRepository.findByEmailWithPasswordReset(normalizedEmail);
    if (!customer) return { email: normalizedEmail };

    const resetCode = String(crypto.randomInt(100000, 1000000));
    customer.passwordResetToken = resetCode;
    customer.passwordResetExpires = new Date(Date.now() + 15 * 60 * 1000);
    await customer.save();

    try {
      await sendKeeperPasswordResetEmail(customer.email, customer.firstName, resetCode);
    } catch (error) {
      console.error('[Keeper password reset] Email delivery failed:', error.message);
    }

    const result = { email: customer.email };
    if (process.env.NODE_ENV !== 'production' && !process.env.SMTP_HOST) result.devCode = resetCode;
    return result;
  },

  resetKeeperPassword: async ({ email, code, password }) => {
    const customer = await customersRepository.findByEmailWithPasswordReset(String(email || '').trim().toLowerCase());
    if (!customer || customer.passwordResetToken !== String(code) || !customer.passwordResetExpires || customer.passwordResetExpires < new Date()) return null;

    customer.password = password;
    customer.passwordResetToken = undefined;
    customer.passwordResetExpires = undefined;
    await customer.save();
    return { email: customer.email };
  },

  issueTokens: async (user) => {
    const tokenPayload = {
      sub: String(user._id),
      role: user.role || 'viewer',
      email: user.email,
    };

    const tokenOptions = ['admin', 'owner'].includes(tokenPayload.role) ? adminAccessTokenOptions : accessTokenOptions;
    const accessToken = jwt.sign(tokenPayload, env.jwtSecret, tokenOptions);
    const refreshToken = jwt.sign(tokenPayload, env.jwtRefreshSecret, refreshTokenOptions);

    await authRepository.createSession({
      userId: user._id,
      refreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken };
  },
};

async function sendKeeperVerificationEmail(email, firstName, code) {
  if (!process.env.SMTP_HOST) {
    console.info(`[Keeper verification] ${email}: ${code}`);
    return;
  }

  const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === 'true', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } });
  await transporter.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to: email, subject: 'Your IZLI Keeper verification code', text: `Hello ${firstName}, your IZLI Keeper verification code is ${code}. It expires in 15 minutes.` });
}

async function sendKeeperPasswordResetEmail(email, firstName, code) {
  if (!process.env.SMTP_HOST) {
    console.info(`[Keeper password reset] ${email}: ${code}`);
    return;
  }

  const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === 'true', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } });
  await transporter.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to: email, subject: 'Reset your IZLI Keeper password', text: `Hello ${firstName}, your IZLI Keeper password recovery code is ${code}. It expires in 15 minutes.` });
}

async function sendKeeperLoginCodeEmail(email, firstName, code) {
  if (!process.env.SMTP_HOST) {
    console.info(`[Keeper 2FA] ${email}: ${code}`);
    return;
  }

  const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === 'true', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } });
  await transporter.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to: email, subject: 'Your IZLI Keeper security code', text: `Hello ${firstName}, your IZLI Keeper login code is ${code}. It expires in 15 minutes.` });
}
