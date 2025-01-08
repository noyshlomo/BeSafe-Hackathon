import influencers from '../data/influencerData.js';

const getInfluencerById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const influencer = influencers.find((inf) => inf.id === id);

  if (!influencer) {
    return res.status(404).json({ message: 'Influencer not found' });
  }
  res.status(200).json({ influencer });
};

export default getInfluencerById;
