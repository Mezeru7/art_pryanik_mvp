import HeroSection from '../components/HeroSection/HeroSection';
import ProductsSection from '../components/ProductsSection/ProductsSection';
import ReviewsSection from '../components/ReviewsSection/ReviewsSection';
import ContactForm from '../components/ContactForm/ContactForm';

function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductsSection />
      <ReviewsSection />
      <ContactForm />
    </>
  );
}

export default HomePage;
