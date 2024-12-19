import mongoose, { Schema } from "mongoose";

// courseSchema Types
interface ISection {
    sectionName: string,
    subSections: mongoose.Types.ObjectId[]
}

// courseSchema
const sectionSchema:Schema = new Schema({
    sectionName:{
        type: String,
        required:true,
        trim:true
    },
    subSections:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection"
    }]
});

const Section = mongoose.model<ISection>("Section",sectionSchema);
export default Section;
