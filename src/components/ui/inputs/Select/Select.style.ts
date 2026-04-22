import styled from 'styled-components';

/**
 * Нативный `select` визуально как текстовое поле: без системной стрелки, кастомная иконка снаружи.
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
 * Кнопка-триггер панельного режима (`mode="select"`): визуально как текст, раскрывает `Dropdown`.
 * @property textAlign - Выравнивание подписи выбранного значения.
 */
export const SelectTriggerButton = styled.button.withConfig({
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
  font: inherit;
  color: inherit;
  cursor: pointer;
  text-align: ${({ textAlign = 'left' }) => textAlign};
  padding: 0;

  &:disabled {
    cursor: not-allowed;
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
