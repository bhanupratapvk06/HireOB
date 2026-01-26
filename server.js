const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const ConnectDB = require('./configs/mongodb.js')

const UserRoutes = require('./routes/auth.routes.js');
const JobRoutes = require('./routes/job.routes.js');
const ApplicationRoutes = require('./routes/application.routes.js');
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
app.use('/api/job',ApplicationRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
});