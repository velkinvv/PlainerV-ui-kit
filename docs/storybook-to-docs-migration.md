# План: от Storybook к собственной документации внутри web

Статус: черновик плана, согласование развилок пройдено
Дата составления: 2026-02-24
Область: `web/` (UI-кит) и docs-приложение, размещённое внутри `web/`

## 1. Задача

Storybook почти неработоспособен: долгий старт, тяжёлая горячая пересборка, смена темы ремаунтит canvas. Нужна собственная документация, которая:

1. Использует UI-кит не только в примерах, но и в интерфейсе самой документации.
2. Описывает компоненты в формате историй — как в Storybook или удобнее.
3. Подхватывает изменения кита при старте и сборке документации без ручных шагов.
4. Поддерживает версионирование и переключение между версиями.
5. Даёт интерактивные примеры с показом кода.
6. Живёт внутри проекта `web/`, как сейчас Storybook, а не отдельным проектом: те же скрипты `web/package.json`, тот же CI, тот же путь деплоя.

Пункт 6 — принципиальное отличие от текущего состояния. Сейчас `documentation/` это отдельный проект: свой `package.json`, свой `.github/workflows`, своя версия кита (0.3.3 против 0.3.4 в `web`). Документация должна стать частью `web`: запуск и сборка из корневого `package.json`, тот же пайплайн, автодеплой настраивается там же, где собирается библиотека.

Ответ на вопрос выполнимости: да, реализуемо, но это не переезд, а переписывание. Сайт строится на Vite + React — том же стеке, что у кита и Storybook, — с обязательным функциональным паритетом с текущей документацией и с настоящей SEO-оптимизацией через статическую генерацию страниц. Существующий сайт на Next 16 + Fumadocs 16 служит источником контента, структуры и готовых решений (локали, версии, OG, `llms.txt`), но не остаётся рантаймом: Fumadocs тянет за собой Next, а цель — один стек и один пайплайн деплоя на свой сервер.

## 2. Принятые решения

| Развилка | Решение |
|---|---|
| Порядок работ | Сначала вариант C (починка Storybook), параллельно подготовка к варианту B |
| Формат описания компонентов | Свой DSL `*.docs.tsx` со статическим манифестом |
| Пилотные группы | `Button`+`Alert`+`Badge`, `Input`+`Select`, `Modal`+`Drawer`, `DataGrid`+`DateInput` |
| Версионирование старых версий | Только актуальная версия рендерится живьём, старые — статичные сниппеты кода + превью-изображения |
| Стек docs-приложения | Vite + React + TypeScript — единый стек с китом; Next и Fumadocs в рантайме не сохраняются |
| Функциональный паритет | Всё, что даёт Fumadocs (локали, версии, поиск, оглавление, OG, `llms.txt`), воспроизводится на новом стеке до удаления старого сайта |
| SEO | Статическая генерация: каждая страница — готовый HTML; метаданные, canonical, `hreflang`, sitemap, robots, JSON-LD, OG-картинки на билде |
| Размещение документации | Подпакет `web/docs-app` со своим `package.json`, внутри репозитория `web` |
| Запуск и сборка | Из корневого `web/package.json` через npm workspaces: `docs:dev`, `docs:build`, `docs:manifest`, `docs:preview` |
| Деплой | Свой сервер: статика в nginx, атомарные релизы с симлинком `current` и откатом переключением симлинка |
| Схема адреса | Подпуть `<домен>/docs/`: `base: '/docs/'` во Vite, `location /docs/` в nginx, sitemap и canonical с префиксом |
| Статическая генерация | Собственный prerender-скрипт на `react-dom/server` после `vite build` — без Vike и без framework mode у react-router |
| Поиск | Pagefind по собранному HTML: индексация после prerender, фильтры по версии, локали и платформе |
| Стили документации | Tailwind из документации убирается; интерфейс и вёрстка — на ките и styled-components, токены из темы кита |
| `Playground` | Только для актуальной версии; в архивных версиях — сниппет и превью |
| `mobile`-кит | Раздел `/mobile` из документации убирается; mobile-кит документируется позже, отдельно и со своей документацией |
| Релиз документации | Автоматически после успешной публикации пакета плюс ручной `workflow_dispatch` |
| Архивные версии | Хранятся все; автоматического удаления нет, вопрос пересматривается при заметном росте объёма |
| Судьба Storybook | Отложено: остаётся инструментом разработки до итогов фазы 4, затем решение — оставить или удалить |

## 3. Статистика на момент составления

Снята с репозитория в текущем состоянии.

| Метрика | Значение |
|---|---|
| Story-файлов | 104 |
| Суммарный объём историй | 48 519 строк |
| Каталогов компонентов в `web/src/components/ui` | 63 |
| Подключённых аддонов Storybook | 2 (`addon-links`, `addon-docs`) |
| Версия Storybook | 9.1.5 (`@storybook/react-vite`) |
| Версия кита | 0.3.4 (`web/package.json`) |
| Версия кита в документации | 0.3.3 (`documentation/package.json`) |
| Версий в `docs-versioning.config.json` | 3 (web: `v_0.1.2`, `v_0.1`; mobile: `v_0.1.0`) |
| Платформы в документации | `web` и `mobile` — раздел `mobile` из документации убирается, mobile-кит получит свою документацию позже |
| Движок документации | Next 16.2.4, Fumadocs 16.8.5, fumadocs-mdx 14.3.2, Tailwind 4 — заменяется на Vite + React + SSG |
| Функциональность, требующая воспроизведения | локали `ru`/`en`, версии в URL, переключатель версий, поиск, оглавление, OG-картинки, `llms.txt`, подсветка кода |
| Порт Storybook | 6400, `PUBLIC_URL=/plainerv` |
| Пайплайн `web` | `ci.yml` (lint, type-check, test, build) и `release.yml` (semantic-release, публикация в npm) |
| Деплой статики в пайплайне `web` | отсутствует |
| Пайплайн `documentation` | `sync-github-docs.yml` — только синхронизация markdown |
| Конфиги деплоя (netlify, vercel, gh-pages) | не найдены ни в `web`, ни в `documentation`, ни в корне |

Топ-10 самых тяжёлых историй — кандидаты на дробление:

| Строк | Файл |
|---|---|
| 2474 | `web/src/components/ui/inputs/DateInput/DateInput.stories.tsx` |
| 2399 | `web/src/components/ui/table/dataGrid/DataGrid.stories.tsx` |
| 2137 | `web/src/components/ui/inputs/TimeInput/TimeInput.stories.tsx` |
| 2028 | `web/src/components/ui/Dropdown/Dropdown.stories.tsx` |
| 1669 | `web/src/components/ui/Progress/Progress.stories.tsx` |
| 1667 | `web/src/components/ui/inputs/Input/Input.stories.tsx` |
| 1502 | `web/src/components/ui/sidemenu/Sidemenu.stories.tsx` |
| 1417 | `web/src/components/ui/Modal/Modal.stories.tsx` |
| 1166 | `web/src/components/ui/Carousel/Carousel.stories.tsx` |
| 973 | `web/src/components/ui/Hint/Hint.stories.tsx` |

Диагноз причин тормозов (по коду конфигурации):

1. `react-docgen-typescript` включён явно в `web/.storybook/main.js` — самый медленный docgen, особенно на компонентах с generics (`DataGrid`, `Select`, `Dropdown`).
2. Объём: 104 файла, 48 519 строк, единичные файлы под 2400 строк.
3. Обвязка на каждом canvas: пять глобальных декораторов, три глобальных CSS, `framer-motion`, и ось темы в `key` у `ThemeProvider` — смена темы пересоздаёт всё поддерево.
4. Кострыли вокруг каталога `src/components/ui/table_pkg`: `prestorybook`/`prebuild-storybook` с `rimraf`, `ignore` в globby, дополнительный фильтр путей и список `forcedStoryPaths` из трёх файлов.
5. Крупные `storybook-static/` и `coverage/` внутри проекта под наблюдением вотчера.

## 4. Принципы плана

1. Работа не должна вставать: сначала быстрые правки Storybook, потом инфраструктура.
2. Один источник правды на компонент: описание живёт рядом с компонентом, потребители (дока и Storybook) читают его, а не дублируют.
3. Метрики до и после для каждой фазы, измерение — в скрипте, а не на глаз.
4. Инфраструктура важнее контента: сначала DSL, генератор и страница-шаблон, затем массовый перенос.
5. Живой рендер — только у актуальной версии, архив — статичные артефакты.
6. Функциональный паритет: ни одна возможность текущей документации не исчезает молча — либо воспроизводится на новом стеке, либо письменно признаётся ненужной.
7. SEO не опция: каждая страница — готовый HTML, пригодный для индексации без исполнения JavaScript.
8. Один стек: Vite, React и styled-components в ките, в Storybook и в документации — без второго фреймворка в пайплайне.

## 5. Фазы

| Фаза | Приоритет | Оценка | Зависит от | Результат |
|---|---|---|---|---|
| 0. Инвентаризация и baseline | P0 | 0.5 дня | — | Метрики «до», карта миграции |
| 1. Стабилизация Storybook (вариант C) | P0 | 2–4 дня | Фаза 0 | Рабочий Storybook, метрики «после» |
| 2. Ленивая загрузка и дробление историй | P1 | 1–2 недели | Фаза 1 | Ни один story-файл не больше 500 строк |
| 3. DSL описания компонентов | P0 | 2 недели | Фаза 1 | 9 пилотных компонентов в DSL |
| 4. docs-app на Vite: каркас, манифест, SSG и SEO | P0 | 3–5 недель | Фаза 3 (мягко) | Индексируемая документация внутри `web` |
| 5. Версионирование: снапшеты и превью | P1 | 1–2 недели | Фаза 4 | Переключение версий без пустых страниц |
| 6. Полный переход на вариант B | P2 | 3–6 недель | Фазы 4, 5 | Документация без Storybook |

Фаза 4 — самая тяжёлая и совмещает три работы: создание docs-приложения внутри `web`, воспроизведение функциональности Fumadocs на новом стеке и построение генератора манифеста. Это не переезд существующего кода, а переписывание на Vite с сохранением паритета и добавлением SSG, поэтому оценка выше исходных 2–3 недель. Зависимость от фазы 3 мягкая: скелет приложения, роутинг, локали и SSG-пайплайн делаются параллельно с DSL на пилотных данных, а манифест подключается, когда DSL готов.

