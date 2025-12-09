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

## Запуск frontend (разработка)

```bash
cd frontend
npm install
npm run dev
```

Приложение запускается на `http://localhost:3000`

## Статус разработки

- [x] Инициализация структуры проекта
- [x] Настройка frontend (Vite + React)
- [ ] Настройка backend (Express)
- [ ] Подключение базы данных
- [ ] Аутентификация (JWT)
- [ ] Каталог товаров
- [ ] Корзина
- [ ] Блог
- [ ] Административная панель
