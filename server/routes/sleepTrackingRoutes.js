import express from 'express';
import saveSleepData, {getSleepData, deleteSleepData} from '../controllers/sleepTrackingController.js';
import { getSleepTip } from '../controllers/sleppTipController.js'

const router = express.Router();

router.post('/', saveSleepData); 

router.get('/:id', getSleepData);

router.delete('/:userId/:sleepId', deleteSleepData);

router.post('/sleep-tip/:id', getSleepTip);

export default router; 