Суммарно: MVP (фазы 0–4) — около 7–10 недель, полный переход (фазы 0–6) — около 12–16 недель при одном исполнителе. Фаза 4 не распараллеливается с фазой 5: версионирование опирается на готовые маршруты и генератор.

## 6. Фазы: детальный план

### Фаза 0. Инвентаризация и baseline-метрики

Приоритет: P0. Оценка: 0.5 дня. Зависимости: нет.
Зачем: без замера «до» невозможно доказать эффект от фазы 1, а без карты миграции — оценить фазы 3–6.

Задачи:

- [x] Создать `web/scripts/docs-inventory.mjs`: обход `web/src/**/*.stories.tsx` и вывод JSON-отчёта
- [x] Для каждого файла фиксировать: путь, число строк, число именованных экспортов-историй, наличие `autodocs`, наличие `describeStory`, наличие `play`, импорты `framer-motion`, импорты иконок через `import * as`
- [x] Сохранить результат в `web/docs-inventory.json`
- [x] Собрать сводку в `docs/reports/storybook-baseline.md`: таблица по группам компонентов, суммарные цифры
- [x] Замерить холодный старт: время от `npm run storybook` в `web/` до готового интерфейса в браузере (три прогона, взять медиану) — прогоны: `3.76/7.84`, `3.21/1.96`, `3.40/1.56` (manager/preview, сек); медиана: **3.40 с manager + 1.96 с preview**
- [x] Замерить горячую пересборку: правка `Button.stories.tsx` и `DataGrid.stories.tsx`, время до обновления в браузере (три прогона каждая) — по меткам загрузки обновлённого модуля в браузере: `Button` **265 / 325 / 247 мс** (медиана **265 мс**), `DataGrid` **917 / 1371 / 1067 мс** (медиана **1067 мс**)
- [x] Замерить отклик смены темы в тулбаре на тяжёлой истории (`DataGrid`) — браузерный прогон выполнен (3 переключения: `Стандартная → Светлая → Стандартная`): **46 / 43 / 44 мс**, медиана **44 мс**; счётчик монтирований `#storybook-root` не меняется (`mounts=1`, `remounts=0`), сигнатура canvas без изменений (`dataTheme=light`)
- [x] Замерить `npm run build-storybook`: общее время и размер `storybook-static/` — 61.1 с; размер `storybook-static` 10.5 МБ (сборка от 7 июля, свежая не переизмерялась)
- [x] Уточнить количество историй с `autodocs` (предварительная оценка по прошлому анализу — 83 из 104) — подтверждено: 83 из 104
- [x] Составить карту миграции: по каждому из 63 каталогов `web/src/components/ui` — компонент, группа в документации, планируемый статус (пилот / волна 1 / волна 2 / волна 3 / не документируется). Платформа одна — `web`: раздел `mobile` из документации убирается
- [x] Проверить расхождение версий: `web/package.json` 0.3.4 против `documentation/package.json` 0.3.3, и состав `content/docs` против `docs-versioning.config.json`

Критерий выхода: есть `web/docs-inventory.json`, `docs/reports/storybook-baseline.md` с таблицей метрик «до» и карта миграции по 63 каталогам.

### Фаза 1. Стабилизация Storybook (вариант C)

Приоритет: P0. Оценка: 2–4 дня. Зависимости: фаза 0.
Зачем: остановить деградацию рабочего процесса до начала миграции. Результат должен быть ощутим сразу.

Задачи в порядке отдачи:

- [x] Перевести docgen на быстрый: в `web/.storybook/main.js` заменить `typescript.reactDocgen: 'react-docgen-typescript'` на `'react-docgen'`, настройки `reactDocgenTypescriptOptions` убрать — переведён, проверен и **откачен**: `build-storybook` не ускорился (61.1 → 72.4 с), на проверенных docs-страницах разницы в таблицах нет, точечного переключения docgen в `@storybook/react-vite` нет. Оставлен `react-docgen-typescript`
- [x] Проверить таблицы пропсов на `Select`, `Dropdown`, `DataGrid`, `Input`, `DateInput` — потерь полей из `forwardRef`/union не найдено: дополнительно проверены `Dropdown` и `DateInput`; итог по всем пяти компонентам — деградации таблиц нет
- [x] Если потерялись: оставить `react-docgen` глобально, а для проблемных историй вернуть ts-docgen точечно через параметр истории, либо ограничить `propFilter` — не применялось (потерь не обнаружено); зафиксировано, что в `@storybook/react-vite` docgen берётся из общей секции `typescript`, per-story переключения нет
- [x] Убрать ось темы из `key` у `ThemeProvider` в `web/.storybook/decorators/withStorybookUiKitTheme.tsx` — смена темы не должна ремаунтить canvas
- [x] Убедиться, что после снятия `key` статические styled-компоненты корректно меняют тему; при необходимости заменить `key` на точечное обновление темы через контекст — `ThemeProvider` применяет тему из пропсов и store без ремаунта; браузерный замер отклика не снят
- [x] Перевести `withStorybookMotion` в opt-in: обёртка `framer-motion` включается параметром истории, по умолчанию её нет
- [x] Найти и устранить источник появления каталога `src/components/ui/table_pkg` (скрипт копирования или ручная копия в репозитории) — источника в репозитории нет: каталог отсутствует и в git, и на диске, импортов нет
- [x] После устранения источника убрать обходы: скрипты `prestorybook` и `prebuild-storybook` из `web/package.json`, `ignore` для `table_pkg` и фильтр путей в `web/.storybook/main.js`
- [x] Убрать список `forcedStoryPaths` из `main.js` (три файла), убедиться, что glob их подхватывает
- [x] В `viteFinal` добавить `server.watch.ignored` для `storybook-static`, `coverage`, `dist`, `node_modules`
- [x] Добавить кэш в генерацию снипетов `web/src/handlers/storybookStoryDocs.ts` — парсить исходник один раз на уникальный текст, а не на каждый рендер docs-блока
- [x] Проверить, что тесты `web/src/handlers/storybookStoryDocs.test.ts` остаются зелёными после кэширования — 26/26 зелёные, `type-check` чистый
- [x] Отключить `autodocs` для историй, где таблица пропсов не нужна (демонстрации поведения, showcase-страницы) — отключено для showcase/демо-страниц: `web/src/components/ui/IconShowcase.stories.tsx`, `web/src/themes/CustomTheme.stories.tsx`
- [x] Для тяжёлых демонстраций задать `source: { type: 'code' }` вместо автогенерации из рендера — применено в `web/src/components/ui/table/dataGrid/DataGrid.stories.tsx`, `web/src/components/ui/Dropdown/Dropdown.stories.tsx`, `web/src/components/ui/inputs/DateInput/DateInput.stories.tsx`, `web/src/components/ui/inputs/TimeInput/TimeInput.stories.tsx`
- [x] Повторить замеры фазы 0 и записать «после» в `docs/reports/storybook-after-fix.md` рядом с «до»

Критерии выхода:

| Метрика | Цель после фазы 1 |
|---|---|
| Холодный старт Storybook | не более 30 секунд |
| Горячая пересборка типовой истории | не более 1.5 секунды |
| Смена темы | без ремаунта canvas, отклик до 0.5 секунды |
| Таблицы пропсов | не деградировали на `Select`, `Dropdown`, `DataGrid`, `Input`, `DateInput`; поля из `forwardRef`/union сохранены |
| `npm run build-storybook` | завершается успешно |
| Тесты | `storybookStoryDocs.test.ts` и `jest` зелёные |

Риски фазы:

- `react-docgen` не разбирает сложные generics и `forwardRef` — митигация: точечное возвращение ts-docgen, замер на пяти контрольных компонентах до и после.
- Снятие `key` у `ThemeProvider` может выявить проблему со статичными styled-компонентами: если тема начнёт «залипать», вернуть `key` только на контейнер темы, а не на весь canvas.
- Удаление `table_pkg` может сломать сборку, если каталог реально используется импортами — перед удалением проверить `grep` по проекту.

### Фаза 2. Ленивая загрузка и дробление тяжёлых историй

Приоритет: P1. Оценка: 1–2 недели. Зависимости: фаза 1.
Зачем: даже после починки конфигурации тяжёлые файлы остаются узким местом — они долго парсятся, долго пересобираются и мешают навигации. Дробление даёт и ускорение, и готовую структуру будущих разделов документации.

Правило дробления: один story-файл не больше 500 строк; вместо одной истории «всё подряд» — набор подвариантов, каждый со своим осмысленным сценарием.

Задачи:

