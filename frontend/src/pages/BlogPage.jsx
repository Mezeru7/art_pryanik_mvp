import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import { BLOG_POSTS, BLOG_ITEMS_PER_PAGE } from '../data/blogPosts';
import styles from './BlogPage.module.scss';

function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(BLOG_POSTS.length / BLOG_ITEMS_PER_PAGE);
  const paginated = BLOG_POSTS.slice(
    (currentPage - 1) * BLOG_ITEMS_PER_PAGE,
    currentPage * BLOG_ITEMS_PER_PAGE
  );

  return (
    <>
      <SEO
        title="Блог"
        description="Блог о сладких деталях, которые делают моменты запоминающимися"
        path="/blog"
      />

      {/* Hero */}
      <section className={styles.blog__hero}>
        <div className={styles.blog__hero_inner}>
          <h1 className={styles.blog__hero_title}>Наш блог</h1>
          <p className={styles.blog__hero_desc}>
            Блог о сладких деталях, которые делают моменты запоминающимися
          </p>
        </div>
      </section>

      {/* Список статей */}
      <section className={styles.blog__main}>
        <div className={styles.blog__container}>
          <h2 className={styles.blog__section_title}>Статьи</h2>

          <ul className={styles.blog__list}>
            {paginated.map((post, index) => (
              <li
                key={post.id}
                className={`${styles.blog__item} ${index < paginated.length - 1 ? styles['blog__item--bordered'] : ''}`}
              >
                <div className={styles.blog__item_image_wrap}>
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className={styles.blog__item_image}
                    loading="lazy"
                  />
                </div>
                <div className={styles.blog__item_body}>
                  <h3 className={styles.blog__item_title}>{post.title}</h3>
                  <p className={styles.blog__item_preview}>{post.preview_text}</p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className={styles.blog__item_btn}
                  >
                    Читать далее
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          {/* Пагинация */}
          {totalPages > 1 && (
            <div className={styles.blog__pagination}>
              <button
                className={styles.blog__page_arrow}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Предыдущая страница"
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`${styles.blog__page_num} ${currentPage === page ? styles['blog__page_num--active'] : ''}`}
                  onClick={() => setCurrentPage(page)}
                  type="button"
                >
                  {page}
                </button>
              ))}

              <button
                className={styles.blog__page_arrow}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                aria-label="Следующая страница"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default BlogPage;
