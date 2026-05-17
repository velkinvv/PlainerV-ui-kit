# @velkinvv/plainerv

![npm version](https://img.shields.io/npm/v/@velkinvv/plainerv)
![license](https://img.shields.io/npm/l/@velkinvv/plainerv)
![npm downloads](https://img.shields.io/npm/dm/@velkinvv/plainerv)

Современная библиотека UI компонентов с поддержкой темизации и TypeScript.

**Текущая версия:** `0.1.8` · ветка [`v_0.1.8`](https://github.com/velkinvv/PlainerV-ui-kit/tree/v_0.1.8) · React 18+/19 · styled-components 6.x

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
npm i @velkinvv/plainerv@0.1.8 react react-dom styled-components framer-motion
```

| Пакет | Диапазон (peer) |
| --- | --- |
| `react`, `react-dom` | `^18.0.0 \|\| ^19.0.0` |
| `styled-components` | `^6.1.0` |
| `framer-motion` | `^11.0.0` |

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

Плагин выставляет `resolve.dedupe` для `react`, `react-dom`, `styled-components`, `optimizeDeps.include: ['styled-components']` и `optimizeDeps.exclude: ['@velkinvv/plainerv']`.

<details>
<summary>Ручная настройка (без плагина)</summary>

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    dedupe: ['react', 'react-dom', 'styled-components'],
  },
  optimizeDeps: {
    include: ['styled-components'],
    exclude: ['@velkinvv/plainerv'],
  },
});
```

</details>

## 📦 Импорт стилей и шрифтов

Для правильной работы библиотеки необходимо импортировать стили:

```tsx
// Импорт стилей (включает шрифты)
import '@velkinvv/plainerv/styles';
// или
import '@velkinvv/plainerv/dist/styles.css';
```

Шрифты автоматически подключаются при импорте стилей.

## 🎨 Темизация

Библиотека поддерживает полную темизацию с автоматическим переключением между светлой и темной темой:

```tsx
import { ThemeProvider, useTheme, ThemeToggle } from '@velkinvv/plainerv';

function App() {
  return (
    <ThemeProvider>
      <div>
        <ThemeToggle />
        <YourApp />
      </div>
    </ThemeProvider>
  );
}
```

### Использование темы в компонентах

```tsx
import { useTheme } from '@velkinvv/plainerv';

function MyComponent() {
  const { mode, toggle } = useTheme();

  return (
    <div>
      <p>Текущая тема: {mode}</p>
      <button onClick={toggle}>Переключить тему</button>
    </div>
  );
}
```

## 🎯 Компоненты

**Полный перечень публичных экспортов** — в [документации](https://github.com/velkinvv/PlainerV-ui-kit/blob/v_0.1.8/documentation/content/docs/ru/web/v_0.1.8/components-catalog.mdx) (на сайте: **Web → v0.1.8 → Справочник компонентов**). Ниже — краткая группировка.

### Кнопки и ссылки

- **Button** — варианты, `Size`, иконки, `href` как ссылка.
- **ButtonGroup** — группа `Button` / `IconButton` (`orientation`, `attached`, переключатель сегмента).
- **IconButton** — только иконка.
- **Link** — `mode="text"` или `mode="button"` с `href`.

### Ввод и формы

- **Input**, **TextArea**, **FileInput**, **Select**, **MultiInput**, **SliderInput** — поля (`Form`-совместимые).
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

- **Badge**, **Tag**, **Pill**, **Avatar**, **AvatarGroup**, **Divider**, **Slider**, **RangeSlider**, **Calendar**, **DateRollerPicker**, **Progress**, **Spinner**, **Skeleton**, **Icon**, **ThemeToggle**.

### Таблицы и DataGrid

- **TableContainer**, **TableContainerScroll**, **Table**, **TableHead**, **TableBody**, **TableFooter**, **TableRow**, **TableCell**, **TableCellFormatted** (форматирование ячейки без DataGrid), **TablePagination**, **TableSortLabel**, **TableSortChevronIcon** и утилиты (`getTableTotalPages`, `clampTablePageZeroBased`, …).
- **DataGrid** — расширенная таблица; у колонок можно задать **`format`** (`TableCellFormat`: ссылки, маски, числа, даты и т.д.) или **`render`**; хелпер **`formatTableCellValue`** и константы масок экспортируются из пакета вместе с handlers.
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
];
```

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

- дата/время, ссылки, таблица, dropdown, motion, форматирование ячеек (`tableCellFormat`, `formatTableCellValue`);
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

## 📋 Что нового в 0.1.8

- **`@velkinvv/plainerv/vite`:** исправлен ESM-реэкспорт (`./plainervVite.js`) — загрузка плагина в `vite.config.ts` на Windows.

Подробности — в [CHANGELOG.md](CHANGELOG.md).

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
- [Ветка v0.1.8](https://github.com/velkinvv/PlainerV-ui-kit/tree/v_0.1.8)
- [Issues](https://github.com/velkinvv/PlainerV-ui-kit/issues)
- [Changelog](CHANGELOG.md) · [npm](https://www.npmjs.com/package/@velkinvv/plainerv)
