import { useState } from 'react';
import SEO from '../components/SEO/SEO';
import ProductCard from '../components/ProductCard/ProductCard';
import { CATALOG_PRODUCTS, CATEGORIES, ITEMS_PER_PAGE } from '../data/catalogProducts';
import styles from './CatalogPage.module.scss';

function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = activeCategory
    ? CATALOG_PRODUCTS.filter((p) => p.category === activeCategory)
    : CATALOG_PRODUCTS;

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategory = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setActiveCategory(null);
    setCurrentPage(1);
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

          {/* Фильтр */}
          <aside className={styles.catalog__filter}>
            <h2 className={styles.catalog__filter_title}>Категории</h2>
            <ul className={styles.catalog__filter_list}>
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    className={`${styles.catalog__filter_btn} ${activeCategory === cat ? styles['catalog__filter_btn--active'] : ''}`}
                    onClick={() => handleCategory(cat)}
                    type="button"
                  >
                    {cat}
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
            <div className={styles.catalog__grid}>
              {paginated.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  title={product.title}
                  price={product.price}
                  slug={product.slug}
                />
              ))}
            </div>

            {/* Страницы */}
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
          </div>

        </div>
      </section>
    </>
  );
}

export default CatalogPage;
