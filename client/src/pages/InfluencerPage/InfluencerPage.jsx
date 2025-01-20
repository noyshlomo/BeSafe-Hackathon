// InfluencerPage.js

import { useParams, useEffect, useState } from 'react';
import InfluencerInfo from '../../components/InfluencerPage/InfluencerInfo/InfluencerInfo.jsx'; 
import Comments from '../../components/InfluencerPage/Comments/Comments.jsx';

const InfluencerPage = () => {
  const { id } = useParams();  // Get influencer ID from URL
  const [influencer, setInfluencer] = useState(null); // State to store influencer data

  useEffect(() => {
    const fetchInfluencer = async () => {
      try {
        const response = await fetch(`/api/influencers/${id}`);
        const data = await response.json();
        setInfluencer(data.influencer); // Set influencer data
      } catch (error) {
        console.error('Error fetching influencer data:', error);
      }
    };
    fetchInfluencer();
  }, [id]);

  if (!influencer) return <div>Loading...</div>;

  return (
    <div>
      <h1>{influencer.name}</h1>
      <div>
        <a href={influencer.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href={influencer.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href={influencer.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
      </div>
      <InfluencerInfo influencerId={id} />
      <Comments influencerId={id} />
    </div>
  );
};

export default InfluencerPage;
