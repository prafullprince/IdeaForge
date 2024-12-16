import mongoose, { Schema } from "mongoose";


// category schema types
interface ICategory {
    categoryName: string,
    categoryDesc: string,
    courses: mongoose.Types.ObjectId[]
}

// schema
const categorySchema:Schema = new Schema({
    categoryName:{
        type:String,
        required:true,
        trim:true
    },
    categoryDesc:{
        type:String,
        required:true,
    },
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
});
const Category = mongoose.model<ICategory>("Category",categorySchema);
export default Category;
