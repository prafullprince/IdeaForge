import { Request, Response } from "express";
import { ErrorResponseHandling } from "../helper/EroorResponse";
import User from "../models/User";
import Notification from "../models/Notification";

// allNotification -> unread
export const allUnreadNotifications = async (req:Request, res:Response): Promise<any> =>{
    try {

        // fetch data
        const userId = req.user?.id;

        // validation
        if(!userId){
            return ErrorResponseHandling(res,400,"Provide userId");
        }

        // find user
        const user = await User.findById(userId);

        // validation
        if(!user){
            return ErrorResponseHandling(res,400,"Provide user");
        }

        // find not in db
        const data = await Notification.find({userId: user._id,isSeen:false});
        
        // return res
        return res.status(200).json({
            success:true,
            message:"Notifications fetched",
            data
        });

    } catch (error) {
        console.log(error);
        return ErrorResponseHandling(res,500,"Internal server error");
    }
}

// allNotifications
export const allNotifications = async (req:Request, res:Response): Promise<any> =>{
    try {

        // fetch data
        const userId = req.user?.id;

        // validation
        if(!userId){
            return ErrorResponseHandling(res,400,"Provide userId");
        }

        // find user
        const user = await User.findById(userId);

        // validation
        if(!user){
            return ErrorResponseHandling(res,400,"Provide user");
        }

        // find not in db
        const data = await Notification.find({userId: user._id}).sort({createdAt: -1});
        
        // return res
        return res.status(200).json({
            success:true,
            message:"Notifications fetched",
            data
        });

    } catch (error) {
        console.log(error);
        return ErrorResponseHandling(res,500,"Internal server error");
    }
}

// notification mark as read
export const markNotificationAsRead = async (req:Request, res:Response): Promise<any> =>{
    try {

        // fetch data
        const userId = req.user?.id;

        // validation
        if(!userId){
            return ErrorResponseHandling(res,400,"Provide userId");
        }

        // find user
        const user = await User.findById(userId);

        // validation
        if(!user){
            return ErrorResponseHandling(res,400,"Provide user");
        }

        // find notification in db and update
        await Notification.updateMany({userId: user._id},{isSeen:true},{new:true});
        
        // return res
        return res.status(200).json({
            success:true,
            message:"Notifications mark as read",
        });

    } catch (error) {
        console.log(error);
        return ErrorResponseHandling(res,500,"Internal server error");
    }
}
