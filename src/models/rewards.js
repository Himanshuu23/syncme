import mongoose from "mongoose";

const RewardsSchema = new mongoose.Schema({
    userId: { type: Number, ref: "User", required: true },
    name: { type: String, required: true },
    coins: { type: Number, required: true },
    xp: { type: Number, required: true },
    completed: { type: Number, required: true, default: 0 }
});

export const Rewards = mongoose.model("Rewards", RewardsSchema);