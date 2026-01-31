export const checkAuth = (...allowedRoles) => {
    return (req,res,next) => {
        if(!req.user || !allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                message: "You're not allowed to access this route"
            });
        }
        next();
    };
};
