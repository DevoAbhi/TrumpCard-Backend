import express from 'express';
const router = express.Router();
import {postScraping} from '../controllers/webScraping.js'

router.post('/scrap', postScraping);

export default router;

