/**
 * Эвристики для HTML-атрибута `autocomplete` в текстовом поле (`Input`).
 */

export interface ResolveInputAutocompleteAttributeParams {
  /** Явное значение из пропсов `autoComplete`; если задано — возвращается без изменений. */
  autoComplete?: string;
  /** Значение атрибута `type` у поля ввода. */
  inputType: string;
  /** Плейсхолдер; по нему уточняется тип пароля или логина. */
  placeholder?: string;
}

/**
 * Определяет значение `autocomplete` по типу поля и подсказке в placeholder.
 * @param params - Тип поля, явный autocomplete и placeholder.
 */
export const resolveInputAutocompleteAttribute = ({
  autoComplete,
  inputType,
  placeholder,
}: ResolveInputAutocompleteAttributeParams): string | undefined => {
  if (autoComplete) {
    return autoComplete;
  }

  if (inputType === 'password') {
    const placeholderText = (placeholder || '').toLowerCase();

    if (
      placeholderText.includes('повторите') ||
      placeholderText.includes('подтвердите') ||
      placeholderText.includes('confirm')
    ) {
      return 'new-password';
    }

    if (
      placeholderText.includes('текущий') ||
      placeholderText.includes('старый') ||
      placeholderText.includes('current') ||
      placeholderText.includes('old')
    ) {
      return 'current-password';
    }

    return 'new-password';
  }

  if (inputType === 'email') {
    return 'email';
  }

  const placeholderLower = placeholder?.toLowerCase() ?? '';
  if (
    inputType === 'text' &&
    (placeholderLower.includes('пользователь') || placeholderLower.includes('username'))
  ) {
    return 'username';
  }

  return undefined;
};
