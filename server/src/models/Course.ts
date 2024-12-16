import mongoose, { Schema } from "mongoose";

// courseSchema Types
interface ICourse {
    courseName: string,
    courseDesc: string,
    category: mongoose.Types.ObjectId
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
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    }
});

const Course = mongoose.model<ICourse>("Course",courseSchema);
export default Course;
