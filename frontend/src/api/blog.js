import API_URL from '../config/api';

/**
 * Получить все статьи блога
 */
export const fetchBlogPosts = async () => {
  const res = await fetch(`${API_URL}/blog`);
  if (!res.ok) throw new Error('Не удалось загрузить статьи');
  return res.json();
};

/**
 * Создать статью (admin)
 * @param {string} token
 * @param {{ title: string, preview_text?: string, content?: string, image_url?: string }} data
 */
export const createBlogPost = async (token, data) => {
  const res = await fetch(`${API_URL}/blog`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Не удалось создать статью');
  }
  return res.json();
};

/**
 * Обновить статью (admin)
 * @param {string} token
 * @param {number} id
 * @param {{ title?: string, preview_text?: string, content?: string, image_url?: string }} data
 */
export const updateBlogPost = async (token, id, data) => {
  const res = await fetch(`${API_URL}/blog/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Не удалось обновить статью');
  }
  return res.json();
};

/**
 * Удалить статью (admin)
 * @param {string} token
 * @param {number} id
 */
export const deleteBlogPost = async (token, id) => {
  const res = await fetch(`${API_URL}/blog/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Не удалось удалить статью');
  }
};
