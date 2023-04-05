const express = require('express');
const router = express.Router();
const lhController = require('../controllers/lh.controller');

router.post('/', lhController.postData);

module.exports = router;
