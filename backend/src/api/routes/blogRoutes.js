const express = require('express');
const router = express.Router();
const blogController = require('../../controllers/blogController');
const auth = require('../../middleware/auth');
const requireRole = require('../../middleware/requireRole');
const validate = require('../../middleware/validate');
const { createBlogPost, updateBlogPost } = require('../../middleware/validators/blogValidator');

// Публичные маршруты
router.get('/', blogController.getAll);
router.get('/slug/:slug', blogController.getBySlug);
router.get('/:id', blogController.getById);

// Только для администратора
router.post('/', auth, requireRole('admin'), validate(createBlogPost), blogController.create);
router.put('/:id', auth, requireRole('admin'), validate(updateBlogPost), blogController.update);
router.delete('/:id', auth, requireRole('admin'), blogController.remove);

module.exports = router;
