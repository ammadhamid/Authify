// components/auth/SignupForm.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Oauth from "./Oauth";
import {toast} from "sonner"
import SeperatorLines from "../helpers/Seperator.helper";
import { Eye, EyeOff, LoaderCircle, AlertCircle } from "lucide-react";

const SignUpSchema = z
  .object({
    firstname: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormFields = z.infer<typeof SignUpSchema>;

function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<SignUpFormFields>({
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: SignUpFormFields) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/signup",
        data
      );
      localStorage.setItem("emailForVerification", data.email);
      toast.success(response.data.message || "Signup successful!"); // Using toast is better!
    reset();
    router.push("/signup/verify-otp");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "An unexpected error occurred.";
      setError("root", { message });
    }
  };

  return (
    <div className="w-full bg-white p-8 rounded-xl shadow-md border border-gray-200">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Create an Account
        </h1>
        <p className="text-gray-600 mt-2">
          Get started with Authify for free.
        </p>
      </div>

      <Oauth />
      <SeperatorLines text="OR" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstname">First Name</Label>
            <Input id="firstname" type="text" {...register("firstname")} />
            {errors.firstname && (
              <p className="text-xs text-red-600">{errors.firstname.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" type="text" {...register("lastName")} />
            {errors.lastName && (
              <p className="text-xs text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            className="pr-10"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-800"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <p className="text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>
        
        <div className="space-y-2 relative">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            className="pr-10"
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-gray-500 hover:text-gray-800"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.confirmPassword && (
            <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>
        
        {errors.root && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
            <AlertCircle size={18} />
            <span>{errors.root.message}</span>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center gap-2 text-base h-11"
        >
          {isSubmitting && <LoaderCircle className="animate-spin" size={20} />}
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-8">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-purple-600 hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}

export default SignupForm;