# Архитектура проекта «Погодный фронт»

> Этот документ описывает структуру проекта для AI-агентов и разработчиков.
> Читай его **перед тем, как создавать или редактировать любой файл**.

---

## Стек

| Технология | Версия | Назначение |
|---|---|---|
| React | 18+ | UI-фреймворк |
| TypeScript | 5+ | Типизация |
| CSS Modules | — | Стили (каждый компонент — свой `.css`) |
| Vite | 5+ | Сборщик, dev-сервер, переменные окружения |
| OpenWeatherMap API | 2.5 | Текущая погода + прогноз на 5 дней |

---

## Методология: Feature-Sliced Design (FSD)

Проект использует **Feature-Sliced Design**.  
Подробная спецификация: https://feature-sliced.design

### Главное правило импортов

Каждый слой может импортировать **только из слоёв ниже себя**.

```
app      ← может импортировать из: pages, widgets, features, entities, shared
pages    ← может импортировать из: widgets, features, entities, shared
widgets  ← может импортировать из: features, entities, shared
features ← может импортировать из: entities, shared
entities ← может импортировать из: shared
shared   ← не импортирует из других слоёв проекта
```

❌ Нельзя: `widgets/CurrentWeather` импортирует из `pages/`  
❌ Нельзя: `entities/weather` импортирует из `features/`  
✅ Можно: `widgets/CurrentWeather` импортирует из `entities/weather` и `shared/`

---

## Структура папок

```
src/
├── app/                          # Слой: App — точка входа
│   ├── App.tsx
│   └── App.css
│
├── pages/                        # Слой: Pages — страницы
│   └── WeatherPage/
│       ├── index.tsx             # Собирает виджеты на странице
│       └── WeatherPage.css
│
├── widgets/                      # Слой: Widgets — крупные UI-блоки
│   ├── CurrentWeather/           # Карточка текущей погоды
│   │   ├── index.tsx
│   │   └── CurrentWeather.css
│   ├── Forecast/                 # Прогноз на 5 дней
│   │   ├── index.tsx
│   │   └── Forecast.css
│   └── SunBlock/                 # Световой день (восход/закат/трек)
│       ├── index.tsx
│       └── SunBlock.css
│
├── features/                     # Слой: Features — действия пользователя
│   └── getLocation/              # Запрос геолокации у браузера
│       ├── index.ts              # Публичный API фичи (реэкспорт)
│       └── useGeolocation.ts     # React-хук: запрашивает координаты
│
├── entities/                     # Слой: Entities — бизнес-сущности
│   └── weather/                  # Сущность «Погода»
│       ├── api.ts                # Функции запросов к OpenWeatherMap
│       ├── types.ts              # TypeScript-типы ответов API
│       └── index.ts              # Публичный API сущности (реэкспорт)
│
└── shared/                       # Слой: Shared — переиспользуемое
    ├── api/
    │   └── httpClient.ts         # Базовый fetch: подставляет ключ и base URL
    ├── ui/
    │   ├── Loader/               # Спиннер загрузки
    │   │   ├── Loader.tsx
    │   │   └── Loader.css
    │   └── WindCompass/          # Компас с анимированной стрелкой
    │       ├── WindCompass.tsx
    │       └── WindCompass.css
    ├── utils/
    │   └── converters.ts         # Чистые функции конвертации (см. ниже)
    └── types/
        └── geo.ts                # Тип координат { lat, lon }
```

---

## Ответственность каждого файла

### `shared/types/geo.ts`
Единственный тип координат в проекте:
```ts
export interface Coordinates {
  lat: number;
  lon: number;
}
```

### `shared/api/httpClient.ts`
Обёртка над `fetch`. Читает `VITE_OWM_API_KEY` и `VITE_OWM_BASE_URL` из `import.meta.env`.  
Все запросы к API идут **только через этот файл**.

### `shared/utils/converters.ts`
Чистые функции (без сайд-эффектов). Содержит:
- `degreesToCompass(deg: number): string` — градусы → румб (С, ССВ, СВ…)
- `hpaToMmHg(hpa: number): number` — гПа → мм рт. ст.
- `mpsFromKmh(kmh: number): number` — км/ч → м/с (для OWM не нужно, но пригодится)
- `formatSunTime(unixTimestamp: number, timezoneOffset: number): string` — unix → "HH:MM"
- `sunlightDuration(sunrise: number, sunset: number): string` — длительность в "XXч YYм"
- `sunPosition(sunrise: number, sunset: number, now: number): number` — позиция 0..1 для трека

### `entities/weather/types.ts`
TypeScript-типы, точно отражающие ответы OpenWeatherMap API v2.5:
- `OWMCurrentResponse` — ответ `/weather`
- `OWMForecastResponse` — ответ `/forecast` (список по 3 часа)
- `WeatherData` — нормализованный тип для UI (после маппинга из OWM-типов)

