import mongoose, { Schema } from 'mongoose';

// profileSchema types
interface IProfile {
    gender:string,
    dateOfBirth:string,
    about:string,
    contactNumber:string,
    user:mongoose.Types.ObjectId,
    country:string
}

// Define the Profile schema
const profileSchema:Schema = new Schema({
	gender: {
		type: String,
	},
	dateOfBirth: {
		type: String,
	},
	about: {
		type: String,
		trim: true,
	},
	contactNumber: {
		type: String,
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
