import SEO from '../components/SEO/SEO';
import styles from './PolicyPage.module.scss';

function CookiePolicyPage() {
  return (
    <>
      <SEO
        title="Политика использования файлов cookie"
        description="Политика использования файлов cookie интернет-магазина Арт-Пряник."
        path="/cookie-policy"
      />

      <div className={styles.policy}>
        <div className={styles.policy__container}>
          <h1 className={styles.policy__title}>Политика использования файлов cookie</h1>

          <section className={styles.policy__section}>
            <h2 className={styles.policy__heading}>1. Общие положения</h2>
            <p className={styles.policy__text}>
              Настоящая Политика использования файлов cookie объясняет, какие данные
              собираются на сайте интернет-магазина пряников ручной работы «Арт-Пряник»,
              а также как и с какой целью они используются. Используя данный сайт, Вы
              соглашаетесь с использованием файлов cookie в соответствии с настоящей
              Политикой.
            </p>
          </section>

          <section className={styles.policy__section}>
            <h2 className={styles.policy__heading}>2. Что такое файлы cookie</h2>
            <p className={styles.policy__text}>
              Файлы cookie — это небольшие текстовые файлы, которые сохраняются на Вашем
              устройстве (компьютере, смартфоне или планшете) при посещении сайта. Они
              позволяют:
            </p>
            <ul className={styles.policy__list}>
              <li>запоминать Ваши действия и предпочтения;</li>
              <li>обеспечивать корректную работу сайта;</li>
              <li>улучшать удобство использования;</li>
              <li>анализировать поведение пользователей.</li>
            </ul>
          </section>

          <section className={styles.policy__section}>
            <h2 className={styles.policy__heading}>3. Какие файлы cookie мы используем</h2>

            <h3 className={styles.policy__subheading}>3.1. Обязательные cookie</h3>
            <p className={styles.policy__text}>
              Эти файлы необходимы для корректной работы сайта. Без них невозможно
              оформить заказ, использовать корзину или авторизацию.
            </p>

            <h3 className={styles.policy__subheading}>3.2. Функциональные cookie</h3>
            <p className={styles.policy__text}>
              Позволяют запоминать Ваши настройки (например, язык или ранее введённые
              данные).
            </p>

            <h3 className={styles.policy__subheading}>3.3. Аналитические cookie</h3>
            <p className={styles.policy__text}>
              Используются для анализа поведения пользователей на сайте с целью
              улучшения структуры, дизайна и контента.
            </p>

            <h3 className={styles.policy__subheading}>3.4. Маркетинговые cookie</h3>
            <p className={styles.policy__text}>
              Могут использоваться для показа персонализированных предложений и рекламы.
            </p>
          </section>

          <section className={styles.policy__section}>
            <h2 className={styles.policy__heading}>4. Цели использования cookie</h2>
            <p className={styles.policy__text}>Мы используем файлы cookie для:</p>
            <ul className={styles.policy__list}>
              <li>обеспечения стабильной работы сайта;</li>
              <li>обработки заказов;</li>
              <li>улучшения пользовательского опыта;</li>
              <li>анализа посещаемости и поведения пользователей;</li>
              <li>повышения качества предоставляемых услуг.</li>
            </ul>
          </section>

          <section className={styles.policy__section}>
            <h2 className={styles.policy__heading}>5. Управление файлами cookie</h2>
            <p className={styles.policy__text}>
              Вы можете в любое время изменить настройки использования cookie в своём
              браузере: отключить их сохранение или удалить уже сохранённые файлы.
            </p>
            <p className={styles.policy__text}>
              Обратите внимание, что отключение cookie может повлиять на работоспособность
              сайта и ограничить доступ к некоторым функциям.
            </p>
          </section>

          <section className={styles.policy__section}>
            <h2 className={styles.policy__heading}>6. Сторонние сервисы</h2>
            <p className={styles.policy__text}>
              Мы можем использовать сторонние сервисы аналитики (например, системы
              веб-аналитики), которые также могут сохранять cookie на Вашем устройстве.
            </p>
          </section>

          <section className={styles.policy__section}>
            <h2 className={styles.policy__heading}>7. Связь с политикой конфиденциальности</h2>
            <p className={styles.policy__text}>
              Использование файлов cookie связано с обработкой персональных данных.
              Подробнее об этом Вы можете узнать в разделе «Политика конфиденциальности».
            </p>
          </section>

          <section className={styles.policy__section}>
            <h2 className={styles.policy__heading}>8. Контактная информация</h2>
            <p className={styles.policy__text}>
              Если у Вас есть вопросы по использованию файлов cookie, Вы можете
              связаться с нами:
            </p>
            <ul className={styles.policy__contacts}>
              <li>
                Email:{' '}
                <a href="mailto:art-pryanik@gmail.com" className={styles.policy__link}>
                  art-pryanik@gmail.com
                </a>
              </li>
              <li>
                Телефон:{' '}
                <a href="tel:+79281797586" className={styles.policy__link}>
                  +7 928 179 75 86
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}

export default CookiePolicyPage;
