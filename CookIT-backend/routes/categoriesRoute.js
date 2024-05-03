const express = require('express');

const categoriesController = require('../controllers/categoriesController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/breakfast');
