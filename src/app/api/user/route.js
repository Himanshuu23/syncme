import { dbConnect } from "@/libs/connectdb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json(user);
}

export async function POST(req) {
    await dbConnect();
    try {
        const data = await req.json();
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) return NextResponse.json({ error: "User already exists" }, { status: 400 });
        if (!data.name || !data.age || !data.email || !data.password) {
            return NextResponse.json({ error: "Name, password and email are required" }, { status: 400 });
        }
        const newUser = new User(data);
        await newUser.save();
        return NextResponse.json({ message: "User added successfully", user: newUser }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PUT(req) {
    await dbConnect();
    try {
        const data = await req.json();
        if (!data.email || !data.newPassword) {
            return NextResponse.json({ error: "Email and new password are required" }, { status: 400 });
        }
        const user = await User.findOne({ email: data.email });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
        user.password = data.newPassword;
        await user.save();
        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PATCH(req) {
    await dbConnect();
    try {
        const data = await req.json();
        const { email, ...updates } = data;
        console.log(data)

        if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

        const user = await User.findOne({ email });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        Object.assign(user, updates);
        await user.save();

        return NextResponse.json({ message: "User details updated successfully", user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}