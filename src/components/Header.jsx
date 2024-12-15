"use client";

import React from "react";
import LogoutButton from "./LogoutButton";
import Greeting from "./Greeting";
import { SessionProvider } from "next-auth/react";
import Image from "next/image";
export default function Header() {
  return (
    <SessionProvider>
      <div className="flex justify-between items-center px-[30px] h-[60px] bg-[#1F2937] ">
        <Image
          src={"/dailyTasksLogo.png"}
          width={"120"}
          height={"120"}
          alt={"logo"}
        />

        <nav>
          <ul className="flex gap-5 items-center">
            <li>
              <LogoutButton />
            </li>
          </ul>
        </nav>
      </div>
    </SessionProvider>
  );
}
