const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["student","recruiter"],
        required: true
    }
},{timestamps:true});

const User = mongoose.model("User",UserSchema);
module.exports = User;