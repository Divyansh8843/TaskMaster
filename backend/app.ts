import './config/env';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import database from './config/db';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';

import helmet from 'helmet';
import path from 'path';

console.log('Server initializing... (restart)');


database();

const app = express();


app.set('trust proxy', 1);

app.use(cors({
    origin: [process.env.CLIENT_URL || 'http://localhost:5173', 'http://localhost:5174'],
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
app.use('/api/tasks', taskRoutes);





export default app;
