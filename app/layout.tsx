import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bagaskara // Security Researcher",
  description:
    "Security researcher portfolio — web pentest, Firebase, source maps, OSINT. Critical findings and journey from Inspect Element.",
  openGraph: {
    title: "Bagaskara // Security Researcher",
    description:
      "Portfolio of a security researcher. Mass PII leaks, crypto key exposure, mass assignment, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <body className="font-mono antialiased bg-base text-slate-200">
        {children}
      </body>
    </html>
  );
}
