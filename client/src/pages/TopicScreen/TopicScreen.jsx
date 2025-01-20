import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TopicScreen.css';

const TopicScreen = () => {
  const { category } = useParams(); // topic parameter from the URL
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch influencers based on the category
    const fetchInfluencers = async () => {
      if (!category) {
        setError('Category is not defined.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/inspiration-boards/${category}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch influencers');
        }
        const data = await response.json();
        if (data.length === 0) {
          setError('No influencers found for this category');
        } else {
          setInfluencers(data); // Set fetched data
          setError(null); // Clear any previous errors
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInfluencers();
  }, [category]);

  const handleInfluencerClick = (id) => {
    navigate(`/inspiration-boards/${category}/${id}`); // Navigate to influencer detail page
  };

  const categoryMap = {
    nutrition: 'Nutrition',
    'body-image-and-self-esteem': 'Body Image & Self-Esteem',
    'sexuality-and-health': 'Sexuality & Health',
    'mental-health': 'Mental Health',
  };

  const categoryName = categoryMap[category];

  return (
    <div>
      <h1>{categoryName} Board</h1>
      {loading && <p>Loading...</p>}
      {!loading && !error && influencers.length > 0 && (
        <div>
          {influencers.map((influencer, index) => (
            <button
              className="influencer-button"
              key={index}
              type="button"
              onClick={() => handleInfluencerClick(influencer.influencerId)}
            >
              <h2>{influencer.name}</h2>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default TopicScreen;
