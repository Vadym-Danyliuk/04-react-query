import React, { FormEvent, ChangeEvent } from 'react';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
  query: string;
  onQueryChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit, query, onQueryChange }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query.trim());
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.inputGroup}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Пошук фільмів..."
          className={css.input}
          required
        />
        <button type="submit" className={css.button}>
          Пошук
        </button>
      </div>
    </form>
  );
};

export default SearchBar;