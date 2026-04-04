const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');
const auth = require('../../middleware/auth');
const requireRole = require('../../middleware/requireRole');
const { createProduct, updateProduct } = require('../../middleware/validators/productValidator');

// Публичные маршруты
router.get('/', productController.getAll);
router.get('/:id', productController.getById);

// Только для администратора
router.post('/', auth, requireRole('admin'), createProduct, productController.create);
router.put('/:id', auth, requireRole('admin'), updateProduct, productController.update);
router.delete('/:id', auth, requireRole('admin'), productController.remove);

module.exports = router;
