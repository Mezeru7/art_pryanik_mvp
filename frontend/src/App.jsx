import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import GuestRoute from './components/GuestRoute/GuestRoute';
import AdminRoute from './components/AdminRoute/AdminRoute';

const HomePage = lazy(() => import('./pages/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminProductsPage = lazy(() => import('./pages/admin/AdminProductsPage'));
const AdminOrdersPage = lazy(() => import('./pages/admin/AdminOrdersPage'));
const AdminBlogPage = lazy(() => import('./pages/admin/AdminBlogPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const CookiePolicyPage = lazy(() => import('./pages/CookiePolicyPage'));

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Публичные маршруты */}
                <Route index element={<HomePage />} />
                <Route path="catalog" element={<CatalogPage />} />
                <Route path="product/:slug" element={<ProductPage />} />
                <Route path="blog" element={<BlogPage />} />
                <Route path="blog/:slug" element={<BlogPostPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contacts" element={<ContactsPage />} />
                <Route path="privacy" element={<PrivacyPolicyPage />} />
                <Route path="cookie-policy" element={<CookiePolicyPage />} />

                {/* Только для гостей */}
                <Route path="login" element={
                  <GuestRoute><LoginPage /></GuestRoute>
                } />
                <Route path="register" element={
                  <GuestRoute><RegisterPage /></GuestRoute>
                } />
                <Route path="forgot-password" element={
                  <GuestRoute><ForgotPasswordPage /></GuestRoute>
                } />
                <Route path="reset-password" element={
                  <GuestRoute><ResetPasswordPage /></GuestRoute>
                } />

                {/* Только для авторизованных */}
                <Route path="profile" element={
                  <PrivateRoute><ProfilePage /></PrivateRoute>
                } />
                <Route path="orders" element={
                  <PrivateRoute><OrdersPage /></PrivateRoute>
                } />
                <Route path="cart" element={<CartPage />} />

                {/* Административная панель */}
                <Route path="admin" element={
                  <AdminRoute><AdminDashboardPage /></AdminRoute>
                } />
                <Route path="admin/products" element={
                  <AdminRoute><AdminProductsPage /></AdminRoute>
                } />
                <Route path="admin/orders" element={
                  <AdminRoute><AdminOrdersPage /></AdminRoute>
                } />
                <Route path="admin/blog" element={
                  <AdminRoute><AdminBlogPage /></AdminRoute>
                } />

                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
