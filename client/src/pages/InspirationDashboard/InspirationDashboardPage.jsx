//import React from 'react';
//import { useNavigate } from 'react-router-dom';
import styles from './InspirationDashboard.module.css';

const InspirationDashboard = () => {
  console.log('enter insp function');

  /*
  const navigate = useNavigate();

  const handleSleepNavigation = () => {
    const userId = '2'; // Temp user ID
    navigate(`/sleep-tracking/${userId}`);
  };
  */

  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Inspiration Boards</h1>
      <div className={styles.container}>
        <button type="button">
          <h2>Topic 1</h2>
        </button>
        <button type="button">
          <h2>Topic 2</h2>
        </button>
        <button type="button">
          <h2>Topic 3</h2>
        </button>
        <button type="button">
          <h2>Topic 4</h2>
        </button>
      </div>
    </div>
  );
};

export default InspirationDashboard;
