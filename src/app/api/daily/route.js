import { dbConnect } from "@/libs/connectdb";
import { DailyData } from "@/models/daily";
import { NextResponse } from "next/server";

export async function GET(req) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    const dailyData = await DailyData.findOne({ userId });
    if (!dailyData) return NextResponse.json({ error: "Daily data not found" }, { status: 404 });
    return NextResponse.json(dailyData);
}

export async function POST(req) {
    await dbConnect();
    try {
        const data = await req.json();
        if (!data.userId || !data.sleep) return NextResponse.json({ error: "User ID and sleep data are required" }, { status: 400 });
        const newDailyData = new DailyData(data);
        await newDailyData.save();
        return NextResponse.json({ message: "Daily data added successfully", dailyData: newDailyData }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}