const categoryService = require('../services/categoryService');

// GET /api/categories
const getAll = async (req, res) => {
  try {
    const categories = await categoryService.getAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/categories/:id
const getById = async (req, res) => {
  try {
    const category = await categoryService.getById(req.params.id);
    if (!category) return res.status(404).json({ error: 'Категория не найдена' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/categories/:id/products
const getProducts = async (req, res) => {
  try {
    const category = await categoryService.getProductsByCategory(req.params.id);
    if (!category) return res.status(404).json({ error: 'Категория не найдена' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/categories
const create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Название категории обязательно' });
    const category = await categoryService.create({ name });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/categories/:id
const update = async (req, res) => {
  try {
    const category = await categoryService.update(req.params.id, req.body);
    if (!category) return res.status(404).json({ error: 'Категория не найдена' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/categories/:id
const remove = async (req, res) => {
  try {
    const result = await categoryService.remove(req.params.id);
    if (!result) return res.status(404).json({ error: 'Категория не найдена' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getById, getProducts, create, update, remove };
