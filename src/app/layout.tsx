import type { Metadata } from "next";
import AnimatedBackground from "@/components/AnimatedBackground";
import "./globals.css";

export const metadata: Metadata = {
  title: "Franck Kibwe — Software Engineering & Systems Portfolio",
  description: "Multidisciplinary Systems Developer exploring local-first architectures, communication protocols, operating system APIs, and deep engineering challenges.",
  keywords: ["Software Engineering", "Systems Engineering", "Rust", "TypeScript", "Next.js", "React", "Tauri", "WebRTC", "Bluetooth"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#0B0D11] text-[#E2E2E8] relative">
        <AnimatedBackground />
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
