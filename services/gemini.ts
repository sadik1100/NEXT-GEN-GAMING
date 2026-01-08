import { GoogleGenAI } from "@google/genai";

export const getBooyahStrategy = async (map: string, playstyle: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a quick pro strategy for Free Fire. Map: ${map}. Playstyle: ${playstyle}. Focus on drop locations, rotation strategy, and character combinations. Keep it under 150 words.`,
      config: {
        systemInstruction: "You are a professional Free Fire coach known for winning international tournaments. Give short, tactical advice.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The strategist is offline. Ensure you have your loot ready and watch your back!";
  }
};