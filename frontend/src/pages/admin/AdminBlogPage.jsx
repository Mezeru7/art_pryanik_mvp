import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout/AdminLayout';
import SEO from '../../components/SEO/SEO';
import { useAuth } from '../../context/AuthContext';
import { fetchBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost } from '../../api/blog';
import styles from './AdminBlogPage.module.scss';

const EMPTY_FORM = {
  title: '',
  preview_text: '',
  content: '',
  image_url: '',
};

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function PostModal({ post, onSave, onClose, loading }) {
  const isEdit = Boolean(post?.id);
  const [form, setForm] = useState(
    post?.id
      ? {
          title: post.title || '',
          preview_text: post.preview_text || '',
          content: post.content || '',
          image_url: post.image_url || '',
        }
      : EMPTY_FORM
  );
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim()) {
      setError('Введите заголовок статьи');
      return;
    }

    onSave({
      title: form.title.trim(),
      preview_text: form.preview_text.trim() || null,
      content: form.content.trim() || null,
      image_url: form.image_url.trim() || null,
    });
  };

  return (
    <div className={styles.modal__overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={isEdit ? 'Редактировать статью' : 'Новая статья'}
      >
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>
            {isEdit ? 'Редактировать статью' : 'Новая статья'}
          </h2>
          <button
            className={styles.modal__close}
            onClick={onClose}
            type="button"
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <form className={styles.modal__form} onSubmit={handleSubmit} noValidate>
          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="title">
              Заголовок <span className={styles.form__required}>*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className={styles.form__input}
              value={form.title}
              onChange={handleChange}
              placeholder="Заголовок статьи"
              maxLength={255}
              autoFocus
            />
          </div>

          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="image_url">
              URL изображения
            </label>
            <input
              id="image_url"
              name="image_url"
              type="text"
              className={styles.form__input}
              value={form.image_url}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="preview_text">
              Краткое описание
            </label>
            <textarea
              id="preview_text"
              name="preview_text"
              className={styles.form__textarea}
              value={form.preview_text}
              onChange={handleChange}
              placeholder="Краткое описание для карточки статьи..."
              rows={3}
            />
          </div>

          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="content">
              Содержание
            </label>
            <textarea
              id="content"
              name="content"
              className={styles.form__textarea}
              value={form.content}
              onChange={handleChange}
              placeholder="Полный текст статьи..."
              rows={8}
            />
          </div>

          {error && <p className={styles.form__error}>{error}</p>}

          <div className={styles.modal__actions}>
            <button
              type="button"
              className={styles.btn__secondary}
              onClick={onClose}
              disabled={loading}
            >
              Отмена
            </button>
            <button type="submit" className={styles.btn__primary} disabled={loading}>
              {loading ? 'Сохранение...' : isEdit ? 'Сохранить' : 'Создать'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ConfirmModal({ post, onConfirm, onClose, loading }) {
  return (
    <div className={styles.modal__overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${styles.modal__confirm}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>Удалить статью?</h2>
          <button
            className={styles.modal__close}
            onClick={onClose}
            type="button"
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>
        <p className={styles.confirm__text}>
          Вы уверены, что хотите удалить статью{' '}
          <strong>«{post.title}»</strong>? Это действие необратимо.
        </p>
        <div className={styles.modal__actions}>
          <button
            type="button"
            className={styles.btn__secondary}
            onClick={onClose}
            disabled={loading}
          >
            Отмена
          </button>
          <button
            type="button"
            className={styles.btn__danger}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Удаление...' : 'Удалить'}
          </button>
        </div>
      </div>
    </div>
  );
}

function AdminBlogPage() {
  const { token } = useAuth();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [actionError, setActionError] = useState('');

  const [editModal, setEditModal] = useState(null);   // null | {} | post object
  const [deleteModal, setDeleteModal] = useState(null); // null | post object
  const [saving, setSaving] = useState(false);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setFetchError('');
    try {
      const data = await fetchBlogPosts();
      setPosts(data);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const handleSave = async (data) => {
    setSaving(true);
    setActionError('');
    try {
      if (editModal?.id) {
        await updateBlogPost(token, editModal.id, data);
      } else {
        await createBlogPost(token, data);
      }
      setEditModal(null);
      await loadPosts();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    setActionError('');
    try {
      await deleteBlogPost(token, deleteModal.id);
      setDeleteModal(null);
      await loadPosts();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <SEO
        title="Управление блогом"
        description="CRUD статей блога — административная панель Арт-Пряник"
      />

      <div className={styles.page}>
        {/* Заголовок */}
        <div className={styles.page__header}>
          <div>
            <h1 className={styles.page__title}>Блог</h1>
            <p className={styles.page__subtitle}>
              {loading
                ? 'Загрузка...'
                : `${posts.length} стать${getCountSuffix(posts.length)}`}
            </p>
          </div>
          <button
            className={styles.btn__primary}
            onClick={() => {
              setActionError('');
              setEditModal({});
            }}
            type="button"
          >
            + Новая статья
          </button>
        </div>

        {/* Ошибки */}
        {fetchError && (
          <div className={styles.alert__error}>
            {fetchError}
            <button onClick={loadPosts} className={styles.alert__retry} type="button">
              Повторить
            </button>
          </div>
        )}
        {actionError && <div className={styles.alert__error}>{actionError}</div>}

        {/* Таблица */}
        {!loading && !fetchError && (
          <div className={styles.table__wrap}>
            {posts.length === 0 ? (
              <div className={styles.empty}>
                <p className={styles.empty__text}>Статей пока нет</p>
                <button
                  className={styles.btn__primary}
                  onClick={() => {
                    setActionError('');
                    setEditModal({});
                  }}
                  type="button"
                >
                  Написать первую статью
                </button>
              </div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.table__th}>ID</th>
                    <th className={styles.table__th}>Заголовок</th>
                    <th className={styles.table__th}>Slug</th>
                    <th className={styles.table__th}>Автор</th>
                    <th className={styles.table__th}>Дата</th>
                    <th className={`${styles.table__th} ${styles.table__th_actions}`}>
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className={styles.table__row}>
                      <td className={styles.table__td}>{post.id}</td>
                      <td className={`${styles.table__td} ${styles.table__td_title}`}>
                        {post.title}
                      </td>
                      <td className={`${styles.table__td} ${styles.table__td_slug}`}>
                        {post.slug}
                      </td>
                      <td className={styles.table__td}>
                        {post.author
                          ? `${post.author.first_name} ${post.author.last_name || ''}`.trim()
                          : <span className={styles.empty__cell}>—</span>}
                      </td>
                      <td className={styles.table__td}>{formatDate(post.created_at)}</td>
                      <td className={`${styles.table__td} ${styles.table__td_actions}`}>
                        <button
                          className={styles.btn__edit}
                          onClick={() => {
                            setActionError('');
                            setEditModal(post);
                          }}
                          type="button"
                          aria-label={`Редактировать ${post.title}`}
                        >
                          Изменить
                        </button>
                        <button
                          className={styles.btn__delete}
                          onClick={() => {
                            setActionError('');
                            setDeleteModal(post);
                          }}
                          type="button"
                          aria-label={`Удалить ${post.title}`}
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Скелетон */}
        {loading && (
          <div className={styles.skeleton__wrap}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className={styles.skeleton__row} />
            ))}
          </div>
        )}
      </div>

      {/* Модальное окно создания/редактирования */}
      {editModal !== null && (
        <PostModal
          post={editModal?.id ? editModal : null}
          onSave={handleSave}
          onClose={() => setEditModal(null)}
          loading={saving}
        />
      )}

      {/* Модальное окно подтверждения удаления */}
      {deleteModal && (
        <ConfirmModal
          post={deleteModal}
          onConfirm={handleDelete}
          onClose={() => setDeleteModal(null)}
          loading={saving}
        />
      )}
    </AdminLayout>
  );
}

function getCountSuffix(n) {
  if (n % 100 >= 11 && n % 100 <= 19) return 'и';
  const last = n % 10;
  if (last === 1) return 'я';
  if (last >= 2 && last <= 4) return 'и';
  return 'ей';
}

export default AdminBlogPage;
