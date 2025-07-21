"use client"
import SignupForm from "@/components/auth/SignupForm";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
export default function SignupPage() {
  return (
    <>
      <div className="singupPage flex items-center justify-center">
        <div className="left hidden sm:inline h-[600] w-[774px] relative">
          <div className="backgroundImage flex-between bg-[url(/Signup_Background.png)] absolute inset-0  bg-cover bg-center">
            <div className="IamgeText ">
              <h1 className="font-playfair text-3xl text-white font-bold mb-2">
                WELCOME TO AUTHIFY
              </h1>
              <h4 className="font-playfair text-lg text-white">
                Secure Authentication & Admin Platform
              </h4>
            </div>
          </div>
        </div>
        <div className="right md:w-[587px] md:h-[600px]">
          <SignupForm />
        </div>
      </div>
    </>
  );
}
