const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categoryController');
const { createCategory, updateCategory } = require('../../middleware/validators/categoryValidator');

router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
router.get('/:id/products', categoryController.getProducts);
router.post('/', createCategory, categoryController.create);
router.put('/:id', updateCategory, categoryController.update);
router.delete('/:id', categoryController.remove);

module.exports = router;
