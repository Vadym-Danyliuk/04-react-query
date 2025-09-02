import React from 'react';
import { Movie } from '../../types/movie';
import { IMAGE_BASE_URL } from '../../services/tmdb';
import css from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { title, overview, poster_path, release_date, vote_average } = movie;
  
  const releaseYear = release_date ? new Date(release_date).getFullYear() : 'Невідомо';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';

  return (
    <div className={css.card}>
      <div className={css.imageContainer}>
        {poster_path ? (
          <img
            src={`${IMAGE_BASE_URL}${poster_path}`}
            alt={title}
            className={css.image}
          />
        ) : (
          <div className={css.placeholder}>
            <span>Немає зображення</span>
          </div>
        )}
      </div>
      
      <div className={css.content}>
        <h3 className={css.title}>{title}</h3>
        <div className={css.info}>
          <span className={css.year}>{releaseYear}</span>
          <span className={css.rating}>★ {rating}</span>
        </div>
        <p className={css.overview}>
          {overview || 'Опис фільму недоступний'}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;