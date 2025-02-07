import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const UserSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    profession: { type: String },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number },
    gender: { type: String, enum: ["M", "F", "O"] },
    weight: { type: Number },
    height: { type: Number }
});

export const User = mongoose.model("User", UserSchema);