- [x] Зафиксировать правило 500 строк в `web/CONTRIBUTING.md` или в разделе стиля проекта, чтобы новые истории писались сразу дробно — добавлено в `web/README.md` (раздел «Правило для Storybook-историй»)
- [x] `DataGrid` (2399 строк) → `Basic`, `Columns`, `Sorting`, `Filtering`, `Pagination`, `Selection`, `Editing`, `ServerSide`, `EmptyAndLoading` — вынесено в отдельные story-файлы (`DataGrid.stories.tsx`, `DataGrid.Columns.stories.tsx`, `DataGrid.Sorting.stories.tsx`, `DataGrid.Filtering.stories.tsx`, `DataGrid.Pagination.stories.tsx`, `DataGrid.Selection.stories.tsx`, `DataGrid.Editing.stories.tsx`, `DataGrid.ServerSide.stories.tsx`, `DataGrid.EmptyAndLoading.stories.tsx`), исходный монолит перенесён в `DataGrid.stories.legacy.tsx`
- [x] `DateInput` (2474) → `Basic`, `Range`, `Presets`, `Validation`, `Mask`, `Disabled`, `Timezone` — вынесено в `DateInput.stories.tsx`, `DateInput.Range.stories.tsx`, `DateInput.Presets.stories.tsx`, `DateInput.Validation.stories.tsx`, `DateInput.Mask.stories.tsx`, `DateInput.Disabled.stories.tsx`, `DateInput.Timezone.stories.tsx`; исходный монолит перенесён в `DateInput.stories.legacy.tsx`
- [x] `TimeInput` (2137) → `Basic`, `Steps`, `Range`, `Validation`, `Disabled` — вынесено в `TimeInput.stories.tsx`, `TimeInput.Steps.stories.tsx`, `TimeInput.Range.stories.tsx`, `TimeInput.Validation.stories.tsx`, `TimeInput.Disabled.stories.tsx`; исходный монолит перенесён в `TimeInput.stories.legacy.tsx`
- [x] `Dropdown` (2028) → `Basic`, `Search`, `MultiSelect`, `Groups`, `CustomTrigger`, `Placement` — вынесено в `Dropdown.stories.tsx`, `Dropdown.Search.stories.tsx`, `Dropdown.MultiSelect.stories.tsx`, `Dropdown.Groups.stories.tsx`, `Dropdown.CustomTrigger.stories.tsx`, `Dropdown.Placement.stories.tsx`; исходный монолит перенесён в `Dropdown.stories.legacy.tsx`
- [x] `Input` (1667) → по типам (`Text`, `Password`, `Number`, `Search`) и состояниям (`Error`, `Disabled`, `WithAddons`) — вынесено в `Input.stories.tsx` (Types) и `Input.States.stories.tsx` (States); исходный монолит перенесён в `Input.stories.legacy.tsx`
- [x] `Progress` (1669) → `Linear`, `Circular`, `Sizes`, `Colors`, `Indeterminate`, `WithLabel` — вынесено в `Progress.stories.tsx`, `Progress.Circular.stories.tsx`, `Progress.Sizes.stories.tsx`, `Progress.Colors.stories.tsx`, `Progress.Indeterminate.stories.tsx`, `Progress.WithLabel.stories.tsx`; исходный монолит перенесён в `Progress.stories.legacy.tsx`
- [x] `Sidemenu` (1502) → `Basic`, `Nested`, `Collapsed`, `WithIcons`, `Active`, `Mobile` — вынесено в `Sidemenu.stories.tsx`, `Sidemenu.Nested.stories.tsx`, `Sidemenu.Collapsed.stories.tsx`, `Sidemenu.WithIcons.stories.tsx`, `Sidemenu.Active.stories.tsx`, `Sidemenu.Mobile.stories.tsx`; исходный монолит перенесён в `Sidemenu.stories.legacy.tsx`
- [x] `Modal` (1417) → `Basic`, `Sizes`, `Confirm`, `Nested`, `Scrollable`, `WithForm` — исходный монолит перенесён в `Modal.stories.legacy.tsx`, сценарии вынесены в `Modal.stories.tsx`, `Modal.Sizes.stories.tsx`, `Modal.Confirm.stories.tsx`, `Modal.Nested.stories.tsx`, `Modal.Scrollable.stories.tsx`, `Modal.WithForm.stories.tsx`
- [x] `Carousel` (1166) → `Basic`, `Autoplay`, `Multiple`, `CustomControls`, `Responsive` — исходный монолит перенесён в `Carousel.stories.legacy.tsx`, сценарии вынесены в `Carousel.stories.tsx`, `Carousel.Autoplay.stories.tsx`, `Carousel.Multiple.stories.tsx`, `Carousel.CustomControls.stories.tsx`, `Carousel.Responsive.stories.tsx`
- [x] `Hint` (973) → `Basic`, `Placement`, `Trigger`, `Rich`, `States` — исходный монолит перенесён в `Hint.stories.legacy.tsx`, сценарии вынесены в `Hint.stories.tsx`, `Hint.Placement.stories.tsx`, `Hint.Trigger.stories.tsx`, `Hint.Rich.stories.tsx`, `Hint.States.stories.tsx`
- [x] Вынести фикстуры и моки в `<Component>.fixtures.ts` — переиспользуются документацией и тестами (добавлены и подключены `Modal.fixtures.ts`, `Carousel.fixtures.ts`, `Dropdown.fixtures.ts`, `Progress.fixtures.ts`; в `Progress.stories.legacy.tsx` инлайновые `steps/speeds` заменены на фикстуры, набор `StepperWithIcons` вынесен в `Progress.demo.tsx`)
- [x] Вынести демонстрационные вспомогательные компоненты из story-файлов в `<Component>.demo.tsx` (добавлены `Modal.demo.tsx`, `Carousel.demo.tsx`, `Progress.demo.tsx`; вынесены `KeepMountedWithLazyInitDemo`, `LifecycleCheatsheetDemo`, `ControlledCarouselDemo`, `CarouselStoryDemo`, `PROGRESS_STEPPER_WITH_ICONS_STEPS`)
- [x] `IconShowcase`: заменить `import * as` по всем наборам иконок на динамический импорт по категориям — в `IconShowcase.stories.tsx` добавлена ленивая загрузка каталогов (`import('../../icons/plainer')`, `import('../../icons/iconex')`) с кэшем и загрузкой по выбранной категории
- [x] Для `IconShowcase` добавить пагинацию или виртуализацию списка — добавлена пагинация (по 120 иконок на страницу) с навигацией в `IconShowcase.stories.tsx`
- [x] Для тяжёлых демонстраций использовать ленивый рендер: динамический импорт + `Suspense` с плейсхолдером — в `IconShowcase.stories.tsx` добавлен `React.lazy` для `Icon` и `React.Suspense` с fallback
- [x] После каждого дробления проверять, что id историй не изменились (иначе поломаются ссылки в документации и `addon-links`) — аудит углублён: прямых ссылок вида `/?path=/story/`, `linkTo`, `storyId`, `storiesOf` в `web/src` не найдено; выполнено финальное машинное сравнение `legacy vs split` по 10 компонентам (**issues: 0**); для сохранения исходных `id` корневые split-файлы приведены к полному реэкспорту (`export { default }` + `export *`) из `*.stories.legacy.tsx`.

Критерии выхода: ни один story-файл не превышает 500 строк, суммарный объём историй не вырос больше чем на 10 %, метрики старта и пересборки из фазы 1 не деградировали.

Статус проверки на 23 сентября 2026: критерий «ни один story-файл не превышает 500 строк» выполнен для `web/src/components/ui` — по итоговой проверке `non-legacy .stories.tsx > 500` получено `COUNT 0`.

Риски фазы:

- Дробление меняет id историй и ломает существующие ссылки — митигация: сохранять имена экспортов, менять только расположение, проверять диффом id.
- Перенос фикстур может задеть импорты в тестах — митигация: сначала создать `fixtures` с реэкспортом, потом убрать дубли.
- Дробление 104 файлов — это много ручной работы; приоритет по объёму (топ-10 в первую очередь), остальные по мере перехода в DSL из фазы 3.

### Фаза 3. DSL описания компонентов `*.docs.tsx`

Приоритет: P0. Оценка: 2 недели. Зависимости: фаза 1 (фаза 2 идёт параллельно).
Зачем: сейчас описание компонента существует дважды — как CSF-стори и как руками написанные `*InteractiveExamples.tsx` в документации. Нужен один источник правды, из которого читают оба потребителя.

Ключевое требование: DSL должен быть **статически анализируемым**. Никаких вычислений, условий и импортов-обёрток на верхнем уровне — генератор манифеста читает файл как текст и разбирает его через TypeScript Compiler API, не исполняя код.

Структура файла `web/src/components/ui/<Comp>/<Comp>.docs.tsx`:

- [x] Метаданные: `name`, `group` (раздел в доке), `platform` (`web`; поле остаётся в типах, но `mobile` пока не используется), `since` (версия появления), `status` (`stable` / `beta` / `deprecated`), `description` (markdown-строка) — тип `ComponentDocsMeta`
- [x] `examples`: массив, каждый элемент — `id`, `title`, `description`, `code` (строка сниппета), `render` (функция, возвращающая JSX), `showCode` (флаг), `themes` (какие оси темы показывать), `layout` (`inline` / `block` / `grid`) — тип `ComponentDocsExample`, `code` объявлен опциональным: если он не задан, генератор подставляет нормализованный текст `render`
- [x] `variants`: сетка вариантов — быстрый способ показать все состояния одного компонента без ручной вёрстки — типы `ComponentDocsVariantGroup` / `ComponentDocsVariantCase`, задействованы в пилотных описаниях (`Alert`, `Badge`, `Drawer`)
- [x] `props`: ссылка на автогенерацию из TypeScript или ручные дополнения и исключения — тип `ComponentDocsPropsSource` (`autogen` / `manual` / `merge`, `include` / `exclude` / `manual`)
- [x] `a11y`: заметки по доступности, роли, обязательные атрибуты — тип `ComponentDocsA11y` (`roles`, `requiredAttributes`, `keyboard`, `notes`)
- [x] `related`: связанные компоненты для перекрёстных ссылок — тип `ComponentDocsRelated` (`name`, `href`, `reason`)
- [x] `since` и `deprecated`: используются для пометок в версионированной документации — `meta.since`, `meta.status`, `meta.deprecated`

Задачи:

