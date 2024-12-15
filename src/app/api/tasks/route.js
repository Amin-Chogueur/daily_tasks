import { connectToDB } from "@/lib/connectToDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/lib/models/userModel";

connectToDB();

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const newTask = await req.json();

    const user = await User.findById(session.user.id);
    user.tasks.push(newTask);
    await user.save();
    return NextResponse.json(user.tasks.at(-1));
  } catch (error) {
    console.log(error);
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const user = await User.findById(session.user.id);

    return NextResponse.json(user.tasks);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const idToDelete = await req.json();

    const user = await User.findById(session.user.id);
    user.tasks.filter((task) => task._id !== idToDelete);
    await user.save();
    return NextResponse.json(user.tasks);
  } catch (error) {
    console.log(error);
  }
}
