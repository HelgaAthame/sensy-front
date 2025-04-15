# Этап 1: Сборка приложения
FROM node:22.4-alpine as build

# Устанавливаем переменные окружения для Vite (на этапе сборки)
ENV NEXT_PUBLIC_BASE_API_URL=http://86.57.195.162:5187/
# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы приложения
COPY . .

# Выполняем сборку Next
RUN npm run build

# Этап 2: Создание финального образа с веб-сервером
FROM node:22.4-alpine as runner

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем собранное приложение из этапа "build"
COPY --from=build /app .

# Открываем порт 3000
EXPOSE 3000

# Запуск приложения
CMD ["npm", "start"]
