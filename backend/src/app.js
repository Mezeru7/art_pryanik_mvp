const express = require('express');
const { sequelize } = require('./models');
const apiRoutes = require('./api/routes');
const errorHandler = require('./middleware/errorHandler');
const corsMiddleware = require('./middleware/cors');

const app = express();

app.use(corsMiddleware);
app.use(express.json());

sequelize
  .authenticate()
  .then(() => {
    console.log('Подключение к базе данных установлено');
    // Создаём таблицы если их нет (не удаляет существующие данные)
    return sequelize.sync({ alter: false });
  })
  .then(() => console.log('Таблицы синхронизированы'))
  .catch((err) => console.error('Ошибка подключения к базе данных:', err.message));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Арт-Пряник API работает' });
});

app.use(errorHandler);

module.exports = app;
