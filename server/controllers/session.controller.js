import { gemini } from "../config/gemini.config.js";

const MODEL = "gemini-2.0-flash";

// ----------------------
// Extract JSON safely
// ----------------------
function extractJSON(text) {
  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

// ----------------------
// Start Session
// ----------------------
export const startSession = async (req, res) => {
  try {
    const { name } = req.body;

    const prompt = `
You are a toxic, sassy bestie AI.
Return EXACTLY 1 JSON object only.

Format:
{
  "id": 1,
  "type": "slider" | "text" | "options",
  "text": "your question",
  "min": 1,
  "max": 10,
  "options": ["A","B"]
}

User name: ${name}
`;

    // NEW SDK CALL
    const result = await gemini.generateContent({
      model: MODEL,
      contents: prompt,
    });

    // NEW SDK RESPONSE FORMAT
    const raw =
      result.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";

    const json = extractJSON(raw);

    res.json({ question: json });
  } catch (err) {
    console.error("Start Session Error:", err);
    res.status(500).json({ error: "AI error" });
  }
};

// ----------------------
// Next Question
// ----------------------
export const nextQuestion = async (req, res) => {
  try {
    const { answers } = req.body;

    const prompt = `
Given previous answers, generate 1 new unique question.

Format:
{
  "id": number,
  "type": "slider" | "text" | "options",
  "text": "question",
  "min": 1,
  "max": 10,
  "options": ["A","B"]
}

Answers:
${JSON.stringify(answers, null, 2)}
`;

    const result = await gemini.generateContent({
      model: MODEL,
      contents: prompt,
    });

    const raw =
      result.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";

    const json = extractJSON(raw);

    res.json({ question: json });
  } catch (err) {
    console.error("Next Session Error:", err);
    res.status(500).json({ error: "AI error" });
  }
};

// ----------------------
// Final Output
// ----------------------
export const finalGenerate = async (req, res) => {
  try {
    const { name, answers } = req.body;

    const prompt = `
User: ${name}
Answers:
${JSON.stringify(answers, null, 2)}

Generate a 3-paragraph spicy, funny revenge plan.
`;

    const result = await gemini.generateContent({
      model: MODEL,
      contents: prompt,
    });

    const text =
      result.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    res.json({ output: text });
  } catch (err) {
    console.error("Final Generate Error:", err);
    res.status(500).json({ error: "AI error" });
  }
};
