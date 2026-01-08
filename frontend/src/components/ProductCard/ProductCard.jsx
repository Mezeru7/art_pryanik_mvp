import styles from './ProductCard.module.scss';

function ProductCard({ image, title, price }) {
  return (
    <article className={styles.card}>
      <div className={styles.card__image_wrap}>
        <img
          src={image}
          alt={title}
          className={styles.card__image}
        />
      </div>
      <div className={styles.card__body}>
        <h3 className={styles.card__title}>{title}</h3>
        <p className={styles.card__price}>{price}</p>
        <button className={styles.card__btn} type="button">
          Подробнее
        </button>
      </div>
    </article>
  );
}

export default ProductCard;
