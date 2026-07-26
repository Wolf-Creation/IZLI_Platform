import bcrypt from 'bcryptjs';
import { usersRepository } from './repository.js';
import { AppError } from '../../utils/AppError.js';

export const usersService = {
  listUsers: async () => usersRepository.list(),

  createUser: async (payload) => {
    const existingUser = await usersRepository.findByEmail(payload.email);

    if (existingUser) {
      throw new AppError('Email already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(payload.password, 12);

    return usersRepository.create({
      ...payload,
      password: hashedPassword,
    });
  },
};
