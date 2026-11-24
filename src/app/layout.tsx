import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const heading = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const code = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
});

const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const DESCRIPTION =
  "Hey, I'm Odey. I mostly build trading stuff and data apps in C++ and Python. CS student at UT Tyler.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Odey Jeffs | Software Engineer",
  description: DESCRIPTION,
  openGraph: {
    title: "Odey Jeffs",
    description: DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Odey Jeffs",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${body.variable} ${heading.variable} ${code.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
