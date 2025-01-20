import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import sleepHoursData from '../data/sleepHoursData.js';

const saveSleepData = (req, res) => {
    const newSleepData = req.body;

    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const sleepDataFilePath = path.join(__dirname, '../data/sleepHoursData.js');

        const newSleepDataWithId = { ...newSleepData, sleepId: uuidv4() };
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

const getSleepData = (req, res) => {
    const userId = req.params.id;  // Extract user ID from request parameters

    try {
        if (!Array.isArray(sleepHoursData)) {
            console.error('Invalid data source format');
            return res.status(500).send('Server configuration error');
        }

        // Filter the data to only include entries for the specified user
        const filteredData = sleepHoursData.filter(data => data.userId === userId);

        if (filteredData.length === 0) {
            return res.status(404).send('No sleep data found for the user');
        }

        res.json(filteredData.reverse());  // Send the filtered data back as JSON
    } catch (error) {
        console.error('Fetch Error:', error);
        res.status(500).send('Error fetching sleep data');
    }
};

const deleteSleepData = (req, res) => {
    const { userId, sleepId } = req.params; // Extracting userId and sleepId from the request parameters

    try {
        // Load the existing sleep data
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const sleepDataFilePath = path.join(__dirname, '../data/sleepHoursData.js');

        // Filter out the entry to delete
        const updatedSleepData = sleepHoursData.filter(item => !(item.userId === userId && item.sleepId === sleepId));

        // Prepare the updated data to be written back to the file
        const updatedData = `const sleepHoursData = ${JSON.stringify(updatedSleepData, null, 2)};\n\nexport default sleepHoursData;`;

        // Write the updated data back to the file
        fs.writeFile(sleepDataFilePath, updatedData, 'utf8', (err) => {
            if (err) {
                console.error('File Write Error:', err);
                return res.status(500).send('Error deleting sleep data');
            }
            res.status(200).send('Sleep data deleted successfully');
        });
    } catch (error) {
        console.error('Unexpected Error:', error);
        res.status(500).send('Error deleting sleep data');
    }
};


export default saveSleepData;

// Export other functions as named exports
export { getSleepData, deleteSleepData };
