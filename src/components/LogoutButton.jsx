"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function LogoutButton() {
  const { data: session } = useSession();
  if (!session)
    return (
      <Link className="bg-teal-600 p-1 rounded" href={"/signUp"}>
        SignUp
      </Link>
    );
  return (
    <button className="bg-teal-600 p-1 rounded" onClick={() => signOut()}>
      Logout
    </button>
  );
}