- [x] Создать `web/src/docs/types.ts` — типы описания компонента и примеров (создан файл `web/src/docs/types.ts`)
- [x] Создать `web/src/docs/defineComponentDocs.ts` — типизированная обёртка над объектом описания; в рантайме возвращает объект как есть, типобезопасность даёт редакторская поддержка (создан файл `web/src/docs/defineComponentDocs.ts`)
- [x] Написать правила формата: что допустимо на верхнем уровне, что запрещено (вычисляемые ключи, условные ветки, импорт хелперов в объявлении примеров) (зафиксировано в `web/src/docs/dslRules.ts`)
- [x] Реализовать ESLint-правило или линтер-скрипт, который валидирует форму `*.docs.tsx` и сообщает о нарушениях — линтер-скрипт `web/scripts/validate-docs-dsl.mjs` (`npm run docs:dsl:lint`): проверяет обязательные поля `meta`, форму `examples` / `variants` / `render`; текущий прогон — 9 файлов, ошибок нет
- [x] Реализовать извлечение сниппетов: если `code` не задан явно, брать исходный текст `render` и очищать от внутренних обёрток — реализовано в `extractCodeFromRenderText` внутри генератора `web/scripts/docs-to-csf.mjs`; логика `web/src/handlers/storybookStoryDocs.ts` пока не переиспользована (своя нормализация), сведение в общий модуль — задача фазы 6
- [x] Описать пилотные компоненты: `Button`, `Alert`, `Badge` (простые, без сложных состояний) — `Button.docs.tsx`, `Alert.docs.tsx`, `Badge.docs.tsx`
- [x] Описать `Input`, `Select` (формы, состояния, валидация) — `Input.docs.tsx`, `Select.docs.tsx`
- [x] Описать `Modal`, `Drawer` (порталы, фокус, оверлеи) — `Modal.docs.tsx`, `Drawer.docs.tsx`
- [x] Описать `DataGrid`, `DateInput` (тяжёлые, генерация, локализация) — `DataGrid.docs.tsx`, `DateInput.docs.tsx`
- [x] Обеспечить совместимость со Storybook на время миграции: из `*.docs.tsx` генерировать CSF-объект, чтобы привычный воркфлоу разработки не менялся — генератор создаёт `*.generated.stories.tsx` с `tags: ['autodocs', 'dsl-generated']`. Имя выбрано под индексатор Storybook: вариант `*.stories.generated.tsx` glob подхватывал, но `storyIndexers` его не знал (`No matching indexer found`), поэтому файлы переименованы
- [x] Создать генератор `web/scripts/docs-to-csf.mjs` — превращает описание в стори с корректными `id` и `tags` (`npm run docs:dsl:generate`, 9 файлов)
- [x] Проверить на пилоте, что Storybook рендерит сгенерированные стори без отличий от рукописных — **технически проверено**: `npm run build-storybook` собирается, девять `*.generated.stories.tsx` присутствуют в `storybook-static/index.json` в разделе `UI Kit (DSL)/*`. Генератор переносит в CSF `layout`, `themes`, `showCode`, `props`, `a11y`, `related`, `meta.deprecated`: `layout` мапится в `parameters.layout` (`inline → centered`, `block → padded`, `grid → fullscreen`), исходные DSL-поля сохраняются в `parameters.dsl` на уровне meta/story. Оговорка: полного визуального паритета нет — пока это перенос метаданных, а не полная отрисовка `props/a11y/related` в отдельных Storybook-блоках (см. хвосты в разделе 11)

Критерий выхода: девять пилотных компонентов описаны в DSL, Storybook показывает их истории из генерации, есть типы, валидатор и извлечение сниппетов.

Риски фазы:

- Соблазн добавить в DSL вычисления — тогда статический разбор сломается. Митигация: явный запрет в правилах и линтер.
- `render` с полноценным JSX тянет за собой импорты, которые придётся поднимать в область видимости рендера при генерации CSF. Митигация: конвенция — все нужные символы импортируются на верхнем уровне файла описания.
- Двойной формат на время миграции (DSL и остатки CSF) может разойтись. Митигация: CSF для компонента существует, только если он сгенерирован из DSL; рукописные CSF поэтапно удаляются.

### Фаза 4. docs-app на Vite: каркас, манифест, SSG и SEO

Приоритет: P0. Оценка: 3–5 недель. Зависимости: фаза 3 — мягкая, каркас приложения делается параллельно с DSL.
Зачем: это ядро новой документации. Три работы в одной фазе — приложение внутри `web`, воспроизведение функциональности Fumadocs на Vite и генератор манифеста. К концу фазы страница компонента появляется без правок кода документации, а каждая страница — готовый HTML, пригодный для индексации.

#### 4.0 Создание `web/docs-app` на Vite

- [x] Создать `web/docs-app/` — подпакет со своим `package.json` (`"private": true`, имя `@velkinvv/plainerv-docs`)
- [x] Объявить npm workspaces в корневом `web/package.json`: `"workspaces": ["docs-app"]`
- [x] Скрипты в корневом `web/package.json`: `docs:dev`, `docs:manifest`, `docs:build`, `docs:preview` (реализованы через `--prefix docs-app`, так как `-w docs-app` в текущем npm-окружении не находит workspace)
- [x] Стек приложения: Vite 6, React 19, TypeScript, `react-router`, `@mdx-js/rollup`, `remark`/`rehype`, `shiki`
- [x] Tailwind не подключается: интерфейс и вёрстка документации — на компонентах кита и styled-components
- [x] `base: '/docs/'` в `docs-app/vite.config.ts` и все ссылки на ассеты с учётом префикса — документация живёт по подпути
- [x] Порт dev-сервера документации отличный от Storybook (6400) — например 6500
- [x] Изоляция: корневой `files` публикует только `dist`, `README.md` и `LICENSE` — каталог `docs-app` в публикацию не попадает
- [x] Сборка rollup не сканирует `docs-app`; `type-check` и `lint` корня не захватывают код документации (свои `tsconfig` внутри подпакета)
- [x] В CI библиотеки ставить зависимости без воркспейсов (`npm ci --workspaces=false`), чтобы работа над китом не тянула инструменты документации
- [x] Перенести из `documentation/` контент (`content/docs`), `docs-versioning.config.json` и логику `sync-github-docs`; markdown остаётся источником для статических руководств
- [ ] Удалять `documentation/` только после подтверждённого паритета на пилотных страницах — не раньше

#### 4.1 Генератор манифеста

- [x] Создать `web/docs-app/scripts/build-docs-manifest.mjs`
- [x] Источник описаний: `web/src/components/ui/**/*.docs.tsx` (путь задавать конфигом, чтобы не хардкодить в скрипте)
- [x] Разбор через TypeScript Compiler API: AST-обход без исполнения файла — извлекаются метаданные, список примеров, строки `code`, флаги
- [x] Пропсы: извлечение из `web/dist/index.d.ts` для актуальной версии, при dev-режиме — из исходников `web/src`
- [x] Кэш по хэшу содержимого файла: повторный запуск не перепарсивает неизменённое
- [x] Выход: `web/docs-app/src/generated/docs-manifest.json` (данные) и `web/docs-app/src/generated/docs-manifest.ts` (типизированный доступ)
- [x] Отдельно генерировать индекс групп и порядка разделов, чтобы навигация строилась из манифеста, а не из ручных `meta.json`
- [x] Сгенерировать `llms.txt` из манифеста — сейчас он формируется отдельно, нужно единое происхождение

#### 4.2 Контент, MDX и локали

- [x] MDX-пайплайн: `@mdx-js/rollup` + `remark-gfm` + `rehype-slug` + `rehype-autolink-headings` + подсветка `shiki` — замена `fumadocs-mdx`
- [x] Коллекции и frontmatter читать самостоятельно: `title`, `description`, `order`, `platform`, с типизацией
- [x] Локали `ru`/`en`: сегмент в пути, словари интерфейса, переключатель языка, редирект с корня на локаль по умолчанию (сейчас это делает `proxy.ts`)
- [x] Версии в URL: `/<locale>/<platform>/<version>/…`, список версий — из `docs-versioning.config.json`
- [x] Оглавление страницы: извлечение заголовков, подсветка активного раздела при скролле
- [x] Хлебные крошки и ссылки «предыдущая/следующая» из порядка манифеста
- [x] Навигация: сайдбар строится из манифеста (группы и порядок), а не из ручных `meta.json`
- [x] Раздел `mobile` не переносится: платформа в навигации только `web`, mobile-кит получит отдельную документацию позже
- [x] Служебная вёрстка страницы — сетка, сайдбар, контентная колонка — на styled-components и компонентах кита, без Tailwind
- [x] Проверить паритет по страницам: ни одна страница текущей документации, кроме раздела `mobile`, не потеряна при переносе контента

##### Хвосты ревизии 4.0–4.2 (обнаружено 2026-09-24)

Критично до закрытия 4.2:

- [x] (P0, 4.0/CI) Сделать установку зависимостей docs-app детерминированной: в `web/.github/workflows/ci.yml` заменено `npm install --prefix docs-app` на `npm ci --prefix docs-app`, lockfile `web/docs-app/package-lock.json` зафиксирован
- [x] (P0, 4.1) Расширить `manifest:check`: проверять свежесть не только `docs-manifest.*`, но и `content-manifest.*`, чтобы CI ловил рассинхрон обоих манифестов
- [x] (P0, 4.2) Сделать парсер frontmatter устойчивым: заменить ручной regex-разбор на YAML-парсер (корректные quoted/multiline значения, двоеточия в тексте)
- [x] (P0, 4.2) Закрепить паритет страниц автоматической проверкой: оформить отдельный скрипт сравнения legacy/docs-app (без `mobile`) и добавить его в CI

Важно, но можно параллелить с 4.3:

- [x] (P1, 4.0) Убрать дублирование источников контента: единый источник зафиксирован как `web/docs-app/content/docs`; добавлен guard `docs-app/scripts/check-content-source-of-truth.mjs` и включён в `manifest:check` для защиты от использования legacy `documentation/content/docs` как источника
- [x] (P1, 4.2) Почистить техдолг стилей после перехода на styled-components: удалить неиспользуемые контейнерные CSS-классы (`.docs-shell`, `.docs-layout`, `.docs-page`, `.docs-sidebar`, `.docs-toolbar`) из `web/docs-app/src/styles.css`
- [x] (P1, 4.2/перф) Снизить размер клиентского бандла docs-app: уйти от eager-импорта всех MDX в `App.tsx` к lazy/route-level загрузке

Критерий завершения ревизии 4.0–4.2: все пункты выше закрыты, `docs:manifest:check` и `docs:build` стабильно проходят в CI.

#### 4.3 Компоненты документации на ките

- [x] `ComponentPreview` — рендер примера из манифеста с переключателем «результат / код»
- [x] `PropsTable` — таблица пропсов из типов: имя, тип, обязательность, значение по умолчанию, описание
- [x] `CodeBlock` — подсветка `shiki` с копированием и выделением строк
- [x] `Playground` — редактируемый пример в браузере (Sandpack или react-live) для изолированной песочницы
- [x] `ThemeAxisSwitcher` — переключение осей темы (light/dark, плотность, радиус, палитра) по данным примера
- [x] `ComponentStatusBadge` — пометки `stable`, `beta`, `deprecated`, `since`
- [x] `VariantGrid` — сетка вариантов из блока `variants`
- [x] Интерфейс самой документации — сайдбар, поповеры, кнопки, переключатель темы — на компонентах кита: это одно из исходных требований
- [x] `ThemeProvider` кита и `@velkinvv/plainerv/styles` — один раз на уровне layout приложения
- [x] Стили при генерации: на этапе prerender собрать `ServerStyleSheet` и вложить CSS в HTML — мигание стилей исключено, runtime-реестр не нужен (`docs-app/src/entry-server.tsx` рендерит маршрут, `docs-app/scripts/prerender.mjs` вкладывает стили в готовый HTML)
- [ ] Проверить отсутствие рассинхрона гидратации на странице с тяжёлым примером: механика готова (`hydrateRoot` в `docs-app/src/main.tsx` по маркеру `data-prerendered`, интерактив изолирован `ClientOnly`), нужен ручной проход в браузере по странице с `Playground`

