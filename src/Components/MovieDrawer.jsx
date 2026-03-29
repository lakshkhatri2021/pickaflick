import { useEffect, useState } from "react";
import { getMovieExtras } from "../Services/tmdb";

function MovieDrawer({ movie, onClose }) {
  const [extras, setExtras] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movie) return;
    setLoading(true);
    setExtras(null);
    getMovieExtras(movie.id).then((data) => {
      setExtras(data);
      setLoading(false);
    });
  }, [movie]);

  if (!movie) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer">
        <button className="drawer-close" onClick={onClose}>✕</button>

        <div className="drawer-poster">
          {movie.poster
            ? <img src={movie.poster} alt={movie.title} />
            : <div className="drawer-no-poster">No Image</div>
          }
        </div>

        <div className="drawer-content">
          <h2 className="drawer-title">{movie.title}</h2>

          {loading ? (
            <div className="drawer-loading">
              <div className="drawer-spinner" />
            </div>
          ) : extras && (
            <>
              <div className="drawer-meta">
                <span>{extras.year}</span>
                <span className="drawer-dot">·</span>
                <span>{extras.runtime}</span>
                <span className="drawer-dot">·</span>
                <span className="drawer-rating">★ {movie.rating}</span>
              </div>

              <div className="drawer-genres">
                {extras.genres.map((g) => (
                  <span key={g} className="drawer-genre">{g}</span>
                ))}
              </div>

              <p className="drawer-overview">{extras.overview}</p>

              <div className="drawer-section">
                <h4 className="drawer-section-title">Director</h4>
                <p className="drawer-director">{extras.director}</p>
              </div>

              <div className="drawer-section">
                <h4 className="drawer-section-title">Cast</h4>
                <div className="drawer-cast">
                  {extras.cast.map((actor) => (
                    <div key={actor.name} className="cast-member">
                      <div className="cast-photo">
                        {actor.photo
                          ? <img src={actor.photo} alt={actor.name} />
                          : <div className="cast-initials">{actor.name[0]}</div>
                        }
                      </div>
                      <p className="cast-name">{actor.name}</p>
                      <p className="cast-character">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>

              {extras.watchProviders.length > 0 && (
                <div className="drawer-section">
                  <h4 className="drawer-section-title">Where to watch</h4>
                  <div className="drawer-providers">
                    {extras.watchProviders.map((p) => (
                      <div key={p.provider_id} className="provider">
                        <img
                          src={`https://image.tmdb.org/t/p/w92${p.logo_path}`}
                          alt={p.provider_name}
                          title={p.provider_name}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {extras.watchProviders.length === 0 && (
                <div className="drawer-section">
                  <h4 className="drawer-section-title">Where to watch</h4>
                  <p className="drawer-no-providers">Not available on streaming in your region</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default MovieDrawer;