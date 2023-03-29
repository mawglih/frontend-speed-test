const express = require('express');
const router = express.Router();
const cruxController = require('../controllers/crux.controller');

// router.get('/', cruxController.getData);
router.post('/', cruxController.postData);

module.exports = router;
