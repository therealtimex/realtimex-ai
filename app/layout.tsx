import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FloatingChat } from "@/components/floating-chat"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RealTimeX - The Future of AI Collaboration",
  description: "Create, share, and discover powerful AI agents for RealTimeX",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <div className="min-h-screen bg-white dark:bg-gray-950">
            <Header />
            <main>{children}</main>
            <Footer />
            <FloatingChat />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
