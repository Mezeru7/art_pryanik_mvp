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
│   │   │   ├── AboutPage.jsx
│   │   │   ├── CatalogPage.jsx       # Каталог с фильтром и пагинацией
│   │   │   ├── CatalogPage.module.scss
│   │   │   ├── ProductPage.jsx       # Страница отдельного товара
│   │   │   ├── ProductPage.module.scss
│   │   │   ├── BlogPage.jsx
│   │   │   ├── ContactsPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── NotFoundPage.jsx
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
│   │   ├── api/             # Роуты и контроллеры (заглушки)
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
| `/product/:slug` | Страница товара |
| `*` | 404 |

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
- [ ] Модели данных (Sequelize)
- [ ] Аутентификация (JWT)
- [ ] Каталог товаров
- [ ] Корзина
- [ ] Блог
- [ ] Административная панель
