import styles from './Home.module.css';
//import RandomDuck from '../../components/RandomDuck/RandomDuck.jsx';


const Home = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.headline}>Welcome back, Candy</h1>
      <div className={styles.container}>
        <div>Your Goals</div>

        <button type="button" className={styles.myButton}>Sleep Tracking</button>
        <button type="button" className={styles.myButton}>Inspiration Dashboard</button>
      </div>
    </div>
  );
};

export default Home;
