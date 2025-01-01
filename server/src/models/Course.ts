import mongoose, { Schema } from "mongoose";

// courseSchema Types
export interface ICourse {
    courseName: string,
    courseDesc: string,
    category: mongoose.Types.ObjectId,
    price:number,
    tags: string[],
    thumbnail: string,
    benefits: string,
    requirements: string,
    sections: mongoose.Types.ObjectId[],
    instructor: mongoose.Types.ObjectId,
    studentsEnroled: mongoose.Types.ObjectId[],
    viewedByIp: String[],
    ratings: mongoose.Types.ObjectId[],
}

// courseSchema
const courseSchema:Schema = new Schema({
    courseName:{
        type: String,
        required:true,
        trim:true
    },
    courseDesc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    tags:[{
        type:String,
        required:true
    }],
    thumbnail:{
        type:String,
        required:true,
    },
    benefits:{
        type:String,
        required:true,
    },
    requirements:{
        type:String,
        required:true
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    sections:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }],
    status:{
        type:String,
        enum:["Draft","Published"]
    },
    studentsEnroled: [
        {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
    ],
    viewedByIp: [{
        type: String,
    }],
    ratings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating"
    }]
},{timestamps:true});

const Course = mongoose.model<ICourse>("Course",courseSchema);
export default Course;
