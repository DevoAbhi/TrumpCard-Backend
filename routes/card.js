const express = require('express');
const router = express.Router();

const cardController = require('../controllers/card');

router.post('/get-card', cardController.postCardDeckHandler);

module.exports = router;

