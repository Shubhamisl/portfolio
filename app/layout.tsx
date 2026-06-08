import type { Metadata } from "next";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const pixel = Press_Start_2P({
  variable: "--font-pixel",
  weight: "400",
  subsets: ["latin"],
});

const retro = VT323({
  variable: "--font-retro",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shubham Kumar — Full-Stack Engineer",
  description:
    "The character sheet of Shubham Kumar: full-stack engineer and AI-integrations developer. Python, TypeScript, Next.js, agentic LLM workflows, RAG, and end-to-end deployment.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${pixel.variable} ${retro.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
