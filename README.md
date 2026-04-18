# Арт-Пряник — MVP веб-приложение

MVP веб-приложение для ООО «Арт-Пряник» — интернет-магазин пряников с каталогом товаров, корзиной, блогом и административной панелью.

## Структура проекта

```
art-pryanik/
├── frontend/                # React + Vite (клиентская часть)
│   ├── public/
│   │   └── assets/
│   │       ├── icons/       # SVG-иконки (logo.svg, cart.svg, profile.svg)
│   │       └── images/      # Изображения (hero.png, карточки, отзывы, star.png)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header/           # Header.jsx + Header.module.scss
│   │   │   ├── Footer/           # Footer.jsx + Footer.module.scss
│   │   │   ├── Layout/           # Layout.jsx + Layout.module.scss
│   │   │   ├── HeroSection/      # Hero-блок главной страницы
│   │   │   ├── ProductsSection/  # Секция "Наши пряники" (4 карточки)
│   │   │   ├── ProductCard/      # Карточка товара
│   │   │   ├── ReviewsSection/   # Секция "Отзывы клиентов" (слайдер)
│   │   │   ├── ContactForm/      # Форма обратной связи "Оставьте заявку"
│   │   │   └── CookieBanner/     # Баннер уведомления о cookie
│   │   ├── pages/           # Страницы приложения
│   │   │   ├── HomePage.jsx
│   │   │   ├── AboutPage.jsx             # Страница "О нас"
│   │   │   ├── AboutPage.module.scss
│   │   │   ├── CatalogPage.jsx           # Каталог с фильтром и пагинацией
│   │   │   ├── CatalogPage.module.scss
│   │   │   ├── ProductPage.jsx           # Страница отдельного товара
│   │   │   ├── ProductPage.module.scss
│   │   │   ├── LoginPage.jsx             # Вход
│   │   │   ├── RegisterPage.jsx          # Регистрация
│   │   │   ├── ForgotPasswordPage.jsx    # Забыли пароль
│   │   │   ├── ResetPasswordPage.jsx     # Сброс пароля по токену
│   │   │   ├── ProfilePage.jsx           # Личный кабинет
│   │   │   ├── ProfilePage.module.scss
│   │   │   ├── OrdersPage.jsx            # История заказов
│   │   │   ├── ContactsPage.module.scss
│   │   │   ├── PrivacyPolicyPage.jsx          # Политика конфиденциальности
│   │   │   ├── CookiePolicyPage.jsx           # Политика cookie
│   │   │   ├── PolicyPage.module.scss         # Общие стили для страниц политик
│   │   │   ├── BlogPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── context/
│   │   │   └── CartContext.jsx           # Контекст корзины
│   │   ├── hooks/
│   │   │   └── useCart.js                # Хук корзины (localStorage)
│   │   ├── data/
│   │   │   └── catalogProducts.js    # Mock-данные каталога
│   │   ├── styles/          # Глобальные стили
│   │   │   ├── _variables.scss   # Цвета, шрифты, брейкпоинты
│   │   │   ├── _mixins.scss      # container, mobile, tablet, desktop
│   │   │   ├── _typography.scss  # Типографические стили
│   │   │   └── global.scss       # Сброс + базовые стили body
│   │   ├── api/             # Запросы к REST API
│   │   │   └── auth.js          # fetchMe, updateMe
│   │   ├── config/          # Конфигурация frontend
│   │   ├── App.jsx          # Роутинг
│   │   └── main.jsx         # Точка входа
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/                 # Node.js + Express (серверная часть, MVC)
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js      # Конфигурация Sequelize + MySQL
│   │   ├── models/              # Sequelize-модели
│   │   │   ├── index.js         # Инициализация + все ассоциации
│   │   │   ├── User.js
│   │   │   ├── Category.js
│   │   │   ├── Product.js
│   │   │   ├── ProductImage.js
│   │   │   ├── Order.js
│   │   │   ├── OrderItem.js
│   │   │   ├── BlogPost.js
│   │   │   ├── Request.js
│   │   │   ├── RefreshToken.js
│   │   │   └── PasswordReset.js
│   │   ├── api/
│   │   │   └── routes/          # Express-роуты
│   │   │       ├── index.js
│   │   │       ├── productRoutes.js
│   │   │       ├── categoryRoutes.js
│   │   │       ├── blogRoutes.js
│   │   │       ├── orderRoutes.js
│   │   │       └── requestRoutes.js
│   │   ├── controllers/         # MVC-контроллеры
│   │   │   ├── productController.js
│   │   │   ├── categoryController.js
│   │   │   ├── blogController.js
│   │   │   ├── orderController.js
│   │   │   └── requestController.js
│   │   ├── middleware/          # Middleware
│   │   │   ├── errorHandler.js  # Централизованная обработка ошибок
│   │   │   ├── validate.js      # Фабрика валидаторов
│   │   │   └── validators/
│   │   │       ├── productValidator.js
│   │   │       ├── categoryValidator.js
│   │   │       └── requestValidator.js
│   │   ├── services/            # Бизнес-логика
│   │   │   ├── productService.js
│   │   │   ├── categoryService.js
│   │   │   ├── blogService.js
│   │   │   ├── orderService.js
│   │   │   └── requestService.js
│   │   ├── app.js           # Express-приложение
│   │   └── server.js        # Запуск сервера
│   ├── .env.example         # Шаблон переменных окружения
│   └── package.json
├── nginx/                   # Конфигурация Nginx
│   └── nginx.conf           # Reverse proxy (/ → frontend, /api → backend)
├── .editorconfig
├── .prettierrc
├── .prettierignore
├── .gitignore
└── README.md
```

