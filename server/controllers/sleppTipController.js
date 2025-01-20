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
