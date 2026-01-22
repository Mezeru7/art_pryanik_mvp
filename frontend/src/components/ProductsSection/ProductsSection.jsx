import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductsSection.module.scss';

const PRODUCTS = [
  {
    id: 1,
    slug: 'heart-flowers',
    image: '/assets/images/heart_flowers.png',
    title: 'Пряник "Сердце с цветами"',
    price: 'От 350 р./шт.',
  },
  {
    id: 2,
    slug: 'heart-blue',
    image: '/assets/images/heart_blue.png',
    title: 'Пряник "Сердце с голубым кружевом"',
    price: 'От 320 р./шт.',
  },
  {
    id: 3,
    slug: 'creeper',
    image: '/assets/images/creeper.png',
    title: 'Пряник "Пиксельный крипер"',
    price: 'От 280 р./шт.',
  },
  {
    id: 4,
    slug: 'sleigh',
    image: '/assets/images/sleigh.png',
    title: 'Пряник "Сани новогодние"',
    price: 'От 450 р./шт.',
  },
];

function ProductsSection() {
  return (
    <section className={styles.products}>
      <div className={styles.products__container}>
        <h2 className={styles.products__title}>Наши пряники</h2>
        <div className={styles.products__grid}>
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              slug={product.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;
