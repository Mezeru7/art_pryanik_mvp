import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CookieBanner from '../CookieBanner/CookieBanner';
import styles from './Layout.module.scss';

function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.layout__main}>
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}

export default Layout;
