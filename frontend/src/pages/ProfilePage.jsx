import SEO from '../components/SEO/SEO';

function ProfilePage() {
  return (
    <>
      <SEO
        title="Профиль"
        description="Личный кабинет пользователя Арт-Пряник."
        path="/profile"
      />
      <main>
        <h1>Профиль</h1>
      </main>
    </>
  );
}

export default ProfilePage;
