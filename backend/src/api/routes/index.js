const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/products', require('./productRoutes'));
router.use('/categories', require('./categoryRoutes'));
router.use('/blog', require('./blogRoutes'));
router.use('/orders', require('./orderRoutes'));
router.use('/requests', require('./requestRoutes'));

module.exports = router;
