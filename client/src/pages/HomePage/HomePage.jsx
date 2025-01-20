//import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { useEffect, useState } from 'react';

const Home = () => {
  const [affirmation, setAffirmation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAffirmation = async () => {
      try {
        const response = await fetch('http://localhost:5000/affirmation');
        if (!response.ok) {
          throw new Error('Failed to fetch affirmation');
        }
        const data = await response.json();
        setAffirmation(data.affirmation);
      } catch (err) {
        console.log('Error fetching affirmation: ', err);
      }
    };
    fetchAffirmation();
  }, []);

  const handleSleepNavigation = () => {
    const userId = '2'; // Temp user ID
    navigate(`/sleep-tracking/${userId}`);
  };

  const handleInspirationNavigation = () => {
    /*
    const userId = '2'; // Temp user ID
    navigate(`/inspiration-dashboard/${userId}`);
    */
    navigate(`/inspiration-boards`);
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Welcome back, Candy</h1>
      <p className={styles.affirmationText}>{affirmation}</p>
      <div className={styles.container}>
        <button
          type="button"
          className={styles.sleepButton}
          onClick={handleSleepNavigation}
        >
          <h2>Sleep Tracking</h2>
          <p>
            Update your sleep log, get your sleep analytics and change your
            goals
          </p>
        </button>
        <button
          type="button"
          className={styles.inspirationButton}
          onClick={handleInspirationNavigation}
        >
          <h2>Inspiration Dashboard</h2>
          <p>Explore wellness topics and discover influencers.</p>
        </button>
      </div>
    </div>
  );
};

export default Home;
