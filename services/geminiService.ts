import { GoogleGenAI } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from '../constants';

// Initialize the client.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const sendMessageToGemini = async (history: { role: string, parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      console.error("API Key is missing.");
      return "SYSTEM: Service configuration error.";
    }

    const model = 'gemini-3-flash-preview';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        ...history,
        { role: 'user', parts: [{ text: newMessage }] }
      ],
      config: {
        temperature: 0.7,
        systemInstruction: AI_SYSTEM_INSTRUCTION
      }
    });

    return response.text || "SYSTEM: No response data.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "SYSTEM: Connection interrupted. Recalibrating...";
  }
};