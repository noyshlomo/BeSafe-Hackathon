//import React from 'react';
//import { useNavigate } from 'react-router-dom';
import styles from './InspirationDashboard.module.css';


const InspirationDashboard = () => {
  console.log("enter insp function");

  /*
  const navigate = useNavigate();

  const handleSleepNavigation = () => {
    const userId = '2'; // Temp user ID
    navigate(`/sleep-tracking/${userId}`);
  };
  */

  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Inspiration Dashboard</h1>
      <div className={styles.container}>
        <button type="button">
          <h2>Toppic 1</h2>
        </button>
        <button type="button">
          <h2>Toppic 2</h2>
        </button>
        <button type="button">
          <h2>Toppic 3</h2>
        </button>
        <button type="button">
          <h2>Toppic 4</h2>
        </button>
      </div>
    </div>
  );
};

export default InspirationDashboard;
