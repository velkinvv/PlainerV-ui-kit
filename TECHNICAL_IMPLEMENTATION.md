# Технический план реализации доработок

## 🔴 КРИТИЧНО - Детальные шаги

### 1. Удаление дубликатов файлов

#### Шаг 1.1: Анализ использования
```bash
# Найти все импорты из handlers/handlers
grep -r "from.*handlers/handlers" web/src --include="*.ts" --include="*.tsx"

# Найти все импорты из hooks/hooks
grep -r "from.*hooks/hooks" web/src --include="*.ts" --include="*.tsx"

# Найти все импорты из icons/icons
grep -r "from.*icons/icons" web/src --include="*.ts" --include="*.tsx"
```

#### Шаг 1.2: Проверка содержимого
- Сравнить файлы в `handlers/` и `handlers/handlers/`
- Сравнить файлы в `hooks/` и `hooks/hooks/`
- Сравнить файлы в `icons/` и `icons/icons/`

#### Шаг 1.3: Обновление импортов
Если найдены импорты из вложенных папок, заменить:
```typescript
// Было
import { useModal } from '@/hooks/hooks/useModal';

// Стало
import { useModal } from '@/hooks/useModal';
```

#### Шаг 1.4: Удаление дубликатов
```bash
# После проверки и обновления импортов
rm -rf web/src/handlers/handlers
rm -rf web/src/hooks/hooks
rm -rf web/src/icons/icons
```

#### Шаг 1.5: Проверка
```bash
npm run build
npm run test
```

---

### 2. Настройка сборки Rollup

#### Шаг 2.1: Установка зависимостей
```bash
npm install --save-dev \
  rollup \
  @rollup/plugin-node-resolve \
  @rollup/plugin-commonjs \
  @rollup/plugin-typescript \
  @rollup/plugin-terser \
  rollup-plugin-peer-deps-external \
  rollup-plugin-postcss \
  rollup-plugin-copy \
  typescript \
  tslib
```

#### Шаг 2.2: Создание rollup.config.js
```javascript
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import copy from 'rollup-plugin-copy';
import { terser } from '@rollup/plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
      exports: 'named',
    },
  ],
  external: ['react', 'react-dom', 'styled-components', 'framer-motion'],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist',
      exclude: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx'],
    }),
    postcss({
      extract: 'styles.css',
      minimize: isProduction,
      sourceMap: true,
    }),
    copy({
      targets: [
        {
          src: 'src/variables/fonts/**/*',
          dest: 'dist/fonts',
        },
        {
          src: 'README.md',
          dest: 'dist',
        },
      ],
    }),
    isProduction && terser(),
  ].filter(Boolean),
};
```

#### Шаг 2.3: Обновление tsconfig.json
Добавить в `compilerOptions`:
```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

#### Шаг 2.4: Обновление package.json
```json
{
  "main": "dist/index.cjs.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js"
    },
    "./styles": "./dist/styles.css",
    "./fonts/*": "./dist/fonts/*"
  },
  "files": [
    "dist",
    "README.md"
  ],
  "sideEffects": false,
  "scripts": {
    "build": "NODE_ENV=production rollup -c",
    "build:dev": "NODE_ENV=development rollup -c",
    "dev": "rollup -c --watch"
  }
}
```

#### Шаг 2.5: Обновление путей к шрифтам
В `src/styles/fonts.css` изменить пути:
```css
/* Было */
src: url('../variables/fonts/montserrat/Montserrat-Thin.ttf');

