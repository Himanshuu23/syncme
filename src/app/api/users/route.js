import { connectDB } from "@/lib/connectdb";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    const users = await User.find();
    return NextResponse.json(users);
}

export async function POST(req) {
    await connectDB();
    try {
        const data = await req.json();
        const newUser = new User(data);
        await newUser.save();
        return NextResponse.json({ message: "User added successfully", user: newUser }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}