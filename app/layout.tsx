import type { Metadata } from "next";
import { Cinzel, Pixelify_Sans, Spectral } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  weight: ["700", "900"],
  subsets: ["latin"],
});

const pixelify = Pixelify_Sans({
  variable: "--font-pixelify",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const spectral = Spectral({
  variable: "--font-spectral",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shubham Kumar — Full-Stack Engineer",
  description:
    "The character sheet of Shubham Kumar: full-stack engineer and AI-integrations developer, rendered in the menu system of a 16-bit classic. Python, TypeScript, Next.js, agentic LLM workflows, RAG, deployment.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${pixelify.variable} ${spectral.variable} h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
