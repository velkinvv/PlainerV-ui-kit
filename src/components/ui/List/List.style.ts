import styled, { css } from 'styled-components';
import { createStyledShouldForwardProp } from '../../../handlers/styledComponentHandlers';
import type { ListMarkerStyle } from '../../../types/ui';

/** Кириллические счётчики для буквенных маркеров */
const cyrillicCounterStyles = css`
  @counter-style lower-cyrillic-list {
    system: fixed;
    symbols: а б в г д е ж з и к л м н о п р с т у ф х ц ч ш щ ы э ю я;
  }

  @counter-style upper-cyrillic-list {
    system: fixed;
    symbols: А Б В Г Д Е Ж З И К Л М Н О П Р С Т У Ф Х Ц Ч Ш Щ Ы Э Ю Я;
  }
`;

/**
 * CSS content маркера по стилю.
 * @param markerStyle - Стиль маркера
 */
const markerContentCss = (markerStyle: ListMarkerStyle) => {
  switch (markerStyle) {
    case 'lower-letters':
      return css`
        ${cyrillicCounterStyles}
        content: counter(ui-list-counter, lower-cyrillic-list) ')';
      `;
    case 'upper-letters':
      return css`
        ${cyrillicCounterStyles}
        content: counter(ui-list-counter, upper-cyrillic-list) ')';
      `;
    case 'virgule':
      return css`
        content: '—';
      `;
    case 'numbers':
      return css`
        content: counters(ui-list-counter, '.') '.';
      `;
    case 'bullet':
      return css`
        content: '•';
        font-size: 18px;
        color: ${({ theme }) => theme.colors.textSecondary};
      `;
    case 'icon':
    default:
      return css`
        content: none;
      `;
  }
};

type ListRootProps = {
  $gapCss: string;
  $markerStyle: ListMarkerStyle;
  $markerSlotSize: number;
  $fontSize: string;
  $lineHeight: string;
  $showCssMarker: boolean;
};

/**
 * Корень списка (`ol` / `ul`).
 * @property $gapCss - Расстояние между пунктами
 * @property $markerStyle - Стиль маркера
 * @property $showCssMarker - Рисовать маркер через `::before`
 */
export const ListRoot = styled.ul.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<ListRootProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $gapCss }) => $gapCss};
  padding: 0;
  margin: 0;
  list-style: none;
  counter-reset: ui-list-counter 0;
  box-sizing: border-box;
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ $fontSize }) => $fontSize};
  line-height: ${({ $lineHeight }) => $lineHeight};
  color: ${({ theme }) => theme.colors.text};

  & > li > .ui-list {
    margin-top: ${({ $gapCss }) => $gapCss};
  }

  ${({ $showCssMarker, $markerStyle, $markerSlotSize }) =>
    $showCssMarker &&
    css`
      & > .ui-list-item::before {
        display: inline-flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: ${$markerStyle === 'numbers' ||
        $markerStyle === 'lower-letters' ||
        $markerStyle === 'upper-letters'
          ? 'flex-start'
          : 'center'};
        box-sizing: border-box;
        margin-inline-end: 8px;
        min-width: ${$markerStyle === 'numbers' ? 'auto' : `${$markerSlotSize}px`};
        width: ${$markerStyle === 'bullet' || $markerStyle === 'virgule'
          ? `${$markerSlotSize}px`
          : 'auto'};
        height: ${$markerSlotSize}px;
        ${markerContentCss($markerStyle)}
      }
    `}
`;

/**
 * Пункт списка.
 */
export const ListItemRoot = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  counter-increment: ui-list-counter 1;
  box-sizing: border-box;
  min-width: 0;
`;

/**
 * Контент пункта (текст + вложенные списки).
 */
export const ListItemContent = styled.div`
  display: block;
  min-width: 0;
  flex: 1 1 auto;
`;

/**
 * Слот иконки-маркера.
 * @property $slotSize - Ширина/высота слота
 */
export const ListIconRoot = styled.span.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{ $slotSize: number }>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${({ $slotSize }) => `${$slotSize}px`};
  height: ${({ $slotSize }) => `${$slotSize}px`};
  margin-inline-end: 8px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 0;

  svg {
    display: block;
  }
`;
