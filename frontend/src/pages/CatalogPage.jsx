import { useState, useEffect } from 'react';
import SEO from '../components/SEO/SEO';
import ProductCard from '../components/ProductCard/ProductCard';
import API_URL from '../config/api';
import styles from './CatalogPage.module.scss';

const ITEMS_PER_PAGE = 9;

function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [activeCategory, setActiveCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`${API_URL}/products`),
          fetch(`${API_URL}/categories`),
        ]);
        if (!prodRes.ok) throw new Error('Не удалось загрузить товары');
        if (!catRes.ok) throw new Error('Не удалось загрузить категории');
        const [prods, cats] = await Promise.all([prodRes.json(), catRes.json()]);
        setProducts(prods);
        setCategories(cats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = activeCategory
    ? products.filter((p) => p.category_id === activeCategory)
    : products;

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategory = (catId) => {
    setActiveCategory(catId);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setActiveCategory(null);
    setCurrentPage(1);
  };

  const getProductImage = (product) => {
    if (product.ProductImages?.length > 0) return product.ProductImages[0].image_url;
    return '/assets/images/heart_flowers.png'; // fallback
  };

  return (
    <>
      <SEO
        title="Каталог"
        description="Каталог пряников ручной работы Арт-Пряник. Широкий выбор авторских пряников с росписью на любой вкус."
        path="/catalog"
      />

      {/* Hero-блок */}
      <section className={styles.catalog__hero}>
        <div className={styles.catalog__hero_inner}>
          <h1 className={styles.catalog__hero_title}>Каталог</h1>
          <p className={styles.catalog__hero_desc}>
            Авторские пряники ручной работы с уникальным дизайном и вниманием к деталям
          </p>
        </div>
      </section>

      {/* Основной блок */}
      <section className={styles.catalog__main}>
        <div className={styles.catalog__container}>

          {/* Фильтр по категориям */}
          <aside className={styles.catalog__filter}>
            <h2 className={styles.catalog__filter_title}>Категории</h2>
            <ul className={styles.catalog__filter_list}>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    className={`${styles.catalog__filter_btn} ${activeCategory === cat.id ? styles['catalog__filter_btn--active'] : ''}`}
                    onClick={() => handleCategory(cat.id)}
                    type="button"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
            <button
              className={styles.catalog__reset_btn}
              onClick={handleReset}
              type="button"
            >
              Сбросить фильтр
            </button>
          </aside>

          {/* Товары */}
          <div className={styles.catalog__products}>
            <h2 className={styles.catalog__products_title}>Товары</h2>

            {loading && (
              <div className={styles.catalog__loading}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={styles.catalog__skeleton} />
                ))}
              </div>
            )}

            {error && (
              <p className={styles.catalog__error}>{error}</p>
            )}

            {!loading && !error && filtered.length === 0 && (
              <p className={styles.catalog__empty}>Товаров пока нет</p>
            )}

            {!loading && !error && filtered.length > 0 && (
              <>
                <div className={styles.catalog__grid}>
                  {paginated.map((product) => (
                    <ProductCard
                      key={product.id}
                      image={getProductImage(product)}
                      title={product.title}
                      price={`${Number(product.price).toLocaleString('ru-RU')} ₽`}
                      slug={String(product.id)}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className={styles.catalog__pagination}>
                    <button
                      className={styles.catalog__page_arrow}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      aria-label="Предыдущая страница"
                    >
                      &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        className={`${styles.catalog__page_num} ${currentPage === page ? styles['catalog__page_num--active'] : ''}`}
                        onClick={() => setCurrentPage(page)}
                        type="button"
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className={styles.catalog__page_arrow}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      aria-label="Следующая страница"
                    >
                      &gt;
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </section>
    </>
  );
}

export default CatalogPage;
