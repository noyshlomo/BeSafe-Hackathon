import influencers from '../data/influencerData.js';
import comments from '../data/comments.js';

const getInfluencerById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const influencer = influencers.find((inf) => inf.id === id);

  if (!influencer) {
    return res.status(404).json({ message: 'Influencer not found' });
  }

  const influencerComments = comments.filter(
    (comment) => comment.influencerId == id
  );

  res.status(200).json({ influencer, comments: influencerComments });
};

export default getInfluencerById;
