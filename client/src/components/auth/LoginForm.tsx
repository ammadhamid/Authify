"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import axios from "axios";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import Oauth from "./Oauth";
import SeperatorLines from "../helpers/Seperator.helper";
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginFormFields = z.infer<typeof loginSchema>;

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<LoginFormFields>({
    defaultValues: {
      email: "test123@test.com",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormFields) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert(response.data.message);
      reset();
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError("root", { message: error.response.data.message });
      } else {
        setError("root", { message: "An unexpected Error Occured" });
      }
    }
  };

  return (
    <form
      className="
    w-full
    mx-auto
    bg-white
    rounded-2xl
    shadow
    p-6
    flex
    flex-col
    gap-2
    "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-extrabold font-playfair text-2xl md:text-3xl text-black ">
          Authify
        </h1>
        <h2 className="font-semibold font-playfair text-4xl md:text-6xl text-black">
          Welcome Back
        </h2>
      </div>
      <div className="flex flex-row items-center justify-center gap-4 mt-2 ">
        <Oauth />
      </div>
      <SeperatorLines />
      <div className="flex flex-col items-center gap-4">
      <div className="flex-1 flex flex-col gap-2 md:w-96 mb-1">
        <Label>Email</Label>
        <Input
          className="font-poppins bg-black text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-2 md:w-96">
        <Label>Passowrd</Label>
        <Input
          className="font-poppins bg-black text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
      </div>
      </div>
      <div className="button flex justify-center ">
      <Button
        className="font-poppins bg-black w-28 md:w-30 h-8 text-white py-2 px-6 rounded-lg mt-2 font-semibold hover:bg-gray-900 transition"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>
      </div>
      <div className="text-center pt-2 text-base">
        Don't have an Account{" "}
        <a href="/signup" className="text-purple-600 underline font-semibold">
          SignUp
        </a>
      </div>
      {errors.root && <div className="text-red-500">{errors.root.message}</div>}
    </form>
  );
}

export default LoginForm;
