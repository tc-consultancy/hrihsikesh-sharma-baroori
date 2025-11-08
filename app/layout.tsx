import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Priyanshu Tiwari - Full-Stack Developer",
  description: "Full-stack developer creating exceptional digital experiences with modern web technologies.",
  keywords: "full-stack developer, react, next.js, typescript, web development",
  authors: [{ name: "Priyanshu Tiwari" }],
  openGraph: {
    title: "Priyanshu Tiwari - Full-Stack Developer",
    description: "Creating exceptional digital experiences",
    type: "website",
  },
  icons:{
    icon:'/logo.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
