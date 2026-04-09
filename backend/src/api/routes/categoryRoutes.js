const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categoryController');
const auth = require('../../middleware/auth');
const requireRole = require('../../middleware/requireRole');
const { createCategory, updateCategory } = require('../../middleware/validators/categoryValidator');

// Публичные маршруты
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
router.get('/:id/products', categoryController.getProducts);

// Только для администратора
router.post('/', auth, requireRole('admin'), createCategory, categoryController.create);
router.put('/:id', auth, requireRole('admin'), updateCategory, categoryController.update);
router.delete('/:id', auth, requireRole('admin'), categoryController.remove);

module.exports = router;
