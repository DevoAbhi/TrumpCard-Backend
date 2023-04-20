import express from 'express';
const router = express.Router();

import {postCardDeckHandler} from '../controllers/card.js';

router.post('/get-card', postCardDeckHandler);

export default router;

