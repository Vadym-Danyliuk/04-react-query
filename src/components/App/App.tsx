
import React, { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import { searchMovies } from '../../services/tmdb';
import { MovieSearchResponse, Movie } from '../../types/movie';
import SearchForm from '../SearchBar/SearchForm';
import MovieList from '../MovieGrid/MovieList';
import MovieModal from '../MovieModal/MovieModal';
import LoadingSpinner from '../Loader/LoadingSpinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import css from './App.module.css';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {
    data: movieData,
    isLoading,
    error,
    refetch,
  } = useQuery<MovieSearchResponse, Error>({
    queryKey: ['movies', currentQuery, page],
    queryFn: () => searchMovies(currentQuery, page),
    enabled: !!currentQuery,
    placeholderData: keepPreviousData,
  });

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

  return (
    <div className={css.app}>
      <header className={css.header}>
        <div className={css.container}>
          <h1 className={css.title}>🎬 Пошук фільмів</h1>
          <SearchForm
            onSubmit={handleSearch}
            query={searchQuery}
            onQueryChange={setSearchQuery}
          />
        </div>
      </header>

      <main className={css.main}>
        <div className={css.container}>
          {isLoading && <LoadingSpinner />}
          
          {error && !isLoading && (
            <ErrorMessage
              message="Не вдалося завантажити фільми. Перевірте з'єднання з інтернетом."
              onRetry={handleRetry}
            />
          )}

          {!isLoading && !error && currentQuery && (
            <>
              <div className={css.resultsInfo}>
                <p>
                  Результати пошуку для "<strong>{currentQuery}</strong>"
                  {movieData?.total_results && (
                    <span> ({movieData.total_results} фільмів знайдено)</span>
                  )}
                </p>
              </div>
              
              <MovieList 
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

          {!currentQuery && !isLoading && (
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