import React from 'react';
import css from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className={css.container}>
      <div className={css.icon}>⚠️</div>
      <h3 className={css.title}>Помилка завантаження</h3>
      <p className={css.message}>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className={css.retryButton}>
          Спробувати знову
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;