const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

const register = async ({ first_name, last_name, email, phone, password }) => {
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    const err = new Error('Пользователь с таким email уже существует');
    err.status = 409;
    throw err;
  }

  const password_hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    first_name,
    last_name: last_name || null,
    email,
    phone: phone || null,
    password_hash,
    role: 'user',
  });

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user.id,
      first_name: user.first_name,
      email: user.email,
      role: user.role,
    },
  };
};

const login = async ({ login, password }) => {
  const { Op } = require('sequelize');
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: login }, { phone: login }],
    },
  });

  if (!user) {
    const err = new Error('Неверные данные для входа');
    err.status = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    const err = new Error('Неверные данные для входа');
    err.status = 401;
    throw err;
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user.id,
      first_name: user.first_name,
      email: user.email,
      role: user.role,
    },
  };
};

const getMe = async (userId) => {
  return User.findByPk(userId, {
    attributes: ['id', 'first_name', 'last_name', 'email', 'phone', 'avatar_url', 'role'],
  });
};

const updateMe = async (userId, data) => {
  const { first_name, last_name, email, phone, bio } = data;

  if (email) {
    const { Op } = require('sequelize');
    const existing = await User.findOne({
      where: { email, id: { [Op.ne]: userId } },
    });
    if (existing) {
      const err = new Error('Пользователь с таким email уже существует');
      err.status = 409;
      throw err;
    }
  }

  const updateFields = {};
  if (first_name !== undefined) updateFields.first_name = first_name;
  if (last_name !== undefined) updateFields.last_name = last_name;
  if (email !== undefined) updateFields.email = email;
  if (phone !== undefined) updateFields.phone = phone;
  if (bio !== undefined) updateFields.bio = bio;

  await User.update(updateFields, { where: { id: userId } });

  return User.findByPk(userId, {
    attributes: ['id', 'first_name', 'last_name', 'email', 'phone', 'avatar_url', 'bio', 'role'],
  });
};

module.exports = { register, login, getMe, updateMe };
