const express = require('express');
const validation = require('../middlewares/validationShema');
const controlers = require('../controllers/courses');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');
const userRoles = require('../utils/usersRoles');
const route = express.Router();



//get all courses
route.get('/',verifyToken,controlers.getCourses);

//get single course
route.get('/:courseId',verifyToken,controlers.getCourse);

//delete course
route.delete('/:courseId',verifyToken,allowedTo(userRoles.ADMIN),controlers.deleteCourse);

//update course
route.patch('/:courseId',verifyToken,allowedTo(userRoles.ADMIN),controlers.updateCourse);

//create
route.post('/',validation.corsesValidation(),verifyToken,controlers.createCourse);


module.exports = route;

