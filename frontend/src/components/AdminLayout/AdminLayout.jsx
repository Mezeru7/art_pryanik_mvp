import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './AdminLayout.module.scss';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/products', label: 'Товары' },
  { to: '/admin/orders', label: 'Заказы' },
  { to: '/admin/blog', label: 'Блог' },
];

function AdminLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={styles.admin}>
      {/* Sidebar */}
      <aside className={styles.admin__sidebar}>
        <div className={styles.admin__sidebar_top}>
          <NavLink to="/" className={styles.admin__logo}>
            <img
              src="/assets/icons/logo.svg"
              alt="Арт-Пряник"
              className={styles.admin__logo_icon}
            />
            <span className={styles.admin__logo_text}>Арт-Пряник</span>
          </NavLink>

          <p className={styles.admin__role}>Администратор</p>
          {user && (
            <p className={styles.admin__username}>
              {user.first_name} {user.last_name || ''}
            </p>
          )}
        </div>

        <nav className={styles.admin__nav}>
          {NAV_ITEMS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `${styles.admin__nav_item} ${isActive ? styles['admin__nav_item--active'] : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.admin__sidebar_bottom}>
          <NavLink to="/" className={styles.admin__site_link}>
            ← На сайт
          </NavLink>
          <button
            className={styles.admin__logout_btn}
            onClick={handleLogout}
            type="button"
          >
            Выйти
          </button>
        </div>
      </aside>

      {/* Основной контент */}
      <main className={styles.admin__content}>
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
