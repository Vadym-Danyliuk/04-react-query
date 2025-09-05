
import React, { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import { searchMovies } from '../../services/movieService';
import { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './App.module.css';

interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data: movieData,
    isLoading,
    isFetching,
    isPending,
    isError,
    isSuccess,
    error,
    refetch,
  } = useQuery<MovieSearchResponse, Error>({
    queryKey: ['movies', currentQuery, page],
    queryFn: () => searchMovies(currentQuery, page),
    enabled: !!currentQuery,
    placeholderData: keepPreviousData,
  });

 
  useEffect(() => {
    if (isSuccess && movieData && movieData.results.length === 0) {
    
      const toast = document.createElement('div');
      toast.textContent = 'Не знайдено фільмів за вашим запитом';
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f59e0b;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      `;
      document.body.appendChild(toast);
      
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 3000);
    }
  }, [isSuccess, movieData]);

  const handleSearch = (query: string) => {
    setCurrentQuery(query);
    setPage(1);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    refetch();
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const movies = movieData?.results || [];
  const totalPages = movieData?.total_pages || 0;
  const shouldShowPagination = totalPages > 1;

  const showLoader = isPending || (isFetching && movies.length === 0);

  return (
    <div className={css.app}>
      <header className={css.header}>
        <div className={css.container}>
          <h1 className={css.title}>🎬 Пошук фільмів</h1>
          <SearchBar
            onSubmit={handleSearch}
            query={searchQuery}
            onQueryChange={setSearchQuery}
          />
        </div>
      </header>

      <main className={css.main}>
        <div className={css.container}>
          {showLoader && <Loader />}
          
          {isError && !showLoader && (
            <ErrorMessage
              message={error?.message || "Не вдалося завантажити фільми. Перевірте з'єднання з інтернетом."}
              onRetry={handleRetry}
            />
          )}

          {isSuccess && !showLoader && currentQuery && (
            <>
              <div className={css.resultsInfo}>
                <p>
                  Результати пошуку для "<strong>{currentQuery}</strong>"
                  {movieData?.total_results && (
                    <span> ({movieData.total_results} фільмів знайдено)</span>
                  )}
                </p>
              </div>
              
              <MovieGrid 
                movies={movies} 
                onMovieSelect={handleMovieSelect}
              />
              
              {shouldShowPagination && (
                <ReactPaginate
                  pageCount={totalPages}
                  pageRangeDisplayed={5}
                  marginPagesDisplayed={1}
                  onPageChange={handlePageChange}
                  forcePage={page - 1}
                  containerClassName={css.pagination}
                  activeClassName={css.active}
                  nextLabel="→"
                  previousLabel="←"
                />
              )}
            </>
          )}

          {!currentQuery && !showLoader && (
            <div className={css.welcome}>
              <p>Введіть назву фільму для пошуку</p>
            </div>
          )}
        </div>
      </main>

  
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isOpen={!!selectedMovie}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;