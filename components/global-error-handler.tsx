"use client"

import { useEffect } from "react"

export function GlobalErrorHandler() {
  useEffect(() => {
    // Global error suppression for wallet-related errors
    const handleError = (event: ErrorEvent) => {
      const message = event.message || event.error?.message || ""
      if (
        message.includes("MetaMask") ||
        message.includes("ethereum") ||
        message.includes("wallet") ||
        message.includes("Failed to connect")
      ) {
        console.log("[FairHold] Suppressed wallet error in demo mode:", message)
        event.preventDefault()
        return false
      }
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason
      const message = typeof reason === "string" ? reason : reason?.message || ""

      if (
        message.includes("MetaMask") ||
        message.includes("ethereum") ||
        message.includes("wallet") ||
        message.includes("Failed to connect") ||
        message === "s: Failed to connect to MetaMask"
      ) {
        console.log("[FairHold] Suppressed wallet promise rejection in demo mode:", message)
        event.preventDefault()
        return false
      }
    }

    // Add global error handlers
    window.addEventListener("error", handleError)
    window.addEventListener("unhandledrejection", handleUnhandledRejection)

    // Override window.ethereum to prevent external wallet detection
    if (typeof window !== "undefined") {
      Object.defineProperty(window, "ethereum", {
        value: undefined,
        writable: false,
        configurable: false,
      })

      // Also block common wallet detection patterns
      Object.defineProperty(window, "web3", {
        value: undefined,
        writable: false,
        configurable: false,
      })
    }

    return () => {
      window.removeEventListener("error", handleError)
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
    }
  }, [])

  return null
}
