
import { GoogleGenAI, Modality, Type } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generatePostImage(prompt: string): Promise<string> {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A beautiful, vibrant, high-quality photograph related to: ${prompt}` }],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        return `data:image/png;base64,${base64ImageBytes}`;
      }
    }
    throw new Error("No image was generated.");
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image. Please check your prompt or API key.");
  }
}

export async function enhancePostContent(
  text: string,
  enhancementType: "proofread" | "make more exciting"
): Promise<string> {
  let prompt = "";
  switch (enhancementType) {
    case "proofread":
      prompt = `Proofread the following travel blog post content for grammar and spelling errors. Only return the corrected text, without any introductory phrases:\n\n"${text}"`;
      break;
    case "make more exciting":
      prompt = `Rewrite the following travel blog post content to be more exciting, engaging, and vivid. Use descriptive language to bring the story to life. Only return the rewritten text, without any introductory phrases:\n\n"${text}"`;
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error enhancing content:", error);
    throw new Error("Failed to enhance content.");
  }
}

export async function getPostIdeas(): Promise<string[]> {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "List 5 creative and unique travel blog post titles. The titles should be inspiring and short.",
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        ideas: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING
                            }
                        }
                    }
                }
            }
        });

        const jsonText = response.text.trim();
        const result = JSON.parse(jsonText);
        return result.ideas || [];
    } catch (error) {
        console.error("Error getting post ideas:", error);
        return [
            "Lost in the Lanterns of Hoi An",
            "Conquering the Peaks of Patagonia",
            "A Culinary Journey Through Tokyo's Backstreets",
            "Sunrise over the Sahara: A Desert Adventure",
            "Whispers of the Ancient Ruins in Rome",
        ];
    }
}
