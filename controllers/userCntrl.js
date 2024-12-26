
const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

exports.registerUser=async (req,res,next) => {
    const{name,email,password}=req.body
    
     let avatar;
     if(req.file){
        avatar = `${process.env.BACEND_URL}/upload/user/${req.file.originalname}`
     }
    const user = await User.create({
        name,
        email,
        password, 
        avatar
    })

    const token = user.getJwtToken(); 

    const options={
        expires: new Date(Date.now()+process.env.COOKIE_EXPIRES_TIMES * 24 * 60 * 60 * 100),
        httpOnly:true,
    }
    res.status(200)
    .cookie('token', token, options)
    .json({ 
        success:true,
        user,
        token
    })
}

exports.userLogin=async(req,res,next)=>{
const {email,password}=req.body

if(!email || !password){
   return res.status(400).json({
        success:false,
        message:"email not found"
    })
}

const user =await User.findOne({email}).select('+password')
if(!user){
    return res.status(401).json({
        success:false,
        message:'User invalid'
    })
  }
  
  if(!await bcrypt.compare(password,user.password)){
     res.status(401).json({
        success:false,
        message:'User invalid'  
    })
  }

  const token = user.getJwtToken(); 

  res.status(200).json({ 
    success:true,
    user,
    token
})
}

exports.updateUser=async (req,res,next) => {
    const newData={
        name:req.body.name,
        email:req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id,newData,{ 
        new:true,
        runValidators:true, 
    })

    res.status(200).json({
        success:true,
        user
    })
}

exports.deleteUser=async (req,res,next) => {
    const user = await User.findByIdAndDelete(req.params.id)

    if(!user){
       return res.status(400).json({
            success:false,
            message:"user not found"
        })
    }

    res.status(200).json({
        sucess:true,
        message:'user deleted'
    })
    
}

exports.getUser=async (req,res,next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success:true,
        user
    })
}

exports.getAllUser=async (req,res,next) => {
    const users = await User.find()
    res.status(200).json({
        success:true,
        users
    })
}

exports.getAdmUser=async (req,res,next) => {
    const user = await User.findById(req.params.id)
    if(!user){
        res.status(400).json({
            success:false,
            message:'user not found'
        })
    }
    res.status(200).json({
        success:true,
        user
    })
}

exports.updateAdmUser=async (req,res,next) => {
    const newData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    const user = await User.findByIdAndUpdate(req.user.id,newData,{
        new:true,
        runValidators:true,
    })

    res.status(200).json({
        success:true,
        user
    })
}

exports.logoutUser=async (req,res,next) => {
    res.cookie('token',null),{
        expires: new Date(Date.now()),
        httpOnly:true
    }
    res.status(200).json({
        success:true,
        message:'successfully logout'
    })
    
}


exports.forgotPassword=async (req,res,next) => {
    const{email} =req.body
    if(!email){
        res.status(400).json({
            success:false,
            message:"email not found"
        })
    }

    const user = await User.findOne({email})
    if(!user){
        res.status(400).json({
            success:false,
            message:"user not found"
        })
    }

    const token = user.getJwtToken()
    user.save({validateBeforeSave:false})

    const transport = nodemailer.createTransport({
         
        service:"gmail",
        secure:true,
        auth:{
            user:process.env.MY_GMAIL,
            pass:process.env.MY_PASSWORD,
        },
    })

    const receiver ={
        from:  `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to:email,
        subject:"Password reset Request",
        text:`click on thi link generate your new password ${process.env.CLINET_URL}/rest-password ${token}`,

    }
    await transport.sendMail(receiver)
    res.status(201).json({
        success:true,
        message:`mail send ${user.email}`
    })
}


exports.resetPassword=async (req,res,next) => {
    
    const{token} = req.params;
    const{password} = req.body;

    if(!password){
        res.status(400).json({
            success:false,
            message:"pls provide password"
        })
    }

    const decode = jwt.verify(token,process.env.JWT_SECRET)

    const user = await User.findOne({_id:decode.id})
    
    const salt = await bcrypt.genSalt()
    const newHashPassword = await bcrypt.hash(password,salt)
     await User.findOneAndUpdate(
        {_id:decode.id},
    { password:newHashPassword }
    )
    
     
    

    res.status(200).json({
        success:true,
        user
    })
}
