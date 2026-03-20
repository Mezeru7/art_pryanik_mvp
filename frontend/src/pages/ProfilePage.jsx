import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import { useAuth } from '../context/AuthContext';
import styles from './ProfilePage.module.scss';

const MOCK_USER = {
  first_name: 'Иван',
  last_name: 'Околелов',
  avatar_url: '/assets/images/gosling.png',
  bio: 'Некоторый текст для описания профиля пользователя данного сайта',
};

const NAV_ITEMS = [
  { id: 'profile', label: 'Мой профиль' },
  { id: 'orders', label: 'Заказы', to: '/orders' },
  { id: 'settings', label: 'Настройки' },
];

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const displayUser = user || MOCK_USER;
  const firstName = displayUser.first_name || 'Пользователь';
  const lastName = displayUser.last_name || '';
  const avatar = displayUser.avatar_url || MOCK_USER.avatar_url;
  const bio = displayUser.bio || MOCK_USER.bio;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <SEO title="Личный кабинет" description="Личный кабинет Арт-Пряник" path="/profile" />

      {/* Hero */}
      <section className={styles.profile__hero}>
        <div className={styles.profile__hero_inner}>
          <h1 className={styles.profile__hero_title}>Личный кабинет</h1>
          <p className={styles.profile__hero_desc}>Здравствуйте, {firstName}!</p>
        </div>
      </section>

      {/* Основной блок */}
      <section className={styles.profile__main}>
        <div className={styles.profile__container}>

          {/* Левая навигация */}
          <nav className={styles.profile__nav}>
            {NAV_ITEMS.map((item) =>
              item.to ? (
                <Link
                  key={item.id}
                  to={item.to}
                  className={`${styles.profile__nav_item} ${activeTab === item.id ? styles['profile__nav_item--active'] : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.id}
                  className={`${styles.profile__nav_item} ${activeTab === item.id ? styles['profile__nav_item--active'] : ''}`}
                  onClick={() => setActiveTab(item.id)}
                  type="button"
                >
                  {item.label}
                </button>
              )
            )}
            <button
              className={styles.profile__nav_item}
              onClick={handleLogout}
              type="button"
            >
              Выйти
            </button>
          </nav>

          {/* Разделитель */}
          <div className={styles.profile__divider} />

          {/* Правая часть — контент */}
          <div className={styles.profile__content}>
            {activeTab === 'profile' && (
              <>
                <h2 className={styles.profile__name}>
                  {firstName} {lastName}
                </h2>
                <div className={styles.profile__avatar_wrap}>
                  <img
                    src={avatar}
                    alt={`${firstName} ${lastName}`}
                    className={styles.profile__avatar}
                    loading="lazy"
                  />
                </div>
                <h3 className={styles.profile__bio_title}>Описание профиля</h3>
                <p className={styles.profile__bio}>{bio}</p>
              </>
            )}

            {activeTab === 'settings' && (
              <p className={styles.profile__placeholder}>
                Настройки будут доступны в следующих версиях
              </p>
            )}
          </div>

        </div>
      </section>
    </>
  );
}

export default ProfilePage;
