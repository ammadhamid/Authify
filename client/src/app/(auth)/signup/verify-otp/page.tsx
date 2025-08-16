
"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import OtpForm from "@/components/auth/OtpForm"; // Adjust path if needed
import { Toaster } from "@/components/ui/sonner"; // Add Toaster for notifications

export default function VerifyOtpPage() {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("emailForVerification");
    if (email) {
      setUserEmail(email);
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster richColors position="top-center" /> {/* Add Sonner's Toaster */}
      <NavBar />
      <main className="flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md">
          <OtpForm email={userEmail} />
        </div>
      </main>
    </div>
  );
}