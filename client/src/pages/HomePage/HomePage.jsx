//import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();

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
      <div className={styles.container}>
        <div>Your Goals</div>
        <button
          type="button"
          className={styles.sleepButton}
          onClick={handleSleepNavigation}
        >
          <h2>Sleep Tracking</h2>
          <p>
            Update ypur sleep log, get your sleep analytics and change your
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