/* Стало (для npm пакета) */
src: url('./fonts/montserrat/Montserrat-Thin.ttf');
```

---

### 3. Базовые тесты

#### Шаг 3.1: Обновление jest.setup.js
```javascript
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Настройка для styled-components
configure({ testIdAttribute: 'data-testid' });
```

#### Шаг 3.2: Тест для Button
Создать `src/components/ui/buttons/Button/Button.test.tsx`:
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../../themes/ThemeProvider';
import { Button } from './Button';
import { ButtonVariant } from '../../../../types/ui';

describe('Button', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider>{component}</ThemeProvider>);
  };

  it('рендерится с текстом', () => {
    renderWithTheme(<Button>Нажми меня</Button>);
    expect(screen.getByText('Нажми меня')).toBeInTheDocument();
  });

  it('вызывает onClick при клике', () => {
    const handleClick = jest.fn();
    renderWithTheme(<Button onClick={handleClick}>Кнопка</Button>);

    fireEvent.click(screen.getByText('Кнопка'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('не вызывает onClick когда disabled', () => {
    const handleClick = jest.fn();
    renderWithTheme(
      <Button onClick={handleClick} disabled>
        Кнопка
      </Button>
    );

    fireEvent.click(screen.getByText('Кнопка'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('показывает состояние loading', () => {
    renderWithTheme(<Button loading>Кнопка</Button>);
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  it('применяет правильный variant', () => {
    const { container } = renderWithTheme(
      <Button variant={ButtonVariant.PRIMARY}>Кнопка</Button>
    );
    expect(container.firstChild).toHaveClass('ui-button');
  });
});
```

#### Шаг 3.3: Тест для Input
Создать `src/components/ui/inputs/Input/Input.test.tsx`:
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../../themes/ThemeProvider';
import { Input } from './Input';

