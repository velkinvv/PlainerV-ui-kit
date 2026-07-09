// Экспорт всех общих стилей для инпутов
export {
  // Контейнеры
  InputContainer,
  InputControlStack,
  InputContainerWithPadding,

  // Лейблы
  Label,
  AbsoluteLabel,
  LeftLabel,
  RightLabel,

  // Обертки инпутов
  InputWrapper,

  // Стилизованные инпуты
  StyledInput,

  // Вспомогательные тексты
  HelperText,
  ErrorText,
  SuccessText,

  // Иконки и кнопки
  IconContainer,
  ClearButton,
  IconWrapper,
  IconButton,

  // Состояния загрузки и скелетона
  LoadingSpinner,
  SkeletonEffect,

  // Дополнительные элементы
  AdditionalLabel,
  ExtraText,
  CharacterCounter,
  RequiredIndicator,

  // Утилиты
  getInputGap,
  getInputPadding,
  getInputMinHeight,
} from './InputStyles';

export { CharacterCounterMotion } from './CharacterCounterMotion';
export type { CharacterCounterMotionProps } from './CharacterCounterMotion';

// Общие хелперы поведения для Input/TextArea
export {
  getInputDisplayValue,
  shouldShowInputClearButton,
  hasInputRightControls,
} from './handlers';
