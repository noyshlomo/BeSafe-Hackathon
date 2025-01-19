import { useParams, useNavigate } from 'react-router-dom';
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
    </div>
  );
};

export default TopicScreen;
