import { NextRequest, NextResponse } from 'next/server';
import { fal } from "@fal-ai/client";

if (!process.env.FAL_KEY) {
  throw new Error('FAL_KEY environment variable is not set');
}

fal.config({
  credentials: process.env.FAL_KEY
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, negative_prompt, aspect_ratio = "1:1", num_images = 1 } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const result = await fal.subscribe("fal-ai/imagen3", {
      input: {
        prompt,
        negative_prompt: negative_prompt || "",
        aspect_ratio,
        num_images: Math.min(Math.max(1, num_images), 4), // Ensure num_images is between 1 and 4
      },
      logs: true,
    });

    return NextResponse.json({
      images: result.data.images,
      seed: result.data.seed
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
