const express = require('express');
const { login, verifyOtp } = require('./authController');
const router = express.Router();

router.post('/api/login', login);
router.post('/api/verify-otp', verifyOtp);

module.exports = router;