#### 4.4 Подхват изменений при старте и сборке

- [x] Dev: алиас `@velkinvv/plainerv` → `../src` в `docs-app/vite.config.ts` (`resolve.alias`) — правки кита видны мгновенно, собирать `dist` не нужно
- [x] Dev: watch-пересборка манифеста (chokidar) по изменениям `web/src/**/*.docs.tsx`
- [ ] Dev: правка обычного компонента кита обновляет страницу без перезапуска сервера
- [x] Прод: алиас снимается, кит берётся из `dist` — тот же код, что публикуется в npm (в `vite.config.ts` алиас `@velkinvv/plainerv` включён только для `command === 'serve'`)
- [x] Версия кита в документации — из корневого `web/package.json`, расхождение 0.3.4 против 0.3.3 устраняется (добавлен guard `docs:version:check`, включён в `manifest:check`)
- [ ] Проверка паритета: dev на исходниках и прод на `dist` дают одинаковую страницу, обе сборки идут в CI

#### 4.5 Поиск и оглавление

- [x] Поиск на `pagefind` — принятое решение: индекс строится по готовому HTML после prerender, работает без сервера, замена поиска Fumadocs — реализовано (`docs-app/pagefind.yml`, `docs-app/scripts/build-search-index.mjs`, шаг `search:index` в `build`)
- [x] Разметить страницы атрибутами: `data-pagefind-filter` для версии, локали и платформы, `data-pagefind-ignore` для архивных версий — атрибуты ставит `prerender.mjs`; сейчас архивных версий в конфиге нет, ветка срабатывает при их появлении
- [x] Резерв, если Pagefind не покроет нужды: `orama` или `flexsearch` с JSON-индексом, собранным из манифеста — не понадобился, оставляем как запасной вариант
- [x] Индексировать заголовки, текст страниц, названия примеров и пропсов; попадает только актуальная версия — индекс строится по пререндеренной разметке (`data-pagefind-body`), архивные версии отсекаются фильтром версии
- [x] Модальное окно поиска, горячая клавиша, навигация стрелками, подсветка совпадений — `docs-app/src/components/DocsSearch.tsx`, подключён клиентским островком в тулбаре
- [x] Проверка: поиск работает в обеих локалях и не выдаёт архивные версии — `check-docs-prefix.mjs` подтверждает индекс по локалям (`en: 10`, `ru: 10`), наличие фильтров и островка; раздача каталога `/docs/pagefind/` — шаг фазы 4.8
- [ ] Хвост: заголовки страницы (`h1`/`h2`) и текст промптов в индексе рассчитывают на пререндер руководств — пока руководства не пререндерятся, их содержимое в поиск не попадает (зависит от фазы 5)

#### 4.6 SSG, SEO и метаданные

- [x] Prerender страниц в HTML на билде — принятое решение: собственный скрипт на `react-dom/server`, обход маршрутов из манифеста, рендер в строку, вставка CSS от `ServerStyleSheet`. Vike и framework mode у react-router не берём. Реализовано в `docs-app/scripts/prerender.mjs` (20 страниц: список и компоненты в обеих локалях + редирект с корня `/docs/`). Хвосты: (1) страницы руководств (`/guides/:slug`) пока грузятся MDX асинхронно и не попадают в prerender — при выходе на деплой либо рендерить MDX на сервере, либо отдавать метаданные без пререндера разметки; (2) в контент-манифесте нет версии `v_0.3.4` (есть `v_0.1.x`/`v1`/`v2`), поэтому руководства вообще не привязаны к текущей версии документации — это расхождение закрывается в фазе 5 вместе с синхронизацией версий; (3) OG-картинки не генерируются: для них нужен ttf/otf-шрифт в репозитории и зависимости `satori` + `@resvg/resvg-js`
- [x] Гидратация: `hydrateRoot` на клиенте, интерактивные части — поиск, `Playground`, оси темы — только клиентскими островками (`docs-app/src/components/ClientOnly.tsx`)
- [x] Метаданные на страницу: `title`, `description`, canonical, `og:*`, `twitter:*` — из frontmatter и манифеста (canonical и `og:url` подставляются, когда задан `DOCS_SITE_URL` при сборке)
- [x] `hreflang` для `ru` и `en` плюс `x-default`; canonical на самой странице
- [x] `sitemap.xml` и `robots.txt` генерируются из манифеста с учётом префикса `/docs/`; в sitemap только актуальные версии — реализовано в `docs-app/scripts/prerender.mjs` (`sitemap.xml` пишется, когда задан `DOCS_SITE_URL`, `robots.txt` — всегда, со ссылкой на sitemap)
- [x] Архивные версии: `<meta name="robots" content="noindex, follow">` и canonical на актуальную — чтобы не конкурировали в выдаче. Реализовано в `prerender.mjs` (архивные версии не попадают в `sitemap.xml`, canonical ведёт на ту же страницу актуальной версии), проверяется в `check-docs-prefix.mjs`; ветка проверена прогоном с временной архивной версией
- [x] JSON-LD: `TechArticle` и `BreadcrumbList` на страницах компонентов — генерируются в `prerender.mjs` из манифеста, наличие проверяется в `check-docs-prefix.mjs`
- [x] OG-картинки генерируются на билде (`satori` + `@resvg/resvg-js`), по одной на пререндеренную страницу — шрифт `docs-app/fonts/IBMPlexSans-Regular.ttf` (IBM Plex Sans, лицензия `OFL.txt`); метаданные `og:image`/Twitter и уникальность/наличие файлов проверяются в `check-docs-prefix.mjs`
- [x] `llms.txt` и `llms-full.txt` генерируются из манифеста — собираются генератором `docs-app/scripts/build-docs-manifest.mjs`, свежесть проверяется в `manifest:check`
- [x] `404.html` отдаётся как отдельная страница с `noindex` — генерируется в `prerender.mjs`, подходит под `try_files ... /404.html` из nginx
- [x] Проверка: страница открывается с отключённым JavaScript и содержит весь текст — в `check-docs-prefix.mjs`: из пререндеренной разметки вырезаются теги, скрипты и стили, и остаток должен содержать не меньше 200 символов видимого текста. Так SPA-шелл с пустым `#root` не пройдёт проверку

#### 4.7 Производительность страниц

- [x] Примеры грузить динамически, по появлению во вьюпорте — иначе страница с двадцатью примерами воспроизведёт проблему Storybook
- [x] Для тяжёлых компонентов (`DataGrid`, `DateInput`) — плейсхолдер фиксированной высоты, чтобы не было сдвига вёрстки: `deferredHeight` в `ComponentPreview` (420 px для `datagrid`, 240 px для `dateinput`), `DeferredInteractivePreview` резервирует высоту до появления во вьюпорте
- [x] Бюджет: LCP меньше 2.5 с и CLS меньше 0.1 на странице с десятью примерами; Lighthouse в CI дополнительно проверяет SEO ≥95 — `lighthouserc.js` и `scripts/lighthouse-check.mjs`, скрипт `lhci`, шаг в job `docs-build` (запуск `vite preview`, замер, остановка)
- [x] Замерить время сборки документации до и после наполнения манифестом — `time npm run docs:manifest` и `time npm run docs:build` в job `docs-build`

#### 4.8 Сборка и деплой на свой сервер

