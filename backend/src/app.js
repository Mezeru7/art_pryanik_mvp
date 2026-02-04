const express = require('express');
const { sequelize } = require('./models');

const app = express();

sequelize
  .authenticate()
  .then(() => {
    console.log('Подключение к базе данных установлено');
  })
  .catch((err) => {
    console.error('Ошибка подключения к базе данных:', err.message);
  });

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Арт-Пряник API работает' });
});

module.exports = app;
