import Otp from '../models/Otp.js';
import GenerateOtp from '../utils/GenerateOtp.js';
import sendEmail from '../utils/SendEmail.js';


export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const emailLower = email.toLowerCase();


        if (!emailLower) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const otp = GenerateOtp();

        await Otp.deleteMany({ email: emailLower });

        const newOtp = new Otp({ email: emailLower, otp });
        await newOtp.save();

        await sendEmail({
            to: emailLower,
            subject: "Your OTP Code",
            message: `<p>Your OTP is: <strong>${otp}</strong></p>`
        });

        return res.status(200).json({
            success: true,
            message: "Otp sent successfully!"
        });

    } catch (error) {
        console.error('Error sending OTP:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const emailLower = email.toLowerCase();

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            });
        }

        const existingOTP = await Otp.findOne({ email:emailLower, otp});

        if (!existingOTP) {
            return res.status(400).json({ error: "Invalid OTP" });
        }

        existingOTP.verified = true;
        await existingOTP.save();


        return res.status(200).json({
            success: true,
            message: 'OTP verification successful'
        });

    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
};
