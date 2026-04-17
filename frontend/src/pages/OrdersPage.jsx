import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import { useAuth } from '../context/AuthContext';
import styles from './OrdersPage.module.scss';

const getOrdersKey = (userId) =>
  userId ? `art_pryanik_orders_${userId}` : 'art_pryanik_orders_guest';

const STATUS_LABELS = {
  new: 'Новый',
  processing: 'В обработке',
  completed: 'Выполнен',
  cancelled: 'Отменён',
};

const STATUS_COLORS = {
  new: 'status--new',
  processing: 'status--processing',
  completed: 'status--completed',
  cancelled: 'status--cancelled',
};

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    try {
      const key = getOrdersKey(user?.id);
      const stored = localStorage.getItem(key);
      setOrders(stored ? JSON.parse(stored) : []);
    } catch {
      setOrders([]);
    }
  }, [user]);

  return (
    <>
      <SEO
        title="История заказов"
        description="История ваших заказов в Арт-Пряник — отслеживайте статус и состав оформленных заказов."
        path="/orders"
      />

      <section className={styles.orders__hero}>
        <div className={styles.orders__hero_inner}>
          <h1 className={styles.orders__hero_title}>История заказов</h1>
        </div>
      </section>

      <section className={styles.orders__main}>
        <div className={styles.orders__container}>
          {orders.length === 0 ? (
            <div className={styles.orders__empty}>
              <p>У вас пока нет заказов.</p>
              <Link to="/catalog" className={styles.orders__empty_link}>
                Перейти в каталог
              </Link>
            </div>
          ) : (
            <div className={styles.orders__list}>
              {orders.map((order) => (
                <div key={order.order_code} className={styles.orders__card}>
                  <div className={styles.orders__card_header}>
                    <span className={styles.orders__code}>
                      Заказ #{order.order_code}
                    </span>
                    <span className={`${styles.orders__status} ${styles[STATUS_COLORS[order.status] || 'status--new']}`}>
                      {STATUS_LABELS[order.status] || 'Новый'}
                    </span>
                  </div>

                  <div className={styles.orders__card_body}>
                    <ul className={styles.orders__items}>
                      {order.items.map((item, idx) => (
                        <li key={idx} className={styles.orders__item}>
                          <img
                            src={item.image}
                            alt={item.title}
                            className={styles.orders__item_img}
                            loading="lazy"
                          />
                          <div className={styles.orders__item_info}>
                            <p className={styles.orders__item_title}>{item.title}</p>
                            <p className={styles.orders__item_qty}>
                              {item.quantity} шт. × {item.priceNum} р.
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.orders__card_footer}>
                    <span className={styles.orders__date}>
                      {new Date(order.created_at).toLocaleDateString('ru-RU', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                      })}
                    </span>
                    <span className={styles.orders__total}>
                      Итого: {order.total} р.
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default OrdersPage;
