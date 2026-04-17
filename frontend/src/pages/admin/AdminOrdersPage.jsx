import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout/AdminLayout';
import SEO from '../../components/SEO/SEO';
import { useAuth } from '../../context/AuthContext';
import { fetchOrders, updateOrderStatus, deleteOrder } from '../../api/orders';
import styles from './AdminOrdersPage.module.scss';

const STATUS_CONFIG = {
  new:        { label: 'Новый',      color: 'blue' },
  processing: { label: 'В работе',   color: 'orange' },
  completed:  { label: 'Выполнен',   color: 'green' },
  cancelled:  { label: 'Отменён',    color: 'red' },
};

const STATUS_OPTIONS = Object.entries(STATUS_CONFIG).map(([value, { label }]) => ({
  value,
  label,
}));

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatPrice(price) {
  return Number(price).toLocaleString('ru-RU') + ' ₽';
}

function OrderModal({ order, onClose, onStatusChange, saving }) {
  const [selectedStatus, setSelectedStatus] = useState(order.status);
  const statusCfg = STATUS_CONFIG[order.status] || {};

  const handleSave = () => {
    if (selectedStatus !== order.status) {
      onStatusChange(order.id, selectedStatus);
    }
  };

  return (
    <div className={styles.modal__overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Заказ ${order.order_code}`}
      >
        {/* Шапка */}
        <div className={styles.modal__header}>
          <div>
            <h2 className={styles.modal__title}>Заказ {order.order_code}</h2>
            <p className={styles.modal__date}>{formatDate(order.created_at)}</p>
          </div>
          <button
            className={styles.modal__close}
            onClick={onClose}
            type="button"
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <div className={styles.modal__body}>
          {/* Информация о покупателе */}
          <section className={styles.modal__section}>
            <h3 className={styles.modal__section_title}>Покупатель</h3>
            <div className={styles.info__grid}>
              <div className={styles.info__row}>
                <span className={styles.info__label}>Имя</span>
                <span className={styles.info__value}>{order.customer_name}</span>
              </div>
              <div className={styles.info__row}>
                <span className={styles.info__label}>Телефон</span>
                <a href={`tel:${order.customer_phone}`} className={styles.info__link}>
                  {order.customer_phone}
                </a>
              </div>
              {order.comment && (
                <div className={styles.info__row}>
                  <span className={styles.info__label}>Комментарий</span>
                  <span className={styles.info__value}>{order.comment}</span>
                </div>
              )}
            </div>
          </section>

          {/* Состав заказа */}
          <section className={styles.modal__section}>
            <h3 className={styles.modal__section_title}>Состав заказа</h3>
            <div className={styles.items__list}>
              {order.OrderItems?.map((item) => (
                <div key={item.id} className={styles.item__row}>
                  <span className={styles.item__name}>
                    {item.Product?.title || `Товар #${item.product_id}`}
                  </span>
                  <span className={styles.item__qty}>{item.quantity} шт.</span>
                  <span className={styles.item__price}>
                    {formatPrice(item.price_at_moment * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.total__row}>
              <span className={styles.total__label}>Итого</span>
              <span className={styles.total__value}>{formatPrice(order.total_price)}</span>
            </div>
          </section>

          {/* Изменение статуса */}
          <section className={styles.modal__section}>
            <h3 className={styles.modal__section_title}>Статус заказа</h3>
            <div className={styles.status__current}>
              <span className={`${styles.badge} ${styles[`badge__${statusCfg.color}`]}`}>
                {statusCfg.label}
              </span>
            </div>
            <div className={styles.status__select_wrap}>
              <label className={styles.form__label} htmlFor="status-select">
                Изменить статус
              </label>
              <select
                id="status-select"
                className={styles.form__select}
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                disabled={saving}
              >
                {STATUS_OPTIONS.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </section>
        </div>

        {/* Действия */}
        <div className={styles.modal__footer}>
          <button
            type="button"
            className={styles.btn__secondary}
            onClick={onClose}
            disabled={saving}
          >
            Закрыть
          </button>
          <button
            type="button"
            className={styles.btn__primary}
            onClick={handleSave}
            disabled={saving || selectedStatus === order.status}
          >
            {saving ? 'Сохранение...' : 'Сохранить статус'}
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminOrdersPage() {
  const { token } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [actionError, setActionError] = useState('');

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);
  const [saving, setSaving] = useState(false);

  const [filterStatus, setFilterStatus] = useState('all');

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setFetchError('');
    try {
      const data = await fetchOrders(token);
      setOrders(data);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleStatusChange = async (id, status) => {
    setSaving(true);
    setActionError('');
    try {
      await updateOrderStatus(token, id, status);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
      setSelectedOrder((prev) => (prev?.id === id ? { ...prev, status } : prev));
    } catch (err) {
      setActionError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal) return;
    setSaving(true);
    setActionError('');
    try {
      await deleteOrder(token, deleteModal.id);
      setOrders((prev) => prev.filter((o) => o.id !== deleteModal.id));
      setDeleteModal(null);
    } catch (err) {
      setActionError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const filteredOrders =
    filterStatus === 'all' ? orders : orders.filter((o) => o.status === filterStatus);

  return (
    <AdminLayout>
      <SEO title="Управление заказами" description="Список заказов — административная панель Арт-Пряник" />

      <div className={styles.page}>
        {/* Заголовок */}
        <div className={styles.page__header}>
          <div>
            <h1 className={styles.page__title}>Заказы</h1>
            <p className={styles.page__subtitle}>
              {loading
                ? 'Загрузка...'
                : `${orders.length} заказ${getCountSuffix(orders.length)}`}
            </p>
          </div>

          {/* Фильтр по статусу */}
          <div className={styles.filter__wrap}>
            <button
              className={`${styles.filter__btn} ${filterStatus === 'all' ? styles['filter__btn--active'] : ''}`}
              onClick={() => setFilterStatus('all')}
              type="button"
            >
              Все
            </button>
            {STATUS_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                className={`${styles.filter__btn} ${filterStatus === value ? styles['filter__btn--active'] : ''}`}
                onClick={() => setFilterStatus(value)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Ошибки */}
        {fetchError && (
          <div className={styles.alert__error}>
            {fetchError}
            <button onClick={loadOrders} className={styles.alert__retry} type="button">
              Повторить
            </button>
          </div>
        )}
        {actionError && (
          <div className={styles.alert__error}>{actionError}</div>
        )}

        {/* Таблица */}
        {!loading && !fetchError && (
          <div className={styles.table__wrap}>
            {filteredOrders.length === 0 ? (
              <div className={styles.empty}>
                <p className={styles.empty__text}>
                  {filterStatus === 'all' ? 'Заказов пока нет' : 'Нет заказов с таким статусом'}
                </p>
              </div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.table__th}>Код заказа</th>
                    <th className={styles.table__th}>Покупатель</th>
                    <th className={styles.table__th}>Телефон</th>
                    <th className={styles.table__th}>Сумма</th>
                    <th className={styles.table__th}>Статус</th>
                    <th className={styles.table__th}>Дата</th>
                    <th className={`${styles.table__th} ${styles.table__th_actions}`}>
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => {
                    const cfg = STATUS_CONFIG[order.status] || {};
                    return (
                      <tr key={order.id} className={styles.table__row}>
                        <td className={`${styles.table__td} ${styles.table__td_code}`}>
                          {order.order_code}
                        </td>
                        <td className={styles.table__td}>{order.customer_name}</td>
                        <td className={styles.table__td}>
                          <a href={`tel:${order.customer_phone}`} className={styles.phone__link}>
                            {order.customer_phone}
                          </a>
                        </td>
                        <td className={styles.table__td}>{formatPrice(order.total_price)}</td>
                        <td className={styles.table__td}>
                          <span className={`${styles.badge} ${styles[`badge__${cfg.color}`]}`}>
                            {cfg.label}
                          </span>
                        </td>
                        <td className={`${styles.table__td} ${styles.table__td_date}`}>
                          {formatDate(order.created_at)}
                        </td>
                        <td className={`${styles.table__td} ${styles.table__td_actions}`}>
                          <button
                            className={styles.btn__view}
                            onClick={() => { setActionError(''); setSelectedOrder(order); }}
                            type="button"
                            aria-label={`Просмотреть заказ ${order.order_code}`}
                          >
                            Просмотр
                          </button>
                          <button
                            className={styles.btn__delete}
                            onClick={() => { setActionError(''); setDeleteModal(order); }}
                            type="button"
                            aria-label={`Удалить заказ ${order.order_code}`}
                          >
                            Удалить
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Скелетон */}
        {loading && (
          <div className={styles.skeleton__wrap}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.skeleton__row} />
            ))}
          </div>
        )}
      </div>

      {/* Модальное окно заказа */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
          saving={saving}
        />
      )}

      {/* Подтверждение удаления */}
      {deleteModal && (
        <div className={styles.modal__overlay} onClick={() => setDeleteModal(null)}>
          <div
            className={`${styles.modal} ${styles.modal__confirm}`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className={styles.modal__header}>
              <h2 className={styles.modal__title}>Удалить заказ?</h2>
              <button className={styles.modal__close} onClick={() => setDeleteModal(null)} type="button" aria-label="Закрыть">✕</button>
            </div>
            <p className={styles.confirm__text}>
              Вы уверены, что хотите удалить заказ <strong>{deleteModal.order_code}</strong>? Это действие необратимо.
            </p>
            <div className={styles.modal__footer}>
              <button type="button" className={styles.btn__secondary} onClick={() => setDeleteModal(null)} disabled={saving}>
                Отмена
              </button>
              <button type="button" className={styles.btn__danger} onClick={handleDelete} disabled={saving}>
                {saving ? 'Удаление...' : 'Удалить'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function getCountSuffix(n) {
  if (n % 100 >= 11 && n % 100 <= 19) return 'ов';
  const last = n % 10;
  if (last === 1) return '';
  if (last >= 2 && last <= 4) return 'а';
  return 'ов';
}

export default AdminOrdersPage;
