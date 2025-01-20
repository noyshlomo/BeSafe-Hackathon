import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import styles from './SleepTips.module.css';

const SleepTip = ({ userId }) => {
    const [quickTip, setQuickTip] = useState("");
    const [detailedAnalysis, setDetailedAnalysis] = useState("");
    const [loading, setLoading] = useState(true);
    const [analysisLoading, setAnalysisLoading] = useState(false);
    const [lastUpdateDate, setLastUpdateDate] = useState("");

    const shouldUpdateTip = () => {
        const today = new Date().toLocaleDateString();
        return lastUpdateDate !== today;
    };

    const fetchTip = async (isDetailed = false) => {
        try {
            // If it's not a detailed analysis and we already have today's tip, don't fetch
            if (!isDetailed && !shouldUpdateTip() && quickTip) {
                setLoading(false);
                return;
            }

            const endpoint = `http://localhost:5000/sleep-tracking/sleep-tip/${userId}`;

            if (isDetailed) setAnalysisLoading(true);
            
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    userId,
                    isDetailedAnalysis: isDetailed 
                })
            });
            
            const data = await response.json();
            
            if (isDetailed) {
                setDetailedAnalysis(data.content);
                setAnalysisLoading(false);
            } else {
                setQuickTip(data.content);
                setLastUpdateDate(new Date().toLocaleDateString());
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching sleep advice:', error);
            if (isDetailed) {
                setDetailedAnalysis('Unable to fetch detailed analysis at the moment.');
                setAnalysisLoading(false);
            } else {
                setQuickTip('Unable to fetch sleep tip at the moment.');
                setLoading(false);
            }
        }
    };
    
    useEffect(() => {
        // Load saved tip and date from localStorage when component mounts
        const savedTip = localStorage.getItem('dailySleepTip');
        const savedDate = localStorage.getItem('sleepTipDate');
        
        if (savedTip && savedDate === new Date().toLocaleDateString()) {
            setQuickTip(savedTip);
            setLastUpdateDate(savedDate);
            setLoading(false);
        } else {
            fetchTip(false);
        }
    }, [userId, fetchTip]);

    // Save tip to localStorage whenever it updates
    useEffect(() => {
        if (quickTip && lastUpdateDate) {
            localStorage.setItem('dailySleepTip', quickTip);
            localStorage.setItem('sleepTipDate', lastUpdateDate);
        }
    }, [quickTip, lastUpdateDate]);

    const handleDetailedAnalysis = () => {
        fetchTip(true);
    };

    return (
        <div className={styles.sleepTipContainer}>
            <div className={styles.tipCard}>
                <h2>Daily Sleep Tip</h2>
                <div className={styles.tipContent}>
                    {loading ? (
                        <p className={styles.loadingText}>Loading your sleep tip...</p>
                    ) : (
                        <>
                            <p className={styles.tipText}>{quickTip}</p>
                            <p className={styles.tipDate}>Updated: {lastUpdateDate}</p>
                        </>
                    )}
                </div>
            </div>

            <div className={styles.analysisSection}>
                <button 
                    onClick={handleDetailedAnalysis}
                    disabled={analysisLoading}
                    className={styles.analysisButton}
                >
                    {analysisLoading ? "Generating Analysis..." : "Get Detailed Sleep Analysis"}
                </button>

                {detailedAnalysis && (
                    <div className={styles.tipCard}>
                        <h2>Detailed Sleep Analysis</h2>
                        <div className={styles.tipContent}>
                            <div className={styles.analysisText}>
                                {detailedAnalysis}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

SleepTip.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default SleepTip;
