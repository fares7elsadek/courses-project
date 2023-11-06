const HttpMessage = require('../utils/HttpmessageTxt');
const appError = require('../utils/appError');
module.exports = (asyncFunc)=>{
    return (req,res,next)=>{
        asyncFunc(req,res,next).catch((err)=>{
            const message = err.message;
            const statusCode = 500;
            const statusText= HttpMessage.FAIL;
            const error = appError.create(message,statusCode,statusText);
            next(error);
        });
    }
}