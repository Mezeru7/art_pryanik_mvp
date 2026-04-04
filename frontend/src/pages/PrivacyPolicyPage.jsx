import SEO from '../components/SEO/SEO';
import styles from './PolicyPage.module.scss';

function PrivacyPolicyPage() {
  return (
    <>
      <SEO
        title="Политика конфиденциальности"
        description="Политика конфиденциальности интернет-магазина Арт-Пряник — порядок обработки и защиты персональных данных."
        path="/privacy"
      />

      <div className={styles.policy}>
        <div className={styles.policy__container}>
          <h1 className={styles.policy__title}>Политика конфиденциальности</h1>

          <section className={styles.policy__section}>
            <h2 className={styles.policy__heading}>1. Общие положения</h2>
            <p className={styles.policy__text}>
              Настоящая Политика конфиденциальности определяет порядок обработки и
              защиты персональных данных пользователей сайта интернет-магазина
              «Арт-Пряник».
            </p>
          </section>

          <section className={styles.policy__section}>
            <h2 className={styles.policy__heading}>2. Какие данные мы собираем</h2>
            <p className={styles.policy__text}>Мы можем собирать следующие данные:</p>
            <ul className={styles.policy__list}>
              <li>имя;</li>
              <li>номер телефона;</li>
              <li>адрес электронной почты;</li>
              <li>данные, указанные при оформлении заказа;</li>
              <li>технические данные (IP-адрес, информация о браузере, cookie).</li>
            </ul>
          </section>

          <section className={styles.policy__section}>
            <h2 className={styles.policy__heading}>3. Цели обработки данных</h2>
            <p className={styles.policy__text}>Персональные данные используются для:</p>
            <ul className={styles.policy__list}>
              <li>обработки и выполнения заказов;</li>
              <li>обратной связи с пользователем;</li>
              <li>улучшения качества сервиса;</li>
              <li>информирования о новостях и предложениях (при согласии пользователя).</li>
            </ul>
          </section>

          <section className={styles.policy__section}>
            <h2 className={styles.policy__heading}>4. Правовые основания обработки</h2>
            <p className={styles.policy__text}>
              Обработка персональных данных осуществляется на основании:
            </p>
            <ul className={styles.policy__list}>
              <li>согласия пользователя;</li>
              <li>необходимости исполнения договора (оформление заказа).</li>
            </ul>
          </section>

          <section className={styles.policy__section}>
            <h2 className={styles.policy__heading}>5. Хранение и защита данных</h2>
            <p className={styles.policy__text}>
              Мы принимаем все необходимые меры для защиты персональных данных от
              утечки, несанкционированного доступа и изменения.
            </p>
          </section>

          <section className={styles.policy__section}>
            <h2 className={styles.policy__heading}>6. Передача данных третьим лицам</h2>
            <p className={styles.policy__text}>
              Мы не передаём персональные данные третьим лицам, за исключением случаев:
            </p>
            <ul className={styles.policy__list}>
              <li>когда это необходимо для выполнения заказа (например, службе доставки);</li>
              <li>когда это требуется законодательством.</li>
            </ul>
          </section>

          <section className={styles.policy__section}>
            <h2 className={styles.policy__heading}>7. Права пользователя</h2>
            <p className={styles.policy__text}>Вы имеете право:</p>
            <ul className={styles.policy__list}>
              <li>запросить информацию о своих данных;</li>
              <li>потребовать их изменение или удаление;</li>
              <li>отозвать согласие на обработку данных.</li>
            </ul>
          </section>

          <section className={styles.policy__section}>
            <h2 className={styles.policy__heading}>8. Тестирование сервиса</h2>
            <p className={styles.policy__text}>
              Сайт может находиться в стадии тестирования и развития. В рамках улучшения
              качества сервиса мы можем анализировать поведение пользователей, чтобы
              оптимизировать функциональность и удобство использования.
            </p>
            <p className={styles.policy__text}>
              Некоторые функции могут работать в тестовом режиме. Мы стремимся обеспечить
              стабильную работу сайта, однако в процессе тестирования возможны временные
              изменения функционала.
            </p>
          </section>

          <section className={styles.policy__section}>
            <h2 className={styles.policy__heading}>9. Контактная информация</h2>
            <p className={styles.policy__text}>
              По вопросам обработки персональных данных:
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

export default PrivacyPolicyPage;
