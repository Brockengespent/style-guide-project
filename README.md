# style-guide-project

Руководство по стилю документации сервиса ДелоТрек. Руководство ведётся по подходу Docs as Code: правила написаны в Markdown, проверяются линтерами и публикуются на GitHub Pages через MkDocs.

## Быстрый старт

```bash
npm ci
pip install -r requirements.txt
npm run lint
mkdocs serve
```

После запуска откройте `http://127.0.0.1:8000` в браузере.

## Требования

- Node.js 20 или новее — для линтеров.
- Python 3.10 или новее — для MkDocs.

## Структура репозитория

| Путь | Назначение |
| --- | --- |
| `docs/` | Разделы руководства в Markdown |
| `mkdocs.yml` | Настройки сайта и навигация |
| `.markdownlint-cli2.jsonc` | Правила разметки Markdown |
| `.textlintrc.json`, `prh.yml`, `.textlint/rules/` | Правила стиля текста |
| `examples/` | Документы для тестирования руководства |
| `.github/workflows/ci.yml` | Проверки, сборка и публикация сайта |

## Проверки

| Команда | Что делает |
| --- | --- |
| `npm run lint` | Запускает markdownlint и textlint |
| `npm run lint:fix` | Исправляет то, что можно исправить автоматически |
| `npm run build` | Собирает сайт в строгом режиме |

## Как предложить изменение

Порядок работы с ветками, требования к коммитам и процесс ревью описаны в файле [CONTRIBUTING.md](CONTRIBUTING.md).
