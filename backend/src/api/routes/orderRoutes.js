const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/orderController');
const auth = require('../../middleware/auth');
const requireRole = require('../../middleware/requireRole');

router.get('/', auth, requireRole('admin'), orderController.getAll);
router.get('/:id', auth, orderController.getById);
router.post('/', orderController.create);
router.patch('/:id/status', auth, requireRole('admin'), orderController.updateStatus);
router.delete('/:id', auth, requireRole('admin'), orderController.remove);

module.exports = router;
