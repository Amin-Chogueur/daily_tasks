import { connectToDB } from "@/lib/connectToDB";
import User from "@/lib/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
connectToDB();

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    const isExist = await User.findOne({ email });

    if (isExist) {
      return NextResponse.json(
        { message: "user already exist" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return NextResponse.json(
      { message: "user created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error in sign up" }, { status: 400 });
  }
}
