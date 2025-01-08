import { useParams } from 'react-router';
import SleepTrackingForm from './SleepTrackingForm';
import "./SleepTrackingPage.css";

const SleepTrackingPage = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>sleep tracking</h1>
            <SleepTrackingForm userId={id} />

            <div className="buttons-container">
                <button
                    className="sleep-history-button"
                    aria-label="View Sleep History"
                    onClick={() => console.log('Go to Sleep History')}
                >
                    Sleep History
                </button>
                <button
                    className="set-sleep-goals-button"
                    aria-label="Set Sleep Goals"
                    onClick={() => console.log('Set Sleep Goals')}
                >
                    Set Sleep Goals
                </button>
                <button
                    className="sleep-tips-button"
                    aria-label="View Tips for Sleep Hygiene"
                    onClick={() => console.log('Tips for Sleep Hygiene')}
                >
                    Tips for Sleep Hygiene
                </button>
            </div>

        </div>
    );
};

export default SleepTrackingPage;

