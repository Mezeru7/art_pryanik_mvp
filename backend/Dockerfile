FROM node:20-alpine

WORKDIR /app

# Копируем только package файлы для кэширования слоя зависимостей
COPY package*.json ./

# Устанавливаем только production-зависимости
RUN npm ci --omit=dev

# Копируем исходный код
COPY src ./src

EXPOSE 5000

CMD ["node", "src/server.js"]
