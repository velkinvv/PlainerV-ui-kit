# @velkinvv/plainerv

![npm version](https://img.shields.io/npm/v/@velkinvv/plainerv)
![license](https://img.shields.io/npm/l/@velkinvv/plainerv)
![npm downloads](https://img.shields.io/npm/dm/@velkinvv/plainerv)

Современная библиотека UI компонентов с поддержкой темизации и TypeScript.

**Текущая версия:** `0.2.3` · ветка [`v_0.2.3`](https://github.com/velkinvv/PlainerV-ui-kit/tree/v_0.2.3) · React 18+/19 · styled-components 6.x

## 🚀 Возможности

- **🎨 Полная темизация** - Поддержка светлой и темной темы с автоматическим переключением
- **🎯 TypeScript** - Полная типизация всех компонентов и пропсов
- **📱 Адаптивный дизайн** - Компоненты адаптированы под все устройства
- **⚡ Производительность** - Оптимизированные компоненты с минимальным бандлом
- **🎭 Анимации** - Плавные анимации с Framer Motion
- **🔧 Кастомизация** - Гибкая настройка через пропсы и темы
- **📚 Storybook** - Интерактивная документация и playground
- **⚡ Vite** - Плагин `plainervVite()` из `@velkinvv/plainerv/vite` (dedupe, без prebundle кита)

## 📦 Установка

Пакет объявляет **peer dependencies** — одна копия React, styled-components и Framer Motion в приложении (без дублей runtime).

```bash
npm i @velkinvv/plainerv react react-dom styled-components framer-motion
# или конкретная версия кита:
npm i @velkinvv/plainerv@0.2.3 react react-dom styled-components framer-motion
```

| Пакет | Диапазон (peer) |
| --- | --- |
| `react`, `react-dom` | `^18.0.0 \|\| ^19.0.0` |
| `styled-components` | `^6.1.0` |
| `framer-motion` | `^11.0.0` |
| `vite` (опционально, для `plainervVite`) | `^5.0.0 \|\| ^6.0.0 \|\| ^7.0.0` |

`clsx` и `dayjs` ставятся автоматически как зависимости кита — отдельно подключать не нужно.

## ⚡ Vite

### Две копии `styled-components` (типичная ошибка `o2 is not a function`)

Если Vite **пребандлит** `@velkinvv/plainerv` в `optimizeDeps`, в рантайме одновременно живут:

- ESM из `dist/index.esm.js` кита (импорты `styled-components` снаружи);
- отдельный prebundle-чанк `styled-components` у dev-сервера.

`shouldForwardProp` в минифицированном бандле (например `Le` в `dist`) вызывается с `defaultValidatorFn` из **другой** инстанции → `o2 is not a function`.

Перенос `shouldForwardProp` / хелпера `createStyledShouldForwardProp` «куда‑то ещё» **проблему не снимает**: ломается связка «код из dist + отдельный чанк styled-components», а не сам фильтр пропов.

**Исправление у потребителя:** не пребандлить кит (`optimizeDeps.exclude`) и/или `resolve.dedupe` для `react`, `react-dom`, `styled-components` — см. плагин ниже.

> **Не путать:** проп `items` у **Tabs** (API 0.1.5) — отдельная история миграции, к этой ошибке styled-components не относится.

**Рекомендуется** — плагин из подпути `@velkinvv/plainerv/vite`:

```ts
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { plainervVite } from '@velkinvv/plainerv/vite';

export default defineConfig({
  plugins: [react(), plainervVite()],
});
```

Плагин выставляет `resolve.dedupe` для `react`, `react-dom`, `styled-components`, `framer-motion`, `optimizeDeps.include` для styled-components и framer-motion, `optimizeDeps.exclude: ['@velkinvv/plainerv']`.

Используйте **`vite.config.ts`** (ESM). Подпуть `@velkinvv/plainerv/vite` не предназначен для `require()` в `vite.config.cjs`.

<details>
<summary>Ручная настройка (без плагина)</summary>

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    dedupe: ['react', 'react-dom', 'styled-components', 'framer-motion'],
  },
  optimizeDeps: {
    include: ['styled-components', 'framer-motion'],
    exclude: ['@velkinvv/plainerv'],
  },
});
```

</details>

## 📦 Webpack / CRA

У Vite-специфичного prebundle нет, но **две копии** `react` или `styled-components` в monorepo дают те же симптомы (`Invalid hook call`, ошибки styled-components).

```js
// webpack.config.js (фрагмент)
module.exports = {
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      'styled-components': path.resolve('./node_modules/styled-components'),
      'framer-motion': path.resolve('./node_modules/framer-motion'),
    },
  },
};
```

В `package.json` приложения зафиксируйте одну версию peer-зависимостей; при pnpm включите `shamefully-hoist` или `public-hoist-pattern` для `react` и `styled-components`, если кит резолвится в дубликат.

## ▲ Next.js (App Router)

- ESM-сборка кита помечена директивой **`use client`** — импортируйте компоненты из client-файлов (`'use client'` в layout/page-обёртке при необходимости).
- В **`next.config`**: `transpilePackages: ['@velkinvv/plainerv']`.
- Для SSR со **styled-components** используйте [официальный registry](https://nextjs.org/docs/app/building-your-application/styling/css-in-js) (один `ThemeProvider` + registry на сервере и клиенте).
- Стили и провайдеры — как в разделе ниже (`ThemeProvider`, `ToastProvider`).

## 📦 Импорт стилей и шрифтов

Для правильной работы библиотеки необходимо импортировать стили **только через экспорт пакета** (не лезьте в произвольные пути внутри `node_modules`):

```tsx
import '@velkinvv/plainerv/styles';
```

Алиас (тот же файл): `import '@velkinvv/plainerv/dist/styles.css'`.

Шрифты подключаются из CSS (`url(fonts/montserrat/...)`); Vite/Webpack обычно копируют `.ttf` автоматически.

## 🎨 Темизация

Поддерживаются встроенные темы **light** / **dark**, **любое число** кастомных тем и type-safe переключение.

- **ThemeMode** — id темы (`ThemeMode.light`, `appThemes.themeMode.ocean`);
- **ThemeColorScheme** — палитра токенов (`LIGHT` / `DARK`), поле `theme.mode` в styled-components.

Подробнее: [документация Theming](https://github.com/velkinvv/PlainerV-ui-kit/blob/v_0.2.3/documentation/content/docs/ru/web/v_0.2.3/theming.mdx) (на сайте: **Web → v0.2.3 → Theming**).

### Базовое подключение

```tsx
import { ThemeProvider, ThemeToggle, ThemeMode, useTheme } from '@velkinvv/plainerv';

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <YourApp />
    </ThemeProvider>
  );
}
```

```tsx
function ThemeStatus() {
  const { themeMode, colorScheme, setThemeMode } = useTheme();

  return (
    <p>
      Тема: {themeMode}, палитра: {colorScheme}
      <button type="button" onClick={() => setThemeMode(ThemeMode.dark)}>
        Тёмная
      </button>
    </p>
  );
}
```

### Каталог из нескольких тем

```tsx
import {
  ThemeProvider,
  ThemeSelector,
  defineThemeCatalog,
  ThemeColorScheme,
} from '@velkinvv/plainerv';

