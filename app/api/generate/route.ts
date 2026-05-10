import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const PLATFORM_PROMPTS: Record<string, string> = {
  instagram: `You are an expert Instagram content creator. Generate an engaging Instagram caption for the following topic/content.
Rules:
- Keep it under 2200 characters but aim for 150-300 chars for best engagement
- Use a strong hook in the first line
- Include a call-to-action
- Add line breaks for readability
- End with relevant emojis
- Do NOT include hashtags (those will be generated separately)
- Output ONLY the caption text, nothing else`,

  youtube: `You are an expert YouTube SEO specialist and content strategist. Generate 5 compelling YouTube video title options for the following topic.
Rules:
- Each title should be 50-70 characters
- Include power words and emotional triggers
- Make titles curiosity-driven or promise clear value
- Mix different styles: how-to, listicle, question, statement
- Output ONLY the 5 titles, one per line, numbered 1-5. No explanations.`,

  linkedin: `You are an expert LinkedIn content creator and personal branding specialist. Generate a professional LinkedIn post for the following topic.
Rules:
- Start with a hook that stops the scroll (first line is critical)
- Write in first person, conversational but professional tone
- Use short paragraphs (1-3 sentences max)
- Include 3-5 key insights or takeaways
- End with a thought-provoking question to drive comments
- Keep it between 200-700 words
- Do NOT include hashtags (those will be generated separately)
- Output ONLY the post text, nothing else`,

  hashtags: `You are a social media hashtag research expert. Generate a strategic set of hashtags for the following topic/content.
Rules:
- Generate exactly 30 hashtags
- Mix: 10 high-volume (1M+ posts), 10 medium-volume (100K-1M), 10 niche (10K-100K)
- Start each with #
- No spaces in hashtags
- Make them relevant and specific
- Output ONLY the hashtags separated by spaces, nothing else`,
};

export async function POST(req: NextRequest) {
  try {
    const { platform, topic, tone, audience } = await req.json();

    if (!topic || !platform) {
      return NextResponse.json(
        { error: "Topic and platform are required" },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not configured. Add it to your .env.local file." },
        { status: 500 }
      );
    }

    const systemPrompt = PLATFORM_PROMPTS[platform];
    if (!systemPrompt) {
      return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
    }

    const userMessage = `Topic/Content: ${topic}
${tone ? `Tone: ${tone}` : ""}
${audience ? `Target Audience: ${audience}` : ""}

Generate the content now.`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.8,
      max_tokens: 1024,
    });

    const content = completion.choices[0]?.message?.content || "";

    return NextResponse.json({
      content,
      platform,
      model: completion.model,
      usage: completion.usage,
    });
  } catch (error: unknown) {
    console.error("Groq API error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate content";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
