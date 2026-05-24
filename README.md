# City Baker — Full Project v0.6

Полноценный сайт пекарни по макету: публичный сайт, каталог, заказ в 3 шага, имитация оплаты, Telegram-уведомления и админ-панель.

## Стек

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- Telegram Bot API
- Cookie-based admin auth

## Что реализовано

### Public

- Главная
- Меню / каталог
- Popup карточки товара
- О нас
- Где купить
- Блог
- Контакты
- Заказ в 3 шага
- Success page
- Подписка
- Заглушки вместо фото

### Backend/API

- `POST /api/orders` — создание заказа + Telegram
- `GET/POST /api/products`
- `PATCH/DELETE /api/products/:id`
- `GET/POST /api/categories`
- `PATCH/DELETE /api/categories/:id`
- `GET/POST /api/locations`
- `PATCH/DELETE /api/locations/:id`
- `GET/POST /api/blog`
- `PATCH/DELETE /api/blog/:id`
- `POST /api/contacts`
- `POST /api/subscribe`

### Admin

- `/admin/login` — вход
- `/admin` — обзор
- `/admin/products` — товары: создание, скрытие/показ, удаление
- `/admin/categories` — категории: создание/удаление
- `/admin/orders` — заказы: смена статуса
- `/admin/locations` — точки продаж: создание/удаление
- `/admin/blog` — статьи: создание/удаление

## Запуск

```bash
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Открыть:

- сайт: `http://localhost:3000`
- админка: `http://localhost:3000/admin`

Данные входа по умолчанию:

- email: `admin@citybaker.ru`
- password: `change_me`

Поменяйте их в `.env`.

## Telegram

Создайте бота через BotFather, добавьте токен и chat id в `.env`:

```env
TELEGRAM_BOT_TOKEN="..."
TELEGRAM_CHAT_ID="..."
```

Если токен не задан, сайт продолжит работать, а уведомления будут пропускаться.

## Следующие доработки

- редактирование записей в админке прямо в таблице
- загрузка фото в S3/Cloudinary
- полноценная авторизация через NextAuth или Better Auth
- роли администраторов
- экспорт заказов в Excel
- интеграция реальной оплаты
- SEO-метаданные для каждой страницы

## Версия v0.4

Добавлено:
- редактирование записей в админке без удаления и повторного создания;
- загрузка изображений через `/api/upload` в папку `public/uploads`;
- превью изображения в формах админки;
- улучшенный заказ: имя, телефон, адрес, комментарий, выбор времени, выбор способа оплаты;
- валидация шагов заказа и финальная тестовая оплата;
- бесплатная доставка от 2500 ₽.

Важно: загрузка файлов работает локально и на VPS. Для Vercel/Serverless в production лучше заменить хранение на S3/Cloudinary/Supabase Storage.


## v0.5 — визуальная и UX-доработка

Добавлено:
- более точная визуальная стилистика под Figma: крупная типографика, фирменные цветовые блоки, сетка, карточки и placeholder-графика;
- анимации появления секций через Framer Motion;
- полноценное мобильное меню с overlay-навигацией;
- интерактивная фильтрация меню по категориям без перезагрузки страницы;
- анимированный popup товара;
- переход из карточки товара сразу в заказ с автодобавлением позиции через query-параметр;
- улучшенный progress-bar оформления заказа;
- hover/active states для карточек и кнопок;
- усиленная мобильная адаптация ключевых блоков.

Фото всё ещё заменены фирменными заглушками. Реальные изображения можно будет положить в `public/uploads` и заменить поля `image`/placeholder в компонентах.


## v0.6 — финальная подготовка к запуску

Добавлено:
- SEO-метаданные на уровне приложения: Open Graph, Twitter Card, canonical, keywords;
- `sitemap.xml` и `robots.txt` через App Router;
- PWA manifest и SVG-иконка проекта;
- страницы `404`, `loading` и глобальная error boundary;
- JSON-LD разметка Bakery для поисковиков;
- skip-link, `focus-visible` и режим reduced motion для доступности;
- `vercel.json` для деплоя на Vercel;
- `Dockerfile` для VPS/Docker-деплоя;
- `typecheck` script и `postinstall` для Prisma Generate.

## Быстрый production-чеклист

1. Заполнить `.env`: `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `NEXT_PUBLIC_SITE_URL`.
2. Заменить placeholder-фото на реальные изображения в админке.
3. Выполнить миграции: `npm run prisma:migrate`.
4. Заполнить стартовые данные: `npm run prisma:seed`.
5. Проверить сборку: `npm run typecheck && npm run build`.
6. Для Vercel подключить PostgreSQL/Supabase/Neon и storage вместо локальной папки `/public/uploads`.
7. Для VPS можно использовать Dockerfile и локальное хранение uploads.
