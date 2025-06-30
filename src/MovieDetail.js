import React from "react";

function MovieDetail({ movie, onBack }) {
  return (
    <div className="movie-detail">
      <button onClick={onBack}>⬅ Back</button>
      <h2>{movie.Title}</h2>
      <img src={movie.Poster} alt={movie.Title} />
      <p><strong>Year:</strong> {movie.Year}</p>
      <p><strong>Genre:</strong> {movie.Genre}</p>
      <p><strong>Plot:</strong> {movie.Plot}</p>
      <p><strong>Director:</strong> {movie.Director}</p>
    </div>
  );
}

export default MovieDetail;
