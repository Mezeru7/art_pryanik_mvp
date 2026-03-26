import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import { BLOG_POSTS } from '../data/blogPosts';
import styles from './BlogPostPage.module.scss';

function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <main className={styles.post__notfound}>
        <p>Статья не найдена.</p>
        <Link to="/blog" className={styles.post__back}>← Вернуться в блог</Link>
      </main>
    );
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.preview_text}
        image={post.image_url}
        path={`/blog/${post.slug}`}
      />

      <article className={styles.post}>
        {/* Обложка */}
        <div className={styles.post__cover_wrap}>
          <img
            src={post.image_url}
            alt={post.title}
            className={styles.post__cover}
            loading="eager"
          />
        </div>

        {/* Контент */}
        <div className={styles.post__body}>
          <h1 className={styles.post__title}>{post.title}</h1>

          <div className={styles.post__content}>
            {post.content.map((paragraph, i) => (
              <p key={i} className={styles.post__paragraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <Link to="/blog" className={styles.post__back}>
            ← Вернуться в блог
          </Link>
        </div>
      </article>
    </>
  );
}

export default BlogPostPage;
