import SEO from '../components/SEO/SEO';
import styles from './ContactsPage.module.scss';

function ContactsPage() {
  return (
    <>
      <SEO
        title="Контакты"
        description="Контакты Арт-Пряник — свяжитесь с нами для оформления заказа или по любым вопросам."
        path="/contacts"
      />

      {/* Первый блок — hero */}
      <section className={styles.contacts__hero}>
        <div className={styles.contacts__hero_inner}>
          <h1 className={styles.contacts__hero_title}>Контакты</h1>
          <p className={styles.contacts__hero_desc}>Есть вопросы? Мы на связи!</p>
        </div>
      </section>

      {/* Второй блок — контактные данные */}
      <section className={styles.contacts__main}>
        <div className={styles.contacts__container}>

          {/* Левая часть */}
          <div className={styles.contacts__info}>
            <h2 className={styles.contacts__title}>Наши контактные данные</h2>

            <ul className={styles.contacts__list}>
              <li className={styles.contacts__item}>
                <span className={styles.contacts__label}>Телефон / Telegram:</span>
                {' '}8 938 158 28 91
              </li>
              <li className={styles.contacts__item}>
                <span className={styles.contacts__label}>E-mail:</span>
                {' '}art-pryanik@gmail.com
              </li>
              <li className={styles.contacts__item}>
                <span className={styles.contacts__label}>Время работы:</span>
                {' '}Пн–Пт с 9:00 до 19:00,{' '}
                Сб с 10:00 до 16:00, Вс — выходной
              </li>
            </ul>

            <p className={styles.contacts__note}>
              Пишите или звоните — мы ответим максимально быстро и с удовольствием
              поможем сделать ваш праздник сладким!
            </p>
          </div>

          {/* Правая часть — картинка с кругом */}
          <div className={styles.contacts__image_wrap}>
            <div className={styles.contacts__circle} />
            <img
              src="/assets/images/contact.png"
              alt="Пряник с бабочками"
              className={styles.contacts__image}
              loading="lazy"
            />
          </div>

        </div>
      </section>
    </>
  );
}

export default ContactsPage;
