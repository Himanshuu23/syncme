import mongoose from "mongoose";
import { Rewards } from "@/models/rewards";

const ACHIEVEMENT_MESSAGES = [
    "🌟 You're on fire! Keep that streak going!",
    "💪 Nothing can stop you now!",
    "🚀 Blasting through procrastination!",
    "🎯 Bull's eye! Perfect task completion!",
    "⚡ Your productivity is electrifying!"
];

const MOTIVATIONAL_QUOTES = [
    "The best time to start was yesterday. The next best time is now.",
    "Small progress is still progress.",
    "You don't have to be great to start, but you have to start to be great.",
    "Focus on progress, not perfection.",
    "Today's actions are tomorrow's results."
];

const getRandomMessage = (messages) => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
};

const getAchievementMessage = () => {
    return getRandomMessage(ACHIEVEMENT_MESSAGES);
};

const getMotivationalQuote = () => {
    return getRandomMessage(MOTIVATIONAL_QUOTES);
};

const calculateProcrastinationRate = async (userId) => {
    await dbConnect();
    
    const rewards = await Rewards.find({ userId });
    let totalTasks = rewards.length;
    let completedTasks = rewards.filter(reward => reward.completed === 1).length;
    let procrastinationRate = ((totalTasks - completedTasks) / totalTasks) * 100;
    return procrastinationRate;
};

const getProcrastinationMessage = (procrastinationRate) => {
    if (procrastinationRate < 20) {
        return `${getAchievementMessage()} ${getMotivationalQuote()}`;
    } else if (procrastinationRate >= 20 && procrastinationRate < 50) {
        return `You're doing well, but there's room for improvement. ${getMotivationalQuote()}`;
    } else if (procrastinationRate >= 50 && procrastinationRate < 80) {
        return `You're procrastinating a bit. Try to focus more. ${getMotivationalQuote()}`;
    } else {
        return `You're procrastinating a lot. Let's get back on track! ${getMotivationalQuote()}`;
    }
};

export { calculateProcrastinationRate, getProcrastinationMessage, getAchievementMessage, getMotivationalQuote };