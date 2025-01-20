import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import './TopicScreen.module.css';

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

  return (
    <div>
      <h1>{category} board</h1>
      {loading && <p>Loading...</p>}
      {!loading && !error && influencers.length > 0 && (
        <div>
          {influencers.map((influencer, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleInfluencerClick(influencer.influencerId)}
            >
              <h2>{influencer.name}</h2>
            </button>
          ))}
        </div>
      )}
=======
import { useEffect, useState } from 'react'; // To fetch data from backend
import styles from "./TopicScreen.module.css";

const topicNames = {
  'nutrition': 'Nutrition',
  'body-image-and-self-esteem': 'Body Image & Self-Esteem',
  'sexuality-and-health': 'Sexuality & Health',
  'mental-health': 'Mental Health'
};

const TopicScreen = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [influencers, setInfluencers] = useState([]); // State to store influencer data

  // Fetch influencers when the component mounts
  useEffect(() => {
    const fetchInfluencers = async () => {
      try {
        const response = await fetch(`/api/influencers/${topic}`);
        const data = await response.json();
        setInfluencers(data.influencers); // Set influencers data
      } catch (error) {
        console.error('Error fetching influencers:', error);
      }
    };
    fetchInfluencers();
  }, [topic]);

  // Function to handle redirection when an influencer's name is clicked
  const handleInfluencerClick = (id) => {
    navigate(`/influencer/${id}`);
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>{topicNames[topic]} Dashboard</h1>
      <div className={styles.container}>
        {influencers.map((influencer) => (
          <button 
            key={influencer.id} 
            type="button" 
            onClick={() => handleInfluencerClick(influencer.id)}
          >
            <h2>{influencer.name}</h2>
          </button>
        ))}
      </div>
>>>>>>> 8e536002b9832c1ea953cd77766f1e49c03997b5
    </div>
  );
};
export default TopicScreen;
