const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/:id/:token', authController.passwordchangepost);

module.exports = router;