import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import sleepHoursData from '../data/sleepHoursData.js';

const saveSleepData = (req, res) => {
    const newSleepData = req.body;

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const sleepDataFilePath = path.join(__dirname, '../data/sleepHoursData.js');

    const lastId = sleepHoursData.length ? Math.max(0, ...sleepHoursData.map(item => item.sleepId || 0)) : 0;
    console.log('Computed lastId:', lastId);

    const newId = lastId + 1;
    const newSleepDataWithId = { ...newSleepData, sleepId: newId };
    console.log('New sleep data with ID:', newSleepDataWithId);

    sleepHoursData.push(newSleepDataWithId);

    // Debug the updated data
    const updatedData = `const sleepHoursData = ${JSON.stringify(sleepHoursData, null, 2)};\n\nexport default sleepHoursData;`;

    fs.writeFile(sleepDataFilePath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error('File Write Error:', err);
        return res.status(500).send('Error saving sleep data');
      }
      res.status(200).send('Sleep data saved successfully');
    });
  } catch (error) {
    console.error('Unexpected Error:', error);
    res.status(500).send('Error saving sleep data');
  }
};

export default saveSleepData;
