import { User } from './model.js';

export const usersRepository = {
  findByEmail: (email) => User.findOne({ email }).select('+password'),
  findById: (id) => User.findById(id),
  create: (payload) => User.create(payload),
  list: (filter = {}) => User.find(filter).sort({ createdAt: -1 }),
};
