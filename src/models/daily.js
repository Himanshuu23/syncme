import mongoose from "mongoose";

const DailyDataSchema = new mongoose.Schema({
    userId: { type: Number, ref: "User", required: true },
    sleep: { type: Number, required: true },
    physicalActivity: { type: Number },
    productivity: { type: Number },
    mood: { type: String }
});

export const DailyData = mongoose.model("DailyData", DailyDataSchema);
