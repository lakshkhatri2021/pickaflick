const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function getMoviesForMood(mood) {
  const prompt = `You are a movie recommendation expert. Based on the user's mood: "${mood}", suggest exactly 5 movies.
  
  Respond ONLY with a valid JSON array, no markdown, no explanation. Format:
  [
    {
      "title": "Movie Title",
      "year": 2021,
      "reason": "One sentence explaining why this matches the mood"
    }
  ]`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await response.json();
  console.log("Gemini raw response:", JSON.stringify(data));
  
  const text = data.candidates[0].content.parts[0].text;
const cleaned = text.replace(/```json|```/g, "").trim();
const jsonMatch = cleaned.match(/\[[\s\S]*\]/);
return JSON.parse(jsonMatch[0]);
}