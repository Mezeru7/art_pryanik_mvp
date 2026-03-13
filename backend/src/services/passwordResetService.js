const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { PasswordReset, User } = require('../models');
const { Op } = require('sequelize');

const requestReset = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    console.log(`[MOCK EMAIL] Reset requested for unknown email: ${email}`);
    return { message: 'Если email зарегистрирован, инструкции отправлены' };
  }

  await PasswordReset.destroy({ where: { email } });

  const token = crypto.randomBytes(32).toString('hex');
  const expires_at = new Date(Date.now() + 60 * 60 * 1000); // 1 час

  await PasswordReset.create({ email, token, expires_at });

  console.log(`[MOCK EMAIL] Password reset link: http://localhost:3000/reset-password?token=${token}`);

  return { message: 'Если email зарегистрирован, инструкции отправлены' };
};

const resetPassword = async (token, newPassword) => {
  const record = await PasswordReset.findOne({
    where: {
      token,
      expires_at: { [Op.gt]: new Date() },
    },
  });

  if (!record) {
    const err = new Error('Токен недействителен или истёк');
    err.status = 400;
    throw err;
  }

  const user = await User.findOne({ where: { email: record.email } });
  if (!user) {
    const err = new Error('Пользователь не найден');
    err.status = 404;
    throw err;
  }

  const password_hash = await bcrypt.hash(newPassword, 10);
  await user.update({ password_hash });

  await record.destroy();

  return { message: 'Пароль успешно изменён' };
};

module.exports = { requestReset, resetPassword };
