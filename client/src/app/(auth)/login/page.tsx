import NavBar from "@/components/NavBar";
import LoginForm from "@/components/auth/LoginForm"; // Adjust path if needed
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />
      <main className="flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </main>
    </div>
  );
}