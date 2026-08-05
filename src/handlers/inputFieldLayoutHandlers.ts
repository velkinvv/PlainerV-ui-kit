/** Ширина однострочного поля по умолчанию (совпадает с `InputWrapper` без `fullWidth` / `autoWidth`). */
export const DEFAULT_INPUT_FIELD_WIDTH_PX = 335;

/**
 * CSS-ширина поля ввода.
 * Приоритет: `fullWidth` → `100%`; иначе `autoWidth` → `auto`; иначе фиксированная ширина в px.
 *
 * @param fullWidth - Растянуть на всю ширину родителя.
 * @param autoWidth - Ширина по содержимому (`auto`), без фиксированных 335px.
 */
export const getInputFieldWidthCss = (fullWidth?: boolean, autoWidth?: boolean): string => {
  if (fullWidth) {
    return '100%';
  }
  if (autoWidth) {
    return 'auto';
  }
  return `${DEFAULT_INPUT_FIELD_WIDTH_PX}px`;
};

/** Минимальная ширина слота prefix/suffix с встроенным `Select` (`mode="select"`) в составном Input. */
export const COMPOSITE_INPUT_SELECT_SLOT_MIN_WIDTH_PX = 132;

/** Минимальная ширина слота для `Select` с `mode="searchSelect"` в составном Input (поле фильтра + шеврон). */
export const COMPOSITE_INPUT_SEARCH_SELECT_SLOT_MIN_WIDTH_PX = 168;
