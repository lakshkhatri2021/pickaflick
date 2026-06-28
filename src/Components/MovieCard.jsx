const PROVIDER_LOGOS = {
  "Netflix": "https://image.tmdb.org/t/p/original/t2yyOv40HZeVlLjYsCsPHnWLk4W.jpg",
  "Amazon Prime Video": "https://image.tmdb.org/t/p/original/emthp39XA2YScoYL1p0sdbAH2WA.jpg",
  "Disney Plus": "https://image.tmdb.org/t/p/original/7rwgEs15tFwyR9NPQ5vpzxTj19Q.jpg",
  "Apple TV Plus": "https://image.tmdb.org/t/p/original/6uhKBfmtzFqOcLousHwZuzcrScK.jpg",
  "Hotstar": "https://image.tmdb.org/t/p/original/xEWdressed3PPFolNbXYb9XGpsrg.jpg",
};

function MovieCard({ title, poster, rating, reason, logged, onLog, onDelete, onClick, watchProviders = [] }) {
  return (
    <div className="movie-card" onClick={onClick}>
      {poster ? (
        <img src={poster} alt={title} className="movie-poster" />
      ) : (
        <div className="no-poster">No Image</div>
      )}
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        {rating && <p className="movie-rating">⭐ {rating}</p>}
        {reason && <p className="movie-reason">{reason}</p>}

        {watchProviders.length > 0 && (
          <div className="watch-providers">
            {watchProviders.slice(0, 3).map((provider) => (
              <div key={provider.provider_id} className="provider" title={provider.provider_name}>
                <img
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  className="provider-logo"
                />
              </div>
            ))}
          </div>
        )}

        <div className="movie-actions" onClick={(e) => e.stopPropagation()}>
          {onLog && (
            <button
              className={`log-btn ${logged ? "logged" : ""}`}
              onClick={onLog}
              disabled={logged}
            >
              {logged ? "✓ Watched" : "Mark as Watched"}
            </button>
          )}
          {onDelete && (
            <button className="delete-btn" onClick={onDelete}>
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;