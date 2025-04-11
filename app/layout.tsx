import type React from "react"
import type { Metadata } from "next"
import { Inter, Quicksand } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import NavbarWrapper from "@/components/NavbarWrapper"

// Load fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
})

export const metadata: Metadata = {
  title: "Journal Quest - Archetypal Journaling",
  description: "Unlock the hidden patterns of your mind with archetypal journaling",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${quicksand.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-parchment-light">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <NavbarWrapper />
          {/* ✅ Only layout content margin goes here */}
          <main className="lg:ml-[15vw]">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
