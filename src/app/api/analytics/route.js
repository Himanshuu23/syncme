import { dbConnect } from "@/libs/connectdb";
import { Analytics } from "@/models/analytics";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    const analyticsData = await Analytics.find();
    return NextResponse.json(analyticsData);
}

export async function POST(req) {
    await connectDB();
    try {
        const data = await req.json();
        const newAnalytics = new Analytics(data);
        await newAnalytics.save();
        return NextResponse.json({ message: "Analytics data added successfully", analytics: newAnalytics }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}