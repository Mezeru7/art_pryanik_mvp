import API_URL from '../config/api';

/**
 * Получить все товары
 */
export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error('Не удалось загрузить товары');
  return res.json();
};

/**
 * Получить все категории
 */
export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error('Не удалось загрузить категории');
  return res.json();
};

/**
 * Создать товар
 * @param {string} token
 * @param {{ title: string, description?: string, price: number, category_id?: number }} data
 */
export const createProduct = async (token, data) => {
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Не удалось создать товар');
  }
  return res.json();
};

/**
 * Обновить товар
 * @param {string} token
 * @param {number} id
 * @param {{ title?: string, description?: string, price?: number, category_id?: number }} data
 */
export const updateProduct = async (token, id, data) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Не удалось обновить товар');
  }
  return res.json();
};

/**
 * Удалить товар
 * @param {string} token
 * @param {number} id
 */
export const deleteProduct = async (token, id) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Не удалось удалить товар');
  }
};
