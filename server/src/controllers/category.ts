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

        // return data if cached
        const cachedValue = await client.get(`getCategory:all`);
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
                await client.del(`getCategory:all`);
            }
        }

        // find in db
        const data = await Category.find({});

        // if not cached, cached data
        await client.set(`getCategory:all`,JSON.stringify(data));
        await client.expire(`getCategory:all`,300);

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

// categoryPageDetails -> specialCourses
export const categoryPageDetails = async (req:Request, res:Response): Promise<any> =>{
    try {

        // fetch data
        const { categoryId } = req.body;

        // validation
        if(!categoryId){
            return ErrorResponseHandling(res,400,"Invalid credentials")
        }

        // return data if cached
        // const cachedValue = await client.get(`category:${categoryId}`);
        // if(cachedValue){
        //     try {
        //         const data = JSON.parse(cachedValue);
        //         return res.status(200).json({
        //             success:true,
        //             message:"Category details fetched",
        //             data
        //         })
        //     } catch (parseError) {
        //         console.log(parseError);
        //         await client.del(`category:${categoryId}`);
        //     }
        // }

        // validation
        const category = await Category.findOne({_id:categoryId}).select("categoryName categoryDesc");
        if(!category){
            return ErrorResponseHandling(res,400,"Category not found");
        }

        // find in db
        const selectedCategory = await Category.findOne({_id:categoryId}).populate({
            path:"courses",
            select:"courseName courseDesc price thumbnail studentsEnroled",
            populate:{
                path:"instructor",
                select:"name email image"
            }
        });

        // top 10 selling course
        const topTenSellingCourse = selectedCategory?.courses.map((course:any)=>({
            ...course.toObject(),
            enrolledStudents: course.studentsEnroled.length
        }));
        topTenSellingCourse?.sort((a,b)=> b.enrolledStudents - a.enrolledStudents );
        const mostSellingCourse = topTenSellingCourse?.slice(0,10);

        
        // if not cached, cached data
        // await client.set(`category:${categoryId}`,JSON.stringify(data));
        // await client.expire(`category:${categoryId}`,3);

        // return res
        return res.status(200).json({
            success:true,
            message:"Category fetched",
            data:{
                mostSellingCourse,
                category
            }
        });

    } catch (error) {
        console.log(error);
        return ErrorResponseHandling(res,500,"Internal server error");
    }
}

// categoryPageDetails -> allCourses TODO:pagination
export const categoryPageDetailsAllCourse = async (req:Request, res:Response): Promise<any> =>{
    try {

        // fetch data
        const { categoryId } = req.body;
        const page = parseInt(req.body.page) || 1;
        const limit = 5;

        // validation
        if(!categoryId || !page || !limit){
            return ErrorResponseHandling(res,400,"Invalid credentials")
        }

        // find in db
        const selectedCategory = await Category.findOne({_id:categoryId}).populate({
            path:"courses",
            select:"courseName courseDesc price thumbnail studentsEnroled",
            populate:{
                path:"instructor",
                select:"name email image"
            }
        });




        // return res
        return res.status(200).json({
            success:true,
            message:"Category fetched",
            
        });

    } catch (error) {
        console.log(error);
        return ErrorResponseHandling(res,500,"Internal server error");
    }
}
