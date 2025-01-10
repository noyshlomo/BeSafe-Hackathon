import express from 'express';
import saveSleepData from '../controllers/sleepTrackingController.js';

const router = express.Router();

router.post('/', saveSleepData); 

export default router; 
