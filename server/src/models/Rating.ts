import mongoose, { Schema } from 'mongoose';

// profileSchema types
interface IRating {
    user: mongoose.Types.ObjectId,
    course: mongoose.Schema.Types.ObjectId,
    rating: number,
    reviews: string
}

// Define the Profile schema
const ratingSchema: Schema = new Schema({
	user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      reviews: String,
      rating: {
        type: Number,
        required: true,
      },
},{timestamps:true});

// Export the Profile model
const Rating =  mongoose.model<IRating>("Rating", ratingSchema);
export default Rating;
