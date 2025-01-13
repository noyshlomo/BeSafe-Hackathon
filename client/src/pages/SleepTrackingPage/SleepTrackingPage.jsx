import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import SleepTrackingForm from '../../components/SleepTrackingForm/SleepTrackingForm';
import SleepTip from '../../components/SleepTip/SleepTis';
import styles from './sleepTrackingPage.module.css';

const SleepTrackingPage = () => {
    const { id } = useParams();

    const navigate = useNavigate();  // Hook to get the navigate function

    // Function to handle button click and navigate
    const goToSleepAnalytics = () => {
      navigate(`/sleep-analytics/${id}`);  
    };


    return (
<div>
      <h1>Sleep Tracking</h1>
      <SleepTrackingForm userId={id} />

      <div className={styles['buttons-container']}>
        <button
          className={styles['sleep-history-button']}
          aria-label="View Sleep History"
          onClick={goToSleepAnalytics}
        >
          Sleep History
        </button>
        <button
          className={styles['set-sleep-goals-button']}
          aria-label="Set Sleep Goals"
          onClick={() => console.log('Set Sleep Goals')}
        >
          Set Sleep Goals
        </button>
        <button
          className={styles['sleep-tips-button']}
          aria-label="View Tips for Sleep Hygiene"
          onClick={() => console.log('Tips for Sleep Hygiene')}
        >
          Tips for Sleep Hygiene
        </button>
      </div>
      < SleepTip userId={id} />
    </div>
    );
};

export default SleepTrackingPage;

