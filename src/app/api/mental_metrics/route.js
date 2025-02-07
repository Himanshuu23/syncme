import { connectDB } from "@/lib/mongodb";
import { MentalMetrics } from "@/models/mentalmetrics";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    const metrics = await MentalMetrics.find();
    return NextResponse.json(metrics);
}

export async function POST(req) {
    await connectDB();
    try {
        const data = await req.json();
        const newMetrics = new MentalMetrics(data);
        await newMetrics.save();
        return NextResponse.json({ message: "Metrics added successfully", metrics: newMetrics }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}