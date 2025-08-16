"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { LoaderCircle } from "lucide-react";

const formSchema = z.object({
  otp: z.string().length(6, "Your OTP must be 6 digits."),
});

// The component now accepts the user's email as a prop
export default function OtpForm({ email }: { email: string }) {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: "" },
  });

  // Start a 30-second cooldown timer for the resend button when the component mounts
  useState(() => {
    const timer = setTimeout(() => setResendDisabled(false), 30000);
    return () => clearTimeout(timer);
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/users/verify-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, email }), // Send email along with OTP
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "OTP verification failed.");
      }

      toast.success("Account verified successfully!");
      localStorage.removeItem("emailForVerification"); // Clean up
      router.push("/login"); // Redirect to login page
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
      const response = await fetch("http://localhost:8000/api/users/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // Send email to backend for resend
      });

      if (!response.ok) throw new Error("Failed to resend OTP");

      toast.success("A new OTP has been sent to your email.");
    } catch (error) {
      toast.error("Unable to resend OTP. Please try again later.");
    } finally {
      setResendLoading(false);
      setTimeout(() => setResendDisabled(false), 30000); // 30-second cooldown
    }
  }

  return (
    <div className="w-full bg-white p-8 rounded-xl shadow-md border border-gray-200">
      {/* ## Themed Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Check Your Email
        </h1>
        <p className="text-gray-600 mt-2">
          We've sent a 6-digit code to{" "}
          <span className="font-semibold text-gray-800">{email || "your email"}</span>.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup className="w-full flex justify-center">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white hover:bg-purple-700 h-11 text-base"
          >
            {loading && <LoaderCircle className="animate-spin mr-2" size={20} />}
            {loading ? "Verifying..." : "Verify Account"}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center text-sm text-gray-600">
        <span>Didn't receive the code?</span>
        <Button
          variant="link"
          className={`p-1 h-auto font-semibold text-purple-600 ${resendDisabled || resendLoading ? "opacity-50" : ""}`}
          disabled={resendDisabled || resendLoading}
          onClick={handleResend}
        >
          {resendLoading ? "Sending..." : "Click to resend"}
        </Button>
      </div>
    </div>
  );
}