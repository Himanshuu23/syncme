import mongoose from "mongoose";

const MentalMetricsSchema = new mongoose.Schema({
    userId: { type: Number, ref: "User", required: true },
    email: { type: String, required: true, unique: true },
    procrastination: { type: Number },
    happiness: { type: Number },
    sad: { type: Number },
    stress: { type: Number }
});

export const MentalMetrics = mongoose.model("MentalMetrics", MentalMetricsSchema);