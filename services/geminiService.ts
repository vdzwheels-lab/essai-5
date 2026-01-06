import { GoogleGenAI } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from '../constants';

// Initialize the client. In a real scenario, ensure process.env.API_KEY is available.
// Since we cannot prompt for it in code, we assume it exists. 
// For this demo, we will use a safe fallback or assume the user injects it.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const sendMessageToGemini = async (history: { role: string, parts: { text: string }[] }[], newMessage: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      return "SYSTEM: API Key Missing. Please configure the environment.";
    }

    const model = 'gemini-3-flash-preview';
    
    // Convert history format if needed, or maintain local state to pass context
    // Here we just generate content with the new message for simplicity in a stateless call,
    // but ideally, we use chat sessions.
    
    const response = await ai.models.generateContent({
      model: model,
      contents: [
        { role: 'user', parts: [{ text: AI_SYSTEM_INSTRUCTION }] }, // Inject system instruction as context first
        ...history,
        { role: 'user', parts: [{ text: newMessage }] }
      ],
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for faster chat response
      }
    });

    return response.text || "SYSTEM: No response data.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "SYSTEM: Connection interrupted. Recalibrating...";
  }
};
