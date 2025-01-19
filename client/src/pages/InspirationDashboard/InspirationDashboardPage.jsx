import { useNavigate } from 'react-router-dom';
import styles from './InspirationDashboard.module.css';

const InspirationDashboard = () => {
  const navigate = useNavigate();  // Reactivate the navigate function

  // This function takes a topic name and navigates to the corresponding screen
  const handleNavigation = (topic) => {
    navigate(`/inspiration-boards/${topic}`);
  };

  const handleAddRecommendation = () => {
    navigate('/add-recommendation');
  };

  return (
    <div className={styles.home}>
      <div className={styles.topContainer}>
        <h1 className={styles.headline}>Inspiration Boards</h1>
        <button className={styles.addRecommendation} type="button" onClick={handleAddRecommendation}>
          Add Recommendation
        </button>
      </div>
      <div className={styles.container}>
        <button className={styles.nutrition} type="button" onClick={() => handleNavigation('nutrition')}>
          <h2>Nutrition</h2>
        </button>
        <button className={styles.bodyImage} type="button" onClick={() => handleNavigation('body-image-and-self-esteem')}>
          <h2>Body Image & Self-Esteem</h2>
        </button>
        <button className={styles.sexualityAndHealth} type="button" onClick={() => handleNavigation('sexuality-and-health')}>
          <h2>Sexuality & Health</h2>
        </button>
        <button className={styles.mentalHealth} type="button" onClick={() => handleNavigation('mental-health')}>
          <h2> Mental Health</h2>
        </button>
      </div>
    </div>
  );
};

export default InspirationDashboard;