### `entities/weather/api.ts`
Две функции:
- `fetchCurrentWeather(coords: Coordinates): Promise<WeatherData>`
- `fetchForecast(coords: Coordinates): Promise<ForecastDay[]>`

Обе используют `httpClient` из `shared/api`. Маппят сырой ответ OWM в `WeatherData`/`ForecastDay`. Параметры запроса: `units=metric&lang=ru`.

### `features/getLocation/useGeolocation.ts`
React-хук `useGeolocation()`. Возвращает:
```ts
{
  coords: Coordinates | null;
  loading: boolean;
  error: 'denied' | 'unavailable' | null;
}
```
Вызывает `navigator.geolocation.getCurrentPosition` при монтировании.

### `widgets/CurrentWeather/index.tsx`
Принимает `WeatherData`. Рендерит:
- Город, дата, температура, ощущаемая, мин/макс, разница
- Иконка + текстовое описание
- Сетка параметров: влажность, давление, облачность, осадки
- `<WindCompass>` из `shared/ui`

### `widgets/SunBlock/index.tsx`
Принимает `sunrise`, `sunset` (unix timestamp), `timezoneOffset`.  
Рендерит восход/закат, длительность, статичный трек с позицией солнца.  
Позиция вычисляется через `sunPosition()` из `shared/utils/converters`.

### `widgets/Forecast/index.tsx`
Принимает массив `ForecastDay[]`. Рендерит 5 карточек: день недели, иконка, мин/макс, влажность, ветер.

### `pages/WeatherPage/index.tsx`
Главная сборочная точка. Использует `useGeolocation`, вызывает `fetchCurrentWeather` и `fetchForecast`, управляет состоянием загрузки/ошибки. Рендерит `<Loader>`, экран ошибки, или все виджеты.

---

## Переменные окружения

| Переменная | Пример значения | Где используется |
|---|---|---|
| `VITE_OWM_API_KEY` | `abc123...` | `shared/api/httpClient.ts` |
| `VITE_OWM_BASE_URL` | `https://api.openweathermap.org/data/2.5` | `shared/api/httpClient.ts` |

- Файл `.env` — **не в репозитории** (в `.gitignore`)
- Файл `.env.example` — в репозитории, без реальных значений

> ⚠️ Если ключ попал в историю коммитов — он скомпрометирован навсегда. Пересоздай ключ в личном кабинете OWM.

---

## Стандарт отображения данных

Все конвертации делаются **до** передачи данных в компоненты (в `entities/weather/api.ts` или `shared/utils/converters.ts`). Компоненты получают уже готовые к отображению значения.

| Параметр | Единица | Формат |
|---|---|---|
| Температура | °C | 1 знак после запятой |
| Ощущаемая | °C | 1 знак после запятой |
| Макс/мин температура | °C | 1 знак после запятой |
| Разница температур | °C | 1 знак после запятой |
| Влажность | % | Целое число |
| Скорость ветра | м/с | 1 знак после запятой |
| Порывы ветра | м/с | 1 знак после запятой |
| Направление ветра | румб | С, ССВ, СВ, ВСВ, В, ВЮВ, ЮВ, ЮЮВ, Ю, ЮЮЗ, ЮЗ, ЗЮЗ, З, ЗСЗ, СЗ, ССЗ |
| Давление | мм рт. ст. | Целое число |
| Облачность | % | Целое число |
| Осадки | мм | 1 знак после запятой |
| Восход/закат | ЧЧ:ММ | Локальное время |
| Длительность дня | ЧЧч ММм | Вычисляется на фронте |

---

## Состояния UI (обязательные)

| Состояние | Где рендерится | Что показывать |
|---|---|---|
| `loading: true` | `WeatherPage` | `<Loader>` — спиннер на весь экран |
| `error: 'denied'` | `WeatherPage` | Экран «Кажется, вы прячетесь. Разрешите доступ к местоположению» |
| `error: 'unavailable'` | `WeatherPage` | Экран «Не удалось определить местоположение» |
| Данные получены | `WeatherPage` | Все виджеты |

---

## Соглашения по коду

- Каждый слайс экспортирует публичный API через `index.ts` — импортировать только из него, не из внутренних файлов
- Стили — CSS Modules (файл рядом с компонентом, импорт как `import s from './Component.css'`)
- Компоненты — функциональные, с TypeScript-пропсами через `interface Props`
- Все тексты интерфейса — на русском языке
- Никаких хардкодных координат или погодных значений (исключение: расширенное задание — города в табах)

---

## OpenWeatherMap API — быстрая справка

```
Текущая погода:
GET /weather?lat={lat}&lon={lon}&units=metric&lang=ru&appid={key}

Прогноз (каждые 3 часа, 5 дней):
GET /forecast?lat={lat}&lon={lon}&units=metric&lang=ru&appid={key}

Иконки:
https://openweathermap.org/img/wn/{icon}@2x.png
```

Документация: https://openweathermap.org/api/current и https://openweathermap.org/forecast5
