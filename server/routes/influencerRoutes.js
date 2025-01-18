import express from 'express';
import {getInfluencerById, addInfluencer } from '../controllers/influencerController.js';

const router = express.Router();

router.get('/:category/:id', getInfluencerById);
router.post('/', addInfluencer);

export default router;
