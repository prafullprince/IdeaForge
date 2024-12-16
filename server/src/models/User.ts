import mongoose, { Document, Schema } from "mongoose";

// userSchema types
export interface IUser extends Document {
    name:string,
    email:string,
    password:string,
    token:string,
    image:string,
    resetPasswordToken:string,
    resetPasswordExpiry:Date,
    accountType:string,
    additionalDetails: mongoose.Types.ObjectId,
    courses: mongoose.Types.ObjectId[]
}

// userSchema
const userSchema:Schema = new Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    token:String,
    image:String,
    resetPasswordToken:String,
    resetPasswordExpiry:Date,
    accountType:{
        type:String,
        required:true,
        enum:["Admin","Instructor","Student"],
        trim:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
},{timestamps:true});

// registering userSchema
const User = mongoose.model<IUser>("User",userSchema);
export default User;
