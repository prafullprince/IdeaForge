import { Request, Response } from "express";
import { ErrorResponseHandling } from "../helper/EroorResponse";
import Category from "../models/Category";


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

        // find in db
        const data = await Category.find({});

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
