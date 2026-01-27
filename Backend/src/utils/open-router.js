import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.OPENROUTER_API_URL ,
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "SmartHostel AI",
  },
});

export const callAI = async (messages, model = "nvidia/nemotron-3-nano-30b-a3b:free") => {
  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("AI Error:", error?.response?.data || error.message);
    throw new Error("AI Service Failed");
  }
};
