import express from 'express';
import cors from "cors";
import dotenv from "dotenv";

import ConnectDB from "./configs/mongodb.js";

import UserRoutes from "./routes/auth.routes.js";
import JobRoutes from "./routes/job.routes.js";
import ApplicationRoutes from "./routes/application.routes.js";
import jobExpiryCron from "./cron/JobExpiry.js";
dotenv.config();

ConnectDB();

const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
    cors({
        origin: "*"
}))



app.get('/',async(req,res)=>{
    res.status(200).json({
        message: "Welcome to Job Portal API",
        sucess: true
    });
});

app.use('/api/user',UserRoutes);
app.use('/api/job',JobRoutes);
app.use('/api/application',ApplicationRoutes);

jobExpiryCron();

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
});