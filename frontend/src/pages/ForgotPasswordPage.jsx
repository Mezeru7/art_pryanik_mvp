import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import styles from './AuthPage.module.scss';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Введите email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Некорректный email');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <>
      <SEO title="Восстановление пароля" description="Восстановление пароля Арт-Пряник" path="/forgot-password" />

      <div className={styles.auth}>
        <div className={styles.auth__card}>
          <h1 className={styles.auth__title}>Забыли пароль?</h1>

          {sent ? (
            <div className={styles.auth__form}>
              <p style={{ textAlign: 'center', color: '#2e7d32', marginBottom: 16 }}>
                Если email зарегистрирован, инструкции отправлены
              </p>
              <Link to="/login" className={styles.auth__btn} style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}>
                Вернуться ко входу
              </Link>
            </div>
          ) : (
            <form className={styles.auth__form} onSubmit={handleSubmit} noValidate>
              <input
                className={`${styles.auth__input} ${error ? styles['auth__input--error'] : ''}`}
                type="email"
                placeholder="Электронная почта"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                autoComplete="email"
              />
              {error && <p className={styles.auth__error}>{error}</p>}

              <div className={styles.auth__links}>
                <Link to="/login" className={styles.auth__link}>Вернуться ко входу</Link>
              </div>

              <button className={styles.auth__btn} type="submit">
                Отправить инструкции
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default ForgotPasswordPage;
