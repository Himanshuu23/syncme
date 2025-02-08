import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import { Rewards } from "@/models/rewards";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  await dbConnect();

  const { userId, rewardId } = req.body;

  if (!userId || !rewardId) return res.status(400).json({ error: "Missing parameters" });

  const reward = await Rewards.findById(rewardId);
  if (!reward) return res.status(404).json({ error: "Reward not found" });

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.coins = (user.coins || 0) + reward.coins;
  user.xp = (user.xp || 0) + reward.xp;
  user.amount = (user.amount || 0) + reward.coins;
  await user.save();

  reward.completed = 100;
  await reward.save();

  res.status(200).json({ success: true, message: "Reward claimed successfully" });
}