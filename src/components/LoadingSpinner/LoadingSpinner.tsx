import React from 'react';
import css from './LoadingSpinner.module.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className={css.container}>
      <div className={css.spinner}></div>
      <p className={css.text}>Завантажуємо фільми...</p>
    </div>
  );
};

export default LoadingSpinner;