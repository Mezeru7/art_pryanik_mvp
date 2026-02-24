const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/orderController');

router.get('/', orderController.getAll);                    // GET    /api/orders
router.get('/:id', orderController.getById);                // GET    /api/orders/:id
router.post('/', orderController.create);                   // POST   /api/orders
router.patch('/:id/status', orderController.updateStatus);  // PATCH  /api/orders/:id/status

module.exports = router;
