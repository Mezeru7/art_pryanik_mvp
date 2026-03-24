const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const passwordResetController = require('../../controllers/passwordResetController');
const auth = require('../../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', auth, authController.getMe);
router.patch('/me', auth, authController.updateMe);
router.post('/forgot-password', passwordResetController.requestReset);
router.post('/reset-password', passwordResetController.resetPassword);

module.exports = router;
