/**
 * Возвращает значение поля для рендера: контролируемое (`value`) или внутреннее состояние.
 * @param controlledValue - Значение из пропсов компонента.
 * @param internalValue - Значение из локального состояния.
 */
export const getInputDisplayValue = (
  controlledValue: string | number | readonly string[] | undefined,
  internalValue: string,
): string | number | readonly string[] => {
  if (controlledValue !== undefined) {
    return controlledValue;
  }

  return internalValue;
};

/**
 * Проверяет, можно ли показывать кнопку очистки значения.
 * @param displayClearIcon - Флаг показа кнопки очистки.
 * @param currentValue - Текущее отображаемое значение поля.
 * @param disabled - Поле отключено.
 * @param readOnly - Поле только для чтения.
 */
export const shouldShowInputClearButton = ({
  displayClearIcon,
  currentValue,
  disabled,
  readOnly,
}: {
  displayClearIcon: boolean;
  currentValue: string | number | readonly string[] | undefined;
  disabled: boolean;
  readOnly: boolean;
}): boolean => {
  if (!displayClearIcon || disabled || readOnly) {
    return false;
  }

  if (currentValue === undefined || currentValue === null) {
    return false;
  }

  return String(currentValue).length > 0;
};

/**
 * Определяет, есть ли правые контролы внутри поля (спиннер/кнопка очистки).
 * @param isLoading - Флаг загрузки.
 * @param showClearButton - Видимость кнопки очистки.
 */
export const hasInputRightControls = ({
  isLoading,
  showClearButton,
}: {
  isLoading: boolean;
  showClearButton: boolean;
}): boolean => {
  return isLoading || showClearButton;
};
