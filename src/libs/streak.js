import axios from "axios";

export const checkUserStreak = async (email) => {
  try {
    const response = await axios.get(`/api/user?email=${email}`);
    return response.data;
  } catch (error) {
    console.error("Error checking streak:", error);
    return { success: false, error: error.response?.data?.error || "Something went wrong" };
  }
};