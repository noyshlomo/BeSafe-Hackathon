// import sleepHoursData from '../data/sleepHoursData.js';

// export const getSleepTip = (req, res) => {
//     const { userId } = req.body;

//     if (!userId) {
//         return res.status(400).json({ error: 'User ID is required' });
//     }

//     // Filter sleep data for the specific user
//     const userData = sleepHoursData.filter(data => data.userId === userId);

//     if (!userData.length) {
//         return res.status(404).json({ error: 'No sleep data found for the user' });
//     }

//     // Analyze sleep data (example: calculate average sleep hours)
//     const averageSleepHours = userData.reduce((sum, entry) => {
//         const sleepTime = new Date(`1970-01-01T${entry.sleepTime}:00Z`);
//         const wakeUpTime = new Date(`1970-01-01T${entry.wakeUpTime}:00Z`);
//         const sleepDuration = (wakeUpTime - sleepTime) / (1000 * 60 * 60); // in hours
//         return sum + sleepDuration;
//     }, 0) / userData.length;

//     // Generate a sleep tip based on the analysis
//     let tip;
//     if (averageSleepHours < 6) {
//         tip = 'Try to get at least 7-8 hours of sleep for better health.';
//     } else if (averageSleepHours > 9) {
//         tip = 'Consider balancing your sleep schedule for optimal productivity.';
//     } else {
//         tip = 'Great job! Your sleep hours are within a healthy range.';
//     }

//     res.json({ tip });
// };
import { GoogleGenerativeAI } from '@google/generative-ai';
import sleepHoursData from '../data/sleepHoursData.js';
import dotenv from 'dotenv';
dotenv.config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getSleepTip = async (req, res) => {
    const { userId, isDetailedAnalysis } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const userData = sleepHoursData.filter(data => data.userId === userId);

    if (!userData.length) {
        return res.status(404).json({ error: 'No sleep data found for the user' });
    }

    const averageSleepHours = userData.reduce((sum, entry) => {
        const sleepTime = new Date(`1970-01-01T${entry.sleepTime}:00Z`);
        const wakeUpTime = new Date(`1970-01-01T${entry.wakeUpTime}:00Z`);
        const sleepDuration = (wakeUpTime - sleepTime) / (1000 * 60 * 60); // in hours
        return sum + sleepDuration;
    }, 0) / userData.length;

    let sleepDataSummary = `The user has an average of ${averageSleepHours.toFixed(2)} hours of sleep per night.`;
    
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const currentDate = new Date().toLocaleDateString(); // Get current date for daily variation

        let prompt;
        if (isDetailedAnalysis) {
            prompt = `Based on this sleep data: ${sleepDataSummary} 
            Please provide a comprehensive sleep analysis including:
            1. Current sleep pattern evaluation
            2. Potential areas for improvement
            3. Specific recommendations for better sleep quality
            4. Long-term health implications
            5. Lifestyle factors to consider
            make it up to 3 sentences for each factor`;
        } else {
            prompt = `Using this sleep data: ${sleepDataSummary}
            Create a single, concise sleep improvement tip (max 2 senteces).
            Make it practical and immediately actionable. based on latest data user have. max 2 senteces`;
        }

        // prompt = `Based on this sleep data: ${sleepDataSummary} 
        //     Please provide a comprehensive sleep analysis including:
        //     1. Current sleep pattern evaluation
        //     2. Potential areas for improvement
        //     3. Specific recommendations for better sleep quality
        //     4. Long-term health implications
        //     5. Lifestyle factors to consider`;
        // } else {
        //     prompt = `Using this sleep data: ${sleepDataSummary}
        //     Create a single, concise sleep improvement tip (max 2 senteces).
        //     Make it practical and immediately actionable. based on latest data user have. max 2 senteces`;
        // }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const content = response.text();

        res.json({ 
            content,
            type: isDetailedAnalysis ? 'detailed' : 'quick-tip',
            date: currentDate
        });
    } catch (error) {
        console.error('Error fetching AI-generated tip:', error);
        res.status(500).json({ error: 'Error generating sleep advice' });
    }
};
// import OpenAI from 'openai';
// import sleepHoursData from '../data/sleepHoursData.js';
// import dotenv from 'dotenv';
// dotenv.config();
// // console.log(process.env.TEST_VAR);
// // console.log(process.env.OPENAI_API_KEY)
// //console.log('OPENAI_API_KEY in server:', process.env.OPENAI_API_KEY);

// // Set up OpenAI
// // const openai = new OpenAI({
// //     apiKey: process.env.OPENAI_API_KEY, 
// //     // Make sure to add your OpenAI API key in .env
// // });

// export const getSleepTip = async (req, res) => {
//     const { userId } = req.body;

//     if (!userId) {
//         return res.status(400).json({ error: 'User ID is required' });
//     }

//     const userData = sleepHoursData.filter(data => data.userId === userId);

//     if (!userData.length) {
//         return res.status(404).json({ error: 'No sleep data found for the user' });
//     }

//     const averageSleepHours = userData.reduce((sum, entry) => {
//         const sleepTime = new Date(`1970-01-01T${entry.sleepTime}:00Z`);
//         const wakeUpTime = new Date(`1970-01-01T${entry.wakeUpTime}:00Z`);
//         const sleepDuration = (wakeUpTime - sleepTime) / (1000 * 60 * 60); // in hours
//         return sum + sleepDuration;
//     }, 0) / userData.length;

//     let sleepDataSummary = `The user has an average of ${averageSleepHours.toFixed(2)} hours of sleep per night.`;

//     try {
//         const response = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo", // Or use another model if needed
//             messages: [
//                 { role: "system", content: "You are a helpful assistant." },
//                 { role: "user", content: `Based on the following sleep data: ${sleepDataSummary}. Provide a personalized sleep tip for the user.` }
//             ]
//         });

//         const tip = response.choices[0].message.content.trim();

//         res.json({ tip });
//     } catch (error) {
//         console.error('Error fetching AI-generated tip:', error);
//         res.status(500).json({ error: 'Error generating sleep tip' });
//     }
// };
