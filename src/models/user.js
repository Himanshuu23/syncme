import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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