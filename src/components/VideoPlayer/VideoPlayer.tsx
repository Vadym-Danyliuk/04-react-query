import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMovieVideos } from '../../services/movieService';
import { MovieVideo } from '../../types/movie';
import css from './VideoPlayer.module.css';

interface VideoPlayerProps {
  movieId: number;
  movieTitle: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ movieId, movieTitle }) => {
  const [selectedVideoKey, setSelectedVideoKey] = useState<string>('');

  const { data: videos, isLoading, error } = useQuery<MovieVideo[]>({
    queryKey: ['movieVideos', movieId],
    queryFn: () => getMovieVideos(movieId),
  });


  useEffect(() => {
    if (videos && videos.length > 0 && !selectedVideoKey) {

      const officialTrailer = videos.find(
        video => video.type === 'Trailer' && video.official && video.site === 'YouTube'
      );
      
      const anyTrailer = videos.find(
        video => video.type === 'Trailer' && video.site === 'YouTube'
      );
      
      const firstYouTubeVideo = videos.find(video => video.site === 'YouTube');
      
      const selectedVideo = officialTrailer || anyTrailer || firstYouTubeVideo;
      if (selectedVideo) {
        setSelectedVideoKey(selectedVideo.key);
      }
    }
  }, [videos, selectedVideoKey]);

  if (isLoading) {
    return (
      <div className={css.loading}>
        <div className={css.spinner}></div>
        <p>Завантаження відео...</p>
      </div>
    );
  }

  if (error || !videos || videos.length === 0) {
    return (
      <div className={css.noVideo}>
        <div className={css.noVideoIcon}>🎬</div>
        <h3>Відео недоступне</h3>
        <p>На жаль, для фільму "{movieTitle}" немає доступних трейлерів або відео.</p>
        <div className={css.alternatives}>
          <button 
            onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle)} trailer`, '_blank')}
            className={css.altButton}
          >
            🔍 Шукати на YouTube
          </button>
          <button 
            onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(movieTitle)} watch online`, '_blank')}
            className={css.altButton}
          >
            🌐 Знайти онлайн
          </button>
        </div>
      </div>
    );
  }

  const youtubeVideos = videos.filter(video => video.site === 'YouTube');

  return (
    <div className={css.videoPlayer}>
      {selectedVideoKey && (
        <div className={css.playerContainer}>
          <iframe
            src={`https://www.youtube.com/embed/${selectedVideoKey}?autoplay=0&rel=0&modestbranding=1`}
            title={movieTitle}
            allowFullScreen
            className={css.iframe}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      )}

      {youtubeVideos.length > 1 && (
        <div className={css.videoList}>
          <h4>Інші відео:</h4>
          <div className={css.videoButtons}>
            {youtubeVideos.map((video) => (
              <button
                key={video.key}
                onClick={() => setSelectedVideoKey(video.key)}
                className={`${css.videoButton} ${selectedVideoKey === video.key ? css.active : ''}`}
              >
                <span className={css.videoType}>{video.type}</span>
                <span className={css.videoName}>{video.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;