import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import validator from "validator";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Please provide valid email"]
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true
    },
    niches: {
        firstNiche: String,
        secondNiche: String,
        thirdNiche: String,
      },
    password:{
        type:String,
        required:true,
        minLength:[8,'Password must contain atleast 8 characters'],
        maxLength:[32,'Password must contain atleast 32 characters'],
        select:false
    },
    coverLetter:{
        type:String,
    },
    
    creattedAt:{
        type:Date,
        default:Date.now
    },
    resume:{
        public_id:String,
        url:String
    },
    role:{
        type:String,
        required:true,
        enum:["Job seeker","Employer"]
    }
})
userSchema.pre('save',async function (next){
    if(!this.isModified("password")){
    next();
    }
    this.password=await bcrypt.hash(this.password,10);
}
)
userSchema.methods.comparePassword=async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:'7d',
    })
}

export const User=mongoose.model('user',userSchema)