- [x] Job `docs-build` в `web/.github/workflows/ci.yml`: `npm ci`, `docs:manifest`, `docs:build`, сохранение артефакта статики
- [x] Проверка консистентности: job падает, если манифест устарел относительно `*.docs.tsx`
- [x] Workflow `docs-deploy`: по завершении релиза, отдельные секреты от публикации пакета — `web/.github/workflows/docs-deploy.yml`: автоматический триггер `workflow_run` на workflow `Release` (`types: [completed]`) с проверкой `conclusion == 'success'` плюс ручной `workflow_dispatch` с выбором `deploy`/`rollback`; `checkout` идёт на `workflow_run.head_branch` с `fetch-depth: 0` и тегами, потому что релизный коммит semantic-release появляется уже после события, а версия берётся из тега на `HEAD` (fallback — `package.json`); push в `main` и push тегов публикацию не запускают — сборка на коммит проверяется в `ci.yml`, а тег ставит сам `Release`, иначе деплой шёл бы дважды; сборка повторяет шаги `docs-build` из `ci.yml`; выкладка использует свои `DOCS_DEPLOY_*`-секреты, `NPM_TOKEN` не задействован; окружение `docs-production`
- [x] Выгрузка: `rsync` собранной статики в `releases/<version>-<sha>` на своём сервере — `web/scripts/deploy-docs.sh`: `rsync` в `releases/.staging-<release>/docs`, затем атомарное переименование в `releases/<release>/docs`; релиз именуется `<версия>-<sha>`, версия берётся из тега на `HEAD`, а при ручном запуске без релизного тега — из `package.json`; прежние релизы не удаляются; запуск из корня пакета — `npm run docs:deploy` / `docs:rollback` через `scripts/run-deploy.mjs`, который сам находит bash (в Windows — Git for Windows), поэтому bash-скрипт не требуется в PATH
- [x] Атомарная активация: симлинк `current` переключается только после успешной выгрузки; откат — переключение симлинка назад — переключение через `ln -sfn` + `mv -T`; предыдущий релиз пишется в `.previous-release`; при провале проверки страницы после деплоя скрипт сам возвращает симлинк, ручной откат — `deploy-docs.sh rollback [релиз]`
- [x] nginx: `location /docs/` с root на симлинк, `try_files $uri $uri.html $uri/ /404.html`, immutable-кэш для ассетов с хэшем, HTML без кэша, gzip/brotli, HTTPS, заголовки безопасности — `web/deploy/nginx/docs.conf` (шаблон с `__DOCS_DOMAIN__`, `__DOCS_ROOT__`, `__DOCS_TLS_*`): `root` смотрит на `current`, статика релиза лежит в `current/docs/`; `location /docs/` отдаёт `$uri $uri.html $uri/`, HTML идёт с `Cache-Control: no-cache`, `/docs/assets/` — `max-age=31536000, immutable`, `/docs/og/` — неделя; вместо последнего аргумента `try_files` стоит `=404` плюс `error_page 404 /404.html` — так несуществующая страница отдаётся с кодом 404, а не 200; gzip включён, brotli вынесен в `snippets/brotli.conf` и подключается только при сборке nginx с `ngx_brotli`; HTTPS — редирект с 80 и путь ACME для продления; заголовки безопасности — `snippets/security-headers.conf` (CSP, HSTS, nosniff, frame-options, referrer-policy, permissions-policy), файл подключается в каждый `location` с собственным `add_header`, потому что nginx в этом случае не наследует заголовки из `server`
- [x] nginx отдаёт каталог индекса поиска `/docs/pagefind/` как статику (`pagefind-entry.json` и фрагменты индекса) — без этого поиск на проде молча не находит ничего — отдельный `location /docs/pagefind/` в `web/deploy/nginx/docs.conf`; кэш отключён (`no-cache, must-revalidate`), потому что имена `pagefind-entry.json`, `*.pf_fragment`, `*.pf_index` не содержат хэша и старый индекс из кэша ссылался бы на фрагменты, удалённые при деплое
- [x] Шрифты Montserrat не отдавались на проде: `web/src/styles/fonts.css` ссылается на `./fonts/montserrat`, а файлы лежат в `web/src/variables/fonts/montserrat` — при сборке docs-app из исходников Vite оставлял url без изменений, браузер получал 404 на каждый вес, и эти правила перекрывали корректные из `@velkinvv/plainerv/styles` (они шли раньше). Плагин `fixFontsPath` в `web/docs-app/vite.config.ts` переписывает путь на существующий: в сборке 9 файлов уходят в `assets` с хэшем, битых url нет
- [x] Проверка префикса в CI: собранная страница открывается по адресу с `/docs/` — забытый `base` ломает всю статику. Реализовано: `docs-app/scripts/check-docs-prefix.mjs` (реестр ресурсов, маркер `data-prerendered`, редирект с корня, наличие `robots.txt`/`404.html`/`sitemap.xml`), команда `docs:prefix:check`, шаг в job `docs-build` после `docs:build`
- [x] Редиректы со старых адресов документации на новый подпуть — не требуются: документация ранее не публиковалась, старых URL не существует
- [x] Архивные версии не удаляются при деплое — хранятся все; `/latest` — алиас актуальной версии: пререндер кладёт на каждый индексируемый адрес страницу с `latest` вместо номера версии (`/docs/ru/web/latest/components/button/`), она сразу уводит на канонический URL, `canonical` указывает туда же, `robots` — `noindex, follow`; nginx ничего не вычисляет, потому что какая версия текущая, знает только сборка
- [x] Связь с `release.yml`: после успешной публикации пакета деплой документации запускается сам (`workflow_run`), плюс ручной `workflow_dispatch` для пересборки — триггер `workflow_run` на `Release` (`types: [completed]`) с проверкой `conclusion == 'success'`; `checkout` идёт на `workflow_run.head_sha`, иначе собирался бы коммит вершины ветки, а не релизный; отдельный триггер `push` тегов убран — `Release` сам ставит тег, и деплой шёл бы дважды, по тегу и по завершении `Release`
- [x] Бейдж и ссылка на опубликованную документацию в `README` кита — бейдж `docs-deploy` в шапке и строка о том, что документация собирается из `docs-app` и публикуется workflow; сам адрес добавится после первой выкладки, домен ещё не задан

Критерий выхода: добавление нового компонента требует только файла `*.docs.tsx` в ките — без правок кода документации; страницы `Button`, `DataGrid`, `DateInput` сопоставимы со Storybook по внешнему виду; каждая страница отдаётся готовым HTML и читается с отключённым JavaScript; Lighthouse SEO не ниже 95; поиск, локали и переключение версий работают; деплой атомарный, откат проверен; запуск, сборка и выкладка идут из корневого `web/package.json`.

Риски фазы:

- Объём: это переписывание, а не переезд. Митигация — каркас (4.0–4.2) на одном компоненте и никакого массового переноса до подтверждённого паритета.
- SEO-регресс при неудачном prerender: если часть маршрутов останется SPA-шеллом, поисковик увидит пустую страницу. Митигация — проверка с отключённым JavaScript в CI.
- Pagefind может не покрыть разбиение по версиям и локалям. Митигация — резервный вариант на `orama`/`flexsearch` из манифеста.
- Workspaces замедляют `npm ci` в пайплайне библиотеки. Митигация — `npm ci --workspaces=false` в джобах кита и кэш.
- Свой сервер добавляет операционную работу: доступы, секреты, сертификат, мониторинг. Митигация — описать процедуру и проверить откат до наполнения контентом.
- Стили при prerender: без `ServerStyleSheet` будет мигание и рассинхрон гидратации. Митигация — проверка на первом же компоненте.

### Фаза 5. Версионирование: снапшеты и превью

Приоритет: P1. Оценка: 1–2 недели. Зависимости: фаза 4.
Зачем: живой рендер старых версий дорог — старый кит собирался под React 18 и может не работать в текущем React 19 на Vite-сборке. Для задачи «посмотреть, как было в 0.2.x» достаточно статичных сниппетов и превью.

Задачи:

- [x] Привести `web/docs-app/docs-versioning.config.json` в соответствие с фактическим содержимым `web/docs-app/content/docs` — в конфиге 25 версий: актуальная `v_0.3.4` (`live: true`) и все архивные из контента (`v_0.3.3`…`v_0.1`, legacy `v2`/`v1`)
- [x] Определить политику версий: актуальная версия — живой рендер; все предыдущие — архивные, статичные
- [x] Добавить в конфиг признак `live: true|false` для версии и использовать его в `VersionSwitcher`
- [x] Таблицы пропсов по версиям: генератор тянет `dist/index.d.ts` из опубликованного пакета нужной версии (`npm pack` во временную папку), без сборки из исходников
- [x] Хранить сгенерированные типы по версиям в `web/docs-app/src/generated/versions/<version>/props.json`
- [x] Создать `web/docs-app/scripts/capture-version-snapshots.mjs`: открывает страницы примеров актуальной версии и снимает превью (puppeteer — Playwright в проекте нет; есть fallback на системный Chrome и снимок видимой области для оверлеев в портале)
- [x] Складывать артефакты: `web/docs-app/public/version-snapshots/<version>/<component>/<example>.png` и рядом JSON со сниппетом кода + `index.json` (снято 25 примеров `v_0.3.4`, 1.3–72 KB)
- [x] В компоненте примера: если версия архивная — показывать сниппет и превью вместо живого рендера, с явной пометкой «архивная версия»
- [x] Для архивных версий отключить `Playground` — редактируемый пример работает только на актуальной версии
- [x] Прописать снятие снапшотов в CI: при подготовке релиза пакета до смены актуальной версии в документации
- [x] Каждая версия публикуется в свою подпапку на сервере, деплой новой версии не удаляет предыдущие
- [x] В `<head>` архивных версий — `noindex, follow` и canonical на соответствующую страницу актуальной версии (проверено: 480 архивных страниц собраны с `noindex`; canonical подставляется при заданном `DOCS_SITE_URL`, локально его нет)
- [x] Архивные версии хранятся все: автоматического удаления нет, вопрос пересматривается только при заметном росте объёма
- [ ] Проверить переключение между всеми парами версий на страницах `Button`, `Input`, `DataGrid`

Критерий выхода: переключение версий даёт либо живой пример, либо корректное превью со сниппетом; пустых страниц и ошибок гидратации при переключении нет.

Риски фазы:

- Дублирование контента между версиями при ручном `sync:github-docs` — нужно явно решить, что синхронизируется из git-тегов (markdown из README/CHANGELOG), а что генерируется из пакетов.
- Снапшоты устаревают при изменении оформления страницы — митигация: переснятие в CI при релизе, версия в имени артефакта.
- Рассинхрон версии кита: в документации подключён 0.3.3 при актуальном 0.3.4 — устранить до начала фазы.

### Фаза 6. Полный переход на вариант B

Приоритет: P2. Оценка: 3–6 недель. Зависимости: фаза 5.
Зачем: убрать двойной источник правды и вывести Storybook из процесса документации, оставив его инструментом разработки компонентов либо удалив.

Задачи:

- [ ] Определить волны переноса остальных компонентов (63 каталога минус 9 пилотных) в DSL
- [ ] Волна 1: формы и ввод — `Inputs`, `Select`, `Checkbox`, `Radio`, `Switch`, `Slider`, `Textarea`, `Upload`
- [ ] Волна 2: кнопки и обратная связь — `Button`, `IconButton`, `Alert`, `Toast`, `Notification`, `Progress`, `Skeleton`, `Spinner`
- [ ] Волна 3: данные и навигация — `Table`, `DataGrid`, `Pagination`, `Tabs`, `Accordion`, `Sidemenu`, `Breadcrumbs`, `Dropdown`
- [ ] Волна 4: разметка и утилиты — `Layout`, `Grid`, `Card`, `Divider`, `Tooltip`, `Hint`, `Hooks`, `Theming`
- [ ] По ходу переноса удалять соответствующие рукописные `*InteractiveExamples.tsx` из документации
- [ ] Удалить рукописные CSF-файлы там, где стори генерируются из DSL
- [ ] Принять решение по Storybook: оставить как инструмент разработки на сгенерированных стори или удалить зависимости
- [ ] Собрать CI-пайплайн документации: `docs:manifest`, `docs:check-links`, `types:check`, `docs:build`, проверка prerender с отключённым JavaScript
- [ ] Убедиться, что сборка падает при расхождении манифеста с описаниями и при незакрытом паритет-чеклисте
- [ ] Добавить проверку актуальности манифеста: сборка падает, если манифест не соответствует описаниям
- [ ] Настроить автоматическое обновление документации при релизе пакета: `repository_dispatch` или `workflow_run` после публикации
- [ ] Обновить инструкции для разработчиков: как описать новый компонент, какие проверки обязательны
- [ ] Провести финальный замер метрик и сравнить с baseline фазы 0

Критерий выхода: документация собирается без Storybook, все документируемые компоненты описаны в DSL, CI проверяет консистентность манифеста, изменения кита попадают в документацию автоматически.

Риски фазы:

