import { Customer } from './model.js';

export const customersRepository = {
  findByEmail: (email) => Customer.findOne({ email }).select('+password'),
  findByEmailWithVerification: (email) => Customer.findOne({ email }).select('+password +emailVerificationCode +emailVerificationExpires'),
  findById: (id) => Customer.findById(id),
  create: (payload) => Customer.create(payload),
  list: (filter = {}) => Customer.find(filter).sort({ createdAt: -1 }),
};