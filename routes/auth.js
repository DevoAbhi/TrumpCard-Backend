import express from "express";
const router = express.Router();

import { postSignUp, postLogin, postDeleteCardCollection } from "../controllers/auth.js";
import authMiddleware from '../middleware/auth.js';

router.post('/signup', postSignUp);
router.post('/login', postLogin);
router.post('/delete-card', authMiddleware, postDeleteCardCollection);

export default router;