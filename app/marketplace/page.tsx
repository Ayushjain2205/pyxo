"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, TrendingUp, Clock, Sparkles, Coins } from "lucide-react"

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for artwork listings
  const artworks = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    title: `${["Dreamy", "Digital", "Neon", "Abstract", "Pixel", "Surreal"][i % 6]} ${["Landscape", "Portrait", "World", "Dimension", "Dreams", "Visions"][i % 6]} #${i + 1}`,
    creator: `creator${i + 1}`,
    price: (Math.random() * 25 + 5).toFixed(0),
    likes: Math.floor(Math.random() * 100),
    isNew: i < 3,
    isTrending: i % 4 === 0,
  }))

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 gradient-text font-display">Discover Amazing Pyxes</h1>

      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search Pyxes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select defaultValue="trending">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="trending">
              <div className="flex items-center">
                <TrendingUp className="mr-2 h-4 w-4" />
                Trending
              </div>
            </SelectItem>
            <SelectItem value="newest">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Newest
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="following">Following</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Artwork Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artworks.map((artwork) => (
          <Card key={artwork.id} className="overflow-hidden border-slate-200 transition-all card-hover">
            <div className="aspect-square relative">
              <Image
                src={`/abstract-geometric-shapes.png?height=400&width=400&query=${encodeURIComponent(artwork.title)}`}
                alt={artwork.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />

              {artwork.isNew && (
                <div className="absolute top-2 left-2 bg-violet-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                  New
                </div>
              )}

              {artwork.isTrending && (
                <div className="absolute top-2 right-2 bg-fuchsia-500 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trending
                </div>
              )}
            </div>

            <div className="p-4 bg-white">
              <h3 className="font-medium text-slate-900 truncate font-display">{artwork.title}</h3>

              <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                <div className="text-sm font-semibold text-fuchsia-600">${artwork.price}</div>
                <div className="flex space-x-2">
                  <Link href={`/create?remix=${artwork.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 hover:bg-violet-500 hover:text-white hover:border-violet-500 transition-colors"
                    >
                      <Sparkles className="h-3 w-3 mr-1" /> Remix
                    </Button>
                  </Link>
                  <Link href={`/artwork/${artwork.id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-8 hover:bg-fuchsia-500 hover:text-white hover:border-fuchsia-500 transition-colors"
                    >
                      <Coins className="h-3 w-3 mr-1" /> Buy
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-8">
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  )
}
