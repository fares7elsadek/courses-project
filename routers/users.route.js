const express = require('express');
const controler = require('../controllers/users');
const validation =require('../middlewares/validationShema');
const verifyToken = require('../middlewares/verifyToken');
const allowedTo = require('../middlewares/allowedTo');
const userRoles = require('../utils/usersRoles');
const multer  = require('multer');
const appError = require('../utils/appError');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = file.originalname.split('.')[1];
      const filename = `user-${uniqueSuffix}.${ext}`;
      cb(null, filename);
    }
});
function fileFilter(req,file,cb){
    if(file.mimetype.split('/')[0]==='image')
        cb(null,true);
    else
        cb(appError.create('this file type is not supported'),false);
}
const upload = multer({ 
    storage: storage,
    fileFilter:fileFilter
 });
const router = express.Router();




//get all users
router.get('/',verifyToken,controler.getAllusers);


//get single user
router.get('/:userId',verifyToken,controler.getuser);

//update user data
router.post('/:userId',verifyToken,allowedTo(userRoles.ADMIN),controler.updateUser);

//delelte user
router.delete('/:userId',verifyToken,allowedTo(userRoles.ADMIN),controler.deleteUser);


//upload photo
router.post('/upload/:userId',upload.single('avatar'),controler.uploadPhoto);


module.exports=router;


