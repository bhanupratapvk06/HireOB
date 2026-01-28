const { createToken } = require("../middlewares/token");
const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const userRegister = async (req, res) => {
  const { username, email, password, mobile, role } = req.body;

  if (!username || !email || !password || !mobile || !role) {
    return res.status(400).json({
      message: "Please enter all fields"
    });
  }

  try {
    const emailLower = email.toLowerCase();

    const existingUser = await User.findOne({ email: emailLower });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email: emailLower,
      password: hashedPassword,
      mobile,
      role
    });

    const token = createToken({
      id: user._id,
      role: user.role
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter all fields"
    });
  }

  try {
    const emailLower = email.toLowerCase();

    const user = await User.findOne({ email: emailLower }).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const token = createToken({
      id: user._id,
      role: user.role
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required"
      });
    }

    const user = await User.findById(userId).select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({
        message: "Incorrect password"
      });
    }

    await Application.deleteMany({ student: userId });
    await Job.deleteMany({ recruiter: userId });
    await User.deleteOne({ _id: userId });

    return res.status(200).json({
      success: true,
      message: "User account deleted successfully"
    });

  } catch (error) {
    console.log("Delete error:", error);
    return res.status(500).json({
      message: "Internal server error (Delete User)"
    });
  }
};

module.exports = {
  userRegister,
  userLogin,
  deleteUser
};