## Стек технологий

| Слой | Технологии |
|------|-----------|
| Frontend | React 18, Vite 5, React Router 6, React Helmet Async |
| Стили | SCSS Modules, BEM, Flexbox, Grid, адаптив от 320px |
| Backend | Node.js, Express, MVC |
| База данных | MySQL, Sequelize ORM |
| Аутентификация | JWT |
| DevOps | Docker, docker-compose, Nginx |
| Аналитика | Яндекс Метрика (вебвизор, карта кликов, ecommerce) |

## Разделы приложения

- Каталог товаров
- Страница товара
- Корзина
- Блог
- Авторизация
- Профиль пользователя
- Административная панель

## Маршруты frontend

| Путь | Страница |
|------|---------|
| `/` | Главная |
| `/about` | О нас |
| `/catalog` | Каталог |
| `/blog` | Блог |
| `/blog/:slug` | Страница статьи блога |
| `/contacts` | Контакты |
| `/profile` | Профиль |
| `/cart` | Корзина |
| `/orders` | История заказов |
| `/product/:slug` | Страница товара |
| `/login` | Вход |
| `/register` | Регистрация |
| `/forgot-password` | Забыли пароль |
| `/reset-password` | Сброс пароля |
| `/privacy` | Политика конфиденциальности |
| `/cookie-policy` | Политика использования cookie |
| `/admin` | Dashboard админ-панели |
| `/admin/products` | Управление товарами (CRUD) |
| `/admin/orders` | Управление заказами |
| `/admin/blog` | Управление блогом |
| `*` | 404 |

## API эндпоинты

| Метод | Путь | Описание |
|-------|------|---------|
| POST | `/api/auth/register` | Регистрация |
| POST | `/api/auth/login` | Вход, получение JWT |
| POST | `/api/auth/forgot-password` | Запрос сброса пароля (mock email) |
| POST | `/api/auth/reset-password` | Сброс пароля по токену |
| PATCH | `/api/auth/me` | Обновить данные текущего пользователя |
| GET | `/api/products/:id` | Товар по ID |
| POST | `/api/products` | Создать товар |
| PUT | `/api/products/:id` | Обновить товар |
| DELETE | `/api/products/:id` | Удалить товар |
| GET | `/api/categories` | Список категорий |
| GET | `/api/categories/:id` | Категория по ID |
| GET | `/api/categories/:id/products` | Товары категории |
| POST | `/api/categories` | Создать категорию |
| PUT | `/api/categories/:id` | Обновить категорию |
| DELETE | `/api/categories/:id` | Удалить категорию |
| GET | `/api/blog` | Список статей блога |
| GET | `/api/blog/slug/:slug` | Статья по slug |
| GET | `/api/blog/:id` | Статья по ID |
| POST | `/api/blog` | Создать статью (admin) |
| PUT | `/api/blog/:id` | Обновить статью (admin) |
| DELETE | `/api/blog/:id` | Удалить статью (admin) |
| GET | `/api/orders` | Список заказов |
| GET | `/api/orders/:id` | Заказ по ID |
| POST | `/api/orders` | Создать заказ (с позициями) |
| PATCH | `/api/orders/:id/status` | Обновить статус заказа |
| DELETE | `/api/orders/:id` | Удалить заказ (admin) |
| POST | `/api/requests` | Создать заявку |
| GET | `/api/requests` | Список заявок |

## Тестирование API (Postman)

Коллекция находится в папке `postman/`:

- `Art-Pryanik-API.postman_collection.json` — все эндпоинты
- `Art-Pryanik-Local.postman_environment.json` — окружение для локальной разработки

**Импорт в Postman:**
1. File → Import → выбрать оба файла
2. Выбрать окружение «Art-Pryanik Local»
3. Выполнить запрос **Login** — токен сохранится автоматически в переменную `{{token}}`
4. Все защищённые запросы будут использовать токен автоматически

## Линтинг и форматирование

```bash
# frontend
cd frontend
npm run lint
npm run format

# backend
cd backend
npm run lint
npm run format
```

## Запуск через Docker (разработка)

```bash
docker-compose up --build
```

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## Запуск через Docker (production)

```bash
# 1. Создать backend/.env на основе backend/.env.example
# 2. Создать frontend/.env с VITE_API_URL=/api
docker-compose -f docker-compose.prod.yml up --build -d
```

