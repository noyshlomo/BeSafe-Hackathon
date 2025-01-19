import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import styles from './TopicScreen.module.css';

const TopicScreen = () => {
  const { category } = useParams(); // topic parameter from the URL
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h1>{category} board</h1>
      {loading && <p>Loading...</p>}
      {console.log('loading: ' + loading)}
      {console.log('error: ' + error)}
      {console.log('influencers.length: ' + influencers.length)}
      {!loading && !error && influencers.length > 0 && (
        <div>
          {influencers.map((influencer, index) => (
            <button key={index} type="button">
              <h2>{influencer.name}</h2>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default TopicScreen;
