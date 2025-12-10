const express = require('express');

const app = express();

// Проверка работоспособности
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Арт-Пряник API работает' });
});

module.exports = app;
