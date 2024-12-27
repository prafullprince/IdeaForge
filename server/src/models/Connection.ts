import mongoose, { Document, Schema } from "mongoose";

// userSchema types
export interface IConnection extends Document {
    from: mongoose.Types.ObjectId,
    to: mongoose.Types.ObjectId
}

// userSchema
const connectionSchema:Schema = new Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true});

// registering userSchema
const Connection = mongoose.model<IConnection>("Connection",connectionSchema);
export default Connection;
