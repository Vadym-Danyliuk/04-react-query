import React from 'react';
import { Movie } from '../../types/movie';
import MovieCard from '../MovieCard/MovieCard';
import css from './MovieList.module.css';

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  if (movies.length === 0) {
    return (
      <div className={css.empty}>
        <p>Фільми не знайдені</p>
      </div>
    );
  }

  return (
    <div className={css.grid}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;