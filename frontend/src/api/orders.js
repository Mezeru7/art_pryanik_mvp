import API_URL from '../config/api';

/**
 * Получить все заказы (только admin)
 * @param {string} token
 */
export const fetchOrders = async (token) => {
  const res = await fetch(`${API_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Не удалось загрузить заказы');
  return res.json();
};

/**
 * Получить заказ по ID
 * @param {string} token
 * @param {number} id
 */
export const fetchOrderById = async (token, id) => {
  const res = await fetch(`${API_URL}/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Не удалось загрузить заказ');
  return res.json();
};

/**
 * Обновить статус заказа (только admin)
 * @param {string} token
 * @param {number} id
 * @param {'new'|'processing'|'completed'|'cancelled'} status
 */
export const updateOrderStatus = async (token, id, status) => {
  const res = await fetch(`${API_URL}/orders/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Не удалось обновить статус');
  }
  return res.json();
};
