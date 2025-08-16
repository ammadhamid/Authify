// components/auth/LoginForm.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import Oauth from "./Oauth";
import SeperatorLines from "../helpers/Seperator.helper";
import { Eye, EyeOff, LoaderCircle, AlertCircle } from "lucide-react";

// Schema is good, but let's add more specific error messages
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"), // Changed from min(8) as login doesn't need to validate length
});

type LoginFormFields = z.infer<typeof loginSchema>;

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormFields) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/login",
        data
      );
      alert(response.data.message || "Login successful!");
      reset();
      // TODO: Redirect to the user's dashboard, e.g., router.push('/dashboard');
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Invalid credentials. Please try again.";
      setError("root", { message });
    }
  };

  return (
    <div className="w-full bg-white p-8 rounded-xl shadow-md border border-gray-200">
      {/* ## Themed Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-gray-600 mt-2">
          Sign in to continue to Authify.
        </p>
      </div>

      {/* ## Themed OAuth & Separator */}
      <Oauth />
      <SeperatorLines text="OR" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2 relative">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs text-purple-600 hover:underline font-medium"
            >
              Forgot Password?
            </Link>
          </div>
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
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <p className="text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>

        {errors.root && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
            <AlertCircle size={18} />
            <span>{errors.root.message}</span>
          </div>
        )}

        {/* ## Themed Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-300 flex items-center justify-center gap-2 text-base h-11"
        >
          {isSubmitting && <LoaderCircle className="animate-spin" size={20} />}
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      {/* ## Consistent Footer Link */}
      <p className="text-center text-sm text-gray-600 mt-8">
        Don't have an account?{" "}
        <Link href="/signup" className="font-semibold text-purple-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;