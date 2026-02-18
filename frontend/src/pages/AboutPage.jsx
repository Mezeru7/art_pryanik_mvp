import SEO from '../components/SEO/SEO';
import styles from './AboutPage.module.scss';

function AboutPage() {
  return (
    <>
      <SEO
        title="О нас"
        description="О компании Арт-Пряник — история, ценности и команда мастеров, создающих пряники с душой."
        path="/about"
      />

      {/* Первый блок — hero */}
      <section className={styles.about__hero}>
        <div className={styles.about__hero_inner}>
          <h1 className={styles.about__hero_title}>
            Наши пряники доставят вам удовольствие
          </h1>
          <p className={styles.about__hero_desc}>
            Каждый наш пряник — это история, рассказанная глазурью и специями
          </p>
        </div>
      </section>

      {/* Второй блок — о нас */}
      <section className={styles.about__main}>
        <div className={styles.about__container}>

          {/* Левая часть — текст */}
          <div className={styles.about__content}>
            <h2 className={styles.about__title}>О нас</h2>
            <p className={styles.about__text}>
              Наша миссия – дарить впечатления и эмоции через вкус, делая каждый пряник
              маленьким произведением искусства, которое радует глаз и сердце
            </p>
            <p className={styles.about__text}>
              Мы внимательно прислушиваемся к пожеланиям клиентов, предлагаем
              индивидуальный подход к каждому заказу и стремимся превзойти ожидания,
              превращая простой десерт в незабываемое впечатление
            </p>
          </div>

          {/* Правая часть — картинка */}
          <div className={styles.about__image_wrap}>
            <img
              src="/assets/images/about.png"
              alt="Пряники Арт-Пряник"
              className={styles.about__image}
              loading="lazy"
            />
          </div>

        </div>
      </section>
    </>
  );
}

export default AboutPage;
