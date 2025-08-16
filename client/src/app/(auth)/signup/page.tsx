// app/signup/page.tsx

import NavBar from "@/components/NavBar";
import SignupForm from "@/components/auth/SignupForm"; // Make sure the path is correct
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />
      <main className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </main>
    </div>
  );
}