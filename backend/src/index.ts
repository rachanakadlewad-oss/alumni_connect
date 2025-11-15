import express from 'express'
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import cors from "cors";
import { organisationRouter } from './routes/organisationRouter.js';

export const app=express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://alumni-connect-gbrl.onrender.com"
    ],
    credentials: true,
  })
);

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/organisation", organisationRouter)