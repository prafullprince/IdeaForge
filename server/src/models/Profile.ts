import mongoose, { Schema } from 'mongoose';

// profileSchema types
interface IProfile {
    gender:string,
    dob:string,
    about:string,
    phone:string,
    user:mongoose.Types.ObjectId,
    country:string
}

// Define the Profile schema
const profileSchema:Schema = new Schema({
	gender: {
		type: String,
	},
	dob: {
		type: String,
	},
	about: {
		type: String,
		trim: true,
	},
	phone: {
		type: Number,
		trim: true,
	},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
	},
	country:{
		type:String
	}
},{timestamps:true});

// Export the Profile model
const Profile =  mongoose.model<IProfile>("Profile", profileSchema);
export default Profile;
