import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TRANSPARENCIA CONECTADA - Plataforma Digital de Transparencia y Participación Ciudadana",
  description: "Plataforma digital que acerca la información pública a la ciudadanía con perfiles institucionales, códigos QR y herramientas de participación ciudadana.",
  keywords: ["transparencia", "participación ciudadana", "gobierno abierto", "información pública", "códigos QR"],
  authors: [{ name: "Transparencia Conectada" }],
  openGraph: {
    title: "TRANSPARENCIA CONECTADA",
    description: "Plataforma digital de transparencia y participación ciudadana",
    url: "https://transparencia-conectada.com",
    siteName: "Transparencia Conectada",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TRANSPARENCIA CONECTADA",
    description: "Plataforma digital de transparencia y participación ciudadana",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