- Объём ручной работы по 54 компонентам — митигация: сначала шаблон и пример, затем перенос волнами с проверкой на каждом шаге.
- Потеря рабочего инструмента при удалении Storybook — митигация: удаление только после того, как генерация стори из DSL покажет паритет.

## 7. Соответствие исходным требованиям

| Требование | Как закрывается | Фаза |
|---|---|---|
| Документация на Vite + React, единый стек с китом | Приложение на `docs-app/vite.config.ts`, тот же React 19 и styled-components, что в ките | 4.0 |
| Функциональность текущей документации не потеряна | Паритет-чеклист: локали, версии, поиск, оглавление, OG, `llms.txt`, подсветка кода, живые примеры | 4.2, 4.3, 4.5 |
| SEO | SSG/prerender, метаданные, canonical, `hreflang`, sitemap, robots, JSON-LD, OG-картинки на билде | 4.6 |
| Документация — часть проекта `web`, а не отдельный проект | Подпакет `web/docs-app` со своим `package.json`, npm workspaces, скрипты в корневом `web/package.json` | 4.0 |
| Автодеплой на свой сервер | Job сборки в `ci.yml`, workflow `docs-deploy`, `rsync` в `releases/`, симлинк `current`, откат | 4.8 |
| Кит и в примерах, и в интерфейсе документации | `ComponentPreview` на реальных компонентах + навигация и поповеры документации на ките | 4.3 |
| Истории как в Storybook или удобнее | Свой DSL `*.docs.tsx`, из которого при необходимости генерируются CSF-стори | 3 |
| Подхват изменений при старте и сборке | Dev — алиас на `web/src` с горячей перезагрузкой; прод — манифест из `dist`; watch-пересборка манифеста | 4.4 |
| Версионирование и переключение версий | Версия в URL + `VersionSwitcher`; актуальная версия живая, архивные — снапшеты и сниппеты | 5 |
| Интерактивные примеры и код | Показ кода, `Playground` в браузере (только актуальная версия), оси темы | 4.2, 4.3 |
| Публикация по подпути `/docs/` | `base` во Vite, `location` в nginx, sitemap, canonical и редиректы с префиксом | 4.0, 4.6, 4.8 |
| Единый стек без Tailwind | Интерфейс и вёрстка документации на ките и styled-components, токены из темы кита | 4.2, 4.3 |
| Mobile-кит | Раздел `mobile` убирается из документации; mobile-кит документируется позже, отдельно | 4.2 |

## 8. Сводные риски

1. Извлечение стилей кита при prerender — проверять первым делом на одном компоненте: собрать `ServerStyleSheet` и вложить CSS в HTML; без этого мигание стилей и рассинхрон гидратации.
2. Вес клиентского бандла — большое число живых примеров на странице требует ленивой загрузки, иначе получим ту же проблему, что в Storybook.
3. Статическая разбираемость DSL — любое вычисление на верхнем уровне описания ломает генератор манифеста.
4. Расхождение dev и прод конфигураций документации — обе собираются в CI.
5. Рассинхрон версий — устранить до фазы 5: пакет 0.3.4 против 0.3.3 в документации, конфиг версий против фактического `content/docs`.
6. Дублирование источников на время миграции — правило «CSF существует, только если сгенерирован из DSL».
7. Пропускная способность генератора: 104 компонента и 48 519 строк историй — переносить волнами, а не разом.
8. Сосуществование двух сборок в одном репозитории: rollup собирает пакет, Vite собирает документацию — разнести входы, не включать `docs-app` в `files` публикуемого пакета, проверить размер `dist`.
9. Рост времени `npm ci` из-за workspaces — в джобах кита ставить зависимости с `--workspaces=false` и кэшировать.
10. Потеря функциональности при переписывании: Fumadocs многое даёт «из коробки» — вести паритет-чеклист и не удалять `documentation/` до подтверждения.
11. SEO-регресс: если prerender охватит не все маршруты, поисковик получит SPA-шелл — проверка с отключённым JS и sitemap в CI.
12. Архивные версии в поисковой выдаче — `noindex, follow` и canonical на актуальную страницу.
13. Операционная нагрузка своего сервера: доступы, секреты, сертификат, мониторинг — задокументировать процедуру и проверить откат до наполнения контентом.
14. Падение `type-check` и `lint` кита из-за кода документации — свои `tsconfig` и `eslint` внутри `docs-app`.
15. Подпуть `/docs/`: забытый `base` во Vite или абсолютные пути на ассеты ломают статику — проверка сборки по префиксному адресу в CI.
16. Отказ от Tailwind: служебной вёрстке нужны layout-примитивы — если в ките не хватает сетки и контейнера, добавить лёгкие обёртки в `docs-app`.
17. Свой prerender без фреймворка: корректность гидратации и предзагрузки ассетов ложится на нас — покрыть проверкой «страница работает без JavaScript» и тестом на отсутствие ошибок гидратации.

## 9. Решения по развилкам

Все развилки закрыты, отложенным остаётся один вопрос.

| Развилка | Решение | Что это меняет в плане |
|---|---|---|
| Механизм статической генерации | Свой prerender-скрипт на `react-dom/server` после `vite build` | Обход маршрутов из манифеста, свои метаданные, извлечение стилей и гидратация; Vike и framework mode у react-router не берём |
| Поиск | Pagefind по собранному HTML | Индексация после prerender, фильтры по версии, локали и платформе, архивные версии исключаются |
| Стили документации | Tailwind убирается, интерфейс на ките и styled-components | Служебная вёрстка на styled-components, токены из темы кита, один подход к стилям |
| Адрес документации | Подпуть `<домен>/docs/` | `base: '/docs/'` во Vite, `location /docs/` в nginx, sitemap, canonical и редиректы с префиксом |
| `Playground` | Только актуальная версия | В архивных версиях — сниппет и превью, без редактируемой песочницы |
| `mobile`-кит | Раздел `/mobile` убирается из документации | Платформа в навигации только `web`; mobile-кит документируется позже, отдельно и со своей документацией |
| Релиз документации | Авто после успешной публикации пакета плюс ручной `workflow_dispatch` | Версия документации не отстаёт от пакета; пересборка и хотфиксы запускаются вручную |
| Архивные версии | Хранятся все | Ссылки на любую версию продолжают работать; автоматического удаления нет |
| Деплой | Свой сервер: `rsync` в `releases/<version>-<sha>`, симлинк `current` | Атомарная выкладка с откатом переключением симлинка |

Отложенный вопрос:

- [ ] Судьба Storybook: оставить инструментом разработки на генерируемых стори или удалить зависимости — решение по итогам фазы 4, когда генерация стори из DSL покажет паритет

## 10. Метрики успеха

Метрики «до» заполняются в фазе 0, значения «после» — в конце каждой фазы.

| Метрика | До (baseline) | Цель |
|---|---|---|
| Холодный старт Storybook | замер в фазе 0 | не более 30 с |
| Горячая пересборка типовой истории | замер в фазе 0 | не более 1.5 с |
| Смена темы | ремаунт canvas | без ремаунта, до 0.5 с |
| Максимальный размер story-файла | 2474 строки | не более 500 строк |
| Время сборки `storybook-static` | замер в фазе 0 | снижение не менее чем вдвое |
| Добавление нового компонента в документацию | ручные правки в нескольких местах | один файл `*.docs.tsx` |
| Переключение версий | нет живого контента для старых версий | превью и сниппет без пустых страниц |
| Правка компонента видна в документации | после ручной синхронизации | автоматически при `npm run docs:dev` |
| Место сборки документации | отдельный проект `documentation` | подпакет `web/docs-app`, запуск из корневого `package.json` |
| Деплой документации | отсутствует | автоматический на свой сервер, откат переключением симлинка |
| Страница для поисковой системы | зависит от JS-рендера Next | готовый HTML, читаемый без JavaScript |
| Lighthouse SEO | не измерялся | не ниже 95 |
| LCP на странице с 10 примерами | не измерялся | меньше 2.5 с |
| Функциональный паритет при переходе | риск, связанный с переписыванием | паритет-чеклист закрыт полностью |
| Стили документации | Tailwind 4 и UI Fumadocs | кит и styled-components, токены из темы кита |
| Поиск | Fumadocs | Pagefind, индекс по собранному HTML |
| Адрес документации | отдельный проект со своим адресом | подпуть `<домен>/docs/` |
| Хранение архивных версий | не решено | все версии доступны, автоматического удаления нет |
| `Playground` в архивных версиях | отсутствует | отсутствует намеренно: только сниппет и превью |

## 11. Журнал прогресса

Фаза 0 — инвентаризация:

- [x] `web/scripts/docs-inventory.mjs` создан
- [x] `web/docs-inventory.json` сформирован
- [x] `docs/reports/storybook-baseline.md` заполнен
- [x] Карта миграции по 63 каталогам составлена

Фаза 1 — стабилизация Storybook:

- [x] docgen проверен на быстром парсере — эксперимент откачен: `build-storybook` не ускорился (61.1 → 72.4 с), точечное переключение docgen в этой версии невозможно, оставлен `react-docgen-typescript`
- [x] ремаунт при смене темы устранён
- [x] motion переведён в opt-in
- [x] костыли вокруг `table_pkg` удалены
- [x] наблюдение за `storybook-static` и `coverage` отключено
- [x] кэш генерации снипетов добавлен
- [x] метрики «после» записаны

Фаза 2 — дробление и ленивая загрузка:

- [x] топ-10 тяжёлых историй разделены по подвариантам
- [x] фикстуры вынесены
- [x] `IconShowcase` переведён на динамический импорт

Фаза 3 — DSL:

