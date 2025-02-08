import { dbConnect } from "@/libs/connectdb";
import { User } from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    const users = await User.find();
    return NextResponse.json(users);
}

export async function POST(req) {
    await dbConnect();
    try {
        const data = await req.json();
        if (!data.name || !data.age || !data.email) {
            return NextResponse.json({ error: "Name, age, and email are required" }, { status: 400 });
        }
        const newUser = new User(data);
        await newUser.save();
        return NextResponse.json({ message: "User added successfully", user: newUser }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}