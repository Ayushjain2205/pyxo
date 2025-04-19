import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Sparkles, Coins } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function HomePage() {
  // Mock data for trending styles
  const trendingStyles = [
    {
      name: "Cushion style",
      growth: "+24%",
      image:
        "https://pbs.twimg.com/media/Gozbnk3bkAAFW43?format=jpg&name=medium",
    },
    {
      name: "Furry Style",
      growth: "+18%",
      image:
        "https://pbs.twimg.com/media/GopcqUzXoAAVdm8?format=jpg&name=medium",
    },
    {
      name: "Ghibli",
      growth: "+15%",
      image:
        "https://pbs.twimg.com/media/GnTQ3-SWQAAQs6E?format=jpg&name=medium",
    },
    {
      name: "Toy box",
      growth: "+12%",
      image:
        "https://pbs.twimg.com/media/Goii5fNXMAAejOA?format=jpg&name=large",
    },
  ];

  // Latest creations data
  const latestCreations = [
    {
      id: 1,
      title: "Spotify Cushion",
      price: "0.0089",
      image:
        "https://pbs.twimg.com/media/GovVexdWUAE4OBS?format=jpg&name=medium",
    },
    {
      id: 2,
      title: "Duolingo Cushion",
      price: "0.0092",
      image:
        "https://pbs.twimg.com/media/GovVczjXMAAQ55a?format=jpg&name=medium",
    },
    {
      id: 3,
      title: "Crying Cushion",
      price: "0.0092",
      image:
        "https://pbs.twimg.com/media/GovVgu3WcAEBA0n?format=jpg&name=medium",
    },
    {
      id: 4,
      title: "Uno Cushion",
      price: "0.0092",
      image:
        "https://pbs.twimg.com/media/Go0cSuDXQAAMxub?format=jpg&name=medium",
    },
    {
      id: 5,
      title: "Laughing Cushion",
      price: "0.0092",
      image:
        "https://pbs.twimg.com/media/GozboC9aUAAejK7?format=jpg&name=medium",
    },
    {
      id: 6,
      title: "Siggy Furry",
      price: "0.0092",
      image:
        "https://pbs.twimg.com/media/GofGLQyaoAAtT_y?format=jpg&name=medium",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Trending Styles */}
      <section className="relative w-full h-screen flex flex-col justify-center bg-gradient-to-b from-violet-50 to-white overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto flex flex-col h-full justify-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter gradient-text font-display mb-4">
              AI Media at the Speed of Trends
            </h1>
            <p className="max-w-[700px] mx-auto text-slate-600 md:text-xl">
              Create, remix, and drop viral‑ready memes and mini‑clips before
              the trend cools off
            </p>
          </div>

          <div className="mb-6 flex items-center justify-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-100 text-violet-800">
              <TrendingUp className="h-4 w-4 mr-2" />
              <span className="font-medium">Trending Styles Right Now</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trendingStyles.map((style, index) => (
              <Link
                href={`/create?style=${style.name.toLowerCase()}`}
                key={index}
                className="group"
              >
                <div
                  className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all card-hover h-full"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-square relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src={
                        style.image ||
                        `/placeholder.svg?height=300&width=300&query=${style.name} style art`
                      }
                      alt={style.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <div className="flex justify-between items-center">
                        <h3 className="font-display font-medium">
                          {style.name}
                        </h3>
                        <span className="text-sm font-medium text-green-400 flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {style.growth}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <Link href="/create">
              <Button size="lg" className="gradient-bg hover:opacity-90">
                Make Your First Pyx <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Subtle background elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-fuchsia-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </section>

      {/* Latest Creations Section */}
      <section className="w-full py-12 bg-slate-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-display">
              Latest Creations
            </h2>
            <Link href="/marketplace">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestCreations.map((artwork) => (
              <Card
                key={artwork.id}
                className="overflow-hidden border-slate-200 transition-all card-hover"
              >
                <div className="aspect-square relative">
                  <Image
                    src={
                      artwork.image ||
                      `/placeholder.svg?height=400&width=400&query=${
                        encodeURIComponent(artwork.title) || "/placeholder.svg"
                      }`
                    }
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>

                <div className="p-4 bg-white">
                  <h3 className="font-medium text-slate-900 truncate font-display">
                    {artwork.title}
                  </h3>

                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100">
                    <div className="text-sm font-semibold text-fuchsia-600">
                      ${artwork.price}
                    </div>
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
        </div>
      </section>
    </div>
  );
}
