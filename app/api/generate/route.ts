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
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      // Parse multipart form
      const formData = await request.formData();
      const promptValue = formData.get('prompt');
      if (!promptValue || typeof promptValue !== 'string' || promptValue.trim() === '') {
        return NextResponse.json(
          { error: "Prompt is required for image generation." },
          { status: 400 }
        );
      }
      const prompt = promptValue.trim();
      const image = formData.get('image') as File | null;
      const aspect_ratio = formData.get('aspect_ratio') as string || '1:1';
      const num_images = parseInt(formData.get('num_images') as string || '1', 10);

      if (!prompt) {
        return NextResponse.json(
          { error: "Prompt is required" },
          { status: 400 }
        );
      }
      if (!image) {
        return NextResponse.json(
          { error: "Image file is required for image-to-image generation." },
          { status: 400 }
        );
      }

      // Log file metadata for diagnostics
      if (image && typeof image === 'object') {
        console.log('Image file details:', {
          name: (image as any).name,
          type: (image as any).type,
          size: (image as any).size
        });
      }
      // Use fetch to call Fal API directly
      const FAL_KEY = process.env.FAL_KEY;
      if (!FAL_KEY) {
        return NextResponse.json({ error: "FAL_KEY environment variable is not set" }, { status: 500 });
      }
      const imageUrl = formData.get('image_url') || formData.get('image_url') || formData.get('image') || undefined;
      // If an image file was uploaded, you should upload it to a public host (e.g., Fal storage, S3, etc.) and use that URL here.
      // For now, we expect the frontend to provide a public image_url, or you can add Fal storage upload logic if you want file uploads.
      // If image_url is a Data URI, use it; else fallback to formData.get('image_url')
      // First get the FormData value (type: FormDataEntryValue | null)
      const formDataImage = formData.get('image_url');

      // Then extract the URL for the payload (type: string | undefined)
      let image_url_for_payload: string | undefined;

      if (typeof formDataImage === 'string') {
        image_url_for_payload = formDataImage;
      } else {
        image_url_for_payload = undefined;
      }

      // Ensure prompt is never empty in the payload
      const payload = {
        prompt: prompt,  // We've already validated it's non-empty
        image_url: image_url_for_payload,
        num_images: Math.min(Math.max(1, num_images), 4)
      };
      
      const modelUsed = 'fal-ai/flux/dev/image-to-image';
      console.log(`[FAL] Using model: ${modelUsed}`);
      console.log('[FAL] Prompt:', payload.prompt);
      console.log('[FAL] image_url:', image_url_for_payload ? image_url_for_payload.slice(0, 60) + '...' : 'undefined');
      console.log('Payload sent to Fal via fetch:', payload);
      try {
        const response = await fetch('https://queue.fal.run/fal-ai/flux/dev/image-to-image', {
          method: 'POST',
          headers: {
            'Authorization': `Key ${FAL_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
        const data = await response.json();
        if (!response.ok) {
          console.error('Fal API error:', data);
          return NextResponse.json({ error: 'Fal API error', details: data }, { status: response.status });
        }
        return NextResponse.json(data);
      } catch (falError: any) {
        console.error('Fal API error:', falError);
        return NextResponse.json(
          { error: "Fal API error", details: falError },
          { status: 422 }
        );
      }
    } else {
      // JSON body (text-to-image or image-to-image with Data URI)
      const body = await request.json();
      const { prompt, image_url, negative_prompt, aspect_ratio = "1:1", num_images = 1 } = body;

      if (!prompt) {
        return NextResponse.json(
          { error: "Prompt is required" },
          { status: 400 }
        );
      }

      if (image_url && typeof image_url === 'string' && image_url.startsWith('data:')) {
        // Use image-to-image model with Data URI
        const modelUsed = 'fal-ai/flux/dev/image-to-image';
        console.log(`[FAL] Using model: ${modelUsed}`);
        const payload = {
          prompt: prompt || '',
          image_url,
          num_images: Math.min(Math.max(1, num_images), 4)
        };
        console.log('[FAL] Prompt:', payload.prompt);
        async function pollFalStatus(statusUrl: string, falKey: string, timeoutMs = 20000, intervalMs = 1000) {
          const start = Date.now();
          while (Date.now() - start < timeoutMs) {
            const res = await fetch(statusUrl, {
              headers: { 'Authorization': `Key ${falKey}` }
            });
            const data = await res.json();
            console.log('[FAL] Polling status:', JSON.stringify(data));
            if (data.status === 'COMPLETED') {
              if (data.images && data.images.length > 0) {
                return data;
              }
              // If images are not present, fetch the response_url for the final result
              if (data.response_url) {
                const res2 = await fetch(data.response_url, {
                  headers: { 'Authorization': `Key ${falKey}` }
                });
                const finalData = await res2.json();
                if (finalData.images && finalData.images.length > 0) {
                  return finalData;
                }
                // If still no images, return what we got for debugging
                return finalData;
              }
              // If no response_url, return what we got
              return data;
            }
            if (data.status === 'FAILED' || data.status === 'CANCELLED') {
              throw new Error(data.error || 'Fal request failed');
            }
            await new Promise(r => setTimeout(r, intervalMs));
          }
          throw new Error('Fal request timed out');
        }

        try {
          const response = await fetch('https://queue.fal.run/fal-ai/flux/dev/image-to-image', {
            method: 'POST',
            headers: {
              'Authorization': `Key ${process.env.FAL_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
          const data = await response.json();
          if (!response.ok) {
            console.error('Fal API error:', data);
            return NextResponse.json({ error: 'Fal API error', details: data }, { status: response.status });
          }
          // Handle async queue: poll status_url if present
          if (data.status === 'IN_QUEUE' && data.status_url) {
            try {
              const finalData = await pollFalStatus(data.status_url, process.env.FAL_KEY!);
              return NextResponse.json(finalData);
            } catch (pollError: any) {
              console.error('Fal polling error:', pollError);
              return NextResponse.json({ error: pollError.message }, { status: 500 });
            }
          }
          if (!data.images || !Array.isArray(data.images) || data.images.length === 0) {
            console.error('Fal API error or no images returned:', data);
            return NextResponse.json({ error: 'Fal API error or no images returned', details: data }, { status: 422 });
          }
          return NextResponse.json(data);
        } catch (falError: any) {
          console.error('Fal API error:', falError);
          return NextResponse.json(
            { error: "Fal API error", details: falError },
            { status: 422 }
          );
        }
      } else {
        // Text-to-image fallback
        const modelUsed = 'fal-ai/imagen3';
        console.log(`[FAL] Using model: ${modelUsed}`);
        try {
          const result = await fal.subscribe("fal-ai/imagen3", {
            input: {
              prompt,
              negative_prompt: negative_prompt || "",
              aspect_ratio,
              num_images: Math.min(Math.max(1, num_images), 4),
            },
            logs: true,
          });

          return NextResponse.json({
            images: result.data.images,
            seed: result.data.seed
          });
        } catch (error: any) {
          console.error('Error generating image:', error);
          return NextResponse.json(
            { error: "Failed to generate image" },
            { status: 500 }
          );
        }
      }
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
