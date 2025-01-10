import { useState } from "react";
import PropTypes from 'prop-types';
import styles from  './sleepTrackingForm.module.css';

const SleepTrackingForm = ({ userId }) => {
  const [sleepTime, setSleepTime] = useState("");
  const [wakeUpTime, setWakeUpTime] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
        userId: userId,
        sleepTime: sleepTime,
        wakeUpTime: wakeUpTime,
        date: today,
      };

    fetch('http://localhost:5000/sleep-tracking/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
    setSleepTime("");
    setWakeUpTime("");
  };

  return (
    <form className={styles['sleep-tracking-form']} onSubmit={handleSubmit}>
      <div className={styles['sleep-tracking-form-group']}>
        <label htmlFor="sleepTime">Sleep Time:</label>
        <input
          type="time"
          id="sleepTime"
          value={sleepTime}
          onChange={(e) => setSleepTime(e.target.value)}
          required
        />
      </div>

      <div className={styles['sleep-tracking-form-group']}>
        <label htmlFor="wakeUpTime">Wake Up Time:</label>
        <input
          type="time"
          id="wakeUpTime"
          value={wakeUpTime}
          onChange={(e) => setWakeUpTime(e.target.value)}
          required
        />
      </div>

      <button className={styles['sleep-tracking-form-submit']} type="submit">
        Send
      </button>
    </form>
  );
};

SleepTrackingForm.propTypes = {
    userId: PropTypes.number.isRequired, // Assuming userId is a number
  };

export default SleepTrackingForm;

