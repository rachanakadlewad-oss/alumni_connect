import express from 'express'
import authRouter from './routes/authRoutes.js';

export const app=express();
app.use(express.json());
app.use("/api/auth", authRouter)