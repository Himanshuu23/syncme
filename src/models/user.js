import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    profession: { type: String },
    email: { type: String, required: true, unique: true },
    secondaryEmail: { type: String, unique: true },
    phoneNumber: { type: Number },
    gender: { type: String, enum: ["M", "F", "O"] },
    weight: { type: Number },
    height: { type: Number },
    country: { type: String },
    region: { type: String },
    state: { type: String },
    zipCode: { type: String },
    profilePicture: { type: String }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;