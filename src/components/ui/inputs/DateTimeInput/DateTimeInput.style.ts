import styled from 'styled-components';
import { createStyledShouldForwardProp } from '../../../../handlers/styledComponentHandlers';
import { overlayPanelBoxShadowFromTheme, overlayPanelSurfaceCss } from '../../../../handlers/overlayPanelShadowHandlers';
import { BorderRadiusHandler, TransitionHandler } from '../../../../handlers/uiHandlers';
import { Size } from '../../../../types/sizes';

export {
  DateInputFieldStack,
  LeftLabel,
  RightLabel,
  ErrorMessage,
  ExtraText,
  CharacterCounter,
  IconButton,
} from '../DateInput/DateInput.style';

/** Попап даты и времени: календарь + выбор времени */
export const DateTimePopup = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(['$portaled', '$calendarFullWidth', '$range', '$showSeconds']),
})<{
  isOpen: boolean;
  size?: Size;
  $calendarFullWidth?: boolean;
  $portaled?: boolean;
  /** Режим диапазона — шире попап под два блока времени */
  $range?: boolean;
  /** Колонка секунд — дополнительная ширина */
  $showSeconds?: boolean;
}>`
  position: ${({ $portaled }) => ($portaled ? 'fixed' : 'absolute')};
  ${({ $portaled }) =>
    !$portaled &&
    `
      top: 100%;
      left: 0;
    `}
  width: ${({ $calendarFullWidth }) => ($calendarFullWidth ? '100%' : 'max-content')};
  max-width: 100%;
  ${({ theme }) => overlayPanelSurfaceCss(theme)}
  border: 2px solid ${({ theme }) => theme.colors.borderSecondary};
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  box-shadow: ${({ theme }) => overlayPanelBoxShadowFromTheme(theme)};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transform: ${({ isOpen, $portaled }) =>
    $portaled ? 'none' : isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: ${TransitionHandler()};
  margin-top: ${({ $portaled }) => ($portaled ? '0' : '4px')};
  padding: 16px;
  min-width: ${({ $range, $showSeconds }) => {
    if ($range) {
      return $showSeconds ? '920px' : '760px';
    }
    return $showSeconds ? '620px' : '520px';
  }};
`;

/** Горизонтальная раскладка: календарь слева, время справа */
export const DateTimePickerBody = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;
`;

/** Колонка с календарём */
export const DateTimeCalendarColumn = styled.div`
  flex: 0 0 auto;
  min-width: 0;
`;

/** Блок выбора времени справа от календаря */
export const DateTimeTimeSection = styled.div`
  flex: 1 1 auto;
  min-width: 0;
  margin-top: 0;
  padding-top: 0;
  padding-left: 16px;
  border-top: none;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
`;

/** Заголовок блока выбора времени */
export const DateTimeTimeSectionTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 8px;
  text-transform: uppercase;
`;

/** Футер попапа с кнопками */
export const DateTimePopupFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

/** Контейнер двух пикеров времени в режиме диапазона */
export const DateTimeRangeTimePickers = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: flex-start;
`;

/** Блок одного пикера времени в диапазоне */
export const DateTimeRangeTimePickerBlock = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $isActive?: boolean }>`
  flex: 1 1 0;
  min-width: 0;
  border: 1px solid
    ${({ theme, $isActive }) =>
      $isActive
        ? (theme.buttons?.variants?.primary?.background ?? theme.colors.primary)
        : theme.colors.borderSecondary};
  border-radius: ${({ theme }) => BorderRadiusHandler(theme.borderRadius)};
  padding: 8px;
  background: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.backgroundSecondary : theme.colors.backgroundTertiary};
  cursor: pointer;
`;

/** Подпись блока времени в диапазоне */
export const DateTimeRangeTimePickerLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 8px;
`;
