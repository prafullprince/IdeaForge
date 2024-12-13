import { configDotenv } from "dotenv";
import twilio from "twilio"
import nodemailer from "nodemailer";
// import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";
configDotenv();


export const sendOtpSms = async (otp:string,phoneNumber:string) => {
    try {
        // twilio client initialization
        const twilioClient = twilio(
            process.env.TWILIO_ACCOUNT_SID!,
            process.env.TWILIO_AUTH_TOKEN!
        );
        // send message
        const message = await twilioClient.messages.create({
            body:`Your otp for verification is ${otp}.It will expire in 4 minutes.Do not share with anyone.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phoneNumber
        })
    } catch (error) {
        console.log(error);
    }
}

export const sendEmail = async (email:string,title:string,body:string):Promise<void>=>{
    try {
        // make transporter
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        // now send mail
        const info = await transporter.sendMail({
            from:`From IdeaForge`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        });
        
        // return info;
    } catch (error) {
        console.log(error);
    }
}
