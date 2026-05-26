import styled, { css } from 'styled-components';
import { createStyledShouldForwardProp } from '@/handlers/styledComponentHandlers';
import {
  formatTableBodyScrollMaxHeight,
  PLAINER_TABLE_BODY_SCROLLBAR_GUTTER_CSS_VAR,
} from './tableBodyScrollHandlers';
import { PLAINER_TABLE_HEADER_BACKGROUND_CSS_VAR } from './tableThemeRadiusHandlers';
import type { NormalizedTableSurfaceBackgrounds } from './tableSurfaceBackgroundHandlers';
import {
  normalizeTableSurfaceBackgrounds,
  resolveTableHeaderSurfaceBackgroundColor,
} from './tableSurfaceBackgroundHandlers';
import type { TableScrollClipCornerMode } from './tableScrollClipCornerRadiusHandlers';
import { tableScrollClipCornerRadiusCss } from './tableScrollClipCornerRadiusHandlers';

const defaultTableSurfaceBackgrounds = normalizeTableSurfaceBackgrounds();

/** Корень split-layout: шапка + прокручиваемое тело. */
export const TableBodyScrollSplitRoot = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
`;

/**
 * Блок шапки вне вертикального скролла.
 * `padding-right` = ширина вертикального скроллбара тела, чтобы окно шапки совпадало с `clientWidth` тела.
 * @property $surfaces — прозрачные фоны (для fallback фона шапки)
 */
export const TableBodyScrollSplitHeader = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{
  $surfaces?: NormalizedTableSurfaceBackgrounds;
  $cornerMode: TableScrollClipCornerMode;
}>`
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  padding-right: var(${PLAINER_TABLE_BODY_SCROLLBAR_GUTTER_CSS_VAR}, 0px);
  background: ${({ theme, $surfaces = defaultTableSurfaceBackgrounds }) =>
    `var(${PLAINER_TABLE_HEADER_BACKGROUND_CSS_VAR}, ${resolveTableHeaderSurfaceBackgroundColor($surfaces, theme.tables.header.background)})`};
  ${({ theme, $cornerMode }) => tableScrollClipCornerRadiusCss(theme, $cornerMode)}
`;

/** Панель иконок над колонками: ширина видимой области, без горизонтального скролла. */
export const TableBodyScrollSplitHeaderToolbar = styled.div`
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  min-width: 0;
  overflow: hidden;
`;

/**
 * Горизонтальный скролл заголовков колонок синхронизируется с телом через `scrollLeft` (без полосы).
 */
export const TableBodyScrollSplitHeaderInner = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/**
 * Скролл только у строк: обе оси на одном треке (иначе overflow-x: hidden у родителя обрезает горизонтальную полосу).
 * @property $bodyScrollMaxHeight — лимит высоты зоны строк
 * @property $horizontalScroll — горизонтальный скролл широкой сетки
 */
export const TableBodyScrollSplitBodyTrackVertical = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<{
  $bodyScrollMaxHeight: string | number;
  $horizontalScroll?: boolean;
  $cornerMode: TableScrollClipCornerMode;
}>`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  flex: 1 1 auto;
  min-height: 0;
  max-height: ${({ $bodyScrollMaxHeight }) => formatTableBodyScrollMaxHeight($bodyScrollMaxHeight)};
  ${({ theme, $cornerMode }) => tableScrollClipCornerRadiusCss(theme, $cornerMode)}
  /* scroll — полоса X видна в Chromium/Windows; при auto часто только жест тачпада */
  overflow-x: ${({ $horizontalScroll = true }) => ($horizontalScroll ? 'scroll' : 'hidden')};
  overflow-y: auto;

  ${({ $horizontalScroll = true }) =>
    $horizontalScroll &&
    css`
      overscroll-behavior-x: contain;
    `}
`;

/** Обёртка таблицы тела — ширина = таблица, без лишнего блока в горизонтальном скролле. */
export const TableBodyScrollSplitBodyInner = styled.div`
  box-sizing: border-box;
  display: block;
  width: 100%;
  min-width: max-content;
`;
