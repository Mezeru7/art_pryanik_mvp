const blogService = require('../services/blogService');

// GET /api/blog
const getAll = async (req, res) => {
  try {
    const posts = await blogService.getAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/blog/:id
const getById = async (req, res) => {
  try {
    const post = await blogService.getById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Статья не найдена' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/blog/slug/:slug
const getBySlug = async (req, res) => {
  try {
    const post = await blogService.getBySlug(req.params.slug);
    if (!post) return res.status(404).json({ error: 'Статья не найдена' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/blog  (admin)
const create = async (req, res) => {
  try {
    const post = await blogService.create({ ...req.body, author_id: req.user.id });
    res.status(201).json(post);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// PUT /api/blog/:id  (admin)
const update = async (req, res) => {
  try {
    const post = await blogService.update(req.params.id, req.body);
    res.json(post);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

// DELETE /api/blog/:id  (admin)
const remove = async (req, res) => {
  try {
    const result = await blogService.remove(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

module.exports = { getAll, getById, getBySlug, create, update, remove };
