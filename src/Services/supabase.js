import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function getWatchHistory() {
  const { data, error } = await supabase
    .from("watch_history")
    .select("*")
    .order("watched_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function logMovie(movie) {
  const { error } = await supabase.from("watch_history").insert([
    {
      title: movie.title,
      year: movie.year,
      poster: movie.poster,
      rating: movie.rating,
      reason: movie.reason,
    },
  ]);
  if (error) throw error;
}

export async function deleteMovie(id) {
  const { error } = await supabase
    .from("watch_history")
    .delete()
    .eq("id", id);
  if (error) throw error;
}