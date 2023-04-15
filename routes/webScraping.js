const express = require('express');
const router = express.Router();

const webScrapingController = require('../controllers/webScraping')

router.post('/scrap', webScrapingController.postScraping);

module.exports = router;

