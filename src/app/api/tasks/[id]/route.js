import { connectToDB } from "@/lib/connectToDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/lib/models/userModel";

connectToDB();

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id: taskId } = await params; // Extract the task ID from the URL
    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Find and remove the task
    user.tasks = user.tasks.filter((task) => task._id.toString() !== taskId);
    await user.save();

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id: taskId } = await params; // Extract the task ID from the URL
    const user = await User.findById(session.user.id);
    const updatedTask = await req.json();

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.tasks = user.tasks.map((task) =>
      task._id.toString() === taskId
        ? { ...task.toObject(), ...updatedTask }
        : task
    );

    await user.save();
    //
    return NextResponse.json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
