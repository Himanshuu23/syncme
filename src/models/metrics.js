import mongoose from "mongoose";
const MetricsSchema = new mongoose.Schema({
    userId: { type: Number, ref: "User", required: true }, // Foreign key reference
    weight: { type: Number, required: true },
    age: { type: Number, required: true },
    height: { type: Number },
    steps: { type: Number },
    sleep: { type: Number },
    physicalActivity: { type: Number },
    heartRate: { type: Number },
    waterIntake: { type: Number }
});

export const Metrics = mongoose.model("Metrics", MetricsSchema);
