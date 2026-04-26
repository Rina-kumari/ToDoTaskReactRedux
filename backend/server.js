import dotenv from 'dotenv';
dotenv.config({ quiet: true });

import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import taskRoute from './routes/taskRoute.js';


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app =express();
const PORT = process.env.PORT || 5000

/*app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET","POST","DELETE","PUT"],
    allowedHeaders: ["Content-Type","Authorization","Cache-Control"],
     credentials: true,
}));*/

app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigin = process.env.CLIENT_URL;
        if (!origin || origin === allowedOrigin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/task",taskRoute);



app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


