import styles from "./AddRecommendation"
import InfluencerForm from '../../components/InfluencerForm/InfluencerForm';

const AddRecommendation = () => {

  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Add Recommendation For Influencer</h1>
      <InfluencerForm />
    </div>
  );
};

export default AddRecommendation;
