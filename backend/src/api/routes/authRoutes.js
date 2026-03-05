const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const auth = require('../../middleware/auth');

router.post('/register', authController.register); // POST /api/auth/register
router.post('/login', authController.login);       // POST /api/auth/login
router.get('/me', auth, authController.getMe);     // GET  /api/auth/me (защищённый)

module.exports = router;
