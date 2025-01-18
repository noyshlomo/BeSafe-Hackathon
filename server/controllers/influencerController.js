import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import influencers from '../data/influencerData.js';
import comments from '../data/comments.js';

const getInfluencerById = (req, res) => {
  const { category, id } = req.params;
  const influencer = influencers.find(
    (inf) => inf.id === parseInt(id, 10) && inf.category === category
  );

  if (!influencer) {
    return res.status(404).json({ message: 'Influencer not found' });
  }

  const influencerComments = comments.filter(
    (comment) => comment.influencerId == id
  );

  res.status(200).json({ influencer, comments: influencerComments });
};

const addInfluencer  = (req, res) => {
  const newInfluencerData = req.body;

    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const influencerDataFilePath = path.join(__dirname, '../data/influencerData.js');

        const newInfluencerDataWithId = { ...newInfluencerData, influencerId: uuidv4() };
        console.log('New influencer data with ID:', newInfluencerDataWithId);

        influencers.push(newInfluencerDataWithId);

        // Debug the updated data
        const updatedData = `const influencers = ${JSON.stringify(influencers, null, 2)};\n\nexport default influencers;`;

        fs.writeFile(influencerDataFilePath, updatedData, 'utf8', (err) => {
        if (err) {
            console.error('File Write Error:', err);
            return res.status(500).send('Error saving influencer data');
        }
        res.status(200).send('Influencer data saved successfully');
        });
    } catch (error) {
        console.error('Unexpected Error:', error);
        res.status(500).send('Error saving influencer data');
    }
}

export { getInfluencerById, addInfluencer };
