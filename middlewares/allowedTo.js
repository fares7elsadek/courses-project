const appError = require('../utils/appError')
module.exports = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.currentUser.role)){
           return next(appError.create('authorized for admin only',401));
        }
        next();
    }

}