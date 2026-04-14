import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import { useCartContext } from '../context/CartContext';
import { useCartSync } from '../hooks/useCartSync';
import styles from './CartPage.module.scss';

function CartPage() {
  const { items, removeItem, updateQuantity, total, count } = useCartContext();
  const [comment, setComment] = useState('');

  useCartSync(items, removeItem);

  const MIN_ORDER = 3;
  const canOrder = count >= MIN_ORDER;

  return (
    <>
      <SEO
        title="Корзина"
        description="Корзина покупок — Арт-Пряник. Проверьте состав заказа и оформите доставку пряников ручной работы."
        path="/cart"
      />

      {/* Заголовок */}
      <section className={styles.cart__hero}>
        <div className={styles.cart__hero_inner}>
          <h1 className={styles.cart__hero_title}>Корзина</h1>
        </div>
      </section>

      {/* Основной блок */}
      <section className={styles.cart__main}>
        <div className={styles.cart__container}>

          {/* Левая часть */}
          <div className={styles.cart__left}>

            {/* Товары */}
            <div className={styles.cart__items}>
              <h2 className={styles.cart__section_title}>Товары в корзине</h2>
              <div className={styles.cart__divider} />

              {items.length === 0 ? (
                <p className={styles.cart__empty}>
                  Корзина пуста.{' '}
                  <Link to="/catalog" className={styles.cart__empty_link}>
                    Перейти в каталог
                  </Link>
                </p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className={styles.cart__item}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles.cart__item_img}
                      loading="lazy"
                    />
                    <div className={styles.cart__item_info}>
                      <p className={styles.cart__item_title}>{item.title}</p>
                      <p className={styles.cart__item_price}>
                        {item.priceNum * item.quantity} р. / шт.
                      </p>
                      <div className={styles.cart__qty}>
                        <button
                          className={styles.cart__qty_btn}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          type="button"
                          aria-label="Уменьшить"
                        >
                          −
                        </button>
                        <span className={styles.cart__qty_val}>{item.quantity}</span>
                        <button
                          className={styles.cart__qty_btn}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          type="button"
                          aria-label="Увеличить"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      className={styles.cart__remove}
                      onClick={() => removeItem(item.id)}
                      type="button"
                    >
                      Удалить
                    </button>
                    <div className={styles.cart__item_divider} />
                  </div>
                ))
              )}
            </div>

            {/* Комментарий */}
            <div className={styles.cart__comment}>
              <h2 className={styles.cart__section_title}>Комментарий к заказу</h2>
              <textarea
                className={styles.cart__comment_input}
                placeholder="Комментарий к заказу"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={5}
              />
            </div>
          </div>

          {/* Правая часть — итог */}
          <aside className={styles.cart__summary}>
            <h2 className={styles.cart__summary_title}>Ваш заказ</h2>
            <p className={styles.cart__summary_total}>
              Итого: {total} рублей
            </p>
            {!canOrder && items.length > 0 && (
              <p className={styles.cart__min_warning}>
                Минимальный заказ — от 3 шт. Добавьте ещё {MIN_ORDER - count} шт.
              </p>
            )}
            <button
              className={styles.cart__order_btn}
              type="button"
              disabled={!canOrder}
            >
              Оформить заказ
            </button>
            <p className={styles.cart__policy}>
              Нажимая кнопку, Вы соглашаетесь{' '}
              <Link to="/privacy" className={styles.cart__policy_link}>
                с политикой конфиденциальности
              </Link>
            </p>
          </aside>

        </div>
      </section>
    </>
  );
}

export default CartPage;
