import { verifyToken } from './token.js';

export const authMiddleware = async(req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            message: "Token Not Provided"
        });
    }

    const token = authHeader.split(" ")[1];
    console.log(token);

    try{
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }
    catch(err){

        return res.status(500).json({
            message: "Invalid or Expired Token!"
        });
    }
};
