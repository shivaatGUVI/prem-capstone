const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')


const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,'Enter a name']
    }, 
    email:{
        type:String,
        required:[true,'Enter a Email'],
        unique:true,
        validate:[validator.isEmail,'Enter valid email']
    },
    password:{
        type:String,
        required:[true,'Enter a password'],
        maxlength:[6,'must be 6 character ']
    },
    avatar:{
                type:String,
                

            
    },
    role:{
        type:String, 
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
userSchema.pre('save',async function(next){
    this.password =await bcrypt.hash(this.password, 10)
})

userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRES_TIME
    })
}

userSchema.methods.isValidPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}

let userModel = mongoose.model('users',userSchema);

module.exports = userModel;