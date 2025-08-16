import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Lock, Users, Fingerprint } from "lucide-react";

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
      <div className="flex justify-center items-center mb-4 w-12 h-12 mx-auto bg-purple-100 text-purple-600 rounded-full">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />
      <main className="container mx-auto px-4">
        {/* ## Hero Section */}
        <section className="text-center py-20 sm:py-28">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Modern Authentication, <br />
            <span className="text-purple-600">Simplified.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
            Authify provides a robust, secure, and developer-friendly foundation
            for user authentication in your modern web applications.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link href="/signup">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="https://github.com/ammadhamid/Authify" target="_blank">
                View on GitHub
              </Link>
            </Button>
          </div>
        </section>

        <section className="py-16">
           <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Core Features</h2>
              <p className="text-md text-gray-500 mt-2">Everything you need for secure user management.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Lock size={24}/>} 
                title="Secure JWT Auth" 
                description="Uses JWT access and refresh tokens for stateless, secure session management." 
              />
              <FeatureCard 
                icon={<Users size={24}/>} 
                title="OAuth 2.0 Integration" 
                description="Allow users to sign up and log in seamlessly with their Google accounts." 
              />
              <FeatureCard 
                icon={<Fingerprint size={24}/>} 
                title="OTP Verification" 
                description="Enhance security with email-based One-Time Password verification for sign-ups." 
              />
           </div>
        </section>
      </main>
    </div>
  );
}