import fs from 'fs';
import path from 'path';
import Profile from "../models/Profile.js";

export const createProfile = async (req, res) => {
    const {
        bio,
        location,
        website,
        skills,
        experience,
        education,
        companyName,
        companyWebsite,
        companyDescription,
        companyLogo
    } = req.body;

    try {

        const existingProfile = await Profile.findOne({ user: req.user.id });
        if (existingProfile) {
            return res.status(400).json({ message: "profile already Exists!" });
        }

        if (skills && !Array.isArray(skills)) {
            return res.status(400).json({
                message: "skills must be an array"
            });
        }

        if (experience && !Array.isArray(experience)) {
            return res.status(400).json({
                message: "experience must be an array"
            });
        }

        if (education && !Array.isArray(education)) {
            return res.status(400).json({
                message: "education must be an array"
            });
        }

        const profile = await Profile.create({
            user: req.user.id,
            bio,
            location,
            website,
            skills: skills || [],
            experience: experience || [],
            education: education || [],
            companyName,
            companyWebsite,
            companyDescription,
            companyLogo
        });

        res.status(201).json({
            message: "Profile created successfully",
            profile
        });

    } catch (error) {
        console.error("Create Profile Error:", error);

        res.status(500).json({
            message: "Server error while creating profile"
        });
    }
}

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const profile = await Profile.findOne({ user: userId })
            .populate("user", "username email role");

        if (!profile) {
            return res.status(404).json({
                message: "profile not found"
            });
        }

        return res.status(200).json({
            profile
        });

    } catch (error) {
        console.error("Get Profile Error:", error);

        return res.status(500).json({
            message: "Server error while fetching profile"
        });
    }
};

export const editProfile = async (req, res) => {
    const {
        bio,
        location,
        website,
        skills,
        experience,
        education,
        companyName,
        companyWebsite,
        companyDescription,
        companyLogo
    } = req.body;

    try {
        const userId = req.user.id;

        const profile = await Profile.findOne({ user: userId });
        if (!profile) {
            return res.status(404).json({ message: "profile doesn't exist!" });
        }

        if (skills && !Array.isArray(skills)) {
            return res.status(400).json({ message: "skills must be array!" });
        }
        if (education && !Array.isArray(education)) {
            return res.status(400).json({ message: "education must be array!" });
        }
        if (experience && !Array.isArray(experience)) {
            return res.status(400).json({ message: "experience must be array!" });
        }

        if (bio !== undefined) profile.bio = bio;
        if (location !== undefined) profile.location = location;
        if (website !== undefined) profile.website = website;
        if (skills !== undefined) profile.skills = skills;
        if (experience !== undefined) profile.experience = experience;
        if (education !== undefined) profile.education = education;
        if (companyName !== undefined) profile.companyName = companyName;
        if (companyWebsite !== undefined) profile.companyWebsite = companyWebsite;
        if (companyDescription !== undefined) profile.companyDescription = companyDescription;
        if (companyLogo !== undefined) profile.companyLogo = companyLogo;

        await profile.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            profile
        });

    } catch (error) {
        console.error("Edit Profile Error:", error);

        return res.status(500).json({
            message: "Server error while updating profile"
        });
    }
}

export const deleteProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await Profile.findOne({ user: userId });
        if (!profile) {
            return res.status(404).json({ message: "profile doesn't exist!" });
        }

        if (profile.resume) {
            const filePath = path.join(process.cwd(),profile.resume);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        await Profile.findOneAndDelete({ user: userId });

        return res.status(200).json({
            message: "Profile deleted successfully"
        });

    } catch (error) {
        console.error("Delete Profile Error:", error);

        return res.status(500).json({
            message: "Server error while deleting profile"
        });
    }
};

export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "no resume uploaded!" });
        }

        const profile = await Profile.findOne({ user: req.user.id });
        if (!profile) {
            return res.status(404).json({ message: "profile doesn't exist!" });
        }

        if (profile.resume) {
            const filePath = path.resolve(profile.resume);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        profile.resume = `/uploads/resume/${req.file.filename}`;
        await profile.save();

        return res.status(200).json({
            message: "Resume uploaded successfully",
            resume: profile.resume
        });

    } catch (error) {
        console.error("Upload Resume Error:", error);

        return res.status(500).json({
            message: "Server error while uploading resume"
        });
    }
};