import { Link } from 'react-router-dom';
import styles from './ContactForm.module.scss';

const FEATURES = [
  'Индивидуальный дизайн',
  'Натуральные ингредиенты',
  'Быстрое изготовление',
];

function ContactForm() {
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
          {/* Пряник-звезда в правом верхнем углу */}
          <img
            src="/assets/images/star.png"
            alt="Пряник звезда"
            className={styles.contact__star}
          />

          <form className={styles.contact__form} onSubmit={(e) => e.preventDefault()}>
            <input
              className={styles.contact__input}
              type="text"
              placeholder="Ваше имя"
            />
            <input
              className={styles.contact__input}
              type="tel"
              placeholder="+7 (___) ___-__-__"
            />
            <textarea
              className={`${styles.contact__input} ${styles.contact__textarea}`}
              placeholder="Опишите заказ (необязательно)"
              rows={4}
            />
            <button className={styles.contact__btn} type="submit">
              Отправить заявку
            </button>
            <p className={styles.contact__policy}>
              Нажимая кнопку, Вы соглашаетесь{' '}
              <Link to="/privacy" className={styles.contact__policy_link}>
                с политикой конфиденциальности
              </Link>
            </p>
          </form>
        </div>

      </div>
    </section>
  );
}

export default ContactForm;
