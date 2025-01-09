import PropTypes from 'prop-types';
import sleepHoursData from '../../../../server/data/sleepHoursData';
import styles from './SleepDataTable.module.css';

const SleepDataTable = ({ id }) => {
  const filteredData = sleepHoursData.filter(data => data.userId === id);

  const calculateTotalHours = (sleepTime, wakeUpTime) => {
    const [sleepHour, sleepMinute] = sleepTime.split(':').map(Number);
    const [wakeHour, wakeMinute] = wakeUpTime.split(':').map(Number);
    const sleepDate = new Date(2025, 0, 9, sleepHour, sleepMinute);
    const wakeDate = new Date(2025, 0, 9, wakeHour, wakeMinute);
    if (wakeDate < sleepDate) wakeDate.setDate(wakeDate.getDate() + 1);
    return ((wakeDate - sleepDate) / (1000 * 60 * 60)).toFixed(2);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.tr}>
          <th className={styles.th}>Number</th>
          <th className={styles.th}>Sleep Time</th>
          <th className={styles.th}>Wake Up Time</th>
          <th className={styles.th}>Date</th>
          <th className={styles.th}>Total Hours</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((item) => {
          const totalHours = calculateTotalHours(item.sleepTime, item.wakeUpTime);
          return (
            <tr key={item.sleepId} className={styles.tr}>
              <td className={styles.td}>{item.sleepId}</td>
              <td className={styles.td}>{item.sleepTime}</td>
              <td className={styles.td}>{item.wakeUpTime}</td>
              <td className={styles.td}>{item.date}</td>
              <td className={styles.td}>{totalHours} hours</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

SleepDataTable.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SleepDataTable;
