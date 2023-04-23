import express from 'express';
const router = express.Router();

import {postCardDeckHandler} from '../controllers/card.js';
import authMiddleware from '../middleware/auth.js';

router.post('/get-card', authMiddleware, postCardDeckHandler);

export default router;

