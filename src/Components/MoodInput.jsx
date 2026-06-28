import { useState, useEffect } from "react";

const MOOD_SUGGESTIONS = [
  "Sad", "Funny", "Stressed", "Romantic",
  "Thrilling", "Thoughtful", "Lazy", "Hyped"
];

const PLACEHOLDERS = [
  "I'm feeling nostalgic and want to cry a little...",
  "I need something to make me laugh out loud...",
  "I'm stressed and need to escape reality...",
  "I want something that'll keep me on the edge of my seat...",
  "I'm in a romantic mood tonight...",
  "I want a movie that'll make me think..."
];

function MoodInput({ onSubmit, loading }) {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const current = PLACEHOLDERS[placeholderIndex];
    let timeout;

    if (!isDeleting && displayText.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length + 1));
      }, 50);
    } else if (!isDeleting && displayText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length - 1));
      }, 30);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, placeholderIndex]);

  function handleSubmit(e) {
    e.preventDefault();
    const mood = inputValue.trim();
    if (mood) onSubmit(mood);
  }

  function handleChipClick(chip) {
    setInputValue(chip);
  }

  return (
    <div className="mood-input-container">
      <h1 className="app-title">PickaFlick</h1>
      <p className="app-subtitle">Describe your mood and we'll find the perfect movie for you</p>
      <p className="app-stats">Powered by Gemini AI · 10 recommendations per mood</p>
      <form onSubmit={handleSubmit} className="mood-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={displayText}
          className="mood-input"
          disabled={loading}
        />
        <button type="submit" className="mood-button" disabled={loading}>
          {loading ? "Finding..." : "Find Movies"}
        </button>
      </form>
      <div className="mood-chips">
        {MOOD_SUGGESTIONS.map((chip) => (
          <button
            key={chip}
            className="mood-chip"
            onClick={() => handleChipClick(chip)}
            disabled={loading}
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MoodInput;