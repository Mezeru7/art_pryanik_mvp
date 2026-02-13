const express = require('express');
const router = express.Router();
const requestController = require('../../controllers/requestController');
const { createRequest } = require('../../middleware/validators/requestValidator');

router.post('/', createRequest, requestController.create);
router.get('/', requestController.getAll);

module.exports = router;
