import { useState, useEffect } from "react";
import MoodInput from "./Components/MoodInput";
import MovieCard from "./Components/MovieCard";
import MovieDrawer from "./Components/MovieDrawer";
import Loader from "./Components/Loader";
import { getMoviesForMood } from "./Services/gemini";
import { getMovieDetails, getMovieDetailsBatch } from "./Services/tmdb";
import { getWatchHistory, logMovie, deleteMovie } from "./Services/supabase";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loggedIds, setLoggedIds] = useState(new Set());

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const data = await getWatchHistory();
      setHistory(data);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    }
  }

  async function handleMoodSubmit(mood) {
    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      const geminiMovies = await getMoviesForMood(mood, history);
const movieDetailsResults = await getMovieDetailsBatch(geminiMovies);
const combined = geminiMovies.map((m, i) => ({
  ...m,
  ...(movieDetailsResults[i].status === "fulfilled" ? movieDetailsResults[i].value || {} : {}),
}));
setMovies(combined);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleLogMovie(movie) {
    try {
      await logMovie(movie);
      setLoggedIds((prev) => new Set(prev).add(movie.title));
      await fetchHistory();
    } catch (err) {
      console.error("Failed to log movie:", err);
    }
  }

  async function handleDeleteMovie(id) {
    try {
      await deleteMovie(id);
      await fetchHistory();
    } catch (err) {
      console.error("Failed to delete movie:", err);
    }
  }

  return (
    <div className="app">
      <MoodInput
        onSubmit={handleMoodSubmit}
        loading={loading}
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
              logged={loggedIds.has(movie.title)}
              onLog={() => handleLogMovie(movie)}
              onClick={() => setSelectedMovie(movie)}
            />
          ))}
        </div>
      )}

      <button
        className="history-toggle"
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? "Hide Watched" : `Watched (${history.length})`}
      </button>

      {showHistory && history.length > 0 && (
        <div className="history-section">
          <h2>Your Watch History</h2>
          <div className="movies-grid">
            {history.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.title}
                poster={movie.poster}
                rating={movie.rating}
                reason={movie.reason}
                logged={true}
                onDelete={() => handleDeleteMovie(movie.id)}
              />
            ))}
          </div>
        </div>
      )}

      <MovieDrawer
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />

      <footer className="footer">
        Built with <span>Gemini AI</span> + <span>TMDB</span> — Made by Laksh
      </footer>
    </div>
  );
}

export default App;