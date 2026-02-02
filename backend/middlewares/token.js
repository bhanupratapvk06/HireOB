import jwt from 'jsonwebtoken';


export const createToken = (user) => {
    const token = jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role
    },
    process.env.JWT_SECRET,
    {expiresIn: "24h"});

    return token;
}

export const verifyToken = (token) => {
    if (!token) {
        throw new Error("Token not provided");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};