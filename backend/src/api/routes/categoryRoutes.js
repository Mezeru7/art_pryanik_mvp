const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/categoryController');

router.get('/', categoryController.getAll);                  // GET    /api/categories
router.get('/:id', categoryController.getById);              // GET    /api/categories/:id
router.get('/:id/products', categoryController.getProducts); // GET    /api/categories/:id/products
router.post('/', categoryController.create);                 // POST   /api/categories
router.put('/:id', categoryController.update);               // PUT    /api/categories/:id
router.delete('/:id', categoryController.remove);            // DELETE /api/categories/:id

module.exports = router;
