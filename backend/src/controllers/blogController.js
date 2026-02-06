const blogService = require('../services/blogService');

const getAll = async (req, res) => {
  try {
    const posts = await blogService.getAll();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const post = await blogService.getById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Статья не найдена' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getById };
