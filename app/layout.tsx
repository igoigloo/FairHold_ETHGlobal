import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { WalletProvider } from "@/components/wallet-provider"
import { DemoBanner } from "@/components/demo-banner"
import { GlobalErrorHandler } from "@/components/global-error-handler"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "FairHold - Smart Escrow for Service Agreements",
  description:
    "Secure payments with milestone releases, automated yield, and dispute protection. Your funds earn 4.1% APY while safely held in escrow.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        <GlobalErrorHandler />
        <WalletProvider>
          <DemoBanner />
          {children}
        </WalletProvider>
      </body>
    </html>
  )
}
