import express from 'express';
import {getInfluencerById, addInfluencer, getInfluencersByTopic } from '../controllers/influencerController.js';

const router = express.Router();

router.get('/:category/:id', getInfluencerById);

router.post('/', addInfluencer);

router.get('/:category', getInfluencersByTopic);


export default router;
