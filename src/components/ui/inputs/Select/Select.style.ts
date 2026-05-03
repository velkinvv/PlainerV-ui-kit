import styled, { css } from 'styled-components';
import { InputContainer } from '../shared/InputStyles';

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
 * Слот под иконку-шеврон справа: кликабелен — в `SelectNative` открывает нативный список,
 * в `SelectPanel` — `onMouseDown`/`onClick` со `stopPropagation`, чтобы не было двойного переключения с обёрткой `Dropdown`.
 */
export const SelectChevronSlot = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: 8px;
  pointer-events: auto;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/**
 * Шеврон вниз при закрытом меню; при открытом — поворот 180° (шеврон вверх).
 * @property $isOpen - Меню раскрыто.
 */
/** Слот для `Badge` счётчика выбранных в мультиселекте: отступ слева от триггера; далее в ряду — «очистить всё», шеврон. */
export const SelectMultiCountBadgeSlot = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  margin-left: 8px;
  pointer-events: none;
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
 * Фокусируемая область мультиселекта: чипы и плейсхолдер (не `button`, чтобы внутри были кнопки удаления чипа).
 * @property $disabled - Недоступное поле: курсор и прозрачность.
 * @property $textAlign - Выравнивание ряда чипов / плейсхолдера.
 */
export const SelectMultiTriggerRoot = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$disabled', '$textAlign'].includes(prop),
})<{
  $disabled?: boolean;
  $textAlign?: 'left' | 'center' | 'right';
}>`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 4px;
  overflow-x: hidden;
  overflow-y: hidden;
  box-sizing: border-box;
  border: none;
  outline: none;
  background: transparent;
  font: inherit;
  line-height: 1.25;
  text-align: ${({ $textAlign = 'left' }) => $textAlign};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  padding: 0;
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  &:focus-visible {
    outline: none;
  }
`;

/**
 * Плейсхолдер в мультитриггере при пустом выборе.
 * @property $isPlaceholder - Стиль вторичного текста.
 */
export const SelectMultiPlaceholder = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== '$isPlaceholder',
})<{ $isPlaceholder?: boolean }>`
  min-width: 0;
  line-height: 1.25;
  color: ${({ theme, $isPlaceholder }) =>
    $isPlaceholder ? theme.colors.textTertiary : 'inherit'};
`;

/** Обёртка одного чипа (капсула с подписью и кнопкой снятия). */
export const SelectMultiChip = styled.span`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  max-width: 100%;
  gap: 2px;
  padding: 0 4px 0 8px;
  line-height: 1.25;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.backgroundTertiary};
  color: ${({ theme }) => theme.colors.text};
  box-sizing: border-box;
`;

/** Текст чипа с обрезкой длинных подписей. */
export const SelectMultiChipLabel = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font: inherit;
`;

/** Удаление одного значения из мультивыбора (иконка в чипе); атрибут `disabled` — недоступное поле. */
export const SelectMultiChipRemove = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  width: 18px;
  height: 18px;
  border: none;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 1px;
  }
`;

/**
 * Кнопка «очистить весь мультивыбор» (иконка крестика) между чипами и шевроном.
 * @property $compact — в одной строке с чипами: без вертикальных отступов, фиксированный квадрат, чтобы высота поля не «прыгала».
 * Атрибут `disabled` — поле `disabled` / `readOnly` / загрузка.
 */
export const SelectMultiClearAllBtn = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== '$compact',
})<{ $compact?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin: 0 0 0 4px;
  border: none;
  border-radius: 4px;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: color 0.15s ease;
  box-sizing: border-box;
  width: 22px;
  height: 22px;
  line-height: 0;

  ${({ $compact }) =>
    $compact
      ? css`
          padding: 0;
        `
      : css`
          padding: 0;
        `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.text};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

/**
 * Ссылка «Выбрать все» в подвале панели `Dropdown` (только неотключённые опции).
 * Используйте атрибут `disabled`, когда нет доступных пунктов, все уже выбраны или поле недоступно.
 */
export const SelectMultiSelectAllFooterBtn = styled.button`
  display: block;
  width: 100%;
  margin: 0;
  padding: 4px 0 0;
  border: none;
  background: none;
  text-align: left;
  font: inherit;
  font-size: 13px;
  line-height: 1.35;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary};

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.textTertiary};
  }

  &:hover:not(:disabled) {
    text-decoration: underline;
  }
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
