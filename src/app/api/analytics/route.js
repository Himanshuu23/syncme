import { dbConnect } from "@/libs/connectdb";
import { Analytics } from "@/models/analytics";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
    await dbConnect();
    try {
        const existingAnalytics = await Analytics.findOne({ email: data.email });
        if (existingAnalytics) return NextResponse.json({ error: "Analytics data already exists" }, { status: 400 });

        const data = await req.json();
        if (!data.email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

        const user = await User.findOne({ email: data.email });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const newAnalytics = new Analytics({ ...data, userId: user._id });
        await newAnalytics.save();

        return NextResponse.json({ message: "Analytics data added successfully", analytics: newAnalytics }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function GET(req) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const analyticsData = await Analytics.findOne({ userId: user._id });
    if (!analyticsData) return NextResponse.json({ error: "Analytics data not found" }, { status: 404 });

    return NextResponse.json(analyticsData);
}