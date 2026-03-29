import { useState, useEffect } from "react";
import MoodInput from "./Components/MoodInput";
import MovieCard from "./Components/MovieCard";
import Loader from "./Components/Loader";
import MovieDrawer from "./Components/MovieDrawer";
import { getMoviesForMood } from "./Services/gemini";
import { getMovieDetails } from "./Services/tmdb";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("pickaflick-history");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("pickaflick-history", JSON.stringify(history));
  }, [history]);

  async function handleMoodSubmit(mood) {
    setLoading(true);
    setError(null);
    setMovies([]);

    setHistory((prev) => {
      const filtered = prev.filter((m) => m.toLowerCase() !== mood.toLowerCase());
      return [mood, ...filtered].slice(0, 5);
    });

    try {
      const geminiMovies = await getMoviesForMood(mood);
      const movieDetails = await Promise.all(
        geminiMovies.map((m) => getMovieDetails(m.title, m.year))
      );
      const combined = geminiMovies.map((m, i) => ({
        ...m,
        ...(movieDetails[i] || {}),
      }));
      setMovies(combined);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function clearHistory() {
    setHistory([]);
  }

  return (
    <div className="app">
      <MoodInput
        onSubmit={handleMoodSubmit}
        loading={loading}
        history={history}
        onClearHistory={clearHistory}
      />
      {loading && <Loader />}
      {error && <p className="error">{error}</p>}
      {movies.length > 0 && (
        <div className="movies-grid">
          {movies.map((movie, i) => (
            <MovieCard
              key={i}
              title={movie.title}
              poster={movie.poster}
              rating={movie.rating}
              reason={movie.reason}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}
        </div>
      )}
      <MovieDrawer movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      <footer className="footer">
        Built with <span>Gemini AI</span> + <span>TMDB</span> · Made by Laksh
      </footer>
    </div>
  );
}

export default App;