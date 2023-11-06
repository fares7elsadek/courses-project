const asyncWrapper = require('../middlewares/asyncWrapper');
const { body,validationResult} = require('express-validator');
const appError = require('../utils/appError');
const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const HttpMessage = require('../utils/HttpmessageTxt');
const userRoles = require('../utils/usersRoles');


//register
const register = asyncWrapper(async (req,res,next)=>{
    const {firstname,lastname,email,password} = req.body;
    const err=validationResult(req);
    if(!err.isEmpty()){
        const statusCode = 400;
        const message = err.array();
        const statusText = HttpMessage.FAIL;
        const error = appError.create(message,statusCode,statusText);
        return next(error);
    }
    const user = await User.findOne({email:email});
    if(user){
        const error = appError.create("the user is allready exist",400,HttpMessage.FAIL);
        return next(error);
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({
        firstname,
        lastname,
        email,
        password:hashedPassword
    });
    await newUser.save();
    const token = jwt.sign({email,id:newUser._id,role:userRoles.USER},process.env.JWT_SECRET_KEY,{expiresIn:'1m'});
    newUser.token=token;
    const userData = {
        firstname,
        lastname,
        email,
        token:newUser.token
    };
    res.status(201).json({status:HttpMessage.SUCCESS,data:{userData}});
});


//login
const login = asyncWrapper(async (req,res,next)=>{
     const {email,password} = req.body;
     const err=validationResult(req);
    if(!err.isEmpty()){
        const statusCode = 400;
        const message = err.array();
        const statusText = HttpMessage.FAIL;
        const error = appError.create(message,statusCode,statusText);
        return next(error);
    }
    const user = await User.findOne({email:email});
    if(!user){
        const error = appError.create("invalid email or password",403,HttpMessage.FAIL);
        return next(error);
    }
    const result = await bcrypt.compare(String(password),user.password);
    if(!result){
        const error = appError.create("invalid email or password",403,HttpMessage.FAIL);
        return next(error);
    }
    const firstname =  user.firstname;
    const lastname = user.lastname;
    const token = jwt.sign({email,id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:'1m'});
    user.token=token;
    const userData = {
        firstname,
        lastname,
        email,
        token:user.token
    };
    res.status(200).json({status:HttpMessage.SUCCESS,data:{userData}});

});


module.exports={
    register,
    login
};


