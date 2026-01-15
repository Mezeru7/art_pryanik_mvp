import SEO from '../components/SEO/SEO';

function NotFoundPage() {
  return (
    <>
      <SEO
        title="404 — Страница не найдена"
        description="Страница не найдена. Вернитесь на главную страницу Арт-Пряник."
      />
      <main>
        <h1>404 — Страница не найдена</h1>
      </main>
    </>
  );
}

export default NotFoundPage;
