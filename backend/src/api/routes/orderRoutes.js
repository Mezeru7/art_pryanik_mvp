const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/orderController');

router.get('/', orderController.getAll);
router.get('/:id', orderController.getById);

module.exports = router;
