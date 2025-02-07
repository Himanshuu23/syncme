import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    userId: { type: Number, ref: "User", required: true },
    calories: { type: Number },
    intensity: { type: Number },
    duration: { type: String },
    wakeUpTime: { type: String },
    sleepTime: { type: String },
    screenTime: { type: String },
    taskCompletionRate: { type: Number }
});

export const Analytics = mongoose.model("Analytics", AnalyticsSchema);
