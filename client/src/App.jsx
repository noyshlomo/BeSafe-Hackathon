import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';

//import projectLogo from './assets/project-logo.png'
import hamburger from './assets/Hamburger.png';
import restAndRise from './assets/rest-and-rise.png'
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
          <Link to="/" className={styles.appLink}>
              <img src={restAndRise} alt="Home" />
            </Link>
          <nav className={styles.appNav}>
            {!isHomePage && (
            <button className={styles.goBackButton} onClick={() => window.history.back()}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="undefined">
              <path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/></svg>
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
