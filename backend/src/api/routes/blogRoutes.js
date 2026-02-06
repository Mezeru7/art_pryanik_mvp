const express = require('express');
const router = express.Router();
const blogController = require('../../controllers/blogController');

router.get('/', blogController.getAll);
router.get('/:id', blogController.getById);

module.exports = router;
