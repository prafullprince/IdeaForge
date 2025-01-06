import mongoose, { Document, Schema } from "mongoose";
import { sendEmail } from "../helper/sendSMS";

// otpSchema types
export interface IOtp extends Document {
    email:string,
    otp:string
}

// otpSchema
const otpSchema:Schema = new Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    otp:{
        type:String,
        required:true,
        trim:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now,
        expires: 4*60
    }
},{timestamps:true});

// pre middleware for sending email
otpSchema.pre("save",async function(next){
    await sendEmail(`${this.email}`,"Otp verification from Ideaforge",`Your otp is ${this.otp}.It will expire in 4 minutes`);
    next();
})

// registering otp schema 
const Otp = mongoose.model<IOtp>("Otp",otpSchema);
export default Otp;