- Приложение: `http://localhost` (порт 80, через Nginx)

## Запуск frontend (разработка)

```bash
cd frontend
npm install
npm run dev
```

Приложение запускается на `http://localhost:3000`

## Запуск backend (разработка)

```bash
cd backend
npm install
npm run dev
```

Сервер запускается на `http://localhost:5000`

## Статус разработки

- [x] Инициализация структуры проекта
- [x] Настройка frontend (Vite + React)
- [x] Настройка backend (Express)
- [x] ESLint, Prettier, EditorConfig
- [x] Docker (docker-compose для разработки)
- [x] Nginx reverse proxy
- [x] Базовая маршрутизация (React Router)
- [x] Header и Footer (адаптивные, SCSS Modules, BEM)
- [x] Главная страница (Hero, карточки товаров, отзывы, форма заявки)
- [x] SCSS Modules + BEM (переменные, миксины, типографика)
- [x] SEO мета-теги (React Helmet Async, OpenGraph)
- [x] Страница каталога (фильтр, сетка 3×3, пагинация)
- [x] Страница товара (фото, описание, счётчик, кнопка в корзину)
- [x] Оптимизация (code splitting, lazy loading изображений)
- [x] Подключение базы данных (MySQL + Sequelize)
- [x] Модели данных (User, Category, Product, Order, BlogPost и др. + ассоциации)
- [x] REST API (MVC: контроллеры, сервисы, роуты)
- [x] API заказов (создание, список, статус, минимум 3 шт.)
- [x] Страница истории заказов (список, статусы)
- [x] Синхронизация корзины (проверка актуальности товаров через API)
- [x] Middleware валидации (validate, errorHandler)
- [x] CORS + переменные окружения (backend/.env, frontend/.env)
- [x] Корзина (localStorage, добавление/удаление/счётчик, минимальный заказ 3 шт.)
- [x] Страница "О нас" (верстка по фигме)
- [x] Страница "Контакты" (верстка по фигме)
- [x] Страницы входа и регистрации (верстка по фигме, валидация форм)
- [x] Аутентификация (JWT: register, login, /me, middleware auth)
- [x] Защищённые маршруты (PrivateRoute, GuestRoute, redirect)
- [x] Разграничение ролей (requireRole middleware, AdminRoute)
- [x] Восстановление пароля (reset token, mock email, формы)
- [x] Страница профиля пользователя (личный кабинет, навигация, аватар)
- [x] Настройки профиля (форма редактирования имени, email, телефона, bio по Figma)
- [x] Редактирование персональных данных (PATCH /api/auth/me, синхронизация с localStorage)
- [x] Блог (список статей, пагинация, страница статьи, mock-данные)
- [x] Backend блога (CRUD статей, slug, валидация, защита admin-маршрутов)
- [x] Административная панель — layout и Dashboard (sidebar, карточки разделов)
- [x] Страница политики конфиденциальности (/privacy)
- [x] Страница политики использования cookie (/cookie-policy)
- [x] Cookie-баннер (уведомление снизу экрана, согласие в localStorage)
- [x] Управление товарами в админке (CRUD: таблица, создание, редактирование, удаление)
- [x] Управление заказами в админке (список, фильтр по статусу, просмотр, смена статуса)
- [x] Управление блогом в админке (CRUD статей: таблица, создание, редактирование, удаление)
- [x] Ограничение доступа к админ-панели по ролям (AdminRoute, requireRole middleware, защита всех admin-роутов)
- [x] Production Docker-конфигурация (Dockerfile для frontend/backend, docker-compose.prod.yml, nginx.prod.conf)
- [x] Разделение dev/production конфигураций (.env.development, .env.production для frontend и backend)
- [x] HTTPS и nginx reverse proxy (nginx.https.conf, SSL-заголовки, HTTP в HTTPS редирект, скрипт генерации сертификата)
- [x] OpenGraph для всех страниц (og:type, og:locale, article meta)
- [x] Оптимизация Lighthouse/PageSpeed (vite manualChunks, fetchpriority, lazy loading, font-smoothing, nginx кэширование, security headers)
- [x] Postman-коллекция (все эндпоинты API, автосохранение токена, окружение для локальной разработки)
- [x] Каталог и страница товара подключены к реальному API (GET /api/products, GET /api/products/:id)
- [x] Оформление заказа через модальное окно (POST /api/orders, имя + телефон покупателя)
- [x] История заказов привязана к пользователю (localStorage ключ по user.id)
- [x] Форма заявки на главной подключена к API (POST /api/requests)
- [x] Удаление заказов в админке (DELETE /api/orders/:id + подтверждение)
- [x] Изображения товаров через ProductImages (поле image_url в форме создания/редактирования)
- [x] CORS исправлен — добавлен метод PATCH
- [x] Автосинхронизация таблиц БД при запуске (sequelize.sync)
- [x] Seed-скрипт для наполнения БД тестовыми данными (database/seed.sql)
- [x] Яндекс Метрика (счётчик, вебвизор, карта кликов, ecommerce)
