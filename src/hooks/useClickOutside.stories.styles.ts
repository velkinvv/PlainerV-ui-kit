import styled from 'styled-components';
import { lightTheme } from '@/themes/themes';

/**
 * Строка опции в демо-дропдауне useClickOutside.
 * Нативная кнопка с type="button"; hover через токены темы (без инлайнового DOM-mutation).
 *
 * @property $withBottomDivider — показывать разделитель снизу (не у последнего пункта)
 */
export const ClickOutsideDropdownOptionButton = styled.button.attrs({ type: 'button' })<{
  $withBottomDivider: boolean;
}>`
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  padding: 8px 12px;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: ${lightTheme.colors.text};
  border: none;
  background-color: ${lightTheme.colors.backgroundSecondary};
  border-bottom: ${({ $withBottomDivider }) =>
    $withBottomDivider ? `1px solid ${lightTheme.colors.borderSecondary}` : 'none'};

  &:hover {
    background-color: ${lightTheme.colors.backgroundTertiary};
  }
`;
