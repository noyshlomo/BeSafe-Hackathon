import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SleepDataTable.module.css';
import Pagination from '../Pagination/Pagination';

const SleepDataTable = ({ id }) => {
  const [sleepData, setSleepData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  useEffect(() => {
    const fetchSleepData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/sleep-tracking/${id}`); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSleepData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
  
    fetchSleepData();
  }, [id]); // Ensuring re-fetch when `id` changes

  // Delete function
  const handleDelete = async (sleepId) => {
    try {
      const response = await fetch(`http://localhost:5000/sleep-tracking/${id}/${sleepId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete entry with ID: ${sleepId}`);
      }

      // Remove the deleted item from the state without reloading
      setSleepData(sleepData.filter((item) => item.sleepId !== sleepId));
      console.log(`Deleted sleep entry with ID: ${sleepId}`);
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const calculateTotalHours = (sleepTime, wakeUpTime) => {
    const [sleepHour, sleepMinute] = sleepTime.split(':').map(Number);
    const [wakeHour, wakeMinute] = wakeUpTime.split(':').map(Number);
    const sleepDate = new Date(2025, 0, 9, sleepHour, sleepMinute);
    const wakeDate = new Date(2025, 0, 9, wakeHour, wakeMinute);
    if (wakeDate < sleepDate) {
      wakeDate.setDate(wakeDate.getDate() + 1);
    }
    return ((wakeDate - sleepDate) / (1000 * 60 * 60)).toFixed(2);
  };

  const calculateAverageSleepTime = () => {
    if (sleepData.length === 0) return "No Sleep History";

    const totalSleepHours = sleepData.reduce((total, item) => {
      const totalHours = calculateTotalHours(item.sleepTime, item.wakeUpTime);
      return total + parseFloat(totalHours);
    }, 0);
  
    const averageSleepTime = totalSleepHours / sleepData.length;
    return averageSleepTime.toFixed(2);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentSleepData = sleepData.slice(indexOfFirstPost, indexOfLastPost);
  const AverageSleepTime = calculateAverageSleepTime();

  return (
    <div>
     <h4>Avg Sleep Time:   <div className={styles.avg}>{AverageSleepTime}</div></h4>
   
    <table className={styles.table}>
      <thead>
        <tr className={styles.tr}>
          <th className={styles.th}>Date</th>
          <th className={styles.th}>Sleep Time</th>
          <th className={styles.th}>Wake Up Time</th>
          <th className={styles.th}>Total Hours</th>
          <th className={styles.th}>Delete</th> 
        </tr>
      </thead>
      <tbody>
        {currentSleepData.map((item) => {
          const totalHours = calculateTotalHours(item.sleepTime, item.wakeUpTime);
          return (
            <tr key={item.sleepId} className={styles.tr}>
              <td className={styles.td}>{item.date}</td>
              <td className={styles.td}>{item.sleepTime}</td>
              <td className={styles.td}>{item.wakeUpTime}</td>
              <td className={styles.td}>{totalHours} hours</td>
              <td className={styles.td}>
              <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(item.sleepId)}
                >
                 🗑️
                </button>  </td>
            </tr>
          );
        })}
      </tbody>
    </table>

    <Pagination
    itemsPerPage={5}
    length={sleepData.length}
    onPageChange={setCurrentPage}
    currentPage={currentPage}
    />

    </div>
  );
};

SleepDataTable.propTypes = {
  id: PropTypes.string.isRequired,
};

export default SleepDataTable;
