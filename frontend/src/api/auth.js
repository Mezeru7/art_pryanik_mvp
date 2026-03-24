import API_URL from '../config/api';

/**
 * Получить текущего пользователя
 * @param {string} token
 */
export const fetchMe = async (token) => {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Не удалось получить данные пользователя');
  return res.json();
};

/**
 * Обновить данные текущего пользователя
 * @param {string} token
 * @param {{ first_name?: string, last_name?: string, email?: string, phone?: string, bio?: string }} data
 */
export const updateMe = async (token, data) => {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Не удалось сохранить изменения');
  }
  return res.json();
};
