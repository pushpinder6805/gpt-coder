import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { messages } = await req.json?.() || req.body;
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4.1",
      messages,
    });
    res.status(200).json({ reply: completion.choices[0].message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

