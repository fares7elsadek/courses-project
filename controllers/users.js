const asyncWrapper = require('../middlewares/asyncWrapper');
const User = require('../models/users');
const HttpMessage = require('../utils/HttpmessageTxt');
const appError= require('../utils/appError');


//get all users
const getAllusers = asyncWrapper(async (req,res,next) =>{
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page-1)*limit;
    const users=await User.find({},{'__v':false,'password':false}).limit(limit).skip(skip);
    res.json({status:HttpMessage.SUCCESS,data:{users}});
});



//get single user
const getuser = asyncWrapper(async (req,res,next) =>{
    const id = req.params.userId;
    const user = await User.findById(id,{'password':false,'__v':false});
    if(!user){
        const error = appError.create("invalid user id",400,HttpMessage.FAIL);
        return next(error);
    }
    res.status(200).json({status:HttpMessage.SUCCESS,data:{user}});
});






//edit user data
const updateUser = asyncWrapper(async (req,res,next) =>{
    const id = req.params.userId;
    const user = await User.findByIdAndUpdate(id,{$set:{...req.body}});
    if(!user){
        const error = appError.create("invalid user id",400,HttpMessage.FAIL);
        return next(error);
    }
    res.status(200).json({status:HttpMessage.SUCCESS});
});


//delete user
const deleteUser = asyncWrapper(async (req,res,next) =>{
    const id = req.params.userId;
    const done = await User.findByIdAndDelete(id);
    if(!done){
        const error = appError.create("invalid user id",400,HttpMessage.FAIL);
        return next(error);
    }
    res.status(200).json({
        ststus:HttpMessage.SUCCESS,
        data:null
    });
});


const uploadPhoto =asyncWrapper(async (req,res,next)=>{
    const id = req.params.userId;
    const user = await User.findByIdAndUpdate(id,{$set:{avatar:req.file.filename}});
    if(!user){
        const error = appError.create("invalid user id",400,HttpMessage.FAIL);
        return next(error);
    }
    res.status(200).json({status:HttpMessage.SUCCESS});
});

module.exports={
    getAllusers,
    getuser,
    updateUser,
    deleteUser,
    uploadPhoto
}




