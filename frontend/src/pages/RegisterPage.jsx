import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import styles from './AuthPage.module.scss';

function RegisterPage() {
  const [form, setForm] = useState({
    first_name: '',
    phone: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.first_name.trim()) errs.first_name = 'Введите имя';
    if (!form.phone.trim()) errs.phone = 'Введите номер телефона';
    if (!form.email.trim()) errs.email = 'Введите электронную почту';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Некорректный email';
    if (!form.password) errs.password = 'Введите пароль';
    else if (form.password.length < 6) errs.password = 'Минимум 6 символов';
    return errs;
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
  };

  return (
    <>
      <SEO title="Регистрация" description="Создайте аккаунт в Арт-Пряник" path="/register" />

      <div className={styles.auth}>
        <div className={styles.auth__card}>
          <h1 className={styles.auth__title}>Регистрация</h1>

          <form className={styles.auth__form} onSubmit={handleSubmit} noValidate>
            <input
              className={`${styles.auth__input} ${errors.first_name ? styles['auth__input--error'] : ''}`}
              type="text"
              name="first_name"
              placeholder="Имя"
              value={form.first_name}
              onChange={handleChange}
              autoComplete="given-name"
            />
            {errors.first_name && <p className={styles.auth__error}>{errors.first_name}</p>}

            <input
              className={`${styles.auth__input} ${errors.phone ? styles['auth__input--error'] : ''}`}
              type="tel"
              name="phone"
              placeholder="Номер телефона"
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
            />
            {errors.phone && <p className={styles.auth__error}>{errors.phone}</p>}

            <input
              className={`${styles.auth__input} ${errors.email ? styles['auth__input--error'] : ''}`}
              type="email"
              name="email"
              placeholder="Электронная почта"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <p className={styles.auth__error}>{errors.email}</p>}

            <input
              className={`${styles.auth__input} ${errors.password ? styles['auth__input--error'] : ''}`}
              type="password"
              name="password"
              placeholder="Пароль"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.password && <p className={styles.auth__error}>{errors.password}</p>}

            <div className={styles.auth__links}>
              <Link to="/login" className={styles.auth__link}>Есть аккаунт?</Link>
            </div>

            <p className={styles.auth__policy}>
              Нажимая кнопку, Вы соглашаетесь с{' '}
              <Link to="/privacy" className={styles.auth__policy_link}>
                политикой конфиденциальности
              </Link>
            </p>

            <button className={styles.auth__btn} type="submit">
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