const appThemes = defineThemeCatalog([
  { id: 'light', baseMode: ThemeColorScheme.LIGHT },
  { id: 'ocean', baseMode: ThemeColorScheme.LIGHT, override: { colors: { primary: '#0284C7' } } },
  { id: 'dark', baseMode: ThemeColorScheme.DARK },
] as const);

type AppThemeMode = (typeof appThemes.themeModes)[number];

<ThemeProvider<AppThemeMode> themes={appThemes.catalog}>
  <ThemeSelector />
  <App />
</ThemeProvider>;

// setThemeMode(appThemes.themeMode.ocean) — только существующие id
```

### Слияние токенов

```tsx
import { mergeTheme, lightTheme, useMergeTheme } from '@velkinvv/plainerv';

const brandLight = mergeTheme(lightTheme, { colors: { primary: '#0D9488' } });
```

Переопределения только для light/dark без каталога: проп `themeOverrides` у `ThemeProvider`.

## 🎯 Компоненты

**Полный перечень публичных экспортов** — в [документации](https://github.com/velkinvv/PlainerV-ui-kit/blob/v_0.2.3/documentation/content/docs/ru/web/v_0.2.3/components-catalog.mdx) (на сайте: **Web → v0.2.3 → Справочник компонентов**). Ниже — краткая группировка.

### Кнопки и ссылки

- **Button** — варианты, `Size`, иконки, `href` как ссылка.
- **ButtonGroup** — группа `Button` / `IconButton` (`orientation`, `attached`, переключатель сегмента).
- **IconButton** — только иконка.
- **Link** — `mode="text"` или `mode="button"` с `href`.

### Ввод и формы

- **Input**, **TextArea**, **FileInput**, **Select**, **MultiInput**, **SliderInput** — поля (`Form`-совместимые). **SliderInput**: число + встроенный слайдер в рамке **Input**; проп **`range`** — диапазон «от / до» (пара чисел, два поля и два бегунка, как у **DateInput**). Типы **`SliderInputSingleProps`**, **`SliderInputRangeProps`**. Подробнее — [документация SliderInput](https://github.com/velkinvv/PlainerV-ui-kit/blob/v_0.2.3/documentation/content/docs/ru/web/v_0.2.3/components-slider-input.mdx), Storybook **UI Kit → Inputs → SliderInput**.
- **Form**, **HiddenUsernameField**.
- **Checkbox**, **CheckboxGroup**, **Switch**, **RadioButton**, **RadioButtonGroup**.
- **DateInput**, **TimeInput**.

### Поверхности, сетка, выпадающие панели

- **Card**, **Modal**, **Drawer**, **Sheet**.
- **Grid**, **GridItem** (`GridMode`, breakpoints).
- **Dropdown**, **Popover**.

### Навигация и структура

- **Sidemenu**, **NavigationMenu**, **NavigationMenuItem** (+ контекст/хелперы).
- **Menu**, **MenuItem**.
- **FloatingMenu** (+ `FloatingMenuGroup`, `GroupItem`, `Divider`, `DragHandle`).
- **Tabs** (**Tabs.Item**, **TabItem**, внутренний трек сегментов; варианты **pill** / **minimal** / **line** / **underline**, проп **filledSegmentTriggers** для заливки текстовых сегментов), **Breadcrumb**, **Stepper**, **Pagination**, **Accordion**.

### Отображение данных

- **Badge**, **Tag**, **Pill**, **Avatar**, **AvatarGroup**, **Divider**, **Slider**, **RangeSlider**, **Calendar**, **DateRollerPicker**, **Progress**, **Spinner**, **Skeleton**, **Icon**, **ThemeToggle**, **ThemeSelector**.

### Таблицы и DataGrid

- **TableContainer**, **TableContainerScroll**, **Table**, **TableHead**, **TableBody**, **TableFooter**, **TableRow**, **TableCell**, **TableCellFormatted** (форматирование ячейки без DataGrid), **TablePagination**, **TableSortLabel**, **TableSortChevronIcon** и утилиты (`getTableTotalPages`, `clampTablePageZeroBased`, …).
- **Скролл:** **`scrollAreaMaxHeight`** на **`TableContainerScroll`** (или у **DataGrid**) вместе с липкой шапкой — **split-layout**: шапка и панель **`headerToolbar`** фиксированы, вертикальный и горизонтальный скролл только у строк; шапка синхронизируется по горизонтали. **`horizontalScroll`** (по умолчанию `true`) — горизонтальная полоса при широкой сетке; `false` — колонки по ширине карточки. Скругления — **`theme.tables.borderRadius`** (`--plainer-table-border-radius`).
- **DataGrid** — расширенная таблица; по умолчанию **`stickyHeader={true}`**; у колонок — **`format`** (`TableCellFormat`) или **`render`**; встроенные кнопки в **`headerToolbar`** (обновление, сброс фильтров, **выгрузка в Excel**); хелперы **`formatTableCellValue`**, **`formatTableCellExportCellValue`**, константы масок.
- **ColumnFilterPanel** — панель фильтра колонки.

```tsx
import { DataGrid, type DataGridColumn } from '@velkinvv/plainerv';

