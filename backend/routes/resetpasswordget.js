const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/:id/:token', authController.passwordChangeget);

module.exports = router;