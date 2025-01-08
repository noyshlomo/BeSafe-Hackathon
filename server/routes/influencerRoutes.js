import express from 'express';
import getInfluencerById from '../controllers/influencerController.js';

const router = express.Router();

router.get('/:id', getInfluencerById);

export default router;
