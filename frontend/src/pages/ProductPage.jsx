import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import { useCartContext } from '../context/CartContext';
import API_URL from '../config/api';
import styles from './ProductPage.module.scss';

function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCartContext();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API_URL}/products/${slug}`);
        if (res.status === 404) { navigate('/catalog', { replace: true }); return; }
        if (!res.ok) throw new Error('Не удалось загрузить товар');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const dec = () => setQuantity((q) => Math.max(1, q - 1));
  const inc = () => setQuantity((q) => q + 1);

  const handleAddToCart = () => {
    if (!product) return;

    const image = product.ProductImages?.[0]?.image_url || '/assets/images/heart_flowers.png';

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        title: product.title,
        image,
        priceNum: Number(product.price),
        price: `${Number(product.price).toLocaleString('ru-RU')} ₽`,
        slug: String(product.id),
      });
    }
    setToast(true);
    setTimeout(() => setToast(false), 2500);
  };

  if (loading) {
    return (
      <div className={styles.product}>
        <div className={styles.product__container}>
          <div className={styles.product__skeleton} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.product}>
        <div className={styles.product__container}>
          <p className={styles.product__error}>{error}</p>
          <Link to="/catalog" className={styles.product__back}>← Вернуться в каталог</Link>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const image = product.ProductImages?.[0]?.image_url || '/assets/images/heart_flowers.png';

  return (
    <>
      {toast && (
        <div className={styles.product__toast}>
          ✓ Товар добавлен в корзину
        </div>
      )}
      <SEO
        title={product.title}
        description={product.description || product.title}
        image={image}
        path={`/product/${product.id}`}
      />

      <div className={styles.product}>
        <div className={styles.product__container}>

          <div className={styles.product__top}>
            {/* Фото */}
            <div className={styles.product__gallery}>
              <div className={styles.product__image_wrap}>
                <img
                  src={image}
                  alt={product.title}
                  className={styles.product__image}
                  loading="eager"
                />
              </div>
            </div>

            {/* Информация */}
            <div className={styles.product__info}>
              <h1 className={styles.product__title}>{product.title}</h1>
              <p className={styles.product__price}>
                {Number(product.price).toLocaleString('ru-RU')} рублей / шт.
              </p>

              <div className={styles.product__qty}>
                <button className={styles.product__qty_btn} onClick={dec} aria-label="Уменьшить" type="button">−</button>
                <span className={styles.product__qty_val}>{quantity}</span>
                <button className={styles.product__qty_btn} onClick={inc} aria-label="Увеличить" type="button">+</button>
              </div>

              <button className={styles.product__cart_btn} type="button" onClick={handleAddToCart}>
                В корзину
              </button>

              <p className={styles.product__min_order}>Минимальный заказ от 3-х шт.</p>
            </div>
          </div>

          {/* Описание */}
          {product.description && (
            <div className={styles.product__description}>
              <h2 className={styles.product__desc_title}>Описание товара</h2>
              {product.description.split('\n\n').map((para, i) => (
                <p key={i} className={styles.product__desc_text}>{para}</p>
              ))}
            </div>
          )}

          <Link to="/catalog" className={styles.product__back}>← Вернуться в каталог</Link>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
