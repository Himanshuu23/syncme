import { dbConnect } from "@/libs/connectdb";
import { MentalMetrics } from "@/models/mentalmetrics";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    const metrics = await MentalMetrics.findOne({ userId });
    if (!metrics) return NextResponse.json({ error: "Metrics not found" }, { status: 404 });
    return NextResponse.json(metrics);
}

export async function POST(req) {
    await dbConnect();
    try {
        const data = await req.json();
        if (!data.email) return NextResponse.json({ error: "Email is required" }, { status: 400 });
        const user = await User.findOne({ email: data.email });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}