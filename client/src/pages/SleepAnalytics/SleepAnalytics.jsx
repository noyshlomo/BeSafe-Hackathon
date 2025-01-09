import { useParams } from 'react-router';
import SleepDataTable from '../../components/SleepDataTable/SleepDataTable';
//import styles from './SleepAnalytics.module.css';

const SleepAnalytics = () => {
    const { id } = useParams();

    return (
  <div>
        <h1>Sleep Analytics</h1>
        <SleepDataTable id={id}/>
      </div>
      );
};

export default SleepAnalytics;

