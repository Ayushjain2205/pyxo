import type React from "react"
import "./globals.css"
import { Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

export const metadata = {
  title: "PYXO - AI Media Generation Platform",
  description: "Create, share, and buy amazing Pyxes on the PYXO platform.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-sans bg-[#FAFAFA] text-slate-800 min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-200 py-4">
            <div className="container mx-auto px-4 text-center">
              <a
                href="https://iyushjain.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-violet-600 transition-colors inline-flex items-center"
              >
                Made with <span className="text-red-500 mx-1">❤️</span> by Ayush Jain
              </a>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
