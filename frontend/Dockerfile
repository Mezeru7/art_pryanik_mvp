FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
# Устанавливаем ВСЕ зависимости включая dev (нужны для сборки vite/rollup)
RUN npm ci

COPY . .
RUN npm run build

# раздача статики через nginx
FROM nginx:1.27-alpine

# Копируем собранный dist
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.spa.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
