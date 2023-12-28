import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import dotenv from 'dotenv'

import appRouter from './routes/index.js';

dotenv.config();

const app = express();

app.use(express.json())
app.use(morgan("dev"))
app.use(cors({origin:"http://localhost:5173",credentials:true})) //
app.use(cookieParser(process.env.COOKIES_SECRET))  

app.use("/api/v1",appRouter)

export default app;