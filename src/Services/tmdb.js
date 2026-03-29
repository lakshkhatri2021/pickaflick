const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";
const IMG_SMALL = "https://image.tmdb.org/t/p/w185";

export async function getMovieDetails(title, year) {
  const searchRes = await fetch(
    `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(title)}&year=${year}`
  );
  const searchData = await searchRes.json();
  if (!searchData.results || searchData.results.length === 0) return null;
  const movie = searchData.results[0];
  return {
    title: movie.title,
    rating: movie.vote_average ? movie.vote_average.toFixed(1) : "N/A",
    poster: movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null,
    id: movie.id,
  };
}

export async function getMovieExtras(id) {
  const [detailsRes, creditsRes, providersRes] = await Promise.all([
    fetch(`${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`),
    fetch(`${BASE_URL}/movie/${id}/credits?api_key=${TMDB_API_KEY}`),
    fetch(`${BASE_URL}/movie/${id}/watch/providers?api_key=${TMDB_API_KEY}`),
  ]);

  const details = await detailsRes.json();
  const credits = await creditsRes.json();
  const providers = await providersRes.json();

  const director = credits.crew?.find((p) => p.job === "Director")?.name || "N/A";
  const cast = credits.cast?.slice(0, 5).map((a) => ({
    name: a.name,
    character: a.character,
    photo: a.profile_path ? `${IMG_SMALL}${a.profile_path}` : null,
  })) || [];

  const watchProviders = providers.results?.IN?.flatrate ||
    providers.results?.US?.flatrate || [];

  return {
    year: details.release_date?.split("-")[0] || "N/A",
    runtime: details.runtime ? `${details.runtime} min` : "N/A",
    overview: details.overview || "",
    genres: details.genres?.map((g) => g.name) || [],
    director,
    cast,
    watchProviders,
  };
}