import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import influencerRoutes from './routes/influencerRoutes.js';
import sleepTrackingRoutes from './routes/sleepTrackingRoutes.js';
import homeRoutes from './routes/homeRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images'))); // Serve static images

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

app.use('/affirmation', homeRoutes);
app.use('/inspiration-boards', influencerRoutes);
app.use('/sleep-tracking', sleepTrackingRoutes);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
