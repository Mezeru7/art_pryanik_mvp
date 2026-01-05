import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <header>
        <nav>Арт-Пряник</nav>
      </header>
      <Outlet />
      <footer>
        <p>© 2024 Арт-Пряник</p>
      </footer>
    </div>
  );
}

export default Layout;
