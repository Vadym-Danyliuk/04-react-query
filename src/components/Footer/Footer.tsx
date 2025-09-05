import React from 'react';
import css from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={css.footer}>
      <div className={css.container}>
        <div className={css.content}>
          <div className={css.section}>
            
            <p className={css.description}>
              Тут тоже можу щось написати......в дз не було строга вказано, що можна робити, а що ні...тому я вирішив додати футер, щоб було краще видно кінець сторінки.
            </p>
          </div>

         
        </div>

        <div className={css.bottom}>
          <div className={css.copyright}>
            <p>© {currentYear} Пошук фільмів. Всі права захищені.</p>
          </div>
          <div className={css.attribution}>
            <p>
              Дані надані{' '}
              <a 
                href="https://www.themoviedb.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={css.tmdbLink}
              >
                The Movie Database (TMDB)
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;