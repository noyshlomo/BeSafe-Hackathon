import { useState } from "react";
import PropTypes from 'prop-types';
import styles from  './sleepTrackingForm.module.css';

const SleepTrackingForm = ({ userId }) => {
  const [sleepTime, setSleepTime] = useState("");
  const [wakeUpTime, setWakeUpTime] = useState("");
  const [success, setSuccess] = useState("");
  const [exist, setExist] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
        userId: userId,
        sleepTime: sleepTime,
        wakeUpTime: wakeUpTime,
        date: today,
      };

    const response = await fetch('http://localhost:5000/sleep-tracking/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
    if (!response.ok) {
        setExist('There is an error, try again later.');
    }
    else{
        setSuccess('sleep time saved successfully');
    }
    setSleepTime("");
    setWakeUpTime("");
  };

  return (
    <div>
    <form className={styles['sleep-tracking-form']} onSubmit={handleSubmit}>
      <div className={styles['sleep-tracking-form-group']}>
        <label htmlFor="sleepTime">Sleep Time:</label>
        <input
          type="time"
          id="sleepTime"
          value={sleepTime}
          onChange={(e) => {
            setSleepTime(e.target.value)
            setExist("");
            setSuccess("");
          }}
          required
        />
      </div>

      <div className={styles['sleep-tracking-form-group']}>
        <label htmlFor="wakeUpTime">Wake Up Time:</label>
        <input
          type="time"
          id="wakeUpTime"
          value={wakeUpTime}
          onChange={(e) => {
            setWakeUpTime(e.target.value)
            setExist("");
            setSuccess("");
          }}
          required
        />
      </div>

      <button className={styles['sleep-tracking-form-submit']} type="submit">
        Send
      </button>
    </form>
    {success && <p className={styles.successMessage}>{success}</p>}
    {exist && <p className={styles.existMessage}>{exist}</p>}
    </div>
  );
};

SleepTrackingForm.propTypes = {
    userId: PropTypes.number.isRequired, // Assuming userId is a number
  };

export default SleepTrackingForm;

