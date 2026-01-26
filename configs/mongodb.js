const mongoose = require('mongoose');

const ConnectDB = () => {
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected to MongoDB...");
    }).catch((err)=>{
        console.log("Error Connecting to MongoDB.");
    });
}


module.exports = ConnectDB;