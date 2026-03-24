const authService = require('../services/authService');

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const { first_name, email, phone, password } = req.body;
    if (!first_name || !email || !password) {
      return res.status(400).json({ error: 'Имя, email и пароль обязательны' });
    }
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      return res.status(400).json({ error: 'Логин и пароль обязательны' });
    }
    const result = await authService.login({ login, password });
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  try {
    const user = await authService.getMe(req.user.id);
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/auth/me
const updateMe = async (req, res) => {
  try {
    const result = await authService.updateMe(req.user.id, req.body);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = { register, login, getMe, updateMe };
