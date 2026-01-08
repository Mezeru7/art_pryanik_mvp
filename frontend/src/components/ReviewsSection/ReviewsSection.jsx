import { useState } from 'react';
import styles from './ReviewsSection.module.scss';

const REVIEWS = [
  {
    id: 1,
    name: 'Светлана Морозова',
    avatar: '/assets/images/svetlana_morozova.png',
    text: 'Подарила подруге набор коллекции ко дню рождения. Исчезло всё в один миг! Супер вариант для подарка с интересным рисунком! Друзья в полном восхищении',
  },
  {
    id: 2,
    name: 'Мария Абрамова',
    avatar: '/assets/images/maria_abramova.png',
    text: 'Заказала для сына набор новогодней коллекции. Съели всё почти сразу! Рекомендую к приобретению! Вся семья в восторге',
  },
  {
    id: 3,
    name: 'Алексей Палкин',
    avatar: '/assets/images/alexey_palkin.png',
    text: 'Взял на праздник набор новогодней коллекции для племянницы. Уплели за считанные минуты! Обязательно берите, не пожалеете! Родные не нарадуются',
  },
];

function ReviewsSection() {
  const [active, setActive] = useState(1);

  const prev = () => setActive((i) => (i === 0 ? REVIEWS.length - 1 : i - 1));
  const next = () => setActive((i) => (i === REVIEWS.length - 1 ? 0 : i + 1));

  const getIndex = (offset) => (active + offset + REVIEWS.length) % REVIEWS.length;

  return (
    <section className={styles.reviews}>
      <div className={styles.reviews__container}>
        <h2 className={styles.reviews__title}>Отзывы клиентов</h2>

        <div className={styles.reviews__slider}>
          {/* Левая карточка */}
          <div className={`${styles.reviews__card} ${styles['reviews__card--side']}`}>
            <div className={styles.reviews__card_header}>
              <img
                src={REVIEWS[getIndex(-1)].avatar}
                alt={REVIEWS[getIndex(-1)].name}
                className={styles.reviews__avatar}
              />
              <span className={styles.reviews__name}>{REVIEWS[getIndex(-1)].name}</span>
            </div>
            <p className={styles.reviews__text}>{REVIEWS[getIndex(-1)].text}</p>
          </div>

          {/* Кнопка влево */}
          <button className={styles.reviews__btn} onClick={prev} aria-label="Предыдущий отзыв">
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 1.5L1.5 8L8.5 14.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Центральная карточка */}
          <div className={`${styles.reviews__card} ${styles['reviews__card--active']}`}>
            <div className={styles.reviews__card_header}>
              <img
                src={REVIEWS[active].avatar}
                alt={REVIEWS[active].name}
                className={styles.reviews__avatar}
              />
              <span className={styles.reviews__name}>{REVIEWS[active].name}</span>
            </div>
            <p className={styles.reviews__text}>{REVIEWS[active].text}</p>
          </div>

          {/* Кнопка вправо */}
          <button className={styles.reviews__btn} onClick={next} aria-label="Следующий отзыв">
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.5 1.5L8.5 8L1.5 14.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Правая карточка */}
          <div className={`${styles.reviews__card} ${styles['reviews__card--side']}`}>
            <div className={styles.reviews__card_header}>
              <img
                src={REVIEWS[getIndex(1)].avatar}
                alt={REVIEWS[getIndex(1)].name}
                className={styles.reviews__avatar}
              />
              <span className={styles.reviews__name}>{REVIEWS[getIndex(1)].name}</span>
            </div>
            <p className={styles.reviews__text}>{REVIEWS[getIndex(1)].text}</p>
          </div>
        </div>

        {/* Точки-индикаторы */}
        <div className={styles.reviews__dots}>
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              className={`${styles.reviews__dot} ${i === active ? styles['reviews__dot--active'] : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Отзыв ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ReviewsSection;
