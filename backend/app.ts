import './config/env';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import database from './config/db';
import authRoutes from './routes/authRoutes';
import helmet from 'helmet';
import path from 'path';

console.log('Server initializing...');


database();

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Frontend URL
    credentials: true,
}));
app.use(helmet({
    crossOriginOpenerPolicy: { policy: "unsafe-none" }, // Allow popups
    crossOriginEmbedderPolicy: false // Allow resources from other origins (like Google images)
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use(express.static(path.join(__dirname, "../public")));

// Protected Route Example
import { protect } from './middlewares/authMiddleware';
app.get('/api/protected', protect, (req, res) => {
    res.json({ message: 'This is a protected route', user: (req as any).user });
});

export default app;
