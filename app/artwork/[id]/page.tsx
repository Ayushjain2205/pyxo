"use client"

import { Input } from "@/components/ui/input"

import { DialogFooter } from "@/components/ui/dialog"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Share2, ArrowUpDown, Wallet, Loader2, Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function ArtworkPage({ params }: { params: { id: string } }) {
  const [liked, setLiked] = useState(false)
  const [showBuyDialog, setShowBuyDialog] = useState(false)
  const [showSellDialog, setShowSellDialog] = useState(false)
  const [isOwner, setIsOwner] = useState(false)

  const artwork = {
    id: params.id,
    title: "Cosmic Dreams #42",
    description:
      "A mesmerizing journey through the cosmos, where dreams and reality intertwine in a dance of colors and light. This piece explores the boundaries between the conscious and subconscious mind.",
    creator: "artexplorer",
    owner: "collector23",
    walletAddress: "0x1a2b3c4d5e6f7g8h9i0j",
    price: "240",
    currency: "USD",
    likes: 128,
    views: 1024,
    createdAt: "2023-11-15",
    style: "Cosmic",
    priceHistory: [
      { date: "Nov 15", price: 100 },
      { date: "Nov 18", price: 150 },
      { date: "Nov 22", price: 180 },
      { date: "Nov 25", price: 210 },
      { date: "Nov 28", price: 240 },
    ],
  }

  const truncateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-white shadow-md">
            <Image
              src={`/abstract-geometric-shapes.png?key=gbkh3&height=800&width=800&query=${encodeURIComponent(artwork.title)}`}
              alt={artwork.title}
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="flex justify-between">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                className={liked ? "text-pink-500 border-pink-500" : ""}
                onClick={() => setLiked(!liked)}
              >
                <Heart className="h-4 w-4 mr-1" />
                {liked ? "Liked" : "Like"}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-violet-600 border-violet-600">
                {artwork.style}
              </Badge>
              <div className="text-sm text-slate-500">Created {artwork.createdAt}</div>
            </div>

            <h1 className="text-3xl font-bold mt-2 font-display">{artwork.title}</h1>

            <div className="flex items-center mt-4">
              <div className="flex items-center">
                <Wallet className="h-4 w-4 text-slate-400 mr-2" />
                <div>
                  <p className="text-sm text-slate-500">Creator</p>
                  <p className="text-sm font-medium">
                    @{artwork.creator} ({truncateAddress(artwork.walletAddress)})
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-500">Current Price</p>
                <p className="text-2xl font-bold font-display">${artwork.price}</p>
              </div>

              <div className="text-right">
                <p className="text-sm text-slate-500">Price Change</p>
                <div className="flex items-center justify-end">
                  <ArrowUpDown className="h-3 w-3 text-green-500 mr-1" />
                  <p className="text-sm text-green-500">+12.5% this week</p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Price History</p>
              <div className="h-24 relative">
                <div className="absolute inset-0">
                  <svg className="w-full h-full">
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    <path
                      d={`M0,${24 - artwork.priceHistory[0].price / 3} ${artwork.priceHistory
                        .map((point, i) => {
                          const x = (i / (artwork.priceHistory.length - 1)) * 100 + "%"
                          const y = 24 - point.price / 3
                          return `L${x},${y}`
                        })
                        .join(" ")}`}
                      fill="none"
                      stroke="rgb(139, 92, 246)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d={`M0,${24 - artwork.priceHistory[0].price / 3} ${artwork.priceHistory
                        .map((point, i) => {
                          const x = (i / (artwork.priceHistory.length - 1)) * 100 + "%"
                          const y = 24 - point.price / 3
                          return `L${x},${y}`
                        })
                        .join(" ")} L100%,24 L0,24 Z`}
                      fill="url(#gradient)"
                    />
                  </svg>
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-400">
                  {artwork.priceHistory.map((point, i) => (
                    <span key={i}>{point.date}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {isOwner ? (
                <Button className="gradient-bg hover:opacity-90" onClick={() => setShowSellDialog(true)}>
                  Sell
                </Button>
              ) : (
                <Button className="gradient-bg hover:opacity-90" onClick={() => setShowBuyDialog(true)}>
                  Buy Now
                </Button>
              )}
              <Link href={`/create?remix=${artwork.id}`}>
                <Button
                  variant="outline"
                  className="w-full hover:bg-violet-500 hover:text-white hover:border-violet-500 transition-colors"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Remix
                </Button>
              </Link>
            </div>
          </div>

          <Card className="p-4">
            <h3 className="font-medium mb-2 font-display">Description</h3>
            <p className="text-slate-600">{artwork.description}</p>
          </Card>
        </div>
      </div>

      <BuyDialog
        open={showBuyDialog}
        onOpenChange={setShowBuyDialog}
        artwork={artwork}
        onSuccess={() => setIsOwner(true)}
      />

      <SellDialog open={showSellDialog} onOpenChange={setShowSellDialog} artwork={artwork} />
    </div>
  )
}

function BuyDialog({ open, onOpenChange, artwork, onSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleBuy = () => {
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      onOpenChange(false)
      onSuccess()
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="font-display">Buy Pyx</DialogTitle>
          <DialogDescription>Purchase this Pyx to add it to your collection.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-200">
              <Image
                src={`/abstract-geometric-shapes.png?key=afx77&height=80&width=80&query=${encodeURIComponent(artwork.title)}`}
                alt={artwork.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{artwork.title}</h3>
              <p className="text-sm text-slate-500">by @{artwork.creator}</p>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm">Price</span>
              <span className="font-semibold">${artwork.price}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm">Transaction Fee</span>
              <span className="text-sm">${(Number.parseFloat(artwork.price) * 0.025).toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-200 mt-2 pt-2 flex justify-between items-center">
              <span className="font-medium">Total</span>
              <span className="font-semibold">${(Number.parseFloat(artwork.price) * 1.025).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleBuy} disabled={isProcessing} className="gradient-bg hover:opacity-90">
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm Purchase"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function SellDialog({ open, onOpenChange, artwork }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [price, setPrice] = useState(artwork.price)

  const handleSell = () => {
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      onOpenChange(false)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="font-display">List for Sale</DialogTitle>
          <DialogDescription>Set a price and list this Pyx for sale on the marketplace.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-slate-200">
              <Image
                src={`/abstract-geometric-shapes.png?key=h5ahm&height=80&width=80&query=${encodeURIComponent(artwork.title)}`}
                alt={artwork.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium">{artwork.title}</h3>
              <p className="text-sm text-slate-500">by @{artwork.creator}</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Sale Price ($)</Label>
            <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="1" step="1" />
            <p className="text-xs text-slate-500">
              You'll receive ${(Number.parseFloat(price) * 0.975).toFixed(2)} after platform fees (2.5%)
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSell} disabled={isProcessing} className="gradient-bg hover:opacity-90">
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "List for Sale"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
