import { useState } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../../config/api';
import styles from './ContactForm.module.scss';

const FEATURES = [
  'Индивидуальный дизайн',
  'Натуральные ингредиенты',
  'Быстрое изготовление',
];

function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', description: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setServerError('');
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Введите имя';
    if (!form.phone.trim()) errs.phone = 'Введите телефон';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setServerError('');

    try {
      const res = await fetch(`${API_URL}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          phone: form.phone.trim(),
          description: form.description.trim() || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setServerError(data.error || 'Ошибка при отправке заявки');
        return;
      }

      setSent(true);
    } catch {
      setServerError('Не удалось подключиться к серверу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.contact}>
      <div className={styles.contact__container}>

        {/* Левая часть */}
        <div className={styles.contact__info}>
          <h2 className={styles.contact__title}>Оставьте заявку</h2>
          <p className={styles.contact__description}>
            Заполните форму, и мы свяжемся с Вами,<br />
            чтобы обсудить заказ
          </p>
          <ul className={styles.contact__list}>
            {FEATURES.map((item) => (
              <li key={item} className={styles.contact__item}>
                <svg
                  className={styles.contact__check}
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 7L6.5 12L16.5 2"
                    stroke="#EA8763"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Правая часть — форма */}
        <div className={styles.contact__form_wrap}>
          <img
            src="/assets/images/star.png"
            alt="Пряник звезда"
            className={styles.contact__star}
          />

          {sent ? (
            <div className={styles.contact__success}>
              <p className={styles.contact__success_text}>
                Спасибо! Мы получили вашу заявку и свяжемся с вами в ближайшее время.
              </p>
              <button
                className={styles.contact__btn}
                type="button"
                onClick={() => { setSent(false); setForm({ name: '', phone: '', description: '' }); }}
              >
                Отправить ещё
              </button>
            </div>
          ) : (
            <form className={styles.contact__form} onSubmit={handleSubmit} noValidate>
              <input
                className={`${styles.contact__input} ${errors.name ? styles['contact__input--error'] : ''}`}
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={form.name}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.name && <p className={styles.contact__error}>{errors.name}</p>}

              <input
                className={`${styles.contact__input} ${errors.phone ? styles['contact__input--error'] : ''}`}
                type="tel"
                name="phone"
                placeholder="+7 (___) ___-__-__"
                value={form.phone}
                onChange={handleChange}
                disabled={loading}
              />
              {errors.phone && <p className={styles.contact__error}>{errors.phone}</p>}

              <textarea
                className={`${styles.contact__input} ${styles.contact__textarea}`}
                name="description"
                placeholder="Опишите заказ (необязательно)"
                rows={4}
                value={form.description}
                onChange={handleChange}
                disabled={loading}
              />

              {serverError && <p className={styles.contact__error}>{serverError}</p>}

              <button className={styles.contact__btn} type="submit" disabled={loading}>
                {loading ? 'Отправка...' : 'Отправить заявку'}
              </button>
              <p className={styles.contact__policy}>
                Нажимая кнопку, Вы соглашаетесь{' '}
                <Link to="/privacy" className={styles.contact__policy_link}>
                  с политикой конфиденциальности
                </Link>
              </p>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}

export default ContactForm;
