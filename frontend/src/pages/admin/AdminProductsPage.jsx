import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '../../components/AdminLayout/AdminLayout';
import SEO from '../../components/SEO/SEO';
import { useAuth } from '../../context/AuthContext';
import {
  fetchProducts,
  fetchCategories,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../../api/products';
import styles from './AdminProductsPage.module.scss';

const EMPTY_FORM = {
  title: '',
  description: '',
  price: '',
  category_id: '',
};

function ProductModal({ product, categories, onSave, onClose, loading }) {
  const isEdit = Boolean(product?.id);
  const [form, setForm] = useState(
    product
      ? {
          title: product.title || '',
          description: product.description || '',
          price: product.price ?? '',
          category_id: product.category_id ?? '',
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
      setError('Введите название товара');
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      setError('Введите корректную цену');
      return;
    }

    onSave({
      title: form.title.trim(),
      description: form.description.trim() || null,
      price: Number(form.price),
      category_id: form.category_id ? Number(form.category_id) : null,
    });
  };

  return (
    <div className={styles.modal__overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>
            {isEdit ? 'Редактировать товар' : 'Новый товар'}
          </h2>
          <button className={styles.modal__close} onClick={onClose} type="button" aria-label="Закрыть">
            ✕
          </button>
        </div>

        <form className={styles.modal__form} onSubmit={handleSubmit} noValidate>
          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="title">
              Название <span className={styles.form__required}>*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className={styles.form__input}
              value={form.title}
              onChange={handleChange}
              placeholder="Например: Пряник «Сердце»"
              maxLength={255}
              autoFocus
            />
          </div>

          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="price">
              Цена (₽) <span className={styles.form__required}>*</span>
            </label>
            <input
              id="price"
              name="price"
              type="number"
              className={styles.form__input}
              value={form.price}
              onChange={handleChange}
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>

          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="category_id">
              Категория
            </label>
            <select
              id="category_id"
              name="category_id"
              className={styles.form__select}
              value={form.category_id}
              onChange={handleChange}
            >
              <option value="">— Без категории —</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.form__group}>
            <label className={styles.form__label} htmlFor="description">
              Описание
            </label>
            <textarea
              id="description"
              name="description"
              className={styles.form__textarea}
              value={form.description}
              onChange={handleChange}
              placeholder="Краткое описание товара..."
              rows={4}
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

function ConfirmModal({ product, onConfirm, onClose, loading }) {
  return (
    <div className={styles.modal__overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${styles.modal__confirm}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.modal__header}>
          <h2 className={styles.modal__title}>Удалить товар?</h2>
          <button className={styles.modal__close} onClick={onClose} type="button" aria-label="Закрыть">
            ✕
          </button>
        </div>
        <p className={styles.confirm__text}>
          Вы уверены, что хотите удалить товар{' '}
          <strong>«{product.title}»</strong>? Это действие необратимо.
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

function AdminProductsPage() {
  const { token } = useAuth();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [fetchError, setFetchError] = useState('');

  // Модальные окна
  const [editModal, setEditModal] = useState(null);   // null | product object | {}
  const [deleteModal, setDeleteModal] = useState(null); // null | product object
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState('');

  const loadData = useCallback(async () => {
    setLoadingData(true);
    setFetchError('');
    try {
      const [prods, cats] = await Promise.all([fetchProducts(), fetchCategories()]);
      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Создание / редактирование
  const handleSave = async (data) => {
    setSaving(true);
    setActionError('');
    try {
      if (editModal?.id) {
        await updateProduct(token, editModal.id, data);
      } else {
        await createProduct(token, data);
      }
      setEditModal(null);
      await loadData();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Удаление
  const handleDelete = async () => {
    setSaving(true);
    setActionError('');
    try {
      await deleteProduct(token, deleteModal.id);
      setDeleteModal(null);
      await loadData();
    } catch (err) {
      setActionError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const getCategoryName = (product) => {
    if (product.Category?.name) return product.Category.name;
    if (product.category_id) {
      const cat = categories.find((c) => c.id === product.category_id);
      return cat?.name || '—';
    }
    return '—';
  };

  return (
    <AdminLayout>
      <SEO title="Управление товарами" description="CRUD товаров — административная панель Арт-Пряник" />

      <div className={styles.page}>
        {/* Заголовок */}
        <div className={styles.page__header}>
          <div>
            <h1 className={styles.page__title}>Товары</h1>
            <p className={styles.page__subtitle}>
              {loadingData ? 'Загрузка...' : `${products.length} товар${getCountSuffix(products.length)}`}
            </p>
          </div>
          <button
            className={styles.btn__primary}
            onClick={() => { setActionError(''); setEditModal({}); }}
            type="button"
          >
            + Добавить товар
          </button>
        </div>

        {/* Ошибка загрузки */}
        {fetchError && (
          <div className={styles.alert__error}>
            {fetchError}
            <button onClick={loadData} className={styles.alert__retry} type="button">
              Повторить
            </button>
          </div>
        )}

        {/* Ошибка действия */}
        {actionError && (
          <div className={styles.alert__error}>{actionError}</div>
        )}

        {/* Таблица */}
        {!loadingData && !fetchError && (
          <div className={styles.table__wrap}>
            {products.length === 0 ? (
              <div className={styles.empty}>
                <p className={styles.empty__text}>Товаров пока нет</p>
                <button
                  className={styles.btn__primary}
                  onClick={() => { setActionError(''); setEditModal({}); }}
                  type="button"
                >
                  Добавить первый товар
                </button>
              </div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.table__th}>ID</th>
                    <th className={styles.table__th}>Название</th>
                    <th className={styles.table__th}>Категория</th>
                    <th className={styles.table__th}>Цена</th>
                    <th className={styles.table__th}>Описание</th>
                    <th className={`${styles.table__th} ${styles.table__th_actions}`}>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className={styles.table__row}>
                      <td className={styles.table__td}>{product.id}</td>
                      <td className={`${styles.table__td} ${styles.table__td_title}`}>
                        {product.title}
                      </td>
                      <td className={styles.table__td}>
                        <span className={styles.badge}>{getCategoryName(product)}</span>
                      </td>
                      <td className={styles.table__td}>
                        {Number(product.price).toLocaleString('ru-RU')} ₽
                      </td>
                      <td className={`${styles.table__td} ${styles.table__td_desc}`}>
                        {product.description
                          ? product.description.length > 60
                            ? product.description.slice(0, 60) + '...'
                            : product.description
                          : <span className={styles.empty__cell}>—</span>}
                      </td>
                      <td className={`${styles.table__td} ${styles.table__td_actions}`}>
                        <button
                          className={styles.btn__edit}
                          onClick={() => { setActionError(''); setEditModal(product); }}
                          type="button"
                          aria-label={`Редактировать ${product.title}`}
                        >
                          Изменить
                        </button>
                        <button
                          className={styles.btn__delete}
                          onClick={() => { setActionError(''); setDeleteModal(product); }}
                          type="button"
                          aria-label={`Удалить ${product.title}`}
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

        {/* Скелетон загрузки */}
        {loadingData && (
          <div className={styles.skeleton__wrap}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className={styles.skeleton__row} />
            ))}
          </div>
        )}
      </div>

      {/* Модальное окно создания/редактирования */}
      {editModal !== null && (
        <ProductModal
          product={editModal?.id ? editModal : null}
          categories={categories}
          onSave={handleSave}
          onClose={() => setEditModal(null)}
          loading={saving}
        />
      )}

      {/* Модальное окно подтверждения удаления */}
      {deleteModal && (
        <ConfirmModal
          product={deleteModal}
          onConfirm={handleDelete}
          onClose={() => setDeleteModal(null)}
          loading={saving}
        />
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

export default AdminProductsPage;
