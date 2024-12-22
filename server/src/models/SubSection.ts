import mongoose, { Schema } from "mongoose";

// courseSchema Types
interface ISubSection {
    title: string,
    duration: string,
    description: string,
    videoUrl: string
}

// courseSchema
const subSectionSchema:Schema = new Schema({
    title:{
        type: String,
        required:true,
    },
    description:{
        type: String,
        required:true,
    },
    duration:{
        type: String,
    },
    videoUrl:{
        type: String,
        required: true
    }
});

const SubSection = mongoose.model<ISubSection>("SubSection",subSectionSchema);
export default SubSection;
