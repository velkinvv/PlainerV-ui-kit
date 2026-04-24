import styled, { css } from 'styled-components';
import { Size } from '../../../../types/sizes';
import { InputContainer } from '../shared/InputStyles';

/** Размеры бейджа числа выбранных по размеру поля */
const selectMultiCountBadgeDimensions = (fieldSize: Size | undefined) => {
  switch (fieldSize) {
    case Size.XS:
      return css`
        min-width: 16px;
        height: 16px;
        padding: 0 4px;
        font-size: 10px;
      `;
    case Size.SM:
      return css`
        min-width: 18px;
        height: 18px;
        padding: 0 4px;
        font-size: 11px;
      `;
    case Size.LG:
      return css`
        min-width: 22px;
        height: 22px;
        padding: 0 5px;
        font-size: 13px;
      `;
    case Size.XL:
      return css`
        min-width: 24px;
        height: 24px;
        padding: 0 6px;
        font-size: 14px;
      `;
    default:
      return css`
        min-width: 20px;
        height: 20px;
        padding: 0 5px;
        font-size: 12px;
      `;
  }
};

/**
 * Нативный `select` визуально как текстовое поле: без системной стрелки, кастомный шеврон снаружи.
 * @property textAlign - Выравнивание текста внутри поля.
 */
export const StyledSelect = styled.select.withConfig({
  shouldForwardProp: (prop) => !['textAlign'].includes(prop),
})<{
  textAlign?: 'left' | 'center' | 'right';
}>`
  flex: 1;
  min-width: 0;
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  color: ${({ theme }) => theme.colors.text};
  text-align: ${({ textAlign = 'left' }) => textAlign};
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:disabled {
    color: ${({ theme }) => theme.colors.textTertiary};
    cursor: not-allowed;
  }
`;

/**
 * Слот под иконку-шеврон справа: не перехватывает клики (клик попадает в нативный `select`).
 */
export const SelectChevronSlot = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: 8px;
  pointer-events: none;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/**
 * Шеврон вниз при закрытом меню; при открытом — поворот 180° (шеврон вверх).
 * @property $isOpen - Меню раскрыто.
 */
/**
 * Бейдж с числом выбранных в мультиселекте (тёмный фон, светлый текст), слева от шеврона.
 * @property $fieldSize - Размер поля `Select.size` для масштаба капсулы и шрифта.
 */
export const SelectMultiCountBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== '$fieldSize',
})<{ $fieldSize?: Size }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: 8px;
  box-sizing: border-box;
  border-radius: 9999px;
  font-weight: 600;
  line-height: 1;
  pointer-events: none;
  background: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.backgroundSecondary};
  ${({ $fieldSize }) => selectMultiCountBadgeDimensions($fieldSize)}
`;

export const SelectChevronFlip = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== '$isOpen',
})<{ $isOpen?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`;

/**
 * Кнопка-триггер панельного режима (`mode="select"`): визуально как текст, раскрывает `Dropdown`.
 * @property textAlign - Выравнивание подписи выбранного значения.
 */
export const SelectTriggerButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['textAlign', '$isPlaceholder'].includes(prop),
})<{
  textAlign?: 'left' | 'center' | 'right';
  /** Пустое состояние с плейсхолдером — цвет текста как у подсказки в макете. */
  $isPlaceholder?: boolean;
}>`
  flex: 1;
  min-width: 0;
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font: inherit;
  color: ${({ theme, $isPlaceholder }) =>
    $isPlaceholder ? theme.colors.textTertiary : 'inherit'};
  cursor: pointer;
  text-align: ${({ textAlign = 'left' }) => textAlign};
  padding: 0;

  &:disabled {
    cursor: not-allowed;
  }
`;

/**
 * Поле ввода в триггере (`mode="searchSelect"`): внешний вид как у кнопки-триггера, курсор текстовый.
 * @property textAlign - Выравнивание текста.
 * @property $isPlaceholder - Стиль плейсхолдера (пустое значение).
 */
export const SelectTriggerInput = styled.input.withConfig({
  shouldForwardProp: (prop) => !['textAlign', '$isPlaceholder'].includes(prop),
})<{
  textAlign?: 'left' | 'center' | 'right';
  $isPlaceholder?: boolean;
}>`
  flex: 1;
  min-width: 0;
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font: inherit;
  color: ${({ theme, $isPlaceholder }) =>
    $isPlaceholder ? theme.colors.textTertiary : 'inherit'};
  cursor: text;
  text-align: ${({ textAlign = 'left' }) => textAlign};
  padding: 0;

  &:disabled {
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
  }
`;

/**
 * Скрытый нативный `select` для отправки формы и совместимости с `ref` при `mode="select"`.
 */
export const VisuallyHiddenSelect = styled.select`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
  opacity: 0;
  pointer-events: none;
`;

/** Корень панельного селекта: якорь для скрытого нативного `select` с `position: absolute`. */
export const SelectPanelRoot = styled(InputContainer)`
  position: relative;
`;

/**
 * Обёртка триггера + выпадающего меню: ширина и выравнивание без inline-стилей.
 * @property $fullWidth - На всю ширину родителя.
 */
export const SelectDropdownAnchor = styled.div<{ $fullWidth?: boolean }>`
  position: relative;
  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
      align-self: stretch;
    `}
`;
