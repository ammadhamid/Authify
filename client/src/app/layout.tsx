import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "../styles/globals.css";

// --- New Additions ---
import { Suspense } from "react";
import { ProgressBar } from "@/components/ProgressBar"; // We will create this component next
import "../styles/nprogress.css"; // We will also create this CSS file
// --- End New Additions ---

const fairyPlay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Authify ",
  description: "- Secure Authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${fairyPlay.variable} ${poppins.variable}  antialiased`}
      >
        {/* --- New Addition --- */}
        {/* This Suspense wrapper ensures the progress bar works with streaming */}
        <Suspense fallback={null}>
          <ProgressBar />
        </Suspense>
        {/* --- End New Addition --- */}

        {children}
      </body>
    </html>
  );
}