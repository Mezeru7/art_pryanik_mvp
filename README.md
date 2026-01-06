# Арт-Пряник — MVP веб-приложение

MVP веб-приложение для ООО «Арт-Пряник» — интернет-магазин пряников с каталогом товаров, корзиной, блогом и административной панелью.

## Структура проекта

```
art-pryanik/
├── frontend/                # React + Vite (клиентская часть)
│   ├── public/
│   │   └── assets/
│   │       └── icons/       # SVG-иконки (logo.svg, cart.svg, profile.svg)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header/      # Header.jsx + Header.module.scss
│   │   │   ├── Footer/      # Footer.jsx + Footer.module.scss
│   │   │   └── Layout/      # Layout.jsx + Layout.module.scss
│   │   ├── pages/           # Страницы приложения
│   │   │   ├── HomePage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── CatalogPage.jsx
│   │   │   ├── BlogPage.jsx
│   │   │   ├── ContactsPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── styles/          # Глобальные стили
│   │   │   ├── _variables.scss
│   │   │   ├── _mixins.scss
│   │   │   └── global.scss
│   │   ├── api/             # Запросы к REST API
│   │   ├── config/          # Конфигурация frontend
│   │   ├── App.jsx          # Роутинг
│   │   └── main.jsx         # Точка входа
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── backend/                 # Node.js + Express (серверная часть, MVC)
│   └── src/
│       ├── api/             # Роуты и контроллеры
│       └── config/          # Конфигурация backend
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
| Frontend | React 18, Vite 5, React Router 6 |
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
- [ ] Подключение базы данных
- [ ] Аутентификация (JWT)
- [ ] Каталог товаров
- [ ] Корзина
- [ ] Блог
- [ ] Административная панель
