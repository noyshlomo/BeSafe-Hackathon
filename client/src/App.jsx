import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';

//import projectLogo from './assets/project-logo.png'
import hamburger from './assets/Hamburger.png';
import InfluencerPage from './pages/InfluencerPage/InfluencerPage';
import SleepTrackingPage from './pages/SleepTrackingPage/SleepTrackingPage';
import SleepAnalytics from './pages/SleepAnalytics/SleepAnalytics';
import InspirationDashboard from './pages/InspirationDashboard/InspirationDashboardPage';
import TopicScreen from './pages/TopicScreen/TopicScreen';
import AddRecommendation from './pages/AddRecommendation/AddRecommendation';
import SleepTipsPage from './pages/SleepTipsPage/SleepTipsPage';


function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <img src={hamburger} alt="hamburger" className={styles.hamburger} />
          <nav className={styles.appNav}>
            <Link to="/" className={styles.appLink}>
              Home
            </Link>
            {!isHomePage && (
            <button className={styles.goBackButton} onClick={() => window.history.back()}>
              Go Back
            </button>
            )}
          </nav>
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/inspiration-boards/:category/:id"
              element={<InfluencerPage />}
            ></Route>
            <Route
              path="/sleep-tracking/:id"
              element={<SleepTrackingPage />}
            ></Route>
            <Route
              path="/sleep-tips/:id"
              element={<SleepTipsPage />}
            ></Route>
            <Route
              path="/inspiration-boards"
              element={<InspirationDashboard />}
            ></Route>
            <Route
              path="/inspiration-boards/:category"
              element={<TopicScreen />} 
            ></Route>
            <Route path="/sleep-analytics/:id" element={<SleepAnalytics />} />
            <Route path="/add-recommendation" element={<AddRecommendation />} />
          </Routes>
        </main>
      </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
