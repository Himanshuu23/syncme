import { dbConnect } from "@/libs/connectdb";
import { DailyData } from "@/models/daily";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const dailyData = await DailyData.findOne({ userId: user._id });
    if (!dailyData) return NextResponse.json({ error: "Daily data not found" }, { status: 404 });

    return NextResponse.json(dailyData);
}

export async function POST(req) {
    await dbConnect();
    try {
        const existingDailyData = await DailyData.findOne({ email: data.email });
        if (existingDailyData) return NextResponse.json({ error: "Daily data already exists" }, { status: 400 });

        const data = await req.json();
        if (!data.email || !data.sleep) return NextResponse.json({ error: "Email and sleep data are required" }, { status: 400 });

        const user = await User.findOne({ email: data.email });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const newDailyData = new DailyData({ ...data, userId: user._id });
        await newDailyData.save();

        return NextResponse.json({ message: "Daily data added successfully", dailyData: newDailyData }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}