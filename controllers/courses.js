const { body,validationResult} = require('express-validator');
const Course = require('../models/courses');
const asyncWrapper = require('../middlewares/asyncWrapper');
const HttpMessage = require('../utils/HttpmessageTxt');
const appError = require('../utils/appError');

const getCourses = asyncWrapper(async (req,res)=>{
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page-1)*limit;
    const courses=await Course.find({},{'__v':false}).limit(limit).skip(skip);
    res.json({status:HttpMessage.SUCCESS,data:{courses}});
});

const getCourse =asyncWrapper(async (req,res,next)=>{
    const id = req.params.courseId;
    const course = await Course.findById(id);
    res.status(200).json({status:HttpMessage.SUCCESS,data:{course}});
});


const createCourse =asyncWrapper(async (req,res,next)=>{
    const err=validationResult(req);
    if(!err.isEmpty()){
        const statusCode = 400;
        const message = err.array();
        const statusText = HttpMessage.FAIL;
        const error = appError.create(message,statusCode,statusText);
        return next(error);
    }
    const course = new Course({...req.body});
    await course.save();
    res.status(201).json({status:HttpMessage.SUCCESS,data:{course}});
});


const deleteCourse = asyncWrapper(async (req,res,next)=>{
    const id = req.params.courseId;
    await Course.findByIdAndDelete(id);
    res.status(200).json({
        ststus:HttpMessage.SUCCESS,
        data:null
    });
});

const updateCourse = asyncWrapper(async (req,res,next)=>{
    const id = req.params.courseId;
    const course = await Course.findByIdAndUpdate(id,{$set:{...req.body}});
    res.status(201).json({status:HttpMessage.SUCCESS,data:{course}});
});

module.exports={
    getCourses,
    getCourse,
    deleteCourse,
    updateCourse,
    createCourse
};


