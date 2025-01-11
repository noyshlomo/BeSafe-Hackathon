import express from 'express';
import saveSleepData, {getSleepData, deleteSleepData} from '../controllers/sleepTrackingController.js';

const router = express.Router();

router.post('/', saveSleepData); 

router.get('/:id', getSleepData);

router.delete('/:userId/:sleepId', deleteSleepData);

export default router; 
