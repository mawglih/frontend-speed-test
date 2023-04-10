const express = require('express');
const router = express.Router();
const psiController = require('../controllers/psi.controller');

router.get('/', psiController.getData);

module.exports = router;