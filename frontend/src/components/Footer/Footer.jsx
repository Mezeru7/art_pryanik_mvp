import { Link, NavLink } from 'react-router-dom';
import styles from './Footer.module.scss';

const FOOTER_LINKS = [
  { to: '/', label: 'Главная' },
  { to: '/about', label: 'О нас' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/blog', label: 'Блог' },
  { to: '/contacts', label: 'Контакты' },
];

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>

        {/* Верхняя часть: лого + навигация */}
        <div className={styles.footer__top}>
          <Link to="/" className={styles.footer__logo}>
            <img
              src="/assets/icons/logo.svg"
              alt="Арт-Пряник логотип"
              className={styles.footer__logo_icon}
            />
            <span className={styles.footer__logo_text}>Арт-Пряник</span>
          </Link>

          <nav className={styles.footer__nav} aria-label="Навигация в подвале">
            <ul className={styles.footer__list}>
              {FOOTER_LINKS.map(({ to, label }) => (
                <li key={to} className={styles.footer__item}>
                  <NavLink to={to} end={to === '/'} className={styles.footer__link}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Нижняя часть: пол конф */}
        <div className={styles.footer__bottom}>
          <Link to="/privacy" className={styles.footer__policy}>
            Политика конфиденциальности
          </Link>
          <Link to="/cookie-policy" className={styles.footer__policy}>
            Политика cookie
          </Link>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
