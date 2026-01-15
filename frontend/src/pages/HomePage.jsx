import SEO from '../components/SEO/SEO';
import HeroSection from '../components/HeroSection/HeroSection';
import ProductsSection from '../components/ProductsSection/ProductsSection';
import ReviewsSection from '../components/ReviewsSection/ReviewsSection';
import ContactForm from '../components/ContactForm/ContactForm';

function HomePage() {
  return (
    <>
      <SEO
        title="Главная"
        description="Арт-Пряник — пряники ручной работы с авторской росписью. Натуральные ингредиенты, индивидуальный дизайн, быстрое изготовление."
        path="/"
      />
      <HeroSection />
      <ProductsSection />
      <ReviewsSection />
      <ContactForm />
    </>
  );
}

export default HomePage;
