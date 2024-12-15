import mongoose from "mongoose";

export const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["Todo", "In-Progress", "Completed"],
      default: "Todo",
    },
    priority: {
      type: String,
      enum: ["High", "Low"],
      default: "Low",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tasks: [TaskSchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", UserModel);

export default User;
