import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import { CATALOG_PRODUCTS } from '../data/catalogProducts';
import styles from './ProductPage.module.scss';

function ProductPage() {
  const { slug } = useParams();
  const product = CATALOG_PRODUCTS.find((p) => p.slug === slug);
  const [quantity, setQuantity] = useState(1);

  if (!product) return <Navigate to="/catalog" replace />;

  const dec = () => setQuantity((q) => Math.max(1, q - 1));
  const inc = () => setQuantity((q) => q + 1);

  return (
    <>
      <SEO
        title={product.title}
        description={product.description.split('\n')[0]}
        image={product.image}
        path={`/product/${product.slug}`}
      />

      <div className={styles.product}>
        <div className={styles.product__container}>

          {/* Верхний блок: фото + инфо */}
          <div className={styles.product__top}>

            {/* Фото */}
            <div className={styles.product__gallery}>
              <div className={styles.product__image_wrap}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.product__image}
                  loading="eager"
                />
              </div>
            </div>

            {/* Информация */}
            <div className={styles.product__info}>
              <h1 className={styles.product__title}>{product.title}</h1>
              <p className={styles.product__price}>{product.priceNum} рублей / шт.</p>

              {/* Счётчик количества */}
              <div className={styles.product__qty}>
                <button
                  className={styles.product__qty_btn}
                  onClick={dec}
                  aria-label="Уменьшить количество"
                  type="button"
                >
                  −
                </button>
                <span className={styles.product__qty_val}>{quantity}</span>
                <button
                  className={styles.product__qty_btn}
                  onClick={inc}
                  aria-label="Увеличить количество"
                  type="button"
                >
                  +
                </button>
              </div>

              {/* Кнопка в корзину (заглушка) */}
              <button className={styles.product__cart_btn} type="button">
                В корзину
              </button>

              <p className={styles.product__min_order}>Минимальный заказ от 3-х шт.</p>
            </div>
          </div>

          {/* Описание товара */}
          <div className={styles.product__description}>
            <h2 className={styles.product__desc_title}>Описание товара</h2>
            {product.description.split('\n\n').map((para, i) => (
              <p key={i} className={styles.product__desc_text}>{para}</p>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

export default ProductPage;
