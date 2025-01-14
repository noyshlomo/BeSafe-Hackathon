import { useParams } from 'react-router';
import styles from "./AddRecommendation"
import AddInfluencerForm from '../../components/AddInfluencerForm/AddInfluencerForm';

const topicNames = {
  'nutrition': 'Nutrition',
  'body-image-and-self-esteem': 'Body Image & Self-Esteem',
  'sexuality-and-health': 'Sexuality & Health',
  'mental-health': 'Mental Health'
};

const AddRecommendation = () => {

  const { topic } = useParams(); // topic parameter from the URL

  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Add Recommendation For {topicNames[topic]}</h1>
      <AddInfluencerForm />
    </div>
  );
};

export default AddRecommendation;
