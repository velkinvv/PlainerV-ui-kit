/** Ширина однострочного поля по умолчанию (совпадает с `InputWrapper` без `fullWidth`). */
export const DEFAULT_INPUT_FIELD_WIDTH_PX = 335;

/**
 * CSS-ширина поля ввода: `100%` или фиксированная в px.
 * @param fullWidth - Растянуть на всю ширину родителя.
 */
export const getInputFieldWidthCss = (fullWidth?: boolean): string =>
  fullWidth ? '100%' : `${DEFAULT_INPUT_FIELD_WIDTH_PX}px`;

/** Минимальная ширина слота prefix/suffix с встроенным `Select` (`mode="select"`) в составном Input. */
export const COMPOSITE_INPUT_SELECT_SLOT_MIN_WIDTH_PX = 132;

/** Минимальная ширина слота для `Select` с `mode="searchSelect"` в составном Input (поле фильтра + шеврон). */
export const COMPOSITE_INPUT_SEARCH_SELECT_SLOT_MIN_WIDTH_PX = 168;
