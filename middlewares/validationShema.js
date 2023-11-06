const { body,validationResult} = require('express-validator');

const corsesValidation = ()=>{
    return [
        body('name').notEmpty(),
        body('price').notEmpty()
    ];
};

const UsersRigister = ()=>{
    return [
        body('firstname').notEmpty(),
        body('lastname').notEmpty(),
        body('email').notEmpty(),
        body('password').notEmpty()
    ];
};

const UsersLogin = ()=>{
    return [
        body('email').notEmpty(),
        body('password').notEmpty()
    ];
};

module.exports={
    corsesValidation,
    UsersLogin,
    UsersRigister
}