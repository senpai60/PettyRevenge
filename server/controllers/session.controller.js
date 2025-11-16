// server/controllers/session.controller.js
import { gemini } from "../config/gemini.config.js";

const MODEL = "gemini-2.0-flash";

/**
 * Try to parse JSON robustly:
 * - Try direct JSON.parse
 * - Fallback: find the first {...} block with regex and parse
 */
function extractJSON(text) {
  if (!text) throw new Error("Empty AI response");

  // Try direct parse first (strip code fences)
  let cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    // fallback - find first JSON-looking object
    const m = cleaned.match(/\{[\s\S]*\}/);
    if (!m) throw new Error("No JSON found in AI response");
    return JSON.parse(m[0]);
  }
}

// ------- START SESSION -------
export const startSession = async (req, res) => {
  try {
    const { name } = req.body;

    // Make the first question deterministic: ask opponent's name in Hinglish style
    const prompt = `
You are a Hinglish toxic-bestie AI.

This is ALWAYS the FIRST question of the session.

Ask only: "Opposition ka naam kya hai babe?"

Return EXACT JSON:
{
  "id": 1,
  "type": "text",
  "text": "Opposition ka naam kya hai babe?",
  "min": 1,
  "max": 10,
  "options": []
}
No backticks, no explanation.
`;

    const result = await gemini.generateContent({
      model: MODEL,
      contents: prompt,
    });
    const raw = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const json = extractJSON(raw);

    return res.json({ question: json });
  } catch (err) {
    console.error("Start Session Error:", err);
    return res
      .status(500)
      .json({ error: "AI error", detail: String(err.message) });
  }
};

// ------- NEXT QUESTION -------
export const nextQuestion = async (req, res) => {
  try {
    // Expect full session context from frontend
    const { name, questions = [], answers = {}, current = 0 } = req.body;

    // Build prompt with full context so model "remembers"
    const prompt = `
You are a Hinglish toxic-bestie AI.

You MUST ask only 1 new question.
You MUST continue flow logically.
You MUST relate each question to:

- user
- opponent
- their dynamic
- emotional damage
- psychology
- relationship patterns

NO random names.
NO random characters (like Mahima).
NO story.
NO advice.
Only QUESTIONS.

Session:
User: ${name}
Opponent: ${answers[1] || "Unknown yet"}

Previous Questions:
${JSON.stringify(questions, null, 2)}

Previous Answers:
${JSON.stringify(answers, null, 2)}

Ask a new question in Hinglish:
- Flirty bestie tone
- Psychological angle
- 1 sentence
- Only about user + opponent dynamic

Return ONLY JSON format:
{
  "id": number,
  "type": "text" | "slider" | "options",
  "text": "short hinglish question",
  "min": 1,
  "max": 10,
  "options": []
}
`;

    const result = await gemini.generateContent({
      model: MODEL,
      contents: prompt,
    });
    const raw = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const json = extractJSON(raw);

    return res.json({ question: json });
  } catch (err) {
    console.error("Next Session Error:", err);
    return res
      .status(500)
      .json({ error: "AI error", detail: String(err.message) });
  }
};

// ------- FINAL GENERATION -------
export const finalGenerate = async (req, res) => {
  try {
    const { name, questions = [], answers = {} } = req.body;

    const prompt = `
You are a Hinglish toxic-bestie storyteller.

Create a revenge plan based on:
- user name
- opponent name
- relationship patterns
- emotional details
- user psychology
- all answers

Tone:
- Hinglish
- best friend bitching vibe
- flirty-toxic but SAFE
- relatable psychology
- TikTok story tone

DO NOT invent random names.
Use ONLY: ${name} and ${answers[1]}

Use 3 short paragraphs.
Return plain text only.

Questions asked:
${JSON.stringify(questions, null, 2)}

Answers:
${JSON.stringify(answers, null, 2)}
`;

    const result = await gemini.generateContent({
      model: MODEL,
      contents: prompt,
    });
    const text =
      result.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

    return res.json({ output: text });
  } catch (err) {
    console.error("Final Generate Error:", err);
    return res
      .status(500)
      .json({ error: "AI error", detail: String(err.message) });
  }
};
