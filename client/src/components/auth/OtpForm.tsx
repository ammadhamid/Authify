"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const formSchema = z.object({
  otp: z
    .string()
    .length(6, "Please enter the 6-digit OTP."),
});

export default function OtpForm() {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/users/verify-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "OTP verification failed.");
      }

      toast.success("OTP verified successfully!");
      // You can add redirect logic here as needed
    } catch (error: any) {
      toast.error(error.message || "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setResendLoading(true);
    setResendDisabled(true);
    try {
      const response = await fetch("/api/users/resend-otp", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to resend OTP");
      }

      toast.success("OTP resent to your email.");
    } catch (error) {
      toast.error("Unable to resend OTP. Please try again later.");
    } finally {
      setResendLoading(false);
      // Cooldown: disable resend for 30 seconds
      setTimeout(() => setResendDisabled(false), 30_000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#A89DA5] px-4">
      <div
        className="max-w-xl w-full bg-[#A89DA5] rounded-lg p-8 shadow-lg"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {/* Header Section */}
        <div className="mb-5 flex items-center justify-between">
          <h2
            className="font-black text-2xl tracking-tight text-[#161212]"
            style={{ fontWeight: 700 }}
          >
            Authify
          </h2>
        </div>

        {/* Title */}
        <h1
          className="text-center mb-8 text-[#161212]"
          style={{
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: "-0.5px",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          We Just Sent an OTP to&nbsp;
          <span style={{ fontWeight: 600 }}>Your Email</span>
        </h1>

        {/* Form Start */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Enter OTP
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot
                          index={0}
                          className="w-14 h-14 rounded-md border-2 border-[#BC7BB6] mx-1 bg-[#DED8DF] text-[#161212] text-3xl font-bold text-center shadow-sm"
                        />
                        <InputOTPSlot
                          index={1}
                          className="w-14 h-14 rounded-md border-2 border-[#BC7BB6] mx-1 bg-[#DED8DF] text-[#161212] text-3xl font-bold text-center shadow-sm"
                        />
                        <InputOTPSlot
                          index={2}
                          className="w-14 h-14 rounded-md border-2 border-[#BC7BB6] mx-1 bg-[#DED8DF] text-[#161212] text-3xl font-bold text-center shadow-sm"
                        />
                      </InputOTPGroup>

                      <InputOTPSeparator className="mx-4" />

                      <InputOTPGroup>
                        <InputOTPSlot
                          index={3}
                          className="w-14 h-14 rounded-md border-2 border-[#BC7BB6] mx-1 bg-[#DED8DF] text-[#161212] text-3xl font-bold text-center shadow-sm"
                        />
                        <InputOTPSlot
                          index={4}
                          className="w-14 h-14 rounded-md border-2 border-[#BC7BB6] mx-1 bg-[#DED8DF] text-[#161212] text-3xl font-bold text-center shadow-sm"
                        />
                        <InputOTPSlot
                          index={5}
                          className="w-14 h-14 rounded-md border-2 border-[#BC7BB6] mx-1 bg-[#DED8DF] text-[#161212] text-3xl font-bold text-center shadow-sm"
                        />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>

                  <FormDescription className="mt-2 text-sm text-gray-700">
                    Please enter the one-time password sent to your email.
                  </FormDescription>
                  <FormMessage className="text-red-600 mt-1" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full rounded-xl bg-[#1B141B] py-4 text-white font-semibold text-lg shadow-lg hover:bg-[#331f33]"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Submit"}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-[#221F20] text-lg mb-1">Don’t receive Code?</p>
          <button
            disabled={resendLoading || resendDisabled}
            onClick={handleResend}
            className={`text-[#BC7BB6] font-semibold ${
              resendDisabled || resendLoading
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer hover:underline"
            } text-base`}
          >
            {resendLoading ? "Resending..." : "Resend Email"}
          </button>
        </div>
      </div>
    </div>
  );
}
