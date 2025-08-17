"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: number
  error: string | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(true) // Mock connected state
  const [address] = useState("0x1234567890abcdef1234567890abcdef12345678") // Mock address
  const [balance] = useState(2325.25) // Mock balance
  const [error, setError] = useState<string | null>(null)

  const connectWallet = async () => {
    try {
      // Mock connection - no real wallet interaction
      console.log("[FairHold] Mock wallet connection - no real wallet needed for demo")
      setIsConnected(true)
      setError(null)
    } catch (err) {
      console.log("[FairHold] Wallet connection prevented - this is a demo application")
      setError("Demo mode - no real wallet connection required")
    }
  }

  const disconnectWallet = () => {
    // Mock disconnection
    console.log("[FairHold] Mock wallet disconnection")
    setIsConnected(false)
    setError(null)
  }

  useEffect(() => {
    const preventWalletDetection = () => {
      if (typeof window !== "undefined") {
        console.log("[FairHold] Demo mode - wallet detection disabled")
      }
    }

    preventWalletDetection()
  }, [])

  const value: WalletContextType = {
    isConnected,
    address,
    balance,
    error,
    connectWallet,
    disconnectWallet,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
