import React, { useEffect, useState } from 'react';
import { Movie } from '../../types/movie';
import { IMAGE_BASE_URL } from '../../services/tmdb';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ movie, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'video'>('video');


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

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.closeButton} onClick={onClose}>
          ✕
        </button>

        <div className={css.header}>
          <h2 className={css.title}>{title}</h2>
          <div className={css.tabs}>
            <button 
              className={`${css.tab} ${activeTab === 'video' ? css.active : ''}`}
              onClick={() => setActiveTab('video')}
            >
              🎬 Відео
            </button>
            <button 
              className={`${css.tab} ${activeTab === 'info' ? css.active : ''}`}
              onClick={() => setActiveTab('info')}
            >
              ℹ️ Інформація
            </button>
          </div>
        </div>
        
        <div className={css.content}>
          {activeTab === 'video' && (
            <div className={css.videoTab}>
              <VideoPlayer movieId={movie.id} movieTitle={movie.title} />
            </div>
          )}

          {activeTab === 'info' && (
            <div className={css.infoTab}>
              <div className={css.infoContent}>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieModal;