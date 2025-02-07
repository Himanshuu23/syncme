import { connectDB } from "@/lib/connectdb";
import { DailyData } from "@/models/daily";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    const dailyData = await DailyData.find();
    return NextResponse.json(dailyData);
}

export async function POST(req) {
    await connectDB();
    try {
        const data = await req.json();
        const newDailyData = new DailyData(data);
        await newDailyData.save();
        return NextResponse.json({ message: "Daily data added successfully", dailyData: newDailyData }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}