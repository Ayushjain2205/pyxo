"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Settings, Share2, Twitter, Instagram, Globe, TrendingUp, Coins, Sparkles, Heart } from "lucide-react"

export default function ProfilePage({ params }: { params: { username: string } }) {
  const [isFollowing, setIsFollowing] = useState(false)

  // Mock user data
  const user = {
    username: params.username,
    displayName: "Art Explorer",
    bio: "Digital artist exploring the boundaries between AI and human creativity. Creating unique tokenized Pyxes on PYXO.",
    followers: 1248,
    following: 356,
    joined: "November 2023",
    links: {
      twitter: "artexplorer",
      instagram: "artexplorer",
      website: "artexplorer.io",
    },
    stats: {
      created: 42,
      collected: 18,
      totalValue: "12.5 ETH",
      highestSale: "3.2 ETH",
    },
    creations: Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      title: `Cosmic Dreams #${i + 1}`,
      price: (Math.random() * 3 + 0.5).toFixed(2),
      likes: Math.floor(Math.random() * 100),
    })),
    collection: Array.from({ length: 4 }, (_, i) => ({
      id: i + 100,
      title: `Digital Landscape #${i + 1}`,
      creator: `creator${i + 1}`,
      price: (Math.random() * 2 + 0.2).toFixed(2),
    })),
    activity: [
      { type: "created", title: "Cosmic Dreams #42", time: "2 days ago" },
      { type: "sold", title: "Neon City #7", price: "1.8 ETH", time: "5 days ago" },
      { type: "bought", title: "Abstract Mind #3", price: "0.5 ETH", time: "1 week ago" },
      { type: "listed", title: "Digital Ocean #12", price: "2.4 ETH", time: "2 weeks ago" },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-48 md:h-64 rounded-lg overflow-hidden bg-gradient-to-r from-purple-900 to-pink-900">
          <Image src="/vibrant-flow.png" alt="Profile banner" fill className="object-cover opacity-60" />
        </div>

        <div className="absolute -bottom-16 left-4 md:left-8">
          <Avatar className="h-32 w-32 border-4 border-black">
            <AvatarImage
              src={`/diverse-professional-profiles.png?height=128&width=128&query=profile ${user.username}`}
            />
            <AvatarFallback>AE</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="mt-20 md:flex md:items-start md:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            <Badge variant="outline" className="text-purple-400 border-purple-400">
              Creator
            </Badge>
          </div>
          <p className="text-zinc-400">@{user.username}</p>
          <p className="max-w-2xl">{user.bio}</p>

          <div className="flex items-center gap-4 text-sm">
            <div>
              <span className="font-bold">{user.followers.toLocaleString()}</span>{" "}
              <span className="text-zinc-400">followers</span>
            </div>
            <div>
              <span className="font-bold">{user.following.toLocaleString()}</span>{" "}
              <span className="text-zinc-400">following</span>
            </div>
            <div className="text-zinc-400">Joined {user.joined}</div>
          </div>

          <div className="flex items-center gap-3 pt-1">
            {user.links.twitter && (
              <a
                href={`https://twitter.com/${user.links.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </a>
            )}
            {user.links.instagram && (
              <a
                href={`https://instagram.com/${user.links.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </a>
            )}
            {user.links.website && (
              <a
                href={`https://${user.links.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white"
              >
                <Globe className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        <div className="flex gap-2 mt-4 md:mt-0">
          <Button
            variant={isFollowing ? "outline" : "default"}
            className={
              isFollowing ? "" : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            }
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          {user.username === "artexplorer" && (
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <Card className="bg-zinc-900 border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-full">
              <Sparkles className="h-5 w-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Created</p>
              <p className="text-xl font-bold">{user.stats.created}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-500/10 rounded-full">
              <Heart className="h-5 w-5 text-pink-500" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Collected</p>
              <p className="text-xl font-bold">{user.stats.collected}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-full">
              <Coins className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Total Value</p>
              <p className="text-xl font-bold">{user.stats.totalValue}</p>
            </div>
          </div>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-full">
              <TrendingUp className="h-5 w-5 text-cyan-500" />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Highest Sale</p>
              <p className="text-xl font-bold">{user.stats.highestSale}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs Content */}
      <Tabs defaultValue="creations" className="mt-8">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="creations">Creations</TabsTrigger>
          <TabsTrigger value="collection">Collection</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="creations" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {user.creations.map((artwork) => (
              <Link href={`/artwork/${artwork.id}`} key={artwork.id} className="group">
                <Card className="overflow-hidden border-zinc-800 transition-all hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                  <div className="aspect-square relative">
                    <Image
                      src={`/abstract-geometric-shapes.png?height=300&width=300&query=${encodeURIComponent(artwork.title)}`}
                      alt={artwork.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 bg-zinc-900">
                    <h3 className="font-medium truncate">{artwork.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center space-x-1 text-zinc-400">
                        <Heart className="h-3 w-3" />
                        <span className="text-xs">{artwork.likes}</span>
                      </div>
                      <span className="text-sm font-semibold text-pink-500">{artwork.price} ETH</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="collection" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {user.collection.map((artwork) => (
              <Link href={`/artwork/${artwork.id}`} key={artwork.id} className="group">
                <Card className="overflow-hidden border-zinc-800 transition-all hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                  <div className="aspect-square relative">
                    <Image
                      src={`/abstract-geometric-shapes.png?height=300&width=300&query=${encodeURIComponent(artwork.title)}`}
                      alt={artwork.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-3 bg-zinc-900">
                    <h3 className="font-medium truncate">{artwork.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-zinc-400">by @{artwork.creator}</span>
                      <span className="text-sm font-semibold text-pink-500">{artwork.price} ETH</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <div className="space-y-4">
            {user.activity.map((item, index) => (
              <div key={index} className="flex items-center p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center mr-4">
                  {item.type === "created" && <Sparkles className="h-5 w-5 text-purple-400" />}
                  {item.type === "sold" && <TrendingUp className="h-5 w-5 text-green-400" />}
                  {item.type === "bought" && <Coins className="h-5 w-5 text-blue-400" />}
                  {item.type === "listed" && <Share2 className="h-5 w-5 text-yellow-400" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <p className="font-medium">
                      {item.type === "created" && "Created a new Pyx"}
                      {item.type === "sold" && "Sold a Pyx"}
                      {item.type === "bought" && "Bought a Pyx"}
                      {item.type === "listed" && "Listed a Pyx for sale"}
                    </p>
                    <span className="text-sm text-zinc-400 ml-auto">{item.time}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Link href={`/artwork/123`} className="text-sm text-purple-400 hover:underline">
                      {item.title}
                    </Link>
                    {item.price && <span className="text-sm font-medium text-green-500 ml-auto">{item.price}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">About {user.displayName}</h3>
                <p className="text-zinc-300">
                  Digital artist with a passion for exploring the intersection of AI and human creativity. I've been
                  creating digital art for over 5 years and recently started experimenting with AI-assisted generation
                  to push the boundaries of what's possible.
                </p>
                <p className="text-zinc-300 mt-2">
                  My work focuses on surreal landscapes and cosmic themes, often blending elements of science fiction
                  with dreamlike qualities. I believe in the power of tokenization to create new opportunities for
                  artists in the digital age.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Links</h3>
                <div className="space-y-2">
                  {user.links.twitter && (
                    <a
                      href={`https://twitter.com/${user.links.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-zinc-300 hover:text-purple-400"
                    >
                      <Twitter className="h-4 w-4 mr-2" />
                      twitter.com/{user.links.twitter}
                    </a>
                  )}
                  {user.links.instagram && (
                    <a
                      href={`https://instagram.com/${user.links.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-zinc-300 hover:text-purple-400"
                    >
                      <Instagram className="h-4 w-4 mr-2" />
                      instagram.com/{user.links.instagram}
                    </a>
                  )}
                  {user.links.website && (
                    <a
                      href={`https://${user.links.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-zinc-300 hover:text-purple-400"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      {user.links.website}
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Member Since</h3>
                <p className="text-zinc-300">{user.joined}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Creator Stats</h3>
                <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-zinc-400">Total Creations</p>
                      <p className="text-xl font-bold">{user.stats.created}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Total Sales</p>
                      <p className="text-xl font-bold">{user.stats.totalValue}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Highest Sale</p>
                      <p className="text-xl font-bold">{user.stats.highestSale}</p>
                    </div>
                    <div>
                      <p className="text-sm text-zinc-400">Avg. Sale Price</p>
                      <p className="text-xl font-bold">0.8 ETH</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Preferred Styles</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Cosmic</Badge>
                  <Badge variant="secondary">Surreal</Badge>
                  <Badge variant="secondary">Sci-Fi</Badge>
                  <Badge variant="secondary">Abstract</Badge>
                  <Badge variant="secondary">Dreamscape</Badge>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
