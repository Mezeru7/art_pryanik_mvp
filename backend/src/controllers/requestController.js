const requestService = require('../services/requestService');

const create = async (req, res) => {
  try {
    const { name, phone, description } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'Имя и телефон обязательны' });
    }
    const request = await requestService.create({ name, phone, description });
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const requests = await requestService.getAll();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { create, getAll };
