import { useNavigate } from 'react-router-dom';  // Ensure this is uncommented
import styles from './InspirationDashboard.module.css';

const InspirationDashboard = () => {
  const navigate = useNavigate();  // Reactivate the navigate function

  // This function takes a topic name and navigates to the corresponding screen
  const handleNavigation = (topic) => {
    navigate(`/topic-screen/${topic}`);
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Inspiration Boards</h1>
      <div className={styles.container}>
        <button type="button" onClick={() => handleNavigation('nutrition')}>
          <h2>Nutrition</h2>
        </button>
        <button type="button" onClick={() => handleNavigation('body-image-and-self-esteem')}>
          <h2>Body Image & Self-Esteem</h2>
        </button>
        <button type="button" onClick={() => handleNavigation('sexuality-and-health')}>
          <h2>Sexuality & Health</h2>
        </button>
        <button type="button" onClick={() => handleNavigation('mental-health')}>
          <h2> Mental Health</h2>
        </button>
      </div>
    </div>
  );
};

export default InspirationDashboard;
