"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Wallet, Sparkles } from "lucide-react"
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

declare global {
  interface Window {
    ethereum?: any
  }
}

export default function Navbar() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string>('')
  const pathname = usePathname()

  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!')
      return
    }

    try {
      const walletClient = createWalletClient({
        chain: mainnet,
        transport: custom(window.ethereum)
      })

      const [address] = await walletClient.requestAddresses()
      setAddress(address)
      setIsConnected(true)
    } catch (error) {
      console.error('Error connecting wallet:', error)
      setIsConnected(false)
      setAddress('')
    }
  }

  const navItems = [
    { name: "Create", path: "/create" },
    { name: "Discover", path: "/marketplace" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 mr-8">
            <div className="relative h-8 w-8 overflow-hidden">
              <div className="absolute inset-0 rounded-full gradient-bg flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M12 3L17.5 6.5V14.5L12 18L6.5 14.5V6.5L12 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="rgba(255,255,255,0.2)"
                  />
                  <path d="M12 8L14.5 9.5V12.5L12 14L9.5 12.5V9.5L12 8Z" fill="currentColor" />
                  <circle cx="12" cy="3" r="1" fill="currentColor" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                  <circle cx="17.5" cy="14.5" r="1" fill="currentColor" />
                  <circle cx="12" cy="18" r="1" fill="currentColor" />
                  <circle cx="6.5" cy="14.5" r="1" fill="currentColor" />
                  <circle cx="6.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </div>
            </div>
            <span className="text-xl font-display font-bold">PYXO</span>
          </Link>

          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link href={item.path} key={item.path}>
                <div
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.path
                      ? "text-violet-700 bg-violet-50"
                      : "text-slate-600 hover:text-violet-700 hover:bg-violet-50/50"
                  }`}
                >
                  {item.name === "Create" && <Sparkles className="inline-block h-3 w-3 mr-1" />}
                  {item.name}
                </div>
              </Link>
            ))}
          </nav>
        </div>

        <Button
          onClick={handleConnectWallet}
          className={isConnected ? "bg-green-500 hover:bg-green-600" : "gradient-bg hover:opacity-90"}
        >
          <Wallet className="mr-2 h-4 w-4" />
          {isConnected ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
        </Button>
      </div>
    </header>
  )
}
