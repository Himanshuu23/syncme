import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    email: { type: String, required: true, unique: true },
    calories: { type: Number },
    intensity: { type: Number },
    duration: { type: String },
    wakeUpTime: { type: String },
    sleepTime: { type: String },
    screenTime: { type: String },
    taskCompletionRate: { type: Number }
});

export const Analytics = mongoose.model("Analytics", AnalyticsSchema);