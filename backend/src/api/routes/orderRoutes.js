const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/orderController');
const auth = require('../../middleware/auth');
const requireRole = require('../../middleware/requireRole');

router.get('/', auth, requireRole('admin'), orderController.getAll);   // только admin
router.get('/:id', auth, orderController.getById);                     // авторизованный
router.post('/', orderController.create);                              // публичный (гостевые заказы)
router.patch('/:id/status', auth, requireRole('admin'), orderController.updateStatus); // только admin

module.exports = router;
