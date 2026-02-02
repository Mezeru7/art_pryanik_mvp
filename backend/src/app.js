const express = require('express');
const sequelize = require('./config/database');

const app = express();

// Проверка подключения к БД
sequelize
  .authenticate()
  .then(() => {
    console.log('Подключение к базе данных установлено');
  })
  .catch((err) => {
    console.error('Ошибка подключения к базе данных:', err.message);
  });

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Арт-Пряник API работает' });
});

module.exports = app;
