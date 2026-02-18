import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import styles from './Header.module.scss';

const NAV_LINKS = [
  { to: '/', label: 'Главная' },
  { to: '/about', label: 'О нас' },
  { to: '/catalog', label: 'Каталог' },
  { to: '/blog', label: 'Блог' },
  { to: '/contacts', label: 'Контакты' },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCartContext();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>

        {/* Лого */}
        <Link to="/" className={styles.header__logo} onClick={closeMenu}>
          <img
            src="/assets/icons/logo.svg"
            alt="Арт-Пряник логотип"
            className={styles.header__logo_icon}
          />
          <span className={styles.header__logo_text}>Арт-Пряник</span>
        </Link>

        {/* Навигация */}
        <nav
          className={`${styles.header__nav} ${menuOpen ? styles['header__nav--open'] : ''}`}
          aria-label="Основная навигация"
        >
          <ul className={styles.header__list}>
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to} className={styles.header__item}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `${styles.header__link} ${isActive ? styles['header__link--active'] : ''}`
                  }
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Иконки справа */}
        <div className={styles.header__actions}>
          <Link to="/cart" className={styles.header__action_btn} aria-label="Корзина">
            <span className={styles.header__cart_wrap}>
              <img src="/assets/icons/cart.svg" alt="Корзина" className={styles.header__action_icon} />
              {count > 0 && (
                <span className={styles.header__cart_badge}>{count}</span>
              )}
            </span>
          </Link>
          <Link to="/profile" className={styles.header__action_btn} aria-label="Профиль">
            <img src="/assets/icons/profile.svg" alt="Профиль" className={styles.header__action_icon} />
          </Link>
        </div>

        {/* Бургер-меню (адаптив) */}
        <button
          className={`${styles.header__burger} ${menuOpen ? styles['header__burger--open'] : ''}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
        >
          <span className={styles.header__burger_line} />
          <span className={styles.header__burger_line} />
          <span className={styles.header__burger_line} />
        </button>

      </div>
    </header>
  );
}

export default Header;
