import React, { useState } from "react";
import MovieCard from "./MovieCard";
import MovieDetail from "./MovieDetail";
import "./App.css";

const API_KEY = "fbf6fe58"; // Just your OMDB API Key

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState("");

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError("");
    setSelectedMovie(null);

    try {
      const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || "No results found.");
      }
    } catch (err) {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (id) => {
    setLoading(true);
    const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
    const data = await res.json();
    setSelectedMovie(data);
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>🎬 Movie Search App</h1>

      <form onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !selectedMovie && (
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} onClick={() => fetchMovieDetails(movie.imdbID)} />
          ))}
        </div>
      )}

      {selectedMovie && <MovieDetail movie={selectedMovie} onBack={() => setSelectedMovie(null)} />}
    </div>
  );
}

export default App;
