"use client";
import TaskForm from "@/components/TaskForm";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import Greeting from "@/components/Greeting";
import store from "@/redux/store";
import Tasks from "@/components/Tasks";

export default function Home() {
  return (
    <Provider store={store}>
      <SessionProvider>
        <main className="bg-[#121212] text-white w-[95%] sm:w-[70%] md:[60%] lg:[50%]  mx-auto  border border-gray-700 p-4 rounded-lg my-[30px]">
          <h1 className="text-xl md:text-2xl text-[#2FB5F2]  text-center mb-[20px]">
            <Greeting />
          </h1>
          <TaskForm />
          <Tasks />
        </main>
      </SessionProvider>
    </Provider>
  );
}
