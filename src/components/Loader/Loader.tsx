import React from 'react';
import css from './Loader.module.css';

const Loader: React.FC = () => {
  return (
    <div className={css.container}>
      <div className={css.spinner}></div>
      <p className={css.text}>Завантажуємо фільми...</p>
    </div>
  );
};

export default Loader;