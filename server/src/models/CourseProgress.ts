import mongoose, { Document, Schema } from "mongoose";

// courseSchema types
export interface ICourseProgress extends Document {
    courseId: string,
    userId: string,
    completedVideos: [string]
}

// courseSchema
const courseProgressSchema:Schema = new Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    completedVideos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection"
    }]
},{timestamps:true});

// registering userSchema
const CourseProgress = mongoose.model<ICourseProgress>("CourseProgress",courseProgressSchema);
export default CourseProgress;
