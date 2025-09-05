import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Movie } from '../../types/movie';
import { IMAGE_BASE_URL } from '../../services/movieService';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose }) => {

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; 
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const { title, overview, poster_path, release_date, vote_average, vote_count } = movie;
  const releaseYear = release_date ? new Date(release_date).getFullYear() : 'Невідомо';
  const rating = vote_average ? vote_average.toFixed(1) : 'N/A';


  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>
          ✕
        </button>

        <div className={css.content}>
          <div className={css.imageSection}>
            {poster_path ? (
              <img
                src={`${IMAGE_BASE_URL}${poster_path}`}
                alt={title}
                className={css.poster}
              />
            ) : (
              <div className={css.posterPlaceholder}>
                <span>Немає зображення</span>
              </div>
            )}
          </div>

          <div className={css.infoSection}>
            <h2 className={css.title}>{title}</h2>
            
            <div className={css.metadata}>
              <span className={css.year}>📅 {releaseYear}</span>
              <span className={css.rating}>⭐ {rating} ({vote_count} голосів)</span>
            </div>

            <div className={css.overview}>
              <h3>Опис:</h3>
              <p>{overview || 'Опис фільму недоступний'}</p>
            </div>

            <div className={css.actions}>
              <button className={css.actionButton} onClick={() => window.open(`https://www.themoviedb.org/movie/${movie.id}`, '_blank')}>
                📖 Більше на TMDB
              </button>
              <button className={css.actionButton} onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(title)} watch online`, '_blank')}>
                🔍 Знайти для перегляду
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  return createPortal(modalContent, document.body);
};

export default MovieModal;