# Арт-Пряник — MVP веб-приложение

MVP веб-приложение для ООО «Арт-Пряник» — интернет-магазин пряников с каталогом товаров, корзиной, блогом и административной панелью.

## Структура проекта

```
art-pryanik/
├── frontend/                # React + Vite (клиентская часть)
│   ├── src/
│   │   ├── components/      # UI-компоненты (BEM + SCSS Modules)
│   │   ├── pages/           # Страницы приложения
│   │   ├── api/             # Запросы к REST API
│   │   └── config/          # Конфигурация frontend
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
| Frontend | React 18, Vite 5, SCSS Modules, BEM |
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
- [ ] Подключение базы данных
- [ ] Аутентификация (JWT)
- [ ] Каталог товаров
- [ ] Корзина
- [ ] Блог
- [ ] Административная панель
