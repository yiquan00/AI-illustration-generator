import OpenAI from "openai";

export function getOpenAIClient() {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL || 'https://api.deepseek.com/v1',
  });

  return openai;
}

export async function optimizePrompt(prompt: string): Promise<string> {
  const openai = getOpenAIClient();
  
  try {
    const response = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "Expand the user's input by elaborating on actions, scenes, and backgrounds. Output a paragraph (around 100 words) without any explanations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.01,
    });

    return response.choices[0]?.message?.content || prompt;
  } catch (error) {
    console.error("OpenAI prompt optimization error:", error);
    return prompt;
  }
}