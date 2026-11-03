import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Furia Menor | Periódico Digital de Fútbol Menor en Caracas",
  description:
    "Cobertura integral de ligas, torneos, escuelas, academias y categorías infantiles/juveniles en Caracas. Noticias, resultados, tablas, entrevistas, galería y más. Proyección nacional.",
  keywords: [
    "fútbol menor",
    "fútbol base",
    "Caracas",
    "torneos infantiles",
    "academias de fútbol",
    "Sub-6",
    "Sub-12",
    "Sub-18",
    "futsal",
    "Venezuela",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
