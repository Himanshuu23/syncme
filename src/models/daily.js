import mongoose from "mongoose";

const DailyDataSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    email: { type: String, required: true, unique: true },
    sleep: { type: Number, required: true },
    physicalActivity: { type: Number },
    productivity: { type: Number },
    mood: { type: String }
});

export const DailyData = mongoose.model("DailyData", DailyDataSchema);