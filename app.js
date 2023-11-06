const express = require('express');
const { body,validationResult} = require('express-validator');
const courseRoute = require('./routers/courses.route');
const authRoute = require('./routers/auth.route');
const userRoute = require('./routers/users.route');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const HttpMessage = require('./utils/HttpmessageTxt');
const app = express();


app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use(express.json());


const url=process.env.MONGO_URL;
 mongoose.connect(url).then(res=>{
        console.log("mongo connected");
      }).catch(err => console.log(err));

app.use(cors());



app.use('/api/courses',courseRoute);
app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);


app.all('*',(req,res)=>{
  res.status(400).json({status:HttpMessage.FAIL,message:"NOT FOUND"});
})

app.use((error,req,res,next)=>{
  res.json({status:error.statusText,message:error.message,code:error.statusCode});
});


app.listen(process.env.PORT);


