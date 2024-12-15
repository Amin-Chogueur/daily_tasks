"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function LogoutButton() {
  const { data: session } = useSession();
  if (!session)
    return (
      <Link className="bg-[#2FB5F2]  p-1 rounded" href={"/signUp"}>
        SignUp
      </Link>
    );
  return (
    <button className="bg-[#2FB5F2] p-1 rounded" onClick={() => signOut()}>
      Logout
    </button>
  );
}
