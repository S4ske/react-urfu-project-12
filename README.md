# Чат (Slack)

[![hexlet-check](https://github.com/S4ske/react-urfu-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/S4ske/react-urfu-project-12/actions)

Напишите real-time приложение на React, используя AJAX, REST, websockets, React (с хуками) + Zustand + TanStack Query + @mantine/form

Учебный проект Хекслета: https://ru.hexlet.io/
Как это должно работать: https://files.hexlet.app/a/ose685

Деплой: https://react-urfu-project-12.onrender.com/


## Стек

- JavaScript, React 19, Vite
- Mantine (UI, формы, уведомления)
- Zustand (состояние интерфейса и авторизации)
- TanStack Query (серверные данные)
- Socket.IO (real-time события)
- i18next, leo-profanity, Sentry SDK (Bugsink)

## Установка

Требуется Node.js 22.12 или новее.

```bash
git clone https://github.com/S4ske/react-urfu-project-12.git
cd react-urfu-project-12
make install
```

Для отправки ошибок в Bugsink задайте переменную окружения `VITE_BUGSINK_DSN` (пример в `.env.example`).

## Использование

```bash
make build   # сборка фронтенда в dist
make start   # сервер на http://localhost:5001 раздаёт dist и API
make develop # dev-сервер Vite на http://localhost:5002 (нужен запущенный make start)
make lint    # oxlint и проверка форматирования oxfmt
```

Тестовый пользователь: `admin` / `admin`.

---

<details>
<summary>Автоматические тесты Хекслета</summary>

Тесты запускаются на каждый коммит. За запуск отвечает файл `.github/workflows/hexlet-check.yml` — не удаляйте и не переименовывайте ни его, ни репозиторий.

</details>

## О Хекслете

[Хекслет](https://ru.hexlet.io/) — школа программирования: авторские программы обучения с практикой, поддержкой наставников и реальными проектами, которые остаются в резюме. Этот репозиторий — один из таких проектов.
