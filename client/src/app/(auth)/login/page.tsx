"use client"
import LoginForm from "@/components/auth/LoginForm";
import React from "react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="singupPage flex-between">
      <div className="left hidden sm:inline h-[600] w-[774px] ">
        <Image width={647} height={584} src={"/login_background.png"} alt="login_image" />
      </div>
      <div className="right md:w-[587px] md:h-[600px]">
        <LoginForm />
      </div>
    </div>
  );
}
