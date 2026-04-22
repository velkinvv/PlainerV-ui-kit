# @velkinvv/plainerv

![npm version](https://img.shields.io/npm/v/@velkinvv/plainerv)
![license](https://img.shields.io/npm/l/@velkinvv/plainerv)
![npm downloads](https://img.shields.io/npm/dm/@velkinvv/plainerv)

Современная библиотека UI компонентов с поддержкой темизации и TypeScript.

## 🚀 Возможности

- **🎨 Полная темизация** - Поддержка светлой и темной темы с автоматическим переключением
- **🎯 TypeScript** - Полная типизация всех компонентов и пропсов
- **📱 Адаптивный дизайн** - Компоненты адаптированы под все устройства
- **⚡ Производительность** - Оптимизированные компоненты с минимальным бандлом
- **🎭 Анимации** - Плавные анимации с Framer Motion
- **🔧 Кастомизация** - Гибкая настройка через пропсы и темы
- **📚 Storybook** - Интерактивная документация и playground

## 📦 Установка

```bash
npm i @velkinvv/plainerv
```

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

### Основные UI компоненты

- **Button** - Кнопки с различными вариантами и состояниями
- **ButtonGroup** - Группа `Button` / `IconButton` (`orientation`, `attached`, `fullWidth`, `aria-label`)
- **Link** - Ссылка `mode="text"` (стилизованный `<a>`) или `mode="button"` (тот же `Button` с `href`)
- **Input** - Поля ввода с валидацией и различными типами
- **TextArea** - Многострочное поле ввода (состояния, подсказки, счётчик при `maxLength`, `Form`)
- **FileInput** - Выбор файла (скрытый `input[type=file]`, триггер, подпись, очистка, `Form`)
- **Card** - Карточки для контента
- **Modal** - Модальные окна
- **Drawer** - Выдвижная панель (портал, оверлей как у `Modal`, `placement`, фокус-ловушка)
- **Icon** - Иконки (Lucide React + Plainer иконки)
- **ThemeToggle** - Переключатель темы

### Формы

- **Form** - Обёртка `<form>` и контекст для `Input` / `TextArea` / `FileInput` / `Select` (атрибут `form` у полей)
- **Checkbox** - Чекбоксы
- **Switch** - Переключатель (трек + бегунок, подпись, ошибка)
- **Radio** - Радио кнопки
- **DateInput** - Поля ввода даты
- **TimeInput** - Поля ввода времени
- **Select** — `mode="select"`: панель как у `Dropdown` (поиск, мультивыбор) + скрытый `select` для форм; `mode="native"` — нативный список

### Навигация

- **Sidebar** - Боковая панель навигации
- **Tabs** - Вкладки
- **Breadcrumb** - «Хлебные крошки» (`nav` + `ol`, `aria-current`, разделитель, `Size`)
- **Pagination** - Номера страниц с разрывами «…», стрелки назад/вперёд, контролируемый и неконтролируемый режимы (`totalPages`, `page` / `defaultPage`, `onPageChange`, `siblingCount`, `showPrevNext`, `size`)
- **Dropdown** - Выпадающие меню

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

### Отображение данных

- **Badge** - Бейджи и метки
- **Avatar** - Аватары пользователей
- **Progress** - Индикаторы прогресса
- **Spinner** - Спиннеры загрузки
- **Skeleton** - Скелетоны загрузки

### Обратная связь

- **Tooltip** - Подсказки
- **Hint** - Расширенные подсказки
- **Toast** + **ToastProvider** / **useToast** - Стек уведомлений (портал в `body`, типы success/error/warning/info)
- **Snackbar** + **SnackbarProvider** / **useSnackbar** - Компактные полосы внизу экрана, опциональное действие и таймер (портал в `body`)
- **Modal** - Модальные окна
- **Drawer** - Выдвижная панель (оверлей, Escape, стороны `left` | `right` | `top` | `bottom`)

#### Toast и Snackbar в приложении

Оба стека рендерятся в `document.body`. Нужны **`ThemeProvider`** (тема для styled-компонентов) и провайдер уведомлений. Их удобно вложить в корень; порядок вложенности произвольный, если оба провайдера оборачивают одно и то же дерево.

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

**Storybook:** `Hooks/useToast`, `Hooks/useSnackbar`, `Components/Feedback/Toast`, `Components/Feedback/Snackbar`, `Components/Navigation/Pagination`, `Components/Buttons/ButtonGroup`.
- **Accordion** - Аккордеоны

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

### Линтинг

```bash
npm run lint
```

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

### Навигация с сайдбаром

```tsx
import { Sidebar, ThemeToggle } from '@velkinvv/plainerv';

function AppLayout() {
  const sidebarItems = [
    { id: 'home', label: 'Главная', icon: 'Home', active: true },
    { id: 'profile', label: 'Профиль', icon: 'User' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar items={sidebarItems} />
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

Библиотека поддерживает tree-shaking благодаря настройке `sideEffects: false`. Это означает, что при импорте только необходимых компонентов, неиспользуемый код будет исключен из финального бандла.

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

## 🤝 Contributing

Мы приветствуем вклад в развитие библиотеки! Пожалуйста, ознакомьтесь с [руководством по контрибьютингу](CONTRIBUTING.md) перед отправкой PR.

## 📝 License

MIT License - см. [LICENSE](LICENSE) для деталей.

## 👤 Автор

**VelkinVV**

- Email: velkinvv@mail.ru
- GitHub: [@velkinvv](https://github.com/velkinvv)

## 🔗 Ссылки

- [Документация](https://github.com/velkinvv/PlainerV-ui-kit#readme)
- [Issues](https://github.com/velkinvv/PlainerV-ui-kit/issues)
- [Changelog](CHANGELOG.md)