describe('Input', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider>{component}</ThemeProvider>);
  };

  it('рендерится с label', () => {
    renderWithTheme(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('обрабатывает изменения значения', () => {
    const handleChange = jest.fn();
    renderWithTheme(
      <Input label="Email" onChange={handleChange} />
    );

    const input = screen.getByLabelText('Email');
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('показывает ошибку', () => {
    renderWithTheme(
      <Input label="Email" error="Неверный email" />
    );

    expect(screen.getByText('Неверный email')).toBeInTheDocument();
  });
});
```

#### Шаг 3.4: Тест для useModal
Создать `src/hooks/useModal.test.ts`:
```typescript
import { renderHook, act } from '@testing-library/react';
import { useModal } from './useModal';

describe('useModal', () => {
  it('инициализируется с закрытым состоянием', () => {
    const { result } = renderHook(() => useModal());

    expect(result.current.isOpen).toBe(false);
  });

  it('открывает модалку', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('закрывает модалку', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.open();
      result.current.close();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('переключает состояние', () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOpen).toBe(false);
  });
});
```

#### Шаг 3.5: Обновление package.json
Добавить скрипты:
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:coverage:check": "jest --coverage --coverageThreshold='{\"global\":{\"branches\":60,\"functions\":60,\"lines\":60,\"statements\":60}}'"
  }
}
```

---

### 4. Заполнение package.json

#### Шаг 4.1: Обновление package.json
```json
{
  "name": "@plainerV/ui",
  "version": "0.1.0",
  "description": "Современная библиотека UI компонентов с поддержкой темизации и TypeScript",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "homepage": "https://github.com/yourusername/plainerV#readme",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/plainerV.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/plainerV/issues"
  },
  "keywords": [
    "react",
    "ui",
    "components",
    "typescript",
    "theme",
    "styled-components",
    "design-system",
    "ui-kit",
    "component-library",
    "react-components"
  ],
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  },
  "sideEffects": false
}
```

---

### 5. Настройка экспорта шрифтов

#### Шаг 5.1: Обновление rollup.config.js
Убедиться что плагин copy настроен (см. шаг 2.2)

#### Шаг 5.2: Обновление fonts.css
Изменить пути для работы из npm пакета:
```css
@font-face {
  font-family: 'Montserrat';
  src: url('./fonts/montserrat/Montserrat-Thin.ttf') format('truetype');
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}
```

#### Шаг 5.3: Документация в README
Добавить раздел:
```markdown
## Шрифты

Библиотека использует шрифт Montserrat. Для правильной работы необходимо импортировать стили:

```tsx
import '@plainerV/ui/styles';
// или
import '@plainerV/ui/dist/styles.css';
```

Шрифты автоматически подключаются при импорте стилей.
```

---

## 🟡 ВАЖНО - Детальные шаги

### 6. Tree-shaking

#### Шаг 6.1: Проверка экспортов
Убедиться что все экспорты именованные:
```typescript
// ✅ Хорошо
export { Button } from './Button';
export type { ButtonProps } from './Button';

// ❌ Плохо
export default Button;
```

#### Шаг 6.2: Тестирование tree-shaking
Создать тестовый проект:
```typescript
// test-project/index.ts
import { Button } from '@plainerV/ui';

// Должен импортироваться только Button, не весь пакет
```

Запустить анализ:
```bash
npm run build
npx webpack-bundle-analyzer dist/stats.json
```

---

### 7. Документация

#### Шаг 7.1: CHANGELOG.md
```markdown
# Changelog

Все значимые изменения в этом проекте будут документироваться в этом файле.

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.0.0/),
и этот проект придерживается [Semantic Versioning](https://semver.org/lang/ru/).

## [Unreleased]

## [0.1.0] - 2025-01-XX

### Added
- Начальная версия библиотеки
- Компоненты: Button, Input, Modal, Dropdown и др.
- Поддержка темной и светлой темы
- TypeScript типизация

### Changed

### Deprecated

### Removed

### Fixed

### Security
```

#### Шаг 7.2: LICENSE
Создать `LICENSE`:
```
MIT License

Copyright (c) 2025 Your Name

Permission is hereby granted...
```

#### Шаг 7.3: Обновление README
Добавить badge'ы в начало:
```markdown
![npm version](https://img.shields.io/npm/v/@plainerV/ui)
![license](https://img.shields.io/npm/l/@plainerV/ui)
![build status](https://img.shields.io/github/workflow/status/yourusername/plainerV/CI)
```

---

### 8. Версионирование

#### Шаг 8.1: Установка semantic-release
```bash
npm install --save-dev semantic-release @semantic-release/changelog @semantic-release/git
```

#### Шаг 8.2: Создание .releaserc.json
```json
{
  "branches": ["main", "next"],
  "plugins": [
    "@semantic-release/commit-angular",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/github"
  ]
}
```

#### Шаг 8.3: Обновление package.json
```json
{
  "scripts": {
    "release": "semantic-release"
  }
}
```

---

### 9. CI/CD

#### Шаг 9.1: .github/workflows/ci.yml
```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint:check
      - run: npm run format:check

  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run type-check

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist
```

#### Шаг 9.2: .github/workflows/release.yml
```yaml
name: Release

on:
  push:
    branches: [main]

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - run: npx semantic-release
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
```

---

### 10. Bundle size

#### Шаг 10.1: Установка
```bash
npm install --save-dev rollup-plugin-visualizer
```

#### Шаг 10.2: Обновление rollup.config.js
```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  // ...
  plugins: [
    // ... другие плагины
    visualizer({
      filename: 'dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
};
```

#### Шаг 10.3: Скрипт в package.json
```json
{
  "scripts": {
    "analyze": "npm run build && open dist/stats.html"
  }
}
```

---

## ✅ Чеклист выполнения

### Критично
- [ ] Дубликаты удалены
- [ ] Rollup настроен и работает
- [ ] Тесты написаны (минимум 60% покрытие)
- [ ] package.json заполнен
- [ ] Шрифты работают

### Важно
- [ ] Tree-shaking работает
- [ ] CHANGELOG создан
- [ ] LICENSE добавлен
- [ ] README обновлен
- [ ] CI/CD настроен
- [ ] Bundle size известен

### Желательно
- [ ] Дополнительные компоненты
- [ ] Accessibility улучшен
- [ ] Производительность оптимизирована
- [ ] Developer Experience улучшен

---

**Последнее обновление:** 2025-01-XX