const columns: DataGridColumn<Row>[] = [
  { field: 'phone', headerName: 'Телефон', format: { type: 'phone', country: 'RU' } },
  {
    field: 'id',
    headerName: 'Открыть',
    valueGetter: (row) => row.title,
    format: { type: 'link', href: '/items/{id}' },
  },
  {
    field: 'status',
    headerName: 'Статус',
    width: 140,
    format: {
      type: 'enum',
      options: [
        {
          value: 'active',
          label: 'Активен',
          exportStyle: { textColor: '#1B5E20', backgroundColor: '#E8F5E9' },
        },
        {
          value: 'error',
          label: 'Ошибка',
          exportStyle: { textColor: '#B71C1C', backgroundColor: '#FFEBEE' },
        },
      ],
    },
  },
];

<DataGrid
  tableId="orders"
  columns={columns}
  rows={pageRows}
  totalRows={totalCount}
  paginationModel={paginationModel}
  onPaginationChange={setPaginationModel}
  paginationMode="server"
  excelExport={{
    dataFetcher: async (skip, take, signal) => {
      const response = await fetchOrders({ skip, take, signal });
      return response.items;
    },
    fileName: 'Заказы.xls',
    ignoreFields: ['actions'],
  }}
/>;
```

**Выгрузка в Excel (`.xls`):** без внешних библиотек (SpreadsheetML). Проп **`excelExport`** с **`dataFetcher(skip, take)`** — кнопка в панели над шапкой, модалка выбора диапазона страниц. Ширины колонок — из **`columns[].width`**. Текст и цвета — из **`format`** (в т.ч. **`exportStyle`** у `enum`), **`exportValueGetter`**, **`exportCellStyle`**, или автоматически из **Tag** / **Pill** в `render`. Сторис **DataGrid › ExcelExport**.

### Обратная связь

- **Tooltip**, **Hint**.
- **Toast** + **ToastProvider** + **useToast**.
- **Snackbar** + **SnackbarProvider** + **useSnackbar**.

```tsx
import { ThemeProvider, Pagination } from '@velkinvv/plainerv';

