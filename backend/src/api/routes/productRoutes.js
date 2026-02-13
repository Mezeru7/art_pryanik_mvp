const express = require('express');
const router = express.Router();
const productController = require('../../controllers/productController');
const { createProduct, updateProduct } = require('../../middleware/validators/productValidator');

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', createProduct, productController.create);
router.put('/:id', updateProduct, productController.update);
router.delete('/:id', productController.remove);

module.exports = router;
