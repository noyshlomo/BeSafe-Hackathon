//import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';


const Home = () => {

  const navigate = useNavigate();

  const handleSleepNavigation = () => {
    const userId = '2'; // Temp user ID
    navigate(`/sleep-tracking/${userId}`);
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Welcome back, Candy</h1>
      <div className={styles.container}>
        <div>Your Goals</div>
        <button type="button" className={styles.myButton} onClick={handleSleepNavigation}>
          Sleep Tracking
        </button>
        <button type="button" className={styles.myButton}>Inspiration Dashboard</button>
      </div>
    </div>
  );
};

export default Home;
