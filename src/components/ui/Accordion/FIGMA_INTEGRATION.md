# Интеграция аккордеона с макетом Figma

## Обзор

Аккордеон реализован по макету Figma: [Проект](https://www.figma.com/design/DxSeBfd1bBXCF4DlsIeLUr/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82?node-id=4873-15261&t=uGsIilm1pmzcb7f3-4)

Стили задаются через **theme.accordions** (светлая / тёмная / glass-палитра).

## API

### Корневой Accordion

```tsx
<Accordion
  allowMultiple={false}
  autoClose={false}
  defaultOpen={false}
  firstItemBorderRadius={true}
  lastItemBorderRadius={true}
  onChange={(isOpen) => {}}
>
  {/* Accordion.Item */}
</Accordion>
```

| Проп | Описание |
|------|----------|
| `allowMultiple` | Несколько открытых секций одновременно |
| `autoClose` | Закрывать остальные при открытии новой (приоритет над `allowMultiple`) |
| `defaultOpen` | Открыта ли секция по умолчанию |
| `firstItemBorderRadius` | Скругление верхних углов первого `Accordion.Item` (по умолчанию `true`) |
| `lastItemBorderRadius` | Скругление нижних углов последнего `Accordion.Item` (по умолчанию `true`) |
| `onChange` | Колбэк `(isOpen: boolean) => void` |

### Accordion.Item

```tsx
<Accordion.Item value="item1" position="start">
  <Accordion.Trigger title="Заголовок" subtitle="Подзаголовок" align="left" />
  <Accordion.Content align="left">Контент</Accordion.Content>
</Accordion.Item>
```

| Проп | Описание |
|------|----------|
| `value` | Уникальный id секции |
| `position` | `start` / `center` / `last` — радиусы и разделители в группе |

### Скругления первого и последнего элемента

Пропсы `firstItemBorderRadius` и `lastItemBorderRadius` работают независимо и ориентируются на **первый и последний** дочерний `.ui-accordion-item`:

- `firstItemBorderRadius={false}` — убирает верхние скругления (встраивание в карточку)
- `lastItemBorderRadius={false}` — убирает нижние скругления

См. сторис: **Без внешних скруглений**, **Встроенный в карточку**.

## Glass-тема (vibrancy)

В **glassLight** / **glassDark** аккордеон получает:

- полупрозрачный фон (как pagination): `rgba(255,255,255,0.26)` / `0.06`
- `backdrop-filter` из `theme.accordions.settings.backdropFilter`
- разделители через `theme.colors.borderSecondary`

Логика в `accordionGlassHandlers.ts`, override — `createGlassAccordionThemeOverride`.

Сторис **Glass vibrancy** в Storybook.

## Дизайн по макету

### Позиционирование элементов

- **Start**: `border-radius: 8px 8px 0 0`
- **Center**: `border-radius: 0`
- **Last**: `border-radius: 0 0 8px 8px`

### Типографика

- **Заголовок**: 16px, Medium (500)
- **Подзаголовок**: 12px, Regular (400)
- **Контент**: 14px, Regular (400)

### Иконка

- Закрыто: стрелка влево
- Открыто: поворот на −90° (стрелка вниз)

## Файлы

| Файл | Назначение |
|------|------------|
| `Accordion.tsx` | Логика и подкомпоненты |
| `Accordion.style.ts` | Стили, glass-токены, скругления |
| `accordionGlassHandlers.ts` | Glass-палитра |
| `themes/accordion/` | Базовые темы light / dark |
| `themes/glass/glassAccordionVariants.ts` | Glass override |
| `Accordion.stories.tsx` | Storybook |
| `storyDocs/uiKitDocs.ts` → `DOC_ACCORDION` | Документация UI Kit |
