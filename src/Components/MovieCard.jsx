function MovieCard({ title, poster, rating, reason, onClick }) {
  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-poster">
        {poster ? (
          <img src={poster} alt={title} />
        ) : (
          <div className="no-poster">No Image</div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{title}</h3>
        <div className="movie-rating">
          <span className="star">★</span>
          <span>{rating}</span>
        </div>
        <p className="movie-reason">{reason}</p>
      </div>
    </div>
  );
}

export default MovieCard;