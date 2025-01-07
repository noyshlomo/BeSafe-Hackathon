import { BrowserRouter, Routes, Route, Link } from 'react-router';
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';

//import projectLogo from './assets/project-logo.png'
import hamburger from './assets/Hamburger.png';
import InfluencerPage from './components/InfluencerPage/InfluencerPage';

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
