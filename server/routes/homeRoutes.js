import express from 'express';
import { getAffirmation } from '../controllers/homeController.js';

const router = express.Router();

router.get('/', getAffirmation());

export default router;
