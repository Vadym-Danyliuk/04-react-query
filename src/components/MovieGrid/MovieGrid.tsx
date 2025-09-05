import React from 'react';
import { Movie } from '../../types/movie';
import MovieCard from '../MovieCard/MovieCard';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onMovieSelect }) => {
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
        <MovieCard 
          key={movie.id} 
          movie={movie} 
          onViewDetails={onMovieSelect}
        />
      ))}
    </div>
  );
};

export default MovieGrid;