import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './CookieBanner.module.scss';

const STORAGE_KEY = 'cookie_accepted';

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) {
      const timer = setTimeout(() => setVisible(true), 400);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.banner} role="dialog" aria-label="Уведомление об использовании cookie">
      <p className={styles.banner__text}>
        Мы используем файлы{' '}
        <Link to="/cookie-policy" className={styles.banner__link}>
          куки
        </Link>
        , это делает удобнее вашу работу с сайтом
      </p>
      <button
        className={styles.banner__btn}
        onClick={handleAccept}
        type="button"
        aria-label="Принять использование cookie"
      >
        Хорошо
      </button>
    </div>
  );
}

export default CookieBanner;
