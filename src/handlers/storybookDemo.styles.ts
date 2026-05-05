import type { CSSProperties } from 'react';
import { darkTheme, lightTheme } from '@/themes/themes';

/**
 * Общие CSS-объекты для демо в Storybook (хендлеры, хуки).
 * Токены из `lightTheme`, без хардкода hex.
 */
export const storybookDemoStyles = {
  /** Горизонтальный ряд контролов с отступом снизу. */
  rowFlexGap12MarginBottom16: {
    display: 'flex',
    gap: '12px',
    marginBottom: '16px',
  } satisfies CSSProperties,

  /** Ряд кнопок/контролов с переносом и отступом снизу. */
  rowFlexGap12MarginBottom16Wrap: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '16px',
  } satisfies CSSProperties,

  /**
   * Поле ввода или блок, растягиваемый в ряду flex.
   * @example `<Input style={storybookDemoStyles.flexGrowFull} />`
   */
  flexGrowFull: {
    flex: 1,
  } satisfies CSSProperties,

  /** Панель с выводом результата или подсказки под контролами. */
  demoResultPanel: {
    padding: '12px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
    borderRadius: '8px',
  } satisfies CSSProperties,

  /** Компактная полоска статуса под мини-блоком (несколько элементов и т.п.). */
  demoStatusStripCompact: {
    padding: '8px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
    borderRadius: '4px',
  } satisfies CSSProperties,

  marginBottom16: {
    marginBottom: '16px',
  } satisfies CSSProperties,

  columnFlexGap24: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  } satisfies CSSProperties,

  /** Вертикальный столбец со шагом 16px и отступом снизу (несколько отслеживаемых блоков). */
  columnFlexGap16MarginBottom16: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '16px',
  } satisfies CSSProperties,

  /** Сетка 2×N для полей времени/даты, ориентации и др. демо. */
  gridTwoColumnsGap16MarginBottom16: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '16px',
  } satisfies CSSProperties,

  /**
   * Нативный `<select>` в сторис хендлеров: граница и фон из темы.
   * @example `<select style={storybookDemoStyles.nativeSelectBordered}>...</select>`
   */
  nativeSelectBordered: {
    padding: '8px',
    borderRadius: '4px',
    border: `1px solid ${lightTheme.colors.borderSecondary}`,
    backgroundColor: lightTheme.colors.backgroundSecondary,
  } satisfies CSSProperties,

  /** Выравнивание кнопки по нижнему краю в flex-ряду с селектами. */
  alignSelfFlexEnd: {
    alignSelf: 'flex-end',
  } satisfies CSSProperties,

  /** Ряд кнопок выбора с центрированием (витрина размеров в сторис). */
  rowWrapGap8AlignCenterJustifyCenter: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  } satisfies CSSProperties,

  /** Два ряда переключателей с отступом между блоками. */
  rowFlexGap8WrapMarginBottom12: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '12px',
  } satisfies CSSProperties,

  /** Горизонтальный ряд с шагом 16px и отступом снизу (группы полей). */
  rowFlexGap16MarginBottom16: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
  } satisfies CSSProperties,

  /** Сетка 2 колонки без нижнего margin (пара блоков JSON рядом). */
  gridTwoColumnsGap16: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  } satisfies CSSProperties,

  /** Сетка 2×2 для нескольких `<pre>` подряд. */
  gridTwoColumnsGap12: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  } satisfies CSSProperties,

  /**
   * `<pre>` с выводом JSON из темы (читаемый размер, скролл).
   * @example `<pre style={storybookDemoStyles.demoJsonPre12}>...</pre>`
   */
  demoJsonPre12: {
    fontSize: '12px',
    overflow: 'auto',
  } satisfies CSSProperties,

  /**
   * Компактный `<pre>` на фоне карточки (блоки hover/active в демо хендлеров).
   * @example `<pre style={storybookDemoStyles.demoJsonPre10OnCard}>...</pre>`
   */
  demoJsonPre10OnCard: {
    fontSize: '10px',
    overflow: 'auto',
    backgroundColor: lightTheme.colors.backgroundSecondary,
    padding: '8px',
    borderRadius: '4px',
  } satisfies CSSProperties,

  /** Оболочка демо-dropdown (якорь для absolute-панели). */
  inlineBlockRelative: {
    position: 'relative',
    display: 'inline-block',
  } satisfies CSSProperties,

  /**
   * Нативная кнопка-триггер в сторис dropdown-хендлеров.
   * @example `<button type="button" style={storybookDemoStyles.storyDropdownTriggerButton}>`
   */
  storyDropdownTriggerButton: {
    padding: '8px 16px',
    border: `1px solid ${lightTheme.colors.borderSecondary}`,
    borderRadius: '4px',
    backgroundColor: lightTheme.colors.backgroundSecondary,
    cursor: 'pointer',
  } satisfies CSSProperties,

  columnFlexGap20: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  } satisfies CSSProperties,

  rowFlexGap10AlignCenter: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  } satisfies CSSProperties,

  /** Подпись к блоку JSON рядом с демо (вторичный текст темы). */
  storyJsonCaption12: {
    fontSize: '12px',
    color: lightTheme.colors.textSecondary,
  } satisfies CSSProperties,

  /** Фон для `<pre>` с дампом темы (аналог бывшего #f5f5f5). */
  demoPreCodeBlock: {
    backgroundColor: lightTheme.colors.backgroundTertiary,
    padding: '10px',
    borderRadius: '4px',
  } satisfies CSSProperties,

  /** То же + размер шрифта для длинного примера кода. */
  demoPreCodeBlock12: {
    backgroundColor: lightTheme.colors.backgroundTertiary,
    padding: '10px',
    borderRadius: '4px',
    fontSize: '12px',
  } satisfies CSSProperties,

  /** Отступ строки в макете контейнера dropdown в сторис. */
  dropdownStoryMenuItemPad: {
    padding: '8px 12px',
  } satisfies CSSProperties,

  rowFlexGap20: {
    display: 'flex',
    gap: '20px',
  } satisfies CSSProperties,

  /** Карточка предпросмотра светлой темы (рядом с тёмной). */
  themePreviewLightCard: {
    backgroundColor: lightTheme.colors.backgroundSecondary,
    padding: '20px',
    borderRadius: '8px',
    border: `1px solid ${lightTheme.colors.borderSecondary}`,
  } satisfies CSSProperties,

  /** Карточка предпросмотра тёмной темы. */
  themePreviewDarkCard: {
    backgroundColor: darkTheme.colors.background,
    padding: '20px',
    borderRadius: '8px',
    border: `1px solid ${darkTheme.colors.borderSecondary}`,
  } satisfies CSSProperties,

  marginTop8: {
    marginTop: '8px',
  } satisfies CSSProperties,

  marginBottom4: {
    marginBottom: '4px',
  } satisfies CSSProperties,

  /** Сетка кнопок демо (`minmax(160px, 1fr)`). */
  gridAutoFillMin160Gap12MarginBottom16: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '12px',
    marginBottom: '16px',
  } satisfies CSSProperties,

  /**
   * Строка в списке активных toast на панели состояния (фон карточки из темы).
   * @example `<div style={storybookDemoStyles.toastDemoActiveRow}>...</div>`
   */
  toastDemoActiveRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4px',
    padding: '4px 8px',
    backgroundColor: lightTheme.colors.backgroundSecondary,
    borderRadius: '4px',
  } satisfies CSSProperties,

  /** Мелкий текст в списке toast (размер). */
  typographyFinePrint12: {
    fontSize: '12px',
  } satisfies CSSProperties,

  /** Мелкий вторичный текст (подсказки под панелями). */
  typographyFinePrint12Secondary: {
    fontSize: '12px',
    color: lightTheme.colors.textSecondary,
  } satisfies CSSProperties,

  /** Абзац под заголовком секции без смены variant у Typography. */
  typographyMutedParagraph: {
    color: lightTheme.colors.textSecondary,
  } satisfies CSSProperties,

  /**
   * Узкая ghost-кнопка «×» в списке активных toast.
   * @example `<Button style={storybookDemoStyles.toastDismissIconButtonTight} />`
   */
  toastDismissIconButtonTight: {
    padding: '2px 6px',
    minWidth: 'auto',
  } satisfies CSSProperties,

  /** Ряд кнопок с переносом без нижнего отступа. */
  rowFlexGap12Wrap: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  } satisfies CSSProperties,

  /** Сетка метрик: `minmax(200px, 1fr)`. */
  gridAutoFitMin200Gap12MarginBottom16: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
    marginBottom: '16px',
  } satisfies CSSProperties,

  /** Сетка метрик: `minmax(120px, 1fr)` (брейкпоинты). */
  gridAutoFitMin120Gap8MarginBottom16: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '8px',
    marginBottom: '16px',
  } satisfies CSSProperties,

  /** Сетка метрик: `minmax(150px, 1fr)`. */
  gridAutoFitMin150Gap12MarginBottom16: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '12px',
    marginBottom: '16px',
  } satisfies CSSProperties,

  /** Три колонки для демо ориентации окна. */
  gridThreeColumnsGap12MarginBottom16: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '16px',
  } satisfies CSSProperties,

  /** Две колонки сравнения с отступом снизу. */
  gridTwoColumnsGap12MarginBottom16: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '16px',
  } satisfies CSSProperties,

  /** Плитка метрики (центр, фон третичный). */
  windowSizeMetricTile: {
    padding: '12px',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: lightTheme.colors.backgroundTertiary,
  } satisfies CSSProperties,

  /** Компактная ячейка статуса брейкпоинта. */
  windowSizeBreakpointCell: {
    padding: '8px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
    borderRadius: '4px',
    textAlign: 'center',
  } satisfies CSSProperties,

  /** Плитка «разница размеров» и аналоги. */
  windowSizeMutedPanel12: {
    padding: '12px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
    borderRadius: '8px',
  } satisfies CSSProperties,

  /** Акцентные значения в карточках размеров (цвета темы). */
  windowSizeValuePrimary: {
    color: lightTheme.colors.primary,
  } satisfies CSSProperties,

  windowSizeValueSuccess: {
    color: lightTheme.colors.success,
  } satisfies CSSProperties,

  windowSizeValueWarning: {
    color: lightTheme.colors.warning,
  } satisfies CSSProperties,

  windowSizeValueDanger: {
    color: lightTheme.colors.danger,
  } satisfies CSSProperties,

  /** Баннер «тип устройства» в адаптивном демо. */
  responsiveDeviceHeroBanner: {
    padding: '24px',
    borderRadius: '12px',
    textAlign: 'center',
    marginBottom: '16px',
  } satisfies CSSProperties,

  /** База плитки ориентации (портрет / альбом / квадрат). */
  orientationTileBase: {
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: lightTheme.colors.backgroundTertiary,
  } satisfies CSSProperties,

  orientationTileInactiveBorder: {
    border: `1px solid ${lightTheme.colors.border}`,
  } satisfies CSSProperties,

  orientationTileActiveSuccess: {
    border: `2px solid ${lightTheme.colors.success}`,
  } satisfies CSSProperties,

  orientationTileActivePrimary: {
    border: `2px solid ${lightTheme.colors.primary}`,
  } satisfies CSSProperties,

  orientationTileActiveWarning: {
    border: `2px solid ${lightTheme.colors.warning}`,
  } satisfies CSSProperties,

  marginTop16: {
    marginTop: '16px',
  } satisfies CSSProperties,

  /**
   * Область с прокруткой в сторис useScrollPosition (рамка из темы).
   * @example `<div ref={scrollRef} style={storybookDemoStyles.scrollViewportStory}>`
   */
  scrollViewportStory: {
    height: '200px',
    width: '100%',
    overflow: 'auto',
    border: `2px solid ${lightTheme.colors.border}`,
    borderRadius: '8px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
  } satisfies CSSProperties,

  /** Переполненный контент внутри viewport (ширина/высота для двухосного скролла). */
  scrollContentOversized: {
    width: '300%',
    height: '300%',
    padding: '20px',
  } satisfies CSSProperties,

  /** Сетка 3×N внутри демо-скролла. */
  gridThreeColumnsGap16: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
  } satisfies CSSProperties,

  /** Плитка-пример внутри прокручиваемой области. */
  scrollDemoContentTile: {
    padding: '16px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
    borderRadius: '8px',
    textAlign: 'center',
  } satisfies CSSProperties,

  /** Панель состояния под скролл-областью с отступом сверху. */
  demoResultPanelMarginTop16: {
    padding: '12px',
    marginTop: '16px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
    borderRadius: '8px',
  } satisfies CSSProperties,

  /** Отслеживаемый блок в сторис useClickOutside (активное отслеживание). */
  clickOutsideTrackedPanel: {
    padding: '20px',
    backgroundColor: lightTheme.colors.backgroundTertiary,
    border: `2px solid ${lightTheme.colors.primary}`,
    borderRadius: '8px',
    marginBottom: '16px',
  } satisfies CSSProperties,

  /** Отслеживаемый блок при отключённом хуке (предупреждающая рамка). */
  clickOutsideTrackedPanelHookDisabled: {
    padding: '20px',
    backgroundColor: lightTheme.colors.backgroundQuaternary,
    border: `2px solid ${lightTheme.colors.warning}`,
    borderRadius: '8px',
    marginBottom: '16px',
  } satisfies CSSProperties,

  /** Полноэкранный фон под модалку в демо Storybook. */
  modalStoryBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: lightTheme.colors.overlay,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  } satisfies CSSProperties,

  /** Карточка «модалки» без компонента Modal (упрощённое демо). */
  modalStoryPanel: {
    backgroundColor: lightTheme.colors.backgroundSecondary,
    padding: '24px',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '90%',
    boxShadow: lightTheme.boxShadow.modal,
  } satisfies CSSProperties,

  /** Абсолютная панель списка в демо дропдауна useClickOutside. */
  dropdownStoryMenuPanel: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: lightTheme.colors.backgroundSecondary,
    border: `1px solid ${lightTheme.colors.borderSecondary}`,
    borderRadius: '4px',
    boxShadow: lightTheme.boxShadow.dropdown,
    zIndex: 1000,
    marginTop: '4px',
  } satisfies CSSProperties,

  /** Строка опции в демо-меню (без hover — hover задаётся обработчиками с токенами). */
  dropdownStoryMenuRow: {
    padding: '8px 12px',
    cursor: 'pointer',
  } satisfies CSSProperties,

  /** Ряд кнопок футера модалки вправо. */
  rowFlexGap12JustifyFlexEnd: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
  } satisfies CSSProperties,

  marginBottom24: {
    marginBottom: '24px',
  } satisfies CSSProperties,

  marginBottom32: {
    marginBottom: '32px',
  } satisfies CSSProperties,
};
