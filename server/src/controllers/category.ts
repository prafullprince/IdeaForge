import { Request, Response } from "express";
import { ErrorResponseHandling } from "../helper/EroorResponse";
import Category from "../models/Category";
import client from "../config/redis";


// create category
export const createCategory = async (req:Request, res:Response): Promise<any> =>{
    try {
        // fetch data
        const { categoryName,categoryDesc } = req.body;

        // validation
        if(!categoryName || !categoryDesc){
            return ErrorResponseHandling(res,400,"Fill all fields");
        }

        // check isCategory already registered
        const category = await Category.findOne({categoryName:categoryName});
        if(category){
            return ErrorResponseHandling(res,400,"Category already exist,try other one");
        }

        // save in db
        const data = await Category.create({categoryName,categoryDesc});

        // return res
        return res.status(200).json({
            success:true,
            message:"Category created",
            data
        });

    } catch (error) {
        console.log(error);
        return ErrorResponseHandling(res,500,"Internal server error");
    }
}

// getAllCategory
export const fetchAllCategory = async (req:Request, res:Response): Promise<any> =>{
    try {

        // // fetch data
        // const page = parseInt(req.query.page as string,10) || 1 ;
        // const limit = parseInt(req.query.limit as string,10) || 5;

        // // Validate page and limit
        // if (page < 1 || limit < 1) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Page and limit must be positive integers",
        //     });
        // }

        // // skip
        // const skip:number = (page-1)*limit;
        // const totalCategory:number = await Category.countDocuments();
        // const totalPages:number = Math.ceil(totalCategory/limit);

        // return data if cached
        const cachedValue = await client.get("getCategory");
        if(cachedValue){
            try {
                const data = JSON.parse(cachedValue);
                return res.status(200).json({
                    success:true,
                    message:"Category fetched",
                    data
                })
            } catch (parseError) {
                console.log(parseError);
                await client.del("getCategory");
            }
        }

        // find in db
        const data = await Category.find({});

        // if not cached, cached data
        await client.set("getCategory",JSON.stringify(data));
        await client.expire("getCategory",300);

        // return res
        return res.status(200).json({
            success:true,
            message:"Category fetched",
            data
        });

    } catch (error) {
        console.log(error);
        return ErrorResponseHandling(res,500,"Internal server error");
    }
}

// categoryPageDetails
export const categoryPageDetails = async (req:Request, res:Response): Promise<any> =>{
    try {

        // fetch data
        const { categoryId } = req.body;

        // return data if cached
        const cachedValue = await client.get(`category:${categoryId}`);
        if(cachedValue){
            try {
                const data = JSON.parse(cachedValue);
                return res.status(200).json({
                    success:true,
                    message:"Category details fetched",
                    data
                })
            } catch (parseError) {
                console.log(parseError);
                await client.del(`category:${categoryId}`);
            }
        }

        // find in db
        const data = await Category.findOne({_id:categoryId}).populate({
            path:"courses",
            select:"courseName courseDesc price thumbnail",
            populate:{
                path:"instructor",
                select:"name email image"
            }
        });

        // if not cached, cached data
        await client.set(`category:${categoryId}`,JSON.stringify(data));
        await client.expire(`category:${categoryId}`,300);

        // return res
        return res.status(200).json({
            success:true,
            message:"Category fetched",
            data
        });

    } catch (error) {
        console.log(error);
        return ErrorResponseHandling(res,500,"Internal server error");
    }
}
