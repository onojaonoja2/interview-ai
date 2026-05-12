export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { jobTitle } = body;

    if (!jobTitle || typeof jobTitle !== "string") {
      return Response.json({ error: "Job title is required" }, { status: 400 });
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant. Return ONLY a valid JSON array of strings. No markdown, no backticks, no explanation.",
          },
          {
            role: "user",
            content: `Generate 3 thoughtful interview questions for a ${jobTitle} role.`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`OpenRouter API error (${res.status}): ${errBody}`);
    }

    const data = await res.json();
    const text: string = data.choices?.[0]?.message?.content ?? "";

    const jsonMatch = text.match(/\[[\s\S]*\]/);
    const questions = JSON.parse(jsonMatch ? jsonMatch[0] : text);

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("Invalid response format");
    }

    return Response.json({ questions });
  } catch (error: unknown) {
    console.error("Failed to generate questions:", error);
    return Response.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}
