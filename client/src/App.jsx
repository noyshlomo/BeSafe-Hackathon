import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';

//import projectLogo from './assets/project-logo.png'
import hamburger from './assets/Hamburger.png';
import InfluencerPage from './components/InfluencerPage/InfluencerPage';
import SleepTrackingPage from './pages/SleepTrackingPage/SleepTrackingPage';
import SleepAnalytics from './pages/SleepAnalytics/SleepAnalytics';
import InspirationDashboard from './pages/InspirationDashboard/InspirationDashboardPage';

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <img src={hamburger} alt="hamburger" className={styles.hamburger} />
          <nav className={styles.appNav}>
            <Link to="/" className={styles.appLink}>
              Home
            </Link>
          </nav>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/influencer/:id" element={<InfluencerPage />}></Route>
            <Route path="/sleep-tracking/:id" element={<SleepTrackingPage />}></Route>
            <Route path="/inspiration-dashboard/:id" element={<InspirationDashboard />}></Route>
            <Route path="/sleep-analytics/:id" element={<SleepAnalytics />} />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <p>&copy; 2025 My App</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
