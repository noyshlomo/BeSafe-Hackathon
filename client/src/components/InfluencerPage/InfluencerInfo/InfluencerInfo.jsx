import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import styles from './InfluencerInfo.module.css';

const InfluencerInfo = () => {
  const { category, id } = useParams(); // Get the influencer ID from the route
  const [influencer, setInfluencer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch influencer data from the server
    const fetchInfluencer = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/inspiration-boards/${category}/${id}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch influencer data');
        }
        const data = await response.json();
        setInfluencer(data.influencer); // Update state with fetched data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchInfluencer();
  }, [category, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const socialLinks = [
    { platform: 'Instagram', url: influencer.instagram },
    { platform: 'Facebook', url: influencer.facebook },
    { platform: 'TikTok', url: influencer.tiktok },
  ];

  return (
    <div className={styles.info}>
      <h1 className={styles.headline}>{influencer.name}</h1>
      <div className={styles.container}>
        {socialLinks.map(
          ({ platform, url }) =>
            url && (
              <a key={platform} href={url} target="_blank" rel="noreferrer">
                {platform}
              </a>
            )
        )}
      </div>
    </div>
  );
};

export default InfluencerInfo;
