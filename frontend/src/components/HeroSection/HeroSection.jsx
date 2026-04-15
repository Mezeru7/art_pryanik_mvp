import { Link } from 'react-router-dom';
import styles from './HeroSection.module.scss';

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__container}>

        {/* Левая часть — текст */}
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>
            Натуральный вкус и сказочная роспись
          </h1>
          <p className={styles.hero__description}>
            Ощутите вкус наших пряников ручной работы,&nbsp;
            что приготовлены с душой
          </p>
          <Link to="/catalog" className={styles.hero__cta}>
            Перейти в каталог
          </Link>
        </div>

        {/* Правая часть — картинка с кругом */}
        <div className={styles.hero__image_wrap}>
          <div className={styles.hero__circle} />
          <img
            src="/assets/images/hero.png"
            alt="Пряник ручной работы"
            className={styles.hero__image}
            loading="eager"
            fetchpriority="high"
          />
        </div>

      </div>
    </section>
  );
}

export default HeroSection;
