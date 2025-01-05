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
    courses: mongoose.Types.ObjectId[],
    followers: mongoose.Types.ObjectId[],
    following: mongoose.Types.ObjectId[],
    notifications: mongoose.Types.ObjectId[],
    chats: mongoose.Types.ObjectId[]
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
    }],
    followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    following:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    courseProgress:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress"
    }],
    notifications:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notification"
    }],
    chats:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Chat"
    }]
},{timestamps:true});

// registering userSchema
const User = mongoose.model<IUser>("User",userSchema);
export default User;