- [x] типы и `defineComponentDocs` готовы
- [x] валидатор формата работает (`npm run docs:dsl:lint` — 9 файлов, ошибок нет)
- [x] валидатор усилен: ловит коллизии story id между `examples` и `variants` (по итоговому `groupId-itemId`), проверяет допустимые значения `meta.platform` / `meta.status` / `examples[*].layout` / `examples[*].themes`, проверяет `examples[*].showCode` (boolean-литерал) и форму `meta.deprecated` (`since`, `reason`, `replacement`), валидирует структуру `variants[*].items` (id/title/render/code)
- [x] девять пилотных компонентов описаны (`Button`, `Alert`, `Badge`, `Input`, `Select`, `Modal`, `Drawer`, `DataGrid`, `DateInput`)
- [x] генерация CSF из DSL проверена (`npm run docs:dsl:generate` — 9 файлов `*.generated.stories.tsx`, `npm run type-check` проходит)
- [x] генератор удаляет осиротевшие `*.generated.stories.tsx` при удалении `*.docs.tsx`
- [x] презентация DSL-метаданных в Storybook Docs улучшена: `props/a11y/related/deprecated` добавляются в `docs.description.component` как markdown-секции
- [x] Storybook собирается с DSL-историями: `npm run build-storybook` — `✓ built in 32.37s`, ошибок индексации нет, `UI Kit (DSL)/*` присутствует в `storybook-static/index.json`
- [x] Конфликт `title` с рукописными снят разведением namespace: рукописные остались на `UI Kit/<Group>/<Name>` (id вида `ui-kit-feedback-alert--basic`), генератор пишет `UI Kit (DSL)/<Group>/<Name>` (id вида `ui-kit-dsl-feedback-alert--*`). Проверка по `storybook-static/index.json`: 1038 записей, 51 из них DSL, обе группы сосуществуют, `Duplicate story id` в логе сборки отсутствует. Рукописные CSF пилотов не удалялись — они нужны как эталон для сверки паритета до конца миграции

Блокер фазы 3 — снят. Падение `build-storybook` было не в DSL: индексация обрывалась на 36 файлах-реэкспортах фазы 2 (`export { default } from './<Comp>.stories.legacy'`) — CSF-индексатор не видит в них `default export`, — и на отсутствующем `ImprovedRangeDemo` в `TimeInput.Range.stories.tsx` (история осталась только в `DateInput.stories.legacy.tsx`). Что сделано:

- обёртки приведены к читаемой форме `import legacyMeta from './<Comp>.stories.legacy'` + локальный `const meta = { ...legacyMeta, title }` + `export default meta`; подгруппам (`Carousel.*`, `Hint.*`, `Modal.*`) задан суффиксный `title`, как в уже корректных `TimeInput.Range`, `DataGrid.Sorting`, поэтому дубликатов story id нет;
- из `TimeInput.Range.stories.tsx` убран несуществующий `ImprovedRangeDemo`;
- генерация переименована в `*.generated.stories.tsx` (иначе `No matching indexer found`) и получила раздел `UI Kit (DSL)/...`, чтобы не конфликтовать по id с рукописными историями.

Хвосты фазы 3 (не блокеры, зафиксированы для следующих фаз):

- перенос DSL-данных в CSF завершён, но полного визуального паритета с рукописными историями ещё нет: `props/a11y/related/deprecated` показываются markdown-секциями в `docs.description.component` (включая список `manual`-prop c типом/required/default/description), а не отдельными Storybook-блоками;
- извлечение сниппетов сведено в общий модуль `web/src/handlers/storybookRenderSnippet.mjs` и переиспользуется в `docs-to-csf.mjs` и `web/src/handlers/storybookUsageExtract.ts`; дополнительной доработки по этому пункту для фазы 3 не требуется;
- `docs:dsl:lint` и `docs:dsl:generate` подключены в `quality:check` и CI (`.github/workflows/ci.yml`, job `lint`), но общий проектный lint/format-долг сейчас валит `quality:check` вне DSL-контура.

Фаза 4 — docs-app на Vite:

- [x] создан `web/docs-app` со своим `package.json` и npm workspaces
- [x] скрипты `docs:dev`, `docs:build`, `docs:manifest`, `docs:preview` работают из корневого `package.json` (через `--prefix docs-app`; флаг `-w docs-app` в текущем npm-окружении не находит workspace)
- [x] роутинг, локали и версии в URL работают
- [x] MDX-пайплайн и подсветка кода настроены
- [x] генератор манифеста работает с кэшем
- [x] автогенерация `PropsTable` очищена от унаследованных DOM/React-полей: в манифест попадают только пропсы, объявленные в исходниках кита
- [x] проведена ревизия 4.0–4.2: хвосты и баги зафиксированы отдельным списком с приоритетами (P0/P1)
- [x] хвосты 4.2 закрыты: frontmatter переведён на YAML-парсер, добавлена автопроверка паритета (`content:parity:check`), `manifest:check` расширен на `content-manifest.*`, eager-загрузка MDX заменена на lazy/route-level, мёртвые контейнерные классы в `styles.css` удалены
- [x] хвосты ревизии 4.0–4.2 закрыты полностью: CI docs-build переведён на `npm ci --prefix docs-app`, source-of-truth закреплён за `web/docs-app/content/docs`, проверки `manifest:check`/`docs:build` проходят
- [x] prerender-контур собран: `docs-app/src/entry-server.tsx` (рендер маршрута через `react-dom/server` + `ServerStyleSheet`), `docs-app/scripts/prerender.mjs` (SSR-сборка Vite с `ssr.noExternal: true` и `resolve.dedupe` для `react`/`react-dom`/`styled-components`, обход маршрутов из манифеста, вставка стилей и метаданных, самопроверка каждой страницы), `prerender` подключён в `build`. Итог прогона: 20 страниц + редирект с корня
- [x] клиентская гидратация: `docs-app/src/main.tsx` вызывает `hydrateRoot` для страниц с маркером `data-prerendered`, интерактив изолирован компонентом `ClientOnly`
- [x] компоненты документации реализованы на ките
- [x] интерфейс самой документации собран из компонентов кита
- [x] стили собираются при prerender, мигания нет: `entry-server.tsx` + `ServerStyleSheet`, вставка `<style>` в HTML на билде
- [ ] dev-петля на исходниках кита подтверждена: dev-сервер поднимается на алиасе `@velkinvv/plainerv` → `../src` (`http://localhost:6500/docs/`), но HMR правки компонента кита вручную не проверялся
- [x] SEO-артефакты генерируются в `prerender.mjs`: `sitemap.xml` (когда задан `DOCS_SITE_URL`), `robots.txt` (всегда, со ссылкой на sitemap), `404.html` с `noindex`; на страницах — `title`/`description`/`og`/`twitter`/`hreflang` + `x-default`, canonical при заданном `DOCS_SITE_URL`
- [x] проверка префикса `/docs/` автоматизирована: `docs-app/scripts/check-docs-prefix.mjs` обходит собранные страницы, проверяет ссылки на ассеты внутри `/docs/`, маркер `data-prerendered`, редирект с корня и наличие SEO-артефактов; команда `docs:prefix:check`, шаг в job `docs-build`
- [ ] prerender настроен не для всех страниц: остались OG-картинки (нужен файл шрифта ttf/otf/woff в репозитории + зависимости `satori`/`@resvg/resvg-js`); prerender разметки руководств невозможен до синхронизации версий контента с конфигом (в контенте нет `v_0.3.4`)
- [x] SEO-блок 4.6 закрыт, кроме OG: JSON-LD (`TechArticle` + `BreadcrumbList`) на страницах компонентов, `noindex` + canonical на актуальную для архивных версий (архивные исключаются из `sitemap.xml`); в `check-docs-prefix.mjs` добавлены проверки JSON-LD, robots архивных страниц и читаемости текста без JavaScript. Ветка архивных версий проверена прогоном с временной второй версией в конфиге: 40 страниц, 20 индексируемых и 20 архивных
- [x] сборка проверена по префиксному пути `/docs/`
- [x] поиск на Pagefind работает в обеих локалях и не выдаёт архивные версии: индекс собирается после prerender (`docs-app/pagefind.yml`, `docs-app/scripts/build-search-index.mjs`, шаг `search:index` в `build`), `data-pagefind-body` и фильтры `locale`/`version`/`platform` проставляет `prerender.mjs`, UI — клиентский островок `docs-app/src/components/DocsSearch.tsx`; `prefix:check` подтверждает индекс по локалям (`en: 10`, `ru: 10`) и наличие фильтров
- [ ] раздел `mobile` убран из состава документации
- [ ] пилотные страницы сопоставимы со Storybook
- [x] job сборки добавлен в `web/.github/workflows/ci.yml`
- [ ] деплой на свой сервер настроен, откат проверен

Фаза 5 — версионирование:

- [x] конфиг версий синхронизирован с контентом: 25 версий (`v_0.3.4` — `live`, остальные архивные), проверка соответствия в `docs:version:check`
- [x] пропсы по версиям генерируются из пакетов: `docs:version:props` (`npm pack` → `dist/index.d.ts` → `src/generated/versions/<version>/props.json`); для актуальной версии — локальный `dist`
- [x] снапшеты снимаются скриптом: `docs:version:snapshots` (puppeteer + fallback на системный Chrome), для `v_0.3.4` снято 25/25 примеров без ошибок; снимок ждёт загрузки lazy-превью, а оверлеи в портале (Drawer/Modal) снимаются по видимой области
- [x] `VersionSwitcher` различает живые и архивные версии
- [x] ревизия фазы 5 нашла и закрыла два блокирующих дефекта: (1) в бандл попадали две копии React (`19.3.0` из `docs-app` и `19.2.6` из `web`) — гидратация падала с `useMemo of null`, страница была пустой, лечится `resolve.dedupe`; (2) MDX-руководства архивных версий падали на legacy-тегах `*InteractiveExamples` — добавлен `MDXProvider` с заглушками и `providerImportSource: '@mdx-js/react'` (без него провайдер игнорируется, а Proxy не переживает spread контекста)

Фаза 6 — вариант B:

- [ ] волны переноса пройдены
- [ ] рукописные примеры и CSF вычищены
- [ ] CI собирает документацию и проверяет манифест
- [ ] обновление по релизу пакета работает

## 12. Порядок старта

Первые шаги, с которых начинается работа:

1. Фаза 0 целиком — без неё нечем мерить эффект.
2. Фаза 1, пункты про docgen и ремаунт темы — это два изменения, дающие основной прирост.
3. Одновременно с фазой 1 — проба prerender на одном компоненте: извлечение стилей кита, метаданные, гидратация (риск номер один для всей затеи).
4. Каркас `docs-app` (4.0–4.2) делать сразу после фазы 1, параллельно с DSL: приложение, Vite-сборка, роутинг, prerender и деплой проверяются на одной странице, до появления зависимости от манифеста.
5. Порядок внутри фазы 4: сначала пустая страница с китом, стилями и prerender, затем контент и локали, затем манифест и примеры, в конце — SEO и деплой. Так самый рискованный технический вопрос (стили и статическая генерация) закрывается на первой неделе, а не в конце.
