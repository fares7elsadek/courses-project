const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/usersRoles');

const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        validator:[validator.isEmail,'not valid email']
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:[userRoles.ADMIN,userRoles.USER],
        default:userRoles.USER
    },
    avatar:{
        type:String,
        default:"profile.jpg"
    }
});

module.exports = mongoose.model('User',UserSchema);