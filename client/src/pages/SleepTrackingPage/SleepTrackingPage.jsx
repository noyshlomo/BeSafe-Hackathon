import { useParams } from 'react-router';
import SleepTrackingForm from '../../components/SleepTrackingForm/SleepTrackingForm';
import styles from './SleepTrackingPage.module.css';

const SleepTrackingPage = () => {
    const { id } = useParams();

    return (
<div>
      <h1>Sleep Tracking</h1>
      <SleepTrackingForm userId={id} />

      <div className={styles['buttons-container']}>
        <button
          className={styles['sleep-history-button']}
          aria-label="View Sleep History"
          onClick={() => console.log('Go to Sleep History')}
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
    </div>
    );
};

export default SleepTrackingPage;

