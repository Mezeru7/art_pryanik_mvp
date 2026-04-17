import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import { useCartContext } from '../context/CartContext';
import { useCartSync } from '../hooks/useCartSync';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';
import styles from './CartPage.module.scss';

const MIN_ORDER = 3;

// Ключ хранения заказов привязан к пользователю
const getOrdersKey = (userId) =>
  userId ? `art_pryanik_orders_${userId}` : 'art_pryanik_orders_guest';

function OrderModal({ items, total, comment, onClose, onSuccess }) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    customer_name: user ? `${user.first_name} ${user.last_name || ''}`.trim() : '',
    customer_phone: user?.phone || '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    setServerError('');
  };

  const validate = () => {
    const errs = {};
    if (!form.customer_name.trim()) errs.customer_name = 'Введите имя';
    if (!form.customer_phone.trim()) errs.customer_phone = 'Введите телефон';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setServerError('');

    try {
      const orderItems = items.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price_at_moment: item.priceNum,
      }));

      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.customer_name.trim(),
          customer_phone: form.customer_phone.trim(),
          comment: comment || null,
          items: orderItems,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error || 'Ошибка при оформлении заказа');
        return;
      }

      onSuccess(data);
    } catch {
      setServerError('Не удалось подключиться к серверу');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modal__overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>Оформление заказа</h2>
          <button className={styles.modal__close} onClick={onClose} type="button" aria-label="Закрыть">
            ✕
          </button>
        </div>

        <form className={styles.modal__form} onSubmit={handleSubmit} noValidate>
          <div className={styles.modal__summary}>
            <span>Товаров: {items.reduce((s, i) => s + i.quantity, 0)} шт.</span>
            <span>Итого: {total} ₽</span>
          </div>

          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="customer_name">
              Ваше имя <span className={styles.form__required}>*</span>
            </label>
            <input
              id="customer_name"
              name="customer_name"
              type="text"
              className={`${styles.form__input} ${errors.customer_name ? styles['form__input--error'] : ''}`}
              value={form.customer_name}
              onChange={handleChange}
              placeholder="Иван Иванов"
              disabled={loading}
            />
            {errors.customer_name && <p className={styles.form__error}>{errors.customer_name}</p>}
          </div>

          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="customer_phone">
              Телефон <span className={styles.form__required}>*</span>
            </label>
            <input
              id="customer_phone"
              name="customer_phone"
              type="tel"
              className={`${styles.form__input} ${errors.customer_phone ? styles['form__input--error'] : ''}`}
              value={form.customer_phone}
              onChange={handleChange}
              placeholder="+7 900 000 00 00"
              disabled={loading}
            />
            {errors.customer_phone && <p className={styles.form__error}>{errors.customer_phone}</p>}
          </div>

          {serverError && <p className={styles.form__error}>{serverError}</p>}

          <div className={styles.modal__actions}>
            <button type="button" className={styles.btn__secondary} onClick={onClose} disabled={loading}>
              Отмена
            </button>
            <button type="submit" className={styles.btn__primary} disabled={loading}>
              {loading ? 'Оформляем...' : 'Подтвердить заказ'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function CartPage() {
  const { items, removeItem, updateQuantity, total, count, clearCart } = useCartContext();
  const [comment, setComment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useCartSync(items, removeItem);

  const canOrder = count >= MIN_ORDER;

  const handleSuccess = (order) => {
    try {
      const key = getOrdersKey(user?.id);
      const stored = localStorage.getItem(key);
      const orders = stored ? JSON.parse(stored) : [];
      orders.unshift({
        order_code: order.order_code,
        status: order.status,
        total: total,
        items: items,
        created_at: new Date().toISOString(),
      });
      localStorage.setItem(key, JSON.stringify(orders));
    } catch {}

    clearCart();
    setShowModal(false);
    setSuccessOrder(order);
  };

  if (successOrder) {
    return (
      <>
        <SEO title="Заказ оформлен" description="Ваш заказ успешно оформлен" path="/cart" />
        <section className={styles.cart__hero}>
          <div className={styles.cart__hero_inner}>
            <h1 className={styles.cart__hero_title}>Заказ оформлен!</h1>
          </div>
        </section>
        <section className={styles.cart__main}>
          <div className={styles.cart__success}>
            <p className={styles.cart__success_code}>
              Номер заказа: <strong>{successOrder.order_code}</strong>
            </p>
            <p className={styles.cart__success_text}>
              Мы свяжемся с вами в ближайшее время для подтверждения.
            </p>
            <div className={styles.cart__success_actions}>
              <button
                className={styles.cart__order_btn}
                onClick={() => navigate('/orders')}
                type="button"
              >
                Мои заказы
              </button>
              <Link to="/catalog" className={styles.cart__empty_link}>
                Продолжить покупки
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Корзина"
        description="Корзина покупок — Арт-Пряник. Проверьте состав заказа и оформите доставку пряников ручной работы."
        path="/cart"
      />

      <section className={styles.cart__hero}>
        <div className={styles.cart__hero_inner}>
          <h1 className={styles.cart__hero_title}>Корзина</h1>
        </div>
      </section>

      <section className={styles.cart__main}>
        <div className={styles.cart__container}>

          <div className={styles.cart__left}>
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
              onClick={() => setShowModal(true)}
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

      {showModal && (
        <OrderModal
          items={items}
          total={total}
          comment={comment}
          onClose={() => setShowModal(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}

export default CartPage;
