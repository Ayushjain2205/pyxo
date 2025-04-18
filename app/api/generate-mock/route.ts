import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Simulate a short delay to mimic API latency
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      images: [{
        url: "https://v3.fal.media/files/monkey/EpOM8vFtTJ72XnErKoW_M_output.png"
      }],
      seed: 12345
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
