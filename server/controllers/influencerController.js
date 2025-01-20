import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import influencers from '../data/influencerData.js';
import comments from '../data/comments.js';

const getInfluencerById = (req, res) => {
  const { category, id } = req.params;
  const influencer = influencers.find(
    (inf) => inf.influencerId === id && inf.category === category
  );

  if (!influencer) {
    return res.status(404).json({ message: 'Influencer not found' });
  }

  const influencerComments = comments.filter(
    (comment) => comment.influencerId == id
  );

  res.status(200).json({ influencer, comments: influencerComments });
};

// Helper function to check for duplicate URLs
const checkDuplicateUrl = (url, fieldName) => {
  if (url) {
    const existingInfluencer = influencers.find(
      (inf) => inf[fieldName] === url
    );
    if (existingInfluencer) {
      return 'This recomendation already exists';
    }
  }
  return null;
};

const addInfluencer = (req, res) => {
  const newInfluencerData = req.body;

  try {
    const instagramCheck = checkDuplicateUrl(
      newInfluencerData.instagram,
      'instagram'
    );
    const tiktokCheck = checkDuplicateUrl(newInfluencerData.tiktok, 'tiktok');
    const facebookCheck = checkDuplicateUrl(
      newInfluencerData.facebook,
      'facebook'
    );

    if (instagramCheck || tiktokCheck || facebookCheck) {
      return res
        .status(400)
        .json({ message: 'This influencer has already been recommended.' });
    }

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const influencerDataFilePath = path.join(
      __dirname,
      '../data/influencerData.js'
    );

    const newInfluencerDataWithId = {
      ...newInfluencerData,
      influencerId: uuidv4(),
    };
    console.log('New influencer data with ID:', newInfluencerDataWithId);

    influencers.push(newInfluencerDataWithId);

    // Debug the updated data
    const updatedData = `const influencers = ${JSON.stringify(
      influencers,
      null,
      2
    )};\n\nexport default influencers;`;

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
};

const getInfluencersByTopic = (req, res) => {
  const { category } = req.params;
  const foundInfluencers = influencers.filter(
    (inf) => inf.category === category
  );
  if (foundInfluencers.length === 0) {
    return res
      .status(404)
      .json({ error: 'No influencers found for this category' });
  }
  res.json(foundInfluencers);
};

const addComment = (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const newComment = {
    id: comments.length + 1, // Set a new id
    userName: 'Candy',
    influencerId: id,
    content,
  };
  comments.push(newComment);
  fs.writeFile(
    './data/comments.js',
    `const comments = ${JSON.stringify(comments)};\n\nexport default comments;`,
    (err) => {
      if (err) {
        console.log('Error writing to comments file:', err);
        return res.status(500).send('Error saving comment');
      }

      return res.json({ newComment });
    }
  );
};

export { getInfluencerById, addInfluencer, getInfluencersByTopic, addComment };
