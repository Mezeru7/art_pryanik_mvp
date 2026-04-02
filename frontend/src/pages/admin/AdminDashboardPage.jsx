import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout/AdminLayout';
import SEO from '../../components/SEO/SEO';
import styles from './AdminDashboardPage.module.scss';

const DASHBOARD_CARDS = [
  {
    title: 'Товары',
    description: 'Управление каталогом: добавление, редактирование и удаление товаров',
    to: '/admin/products',
    icon: '🧁',
  },
  {
    title: 'Заказы',
    description: 'Просмотр заказов и изменение их статусов',
    to: '/admin/orders',
    icon: '📦',
  },
  {
    title: 'Блог',
    description: 'Управление статьями блога: создание и редактирование публикаций',
    to: '/admin/blog',
    icon: '📝',
  },
];

function AdminDashboardPage() {
  return (
    <AdminLayout>
      <SEO title="Админ-панель" description="Административная панель Арт-Пряник" />

      <div className={styles.dashboard}>
        <h1 className={styles.dashboard__title}>Dashboard</h1>
        <p className={styles.dashboard__subtitle}>
          Добро пожаловать в административную панель Арт-Пряник
        </p>

        <div className={styles.dashboard__grid}>
          {DASHBOARD_CARDS.map((card) => (
            <Link key={card.to} to={card.to} className={styles.dashboard__card}>
              <span className={styles.dashboard__card_icon}>{card.icon}</span>
              <h2 className={styles.dashboard__card_title}>{card.title}</h2>
              <p className={styles.dashboard__card_desc}>{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboardPage;
