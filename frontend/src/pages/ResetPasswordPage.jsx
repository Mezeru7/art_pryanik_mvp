import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import styles from './AuthPage.module.scss';

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!password) errs.password = 'Введите новый пароль';
    else if (password.length < 6) errs.password = 'Минимум 6 символов';
    if (password !== confirm) errs.confirm = 'Пароли не совпадают';
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setDone(true);
  };

  if (!token) {
    return (
      <div className={styles.auth}>
        <div className={styles.auth__card}>
          <p style={{ textAlign: 'center', color: '#e53935' }}>Недействительная ссылка</p>
          <Link to="/login" className={styles.auth__link} style={{ display: 'block', textAlign: 'center', marginTop: 16 }}>
            Вернуться ко входу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO title="Новый пароль" description="Установите новый пароль" path="/reset-password" />

      <div className={styles.auth}>
        <div className={styles.auth__card}>
          <h1 className={styles.auth__title}>Новый пароль</h1>

          {done ? (
            <div className={styles.auth__form}>
              <p style={{ textAlign: 'center', color: '#2e7d32', marginBottom: 16 }}>
                Пароль успешно изменён
              </p>
              <Link to="/login" className={styles.auth__btn} style={{ textAlign: 'center', display: 'block', textDecoration: 'none' }}>
                Войти
              </Link>
            </div>
          ) : (
            <form className={styles.auth__form} onSubmit={handleSubmit} noValidate>
              <input
                className={`${styles.auth__input} ${errors.password ? styles['auth__input--error'] : ''}`}
                type="password"
                placeholder="Новый пароль"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
                autoComplete="new-password"
              />
              {errors.password && <p className={styles.auth__error}>{errors.password}</p>}

              <input
                className={`${styles.auth__input} ${errors.confirm ? styles['auth__input--error'] : ''}`}
                type="password"
                placeholder="Повторите пароль"
                value={confirm}
                onChange={(e) => { setConfirm(e.target.value); setErrors((p) => ({ ...p, confirm: '' })); }}
                autoComplete="new-password"
              />
              {errors.confirm && <p className={styles.auth__error}>{errors.confirm}</p>}

              <button className={styles.auth__btn} type="submit">
                Сохранить пароль
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default ResetPasswordPage;
