import express from 'express';
import {
  getInfluencerById,
  addInfluencer,
  getInfluencersByTopic,
  addComment,
} from '../controllers/influencerController.js';

const router = express.Router();

router.get('/:category/:id', getInfluencerById);

router.post('/', addInfluencer);

router.get('/:category', getInfluencersByTopic);

router.post('/:category/:id/comments', addComment);

export default router;
