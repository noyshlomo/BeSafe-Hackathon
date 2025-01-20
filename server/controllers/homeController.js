import axios from 'axios';

export const getAffirmation = () => async (req, res) => {
  try {
    const response = await axios.get('https://www.affirmations.dev/');
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching affirmation:', err);
    res.status(500).send({ error: 'Failed to fetch affirmation' });
  }
};
