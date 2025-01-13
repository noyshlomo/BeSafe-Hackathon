// import{ useState, useEffect } from "react";
// import PropTypes from 'prop-types';

// const SleepTip = ({ userId }) => {
//     const [tip, setTip] = useState("");
//     const [loading, setLoading] = useState(true);

//     const fetchTip = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/sleep-tracking/sleep-tip', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ userId }) // Send userId in the request body
//             });
//             const data = await response.json();
//             console.log(data.tip);
//             setTip(data.tip); // Save the tip to state
//             setLoading(false); // Stop loading
//         } catch (error) {
//             console.error('Error fetching sleep tip:', error);
//             setTip('Unable to fetch sleep tip at the moment.');
//             setLoading(false); // Stop loading even on error
//         }
//     };
    
//     useEffect(() => {
//         // Fetch the initial tip
//         fetchTip();

//         // Set up interval for hourly updates (or 1 minute for testing)
//         const interval = setInterval(fetchTip, 60000); // Change to 3600000 (1 hour) for production

//         return () => clearInterval(interval); // Clean up interval on component unmount
//     }, [userId]); // Add userId as a dependency to re-run on change

//     return (
//         <div className="sleep-tip">
//             {loading ? "Loading your sleep tip..." : `Tip of the Hour: ${tip}`}
//         </div>
//     );
// };

// SleepTip.propTypes = {
//     userId: PropTypes.number.isRequired, // Ensure userId is passed as a prop
// };

// export default SleepTip;

import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
//import './SleepTip.css';

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

            const endpoint = 'http://localhost:5000/sleep-tracking/sleep-tip';
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
    }, [userId]);

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
        <div className="sleep-tip-container">
            <div className="tip-card">
                <h2>Daily Sleep Tip</h2>
                <div className="tip-content">
                    {loading ? (
                        <p className="loading-text">Loading your sleep tip...</p>
                    ) : (
                        <>
                            <p className="tip-text">{quickTip}</p>
                            <p className="tip-date">Updated: {lastUpdateDate}</p>
                        </>
                    )}
                </div>
            </div>

            <div className="analysis-section">
                <button 
                    onClick={handleDetailedAnalysis}
                    disabled={analysisLoading}
                    className="analysis-button"
                >
                    {analysisLoading ? "Generating Analysis..." : "Get Detailed Sleep Analysis"}
                </button>

                {detailedAnalysis && (
                    <div className="tip-card">
                        <h2>Detailed Sleep Analysis</h2>
                        <div className="tip-content">
                            <div className="analysis-text">
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
// import { useState, useEffect } from "react";
// import PropTypes from 'prop-types';
// //import './SleepTip.css';  // You'll need to create this CSS file

// const SleepTip = ({ userId }) => {
//     const [quickTip, setQuickTip] = useState("");
//     const [detailedAnalysis, setDetailedAnalysis] = useState("");
//     const [loading, setLoading] = useState(true);
//     const [analysisLoading, setAnalysisLoading] = useState(false);

//     const fetchTip = async (isDetailed = false) => {
//         try {
//             const endpoint = 'http://localhost:5000/sleep-tracking/sleep-tip';
//             setAnalysisLoading(isDetailed);
            
//             const response = await fetch(endpoint, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ 
//                     userId,
//                     isDetailedAnalysis: isDetailed 
//                 })
//             });
            
//             const data = await response.json();
            
//             if (isDetailed) {
//                 setDetailedAnalysis(data.content);
//                 setAnalysisLoading(false);
//             } else {
//                 setQuickTip(data.content);
//                 setLoading(false);
//             }
//         } catch (error) {
//             console.error('Error fetching sleep advice:', error);
//             if (isDetailed) {
//                 setDetailedAnalysis('Unable to fetch detailed analysis at the moment.');
//                 setAnalysisLoading(false);
//             } else {
//                 setQuickTip('Unable to fetch sleep tip at the moment.');
//                 setLoading(false);
//             }
//         }
//     };
    
//     useEffect(() => {
//         // Fetch the initial quick tip
//         fetchTip(false);

//         // Set up interval for daily updates
//         const interval = setInterval(() => fetchTip(false), 86400000); // Change to 86400000 (24 hours) for production
//         return () => clearInterval(interval);
//     }, [userId]);

//     const handleDetailedAnalysis = () => {
//         fetchTip(true);
//     };

//     return (
//         <div className="sleep-tip-container">
//             <div className="tip-card">
//                 <h2>Daily Sleep Tip</h2>
//                 <div className="tip-content">
//                     {loading ? (
//                         <p className="loading-text">Loading your sleep tip...</p>
//                     ) : (
//                         <p className="tip-text">{quickTip}</p>
//                     )}
//                 </div>
//             </div>

//             <div className="analysis-section">
//                 <button 
//                     onClick={handleDetailedAnalysis}
//                     disabled={analysisLoading}
//                     className="analysis-button"
//                 >
//                     {analysisLoading ? "Generating Analysis..." : "Get Detailed Sleep Analysis"}
//                 </button>

//                 {detailedAnalysis && (
//                     <div className="tip-card">
//                         <h2>Detailed Sleep Analysis</h2>
//                         <div className="tip-content">
//                             <div className="analysis-text">
//                                 {detailedAnalysis}
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// SleepTip.propTypes = {
//     userId: PropTypes.number.isRequired,
// };

// export default SleepTip;