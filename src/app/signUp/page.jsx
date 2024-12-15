"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { toast } from "react-toastify";
export default function SignUp() {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  async function handleSubmitForm(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/signup", userData);
      const message = res.data.message;
      setMessage(message);
      toast.success(message);
      route.push("/");
    } catch (error) {
      setMessage(error.response?.data?.message);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
      setUserData({
        name: "",
        email: "",
        password: "",
      });
    }
  }
  return (
    <div className="flex justify-center items-center h-[calc(100vh-120px)]">
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col gap-5 p-5 rounded-lg bg-black w-[300px] mx-auto  border-t-teal-700  border-t-4"
      >
        <input
          className="bg-[#222] p-2 rounded"
          type="text"
          placeholder="UserName..."
          value={userData.name}
          required
          onChange={(e) =>
            setUserData({ ...userData, [e.target.name]: e.target.value })
          }
          name="name"
        />
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
        <button
          disabled={loading}
          className={` p-2 rounded ${loading ? "bg-slate-700" : "bg-teal-600"}`}
        >
          {loading ? "In Process..." : "SignUp"}
        </button>
        <p className="text-center">
          already have an acounte{" "}
          <Link className="text-teal-600 underline" href={"/"}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
