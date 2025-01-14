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

export default getInfluencerById;