<ThemeProvider>
  <Pagination
    totalPages={24}
    page={currentPage}
    onPageChange={setCurrentPage}
    siblingCount={1}
    showPrevNext
    ariaLabel="Страницы списка"
  />
</ThemeProvider>
```

#### Toast и Snackbar в приложении

Оба стека рендерятся в `document.body`. Нужны **`ThemeProvider`** и провайдеры уведомлений.

```tsx
import { ThemeProvider, ToastProvider, SnackbarProvider } from '@velkinvv/plainerv';

function Root() {
  return (
    <ThemeProvider>
      <ToastProvider placement="top-right">
        <SnackbarProvider placement="bottom-center">
          <App />
        </SnackbarProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
```

### Хуки и обработчики

Также экспортируются **хуки** (`useModal`, `useLocalStorage`, `useDebounce`, `useClickOutside`, `useKeyPress`, `useMediaQuery`, `useScrollPosition`, `useWindowSize`, `useIsDesktop`, `useNavigationMenuExpand`, `useUiMotionPresets`, …) и **handlers** из `src/handlers/index.ts`:

- дата/время, ссылки, таблица, dropdown, motion, форматирование ячеек (`tableCellFormat`, `formatTableCellValue`, `formatTableCellExportCellValue`);
- выгрузка DataGrid в Excel (`buildDataGridExcelExportSpreadsheet`, `resolveDataGridExportCellValue`, `downloadDataGridExcelSpreadsheetFile`, …);
- **`createStyledShouldForwardProp`** — фильтр `shouldForwardProp` для transient-пропов `$…` и кастомных полей (не замена `dedupe` / `optimizeDeps.exclude` при Vite);
- **`omitMotionConflictingDomHandlers`** — убирает HTML drag-обработчики перед `motion.button` / `motion.a` (совместимость с Framer Motion).

**Storybook:** `Hooks/*`, `Components/Buttons/*`, `Components/Inputs/*`, `Components/Navigation/*`, `Components/Data Display/Table`, `Components/Data Display/DataGrid`, `Components/Surfaces/*`, `Components/Feedback/*`, и др.

## 🎨 Иконки

Библиотека поддерживает несколько наборов иконок:

### Lucide React иконки

```tsx
import { Icon } from '@velkinvv/plainerv';

<Icon name="Home" size={24} variant="lucide" />
<Icon name="Settings" size={24} variant="lucide" />
```

### Plainer иконки

```tsx
import { Icon } from '@velkinvv/plainerv';

<Icon name="IconPlus" size={24} variant="plainer" />
<Icon name="IconClose" size={24} variant="plainer" />
<Icon name="IconSearch" size={24} variant="plainer" />
```

## 🎭 Анимации

Все компоненты используют Framer Motion для плавных анимаций:

```tsx
import { Button } from '@velkinvv/plainerv';

<Button
  variant="primary"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Анимированная кнопка
</Button>
```

## 📚 Storybook

Запустите Storybook для интерактивной документации:

```bash
cd web
npm run storybook
```

## 🎨 Дизайн система

### Цвета

- **Primary**: #68d5f8 (основной цвет)
- **Secondary**: #6c757d (вторичный цвет)
- **Success**: #10b981 (успех)
- **Danger**: #ef4444 (ошибка)
- **Warning**: #f59e0b (предупреждение)
- **Info**: #3b82f6 (информация)

### Типографика

- **Шрифт**: Montserrat
- **Размеры**: 12px, 14px, 16px, 18px, 20px, 24px, 32px
- **Вес**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Размеры

- **Spacing**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 48px
- **Border Radius**: 4px, 6px, 8px, 12px, 16px, 24px, 50%

### Тени

- **Small**: 0 1px 2px rgba(0, 0, 0, 0.05)
- **Medium**: 0 4px 6px rgba(0, 0, 0, 0.1)
- **Large**: 0 10px 15px rgba(0, 0, 0, 0.1)

## 🔧 Разработка

### Установка зависимостей

```bash
cd web
npm install
```

### Сборка

```bash
npm run build
```

### Тестирование

```bash
npm run test
```

### Линтинг и проверка типов

```bash
npm run lint
npm run type-check
npm run quality:check   # type-check + lint + format
```

Сборка (`npm run build`) проходит без предупреждений TypeScript от `@rollup/plugin-typescript`.

### React Doctor

Статический аудит React-проекта ([react.doctor](https://www.react.doctor)):

```bash
npm run react-doctor
```

Отчёт выводится в консоль; команда завершается успешно (**`exit 0`**) даже при замечаниях. Для проверки с **ненулевым кодом** при наличии проблем (например в CI): **`npm run react-doctor:strict`**.

## 📝 Примеры использования

### Простая форма

```tsx
import { Input, Button, Card } from '@velkinvv/plainerv';

function LoginForm() {
  return (
    <Card>
      <Input
        label="Email"
        type="email"
        placeholder="Введите email"
        required
      />
      <Input
        label="Пароль"
        type="password"
        placeholder="Введите пароль"
        required
      />
      <Button variant="primary" fullWidth>
        Войти
      </Button>
    </Card>
  );
}
```

### Навигация с боковым меню (Sidemenu)

```tsx
import { Sidemenu, ThemeToggle } from '@velkinvv/plainerv';

function AppLayout() {
  const sidemenuItems = [
    { id: 'home', label: 'Главная', icon: 'Home', active: true },
    { id: 'profile', label: 'Профиль', icon: 'User' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <Sidemenu items={sidemenuItems} />
      <main>
        <header>
          <ThemeToggle />
        </header>
        <YourContent />
      </main>
    </div>
  );
}
```

## 🌳 Tree-shaking

Библиотека поддерживает tree-shaking: в `package.json` указано `sideEffects: ["**/*.css"]`, поэтому JS-код неиспользуемых компонентов может быть удалён бандлером, а CSS нужно подключать явно (`import '@velkinvv/plainerv/styles'`).

```tsx
// ✅ Хорошо - импортируется только Button
import { Button } from '@velkinvv/plainerv';

// ❌ Плохо - импортируется весь пакет
import * as UI from '@velkinvv/plainerv';
```

## 📊 Размер бандла

Для анализа размера бандла используйте:

```bash
npm run analyze
```

Это создаст файл `dist/stats.html` с визуализацией размера бандла.

### Текущие размеры (примерные)

- **ESM формат**: ~XXX KB (gzipped: ~XXX KB)
- **CJS формат**: ~XXX KB (gzipped: ~XXX KB)

*Размеры будут обновлены после первой сборки*

## 📋 Что нового в 0.2.3

- **Glass-темы:** `glassLight` и `glassDark` с vibrancy на базе blur-токенов; `surfaceMaterial`, mesh-gradient фон.
- **Storybook:** поддержка glass-тем в toolbar и Docs, обновлён canvas.
- **Windows / dev:** `cross-env` для `npm start`, optional `@rollup/rollup-win32-x64-msvc`.

Подробности — в [CHANGELOG.md](CHANGELOG.md).

## 📋 Что нового в 0.2.2

- **Storybook:** обновлён **Theme Showcase**, интеграция с UI-kit и демонстрация тёмной темы.
- **Тесты:** конфигурация **Jest** для **npm workspaces**; исправления ESLint и unit-тестов.
- **Темизация:** доработана тёмная тема в сторис **Theming**.

Подробности — в [CHANGELOG.md](CHANGELOG.md).

## 📋 Что нового в 0.2.1

- **Темизация:** каталог N тем (`defineThemeCatalog`, `themeMode`, `ThemeSelector`), `ThemeColorScheme` / `ThemeMode`, `mergeTheme`, `useMergeTheme`; [Theming](https://github.com/velkinvv/PlainerV-ui-kit/blob/v_0.2.2/documentation/content/docs/ru/web/v_0.2.2/theming.mdx).
- **Input:** единая раскладка через `InputFieldShell`; **DataGrid / Table:** синхронизация шапки через `scrollLeft`, исправления `headerToolbar` при горизонтальном скролле.

Подробности — в [CHANGELOG.md](CHANGELOG.md).

## 📋 Что нового в 0.2.0

- **SliderInput — режим `range`:** диапазон «от / до» (`readonly [number, number]`), поля с **`rangeFromLabel`** / **`rangeToLabel`**, типы **`SliderInputSingleProps`** / **`SliderInputRangeProps`**; исправлен embedded-трек. [Документация](https://github.com/velkinvv/PlainerV-ui-kit/blob/v_0.2.0/documentation/content/docs/ru/web/v_0.2.0/components-slider-input.mdx) · Storybook **SliderInput**.
- **DataGrid — выгрузка в Excel:** проп `excelExport`, кнопка в `headerToolbar`, модалка диапазона страниц, SpreadsheetML `.xls` без exceljs; ширины колонок, подписи и цвета из `format` / `render` / `exportValueGetter`.
- **DataGrid:** декларативное **`columns[].format`** (`TableCellFormat`), пустое состояние, встроенные **refetch** и сброс фильтров.
- **DataGrid / Table — скролл:** split-layout при **`scrollAreaMaxHeight`** + липкая шапка; **`horizontalScroll`** по умолчанию; скругления из **`theme.tables.borderRadius`**; глобальные стили скроллбаров.
- **Tabs** (**breaking**): варианты **pill** / **minimal** / **line** / **underline**, **filledSegmentTriggers**; объединение с бывшим **Switcher**.
- **Modal:** иконки статуса в шапке (`danger` / `success` / `info`).

Подробности — в [CHANGELOG.md](CHANGELOG.md).

## 📋 Что нового в 0.1.9

- **`createStyledShouldForwardProp`:** исправлена совместимость со **styled-components 6** (ошибка `defaultValidatorFn is not a function` в Pill, Tag, Breadcrumb и др.).
- **Сборка / публикация на Windows:** Rollup без `cross-env` (`rollup-with-node-env.mjs`); husky в `prepare` через Node; проверка dev-зависимостей перед `publish:npm` (важно при `NODE_ENV=production` — используйте `npm ci --include=dev`).

## 📋 Что нового в 0.1.8

- **`@velkinvv/plainerv/vite`:** ESM-реэкспорт с `./plainervVite.js`; `dedupe` + `optimizeDeps` для `framer-motion`; peer Vite 7.
- **Стили:** экспорт `./dist/styles.css` как алиас; рекомендуемый импорт `@velkinvv/plainerv/styles`.
- **Next.js:** директива `use client` в ESM entry; разделы Webpack и App Router в README.
- **Проверки публикации:** ESM в `dist/vite`, `use client`, exports в `verify-package.mjs`.

## 📋 Что нового в 0.1.7

- **npm:** README отображается на странице пакета (поле `"readme"`, правка `.npmignore`).

## 📋 Что нового в 0.1.6

- Устранены все предупреждения ESLint (`lint:fix-all`, 0 warnings).
- Хелпер **`noopHandler`** для stories и тестов.
- Исправлены типы `DragEvent` в **DataGrid**; уточнена типизация **Hint** и **Progress**.
- **Peer dependencies:** `styled-components`, `framer-motion` вынесены из `dependencies`; остаются только `clsx`, `dayjs`.
- Подпуть **`@velkinvv/plainerv/vite`** — плагин **`plainervVite()`** (`dedupe`, `optimizeDeps.exclude` кита).
- Документация по Vite: две копии `styled-components`, ошибка `o2 is not a function`, отличие от миграции **Tabs** `items`.
- Сборка без предупреждений `@rollup/plugin-typescript` при `@types/react` 19`.

### Экспорты пакета

| Подпуть | Назначение |
| --- | --- |
| `@velkinvv/plainerv` | Компоненты, хуки, тема (ESM/CJS + типы) |
| `@velkinvv/plainerv/styles` | CSS и шрифты |
| `@velkinvv/plainerv/vite` | `plainervVite()` для Vite |

## 📋 Что нового в 0.1.5

- Устранены все предупреждения TypeScript при production-сборке Rollup.
- Хелперы styled-components: `createStyledShouldForwardProp`, `omitMotionConflictingDomHandlers`.
- Совместимость с React 19 (`TabItem`, типизация обработчиков событий).
- Исправлен регистр папки `src/components/ui/table` (Windows / TS1261).

## 🤝 Contributing

Мы приветствуем вклад в развитие библиотеки! Пожалуйста, ознакомьтесь с [руководством по контрибьютингу](CONTRIBUTING.md) перед отправкой PR.

## 📝 License

MIT License - см. [LICENSE](LICENSE) для деталей.

## 👤 Автор

**VelkinVV**

- Email: velkinvv@mail.ru
- GitHub: [@velkinvv](https://github.com/velkinvv)

## 🔗 Ссылки

- [Репозиторий](https://github.com/velkinvv/PlainerV-ui-kit)
- [Ветка v0.2.3](https://github.com/velkinvv/PlainerV-ui-kit/tree/v_0.2.3)
- [Ветка v0.2.2](https://github.com/velkinvv/PlainerV-ui-kit/tree/v_0.2.2)
- [Ветка v0.2.1](https://github.com/velkinvv/PlainerV-ui-kit/tree/v_0.2.1)
- [Ветка v0.2.0](https://github.com/velkinvv/PlainerV-ui-kit/tree/v_0.2.0)
- [Ветка v0.1.9](https://github.com/velkinvv/PlainerV-ui-kit/tree/v_0.1.9)
- [Issues](https://github.com/velkinvv/PlainerV-ui-kit/issues)
- [Changelog](CHANGELOG.md) · [npm](https://www.npmjs.com/package/@velkinvv/plainerv)
