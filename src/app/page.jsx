"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
export default function Login() {
  const route = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  async function handleSubmitForm(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await signIn("credentials", { ...userData, redirect: false });

      if (res?.error) {
        setMessage("email or password are incorrect");
        toast.error("email or password are incorrect");
      }
      route.push("/home");
    } catch (error) {
      setMessage(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
      setUserData({
        email: "",
        password: "",
      });
    }
  }
  return (
    <div className="flex justify-center items-center h-[calc(100vh-120px)]">
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col gap-5 p-5 rounded-lg bg-black w-[300px] mx-auto  border-t-teal-700 border-t-4"
      >
        <input
          className="bg-[#222] p-2 rounded"
          type="email"
          placeholder="Email..."
          value={userData.email}
          required
          onChange={(e) =>
            setUserData({ ...userData, [e.target.name]: e.target.value })
          }
          name="email"
        />
        <input
          className="bg-[#222] p-2 rounded"
          type="password"
          placeholder="Password..."
          value={userData.password}
          required
          onChange={(e) =>
            setUserData({ ...userData, [e.target.name]: e.target.value })
          }
          name="password"
        />
        <button className="bg-teal-600 p-2 rounded">
          {loading ? "In Process..." : "Login"}
        </button>
        <p className="text-center">
          D&apos;ont have have an accounte{" "}
          <Link className="text-teal-600 underline" href={"/signUp"}>
            SignUp
          </Link>
        </p>
      </form>
    </div>
  );
}
