import { Request, Response } from "express";
import { ErrorResponseHandling } from "../helper/EroorResponse";
import Course from "../models/Course";
import Fuse from "fuse.js";


export const searchCourse = async (req: Request, res: Response): Promise<any> =>{
    try {
        // fetch data
        const { query } = req.body;

        if(!query){
            return ErrorResponseHandling(res,400,"please provide query");
        }

        // course
        const course = await Course.find({})
                                        .select("courseName courseDesc thumbnail")
                                        .populate([
                                            {path:"instructor",select:"name image"},
                                            {path:"category",select:"categoryName"}
                                        ])
                                        .lean()
                                        ;

        // options
        const options = {
            keys:["courseName","category.categoryName","instructor.name"],
            threshold: 0.4
        }

        // fuse
        const fuse:any = new Fuse(course,options);

        const result = fuse.search(query);
        const data = result.map((course:any)=> course.item);

        // return res
        return res.status(200).json({
            success:true,
            message:"search succeed",
            data
        });


    } catch (error) {
        console.log(error);
        return ErrorResponseHandling(res,500,"Internal server error");
    }
}
