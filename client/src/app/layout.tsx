import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "../styles/globals.css";



const fairyPlay = Playfair_Display({
  variable : "--font-playfair-display",
  subsets: ["latin"]
})

const poppins = Poppins({
  variable : "--font-poppins",
  subsets : ["latin"],
  weight: ["400", "700"]
})

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
        {children}
      </body>
    </html>
  );
}
