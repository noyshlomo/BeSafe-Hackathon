import { useParams } from 'react-router-dom';
import styles from "./TopicScreen.module.css";

const topicNames = {
  'nutrition': 'Nutrition',
  'body-image-and-self-esteem': 'Body Image & Self-Esteem',
  'sexuality-and-health': 'Sexuality & Health',
  'mental-health': 'Mental Health'
};

const TopicScreen = () => {
  const { topic } = useParams(); // topic parameter from the URL


  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>{topicNames[topic]} Dashboard</h1>
      <div className={styles.container}>
        <button type="button">
          <h2>Influencer 1</h2>
        </button>
        <button type="button">
          <h2>Influencer 2</h2>
        </button>
        <button type="button">
          <h2>Influencer 3</h2>
        </button>
        <button type="button">
          <h2>Influencer 4</h2>
        </button>
      </div>
    </div>
  );
};

export default TopicScreen;
