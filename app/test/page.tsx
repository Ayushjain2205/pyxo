"use client";

import { useState } from "react";
import { createCoin } from "@zoralabs/coins-sdk";
import {
  createPublicClient,
  createWalletClient,
  custom,
  http,
  Address,
} from "viem";
import { base } from "viem/chains";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function TestPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    uri: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCoin = async () => {
    if (!window.ethereum) {
      toast({
        title: "Error",
        description: "Please install MetaMask!",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCreating(true);

      // Set up viem public client
      const publicClient = createPublicClient({
        chain: base,
        transport: http(process.env.NEXT_PUBLIC_RPC_URL),
      });

      // Get the connected wallet address
      const [address] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Define coin parameters
      const coinParams = {
        name: formData.name,
        symbol: formData.symbol,
        uri: formData.uri,
        payoutRecipient: address as Address,
        initialPurchaseWei: BigInt(0),
      };

      // Create wallet client using the connected wallet
      const walletClient = createWalletClient({
        account: address as Address,
        chain: base,
        transport: custom(window.ethereum),
      });

      // Create the coin
      const result = await createCoin(coinParams, walletClient, publicClient);

      toast({
        title: "Success!",
        description: `Coin created! Transaction hash: ${result.hash}`,
      });

      console.log("Transaction hash:", result.hash);
      console.log("Coin address:", result.address);
      console.log("Deployment details:", result.deployment);
    } catch (error: any) {
      console.error("Error creating coin:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create coin",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Test Zora Coin Creation</h1>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Coin Name</Label>
          <Input
            id="name"
            placeholder="My Awesome Coin"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="symbol">Symbol</Label>
          <Input
            id="symbol"
            placeholder="MAC"
            value={formData.symbol}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, symbol: e.target.value }))
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="uri">Metadata URI</Label>
          <Input
            id="uri"
            placeholder="ipfs://..."
            value={formData.uri}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, uri: e.target.value }))
            }
          />
          <p className="text-sm text-slate-500">
            This should be an IPFS URI containing your coin&apos;s metadata
          </p>
        </div>

        <Button
          onClick={handleCreateCoin}
          disabled={
            isCreating || !formData.name || !formData.symbol || !formData.uri
          }
          className="w-full"
        >
          {isCreating ? "Creating..." : "Create Coin"}
        </Button>
      </div>
    </div>
  );
}
