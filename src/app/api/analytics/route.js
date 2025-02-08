import { dbConnect } from "@/libs/connectdb";
import { Analytics } from "@/models/analytics";
import { NextResponse } from "next/server";

export async function GET(req) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    const analyticsData = await Analytics.findOne({ userId });
    if (!analyticsData) return NextResponse.json({ error: "Analytics data not found" }, { status: 404 });
    return NextResponse.json(analyticsData);
}

export async function POST(req) {
    await dbConnect();
    try {
        const data = await req.json();
        if (!data.userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        const newAnalytics = new Analytics(data);
        await newAnalytics.save();
        return NextResponse.json({ message: "Analytics data added successfully", analytics: newAnalytics }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}