import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import { useAuth } from '../context/AuthContext';
import { updateMe } from '../api/auth';
import styles from './ProfilePage.module.scss';

const MOCK_USER = {
  first_name: 'Иван',
  last_name: 'Околелов',
  email: 'ivan@example.com',
  phone: '+7 (999) 123-45-67',
  avatar_url: '/assets/images/gosling.png',
  bio: 'Некоторый текст для описания профиля пользователя данного сайта',
};

const NAV_ITEMS = [
  { id: 'profile', label: 'Мой профиль' },
  { id: 'orders', label: 'Заказы', to: '/orders' },
  { id: 'settings', label: 'Настройки' },
];

function SettingsTab({ displayUser }) {
  const { token, updateUser } = useAuth();
  const [form, setForm] = useState({
    full_name: `${displayUser.first_name || ''} ${displayUser.last_name || ''}`.trim(),
    phone: displayUser.phone || '',
    email: displayUser.email || '',
    bio: displayUser.bio || '',
  });
  const [status, setStatus] = useState(null); // null | 'saving' | 'saved' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('saving');
    setErrorMsg('');

    // Разбиваем full_name на first_name и last_name
    const parts = form.full_name.trim().split(/\s+/);
    const first_name = parts[0] || '';
    const last_name = parts.slice(1).join(' ') || '';

    try {
      const updated = await updateMe(token, {
        first_name,
        last_name,
        email: form.email,
        phone: form.phone,
        bio: form.bio,
      });
      updateUser(updated);
      setStatus('saved');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  };

  const handleResetPassword = () => {
  };

  const avatar = displayUser.avatar_url || MOCK_USER.avatar_url;
  const firstName = displayUser.first_name || 'Пользователь';
  const lastName = displayUser.last_name || '';

  return (
    <div className={styles.settings__wrap}>
      {/* Аватар */}
      <div className={styles.settings__avatar_wrap}>
        <img
          src={avatar}
          alt={`${firstName} ${lastName}`}
          className={styles.settings__avatar}
          loading="lazy"
        />
      </div>

      <button className={styles.settings__upload_btn} type="button">
        Загрузить новое изображение
      </button>

      {/* Форма */}
      <form className={styles.settings__form} onSubmit={handleSubmit}>
        <input
          className={styles.settings__input}
          type="text"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder="Имя Фамилия"
        />

        <input
          className={styles.settings__input}
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+7 928 179 75 86"
        />

        <input
          className={styles.settings__input}
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="example@gmail.com"
        />

        <textarea
          className={`${styles.settings__input} ${styles.settings__textarea}`}
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Некоторый текст для описания профиля пользователя данного сайта"
          rows={4}
        />

        <div className={styles.settings__footer}>
          <button className={styles.settings__btn_save} type="submit" disabled={status === 'saving'}>
            {status === 'saving' ? 'Сохранение...' : status === 'saved' ? '✓ Сохранено' : 'Сохранить изменения'}
          </button>
          {status === 'error' && (
            <span className={styles.settings__error}>{errorMsg}</span>
          )}
          <button
            className={styles.settings__btn_reset}
            type="button"
            onClick={handleResetPassword}
          >
            Сбросить пароль
          </button>
        </div>
      </form>
    </div>
  );
}

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
              <SettingsTab displayUser={displayUser} />
            )}
          </div>

        </div>
      </section>
    </>
  );
}

export default ProfilePage;
