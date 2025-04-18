"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Sparkles, Loader2, Share2, Coins } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function CreatePage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImage, setGeneratedImage] = useState("")
  const [showCoinDialog, setShowCoinDialog] = useState(false)
  const [tokenName, setTokenName] = useState("")
  const [tokenSymbol, setTokenSymbol] = useState("")
  const [isCoining, setIsCoining] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const styleOptions = [
    "Cyberpunk",
    "Anime",
    "Vaporwave",
    "Pixel Art",
    "Renaissance",
    "Impressionist",
    "Watercolor",
    "3D Render",
    "Neon",
    "Minimalist",
  ]

  const handleGenerate = async () => {
    if (!prompt) return;

    setIsGenerating(true);
    try {
      let response;
      if (selectedImage && imagePreview) {
        // Send Data URI as image_url for image-to-image
        response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            image_url: imagePreview, // Data URI
            aspect_ratio: "1:1",
            num_images: 1
          }),
        });
      } else {
        // Text-to-image as before
        response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            aspect_ratio: "1:1",
            num_images: 1
          }),
        });
      }

      const data = await response.json();
      if (data.images && Array.isArray(data.images) && data.images[0]?.url) {
        setGeneratedImage(data.images[0].url);
      } else {
        console.error('No images returned from API:', data);
        // Optionally show a toast or error UI here
      }
    } catch (error) {
      console.error('Error generating image:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsGenerating(false);
    }
  }

  const handleCoinSubmit = () => {
    if (!tokenName || !tokenSymbol) return

    setIsCoining(true)

    // Simulate coining process
    setTimeout(() => {
      setIsCoining(false)
      setShowCoinDialog(false)
      // Here you would typically redirect to the artwork page or show a success message
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 gradient-text font-display">Create a Pyx</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Tabs defaultValue="prompt" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="prompt">Text Prompt</TabsTrigger>
              <TabsTrigger value="style">Style Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="prompt" className="space-y-4">
              <Textarea
                placeholder="Describe the Pyx you want to create..."
                className="min-h-[120px] resize-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />

              {/* Image upload for img2img */}
              <div className="flex flex-col gap-2 mt-2">
                <Label htmlFor="image-upload">(Optional) Upload an Image for Image-to-Image</Label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files && e.target.files[0];
                    setSelectedImage(file || null);
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => setImagePreview(ev.target?.result as string || "");
                      reader.readAsDataURL(file);
                    } else {
                      setImagePreview("");
                    }
                  }}
                />
                {imagePreview && (
                  <div className="mt-2">
                    <Image src={imagePreview} alt="Preview" width={200} height={200} className="rounded border" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Creativity Level</Label>
                  <span className="text-sm text-slate-500">7.5</span>
                </div>
                <Slider defaultValue={[75]} max={100} step={1} />
              </div>
            </TabsContent>

            <TabsContent value="style" className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {styleOptions.map((style, index) => (
                  <Card
                    key={index}
                    className={`cursor-pointer hover:border-violet-300 hover:shadow-md transition-all ${prompt === style ? "border-violet-500 ring-1 ring-violet-500" : ""}`}
                    onClick={() => setPrompt(style)}
                  >
                    <CardContent className="p-3 text-center">
                      <div className="aspect-square relative mb-2 rounded overflow-hidden">
                        <Image
                          src={`/abstract-geometric-shapes.png?height=100&width=100&query=${style} style art`}
                          alt={style}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm font-medium">{style}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Textarea
                placeholder="Add details to your selected style..."
                className="min-h-[80px] resize-none"
                value={prompt !== styleOptions.find((s) => s === prompt) ? prompt : ""}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </TabsContent>
          </Tabs>

          <Button
            className="w-full gradient-bg hover:opacity-90"
            size="lg"
            onClick={handleGenerate}
            disabled={!prompt || isGenerating}
            type="button"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Pyx
              </>
            )}
          </Button>

          <div className="text-xs text-slate-500 text-center">
            By generating a Pyx, you agree to our{" "}
            <Link href="/terms" className="underline hover:text-slate-800">
              Terms of Service
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 h-full min-h-[400px] flex flex-col shadow-sm">
            {generatedImage ? (
              <>
                <div className="relative flex-grow rounded-lg overflow-hidden bg-slate-100">
                  <Image
                    src={generatedImage || "/placeholder.svg"}
                    alt="Generated Pyx"
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="default"
                    className="w-full gradient-bg hover:opacity-90 flex-1"
                    onClick={() => setShowCoinDialog(true)}
                  >
                    <Coins className="mr-2 h-4 w-4" />
                    Coin it
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6 text-slate-500">
                <Sparkles className="h-12 w-12 mb-4 opacity-20" />
                <h3 className="text-lg font-medium mb-2 font-display">Your Pyx will appear here</h3>
                <p className="text-sm max-w-md">
                  Enter a detailed prompt or select a style template to generate your unique Pyx
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Coin Dialog */}
      <Dialog open={showCoinDialog} onOpenChange={setShowCoinDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="font-display">Coin Your Pyx</DialogTitle>
            <DialogDescription>
              Turn your creation into a tradable token by providing the following details.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="flex justify-center">
              <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-slate-200">
                <Image src={generatedImage || "/placeholder.svg"} alt="Generated Pyx" fill className="object-cover" />
              </div>
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="token-name">Token Name</Label>
                <Input
                  id="token-name"
                  placeholder="e.g., Cosmic Dreams"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="token-symbol">Token Symbol</Label>
                <Input
                  id="token-symbol"
                  placeholder="e.g., CSMX"
                  maxLength={5}
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
                />
                <p className="text-xs text-slate-500">Maximum 5 characters, uppercase letters only.</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCoinDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCoinSubmit}
              disabled={!tokenName || !tokenSymbol || isCoining}
              className="gradient-bg hover:opacity-90"
            >
              {isCoining ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Coins className="mr-2 h-4 w-4" />
                  Confirm & Coin
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
