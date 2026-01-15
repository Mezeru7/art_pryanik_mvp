import SEO from '../components/SEO/SEO';

function BlogPage() {
  return (
    <>
      <SEO
        title="Блог"
        description="Блог Арт-Пряник — рецепты, идеи для подарков, новости и вдохновение от мастеров пряничного дела."
        path="/blog"
      />
      <main>
        <h1>Блог</h1>
      </main>
    </>
  );
}

export default BlogPage;
