const productService = require('../services/productService');

// GET /api/products?category_id=1
const getAll = async (req, res) => {
  try {
    const { category_id } = req.query;
    const products = await productService.getAll({ category_id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/products/:id
const getById = async (req, res) => {
  try {
    const product = await productService.getById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Товар не найден' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/products
const create = async (req, res) => {
  try {
    const { title, description, price, category_id } = req.body;
    if (!title || !price) {
      return res.status(400).json({ error: 'Название и цена обязательны' });
    }
    const product = await productService.create({ title, description, price, category_id });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/products/:id
const update = async (req, res) => {
  try {
    const product = await productService.update(req.params.id, req.body);
    if (!product) return res.status(404).json({ error: 'Товар не найден' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/products/:id
const remove = async (req, res) => {
  try {
    const result = await productService.remove(req.params.id);
    if (!result) return res.status(404).json({ error: 'Товар не найден' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
