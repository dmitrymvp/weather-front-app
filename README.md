# Погодный фронт

Веб-приложение для просмотра погоды с поддержкой геолокации и предустановленных городов.

## Стек

- React 19 + TypeScript
- Vite 8
- Chart.js / react-chartjs-2
- OpenWeatherMap API
- Архитектура Feature-Sliced Design (FSD)

## Быстрый старт

### 1. Установить зависимости

```bash
npm install
```

### 2. Настроить переменные окружения

Создать файл `.env` в корне проекта:

```env
VITE_OWM_API_KEY=your_api_key_here
VITE_OWM_BASE_URL=https://api.openweathermap.org/data/2.5
```

### 3. Запустить dev-сервер

```bash
npm run dev
```

Приложение откроется на `http://localhost:5173`.

## Скрипты

| Команда           | Описание                         |
| ----------------- | -------------------------------- |
| `npm run dev`     | Запуск в режиме разработки с HMR |
| `npm run build`   | Сборка для продакшена            |
| `npm run preview` | Предпросмотр продакшен-сборки    |
| `npm run lint`    | Проверка линтером                |

## Структура проекта

```
src/
├── app/          # Корень приложения, App.tsx
├── pages/        # Страницы (WeatherPage)
├── widgets/      # Составные блоки UI (Header, CurrentWeather, Forecast и др.)
├── features/     # Фичи (locationTabs, getLocation)
├── entities/     # Бизнес-сущности (weather API, типы)
├── shared/       # Переиспользуемые утилиты и компоненты
└── assets/       # Глобальные стили и CSS-переменные
```

## Города

Приложение поддерживает 5 локаций:

- **Мой адрес** — определяется через Geolocation API браузера
- Барселона
- Дубай
- Ванкувер
- Рио-де-Жанейро

Выбранная вкладка сохраняется в `localStorage`.
