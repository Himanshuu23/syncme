import mongoose from "mongoose";

const RewardsSchema = new mongoose.Schema({
    userId: { type: Number, ref: "User", required: true },
    email: { type: String, required: true, unique: true },
    coins: { type: Number },
    streaks: { type: Number },
    xp: { type: Number },
    level: { type: Number }
});

export const Rewards = mongoose.model("Rewards", RewardsSchema);