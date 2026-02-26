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
│   │   │   └── ContactForm/      # Форма обратной связи "Оставьте заявку"
│   │   ├── pages/           # Страницы приложения
│   │   │   ├── HomePage.jsx
│   │   │   ├── AboutPage.jsx             # Страница "О нас"
│   │   │   ├── AboutPage.module.scss
│   │   │   ├── CatalogPage.jsx           # Каталог с фильтром и пагинацией
│   │   │   ├── CatalogPage.module.scss
│   │   │   ├── ProductPage.jsx           # Страница отдельного товара
│   │   │   ├── ProductPage.module.scss
│   │   │   ├── CartPage.jsx              # Корзина
│   │   │   ├── CartPage.module.scss
│   │   │   ├── ContactsPage.jsx          # Контакты
│   │   │   ├── ContactsPage.module.scss
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
| `/contacts` | Контакты |
| `/profile` | Профиль |
| `/cart` | Корзина |
| `/orders` | История заказов |
| `/product/:slug` | Страница товара |
| `*` | 404 |

## API эндпоинты

| Метод | Путь | Описание |
|-------|------|---------|
| GET | `/api/products` | Список товаров (фильтр: `?category_id=`) |
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
| GET | `/api/blog/:id` | Статья по ID |
| GET | `/api/orders` | Список заказов |
| GET | `/api/orders/:id` | Заказ по ID |
| POST | `/api/orders` | Создать заказ (с позициями) |
| PATCH | `/api/orders/:id/status` | Обновить статус заказа |
| POST | `/api/requests` | Создать заявку |
| GET | `/api/requests` | Список заявок |

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
- [x] Middleware валидации (validate, errorHandler)
- [x] CORS + переменные окружения (backend/.env, frontend/.env)
- [x] Корзина (localStorage, добавление/удаление/счётчик, минимальный заказ 3 шт.)
- [x] Страница "О нас" (верстка по фигме)
- [x] Страница "Контакты" (верстка по фигме)
- [ ] Аутентификация (JWT)
- [ ] Блог
- [ ] Административная панель
