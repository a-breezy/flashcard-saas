import { NextResponse } from "next/server";
import OpenAI from "openai";

// generate prompt to create flashcards from openai

const systemPrompt = `
You are tasked with generating concise and effective flashcards for learning purposes. Each flashcard should adhere to the following guidelines:

Clarity: Ensure that the content is clear, concise, and to the point. Avoid unnecessary information that might overwhelm the learner.

Question-Answer Format: Structure the flashcards in a way that presents a question, term, or prompt on one side (Q) and the answer or explanation on the other side (A).

Key Concepts: Focus on the most important concepts, terms, or facts. Each flashcard should cover a single topic or idea.

Brevity: Keep answers short but informative. Aim for simplicity without losing essential information.

Engagement: If possible, make the questions thought-provoking or engaging to stimulate recall and understanding.

Examples (Optional): When relevant, include a brief example to illustrate the concept or term.

Categories (Optional): Group related flashcards by subject or topic to aid in organized learning.

Format:

Q: [Question/Prompt/Term]
A: [Answer/Explanation/Definition]
Example:

Q: What is the capital of France?

A: Paris

Q: Define photosynthesis.

A: Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods with the help of chlorophyll, primarily producing oxygen and glucose from carbon dioxide and water.

return in following JSON format:
{
    "flashcards":[{
        "front": str,
        "back": str
    }]
}
`;

export async function POST(req) {
  const openai = OpenAI();
  const data = await req.text();

  const completion = await openai.chat.completion.create({
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: data },
    ],
    model: "gpt-4o",
    response_format: { type: "json_object" },
  });

  const flashcards = JSON.parse(completion.choices[0].message.content);

  return NextResponse.json(flashcards.flashcards);
}
