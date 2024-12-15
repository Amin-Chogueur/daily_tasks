import mongoose from "mongoose";

export async function connectToDB() {
  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri, {
      dbName: "dailyTask",
    });
    console.log("connect to db");
  } catch (error) {
    console.log(error);
  }
}
