"use client";

import React from "react";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Oauth from "./Oauth";
import SeperatorLines from "../helpers/Seperator.helper";
import { useRouter } from "next/navigation";




const SignUpSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((d) => d.password === d.confirmPassword, {
    error: "Password do not Match",
    path: ["confirmPassword"],
  });

type SignUpFormFields = z.infer<typeof SignUpSchema>;

function SignupForm() {
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm<SignUpFormFields>({
    defaultValues: {
      email: "john123@doe.com",
    },
    resolver: zodResolver(SignUpSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: SignUpFormFields) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/signup",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert(response.data.message);
      reset();
      router.push("/signup/verify-otp")

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
      onSubmit={handleSubmit(onSubmit)}
      className="
    max-w-[420px]
    w-full
    mx-auto
    bg-white
    rounded-2xl
    shadow
    p-6
    flex
    flex-col
    gap-4
  "
    >
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl md:text-3xl font-playfair font-semibold text-center">
          Sign Up Account
        </h1>
        <p className="text-sm font-poppins md:text-base text-center text-gray-700">
          Enter You Personal data to create your account.
        </p>
      </div>

      <div className="flex flex-row items-center justify-center gap-4 mt-2 mb-1">
        <Oauth />
      </div>

      <SeperatorLines />

      <div className="flex flex-col md:flex-row gap-3 w-full">
        <div className="flex-1 flex flex-col gap-1">
          <Label>First Name</Label>
          <Input
            className="bg-black text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="text"
            placeholder="eg. John"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <div className="text-red-500 text-xs">
              {errors.firstName.message}
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <Label>Last Name</Label>
          <Input
            className="bg-black text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="text"
            placeholder="eg. John"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <div className="text-red-500 text-xs">
              {errors.lastName.message}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Label>Email</Label>
        <Input
          className="bg-black text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="email"
          placeholder="eg. John123@gmail.com"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <div className="text-red-500 text-xs">{errors.email.message}</div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label>Password</Label>
        <Input
          className="bg-black text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="password"
          placeholder="Enter Your Password"
          {...register("password", { required: true, minLength: 8 })}
        />
        <span className="text-xs text-gray-500 pl-1">
          Must be Atleast 8 characters
        </span>
        {errors.password && (
          <div className="text-red-500 text-xs">{errors.password.message}</div>
        )}
      </div>

            <div className="flex flex-col gap-1">
        <Label>Confirm Password</Label>
        <Input
          className="bg-black text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          type="password"
          placeholder="re-enter password"
          {...register("confirmPassword", { required: true, minLength: 8 })}
        />
        <span className="text-xs text-gray-500 pl-1">
          Please Re-Enter Your Password
        </span>
        {errors.password && (
          <div className="text-red-500 text-xs">{errors.password.message}</div>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="bg-black text-white py-2 px-6 rounded-lg mt-2 font-semibold hover:bg-gray-900 transition"
      >
        {isSubmitting ? "Loading ..." : "Submit"}
      </Button>

      <div className="text-center pt-2 text-base">
        Already have an Account{" "}
        <a href="/login" className="text-purple-600 underline font-semibold">
          Login
        </a>
      </div>
      {errors.root && (
        <div className="text-red-500 text-center text-xs mt-2">
          {errors.root.message}
        </div>
      )}
    </form>
  );
}

export default SignupForm;
