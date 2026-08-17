import styled from 'styled-components';
import { createStyledShouldForwardProp } from '../../../handlers/styledComponentHandlers';
import { LAYOUT_HEADER_PADDING_INLINE_PX, LAYOUT_ZERO_WIDTH_TRIGGER_SIZE_PX } from './handlers';

type LayoutRootStyleProps = {
  $direction: 'row' | 'column';
  $minHeight: string;
  $height: string;
  $overflow: string;
};

/**
 * Корень каркаса.
 * @property $direction - row при сайдбаре, иначе column
 * @property $minHeight - min-height
 * @property $height - height (content-скролл)
 * @property $overflow - overflow корня
 */
export const LayoutRoot = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<LayoutRootStyleProps>`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  flex-direction: ${({ $direction }) => $direction};
  box-sizing: border-box;
  width: 100%;
  min-height: ${({ $minHeight }) => $minHeight};
  height: ${({ $height }) => $height};
  overflow: ${({ $overflow }) => $overflow};
  background: ${({ theme }) => theme.colors?.background};
  color: ${({ theme }) => theme.colors?.text};
`;

type LayoutHeaderStyleProps = {
  $sticky: boolean;
};

/**
 * Шапка каркаса.
 * @property $sticky - position sticky
 */
export const LayoutHeaderSlot = styled.header.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<LayoutHeaderStyleProps>`
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: ${({ theme }) => `${theme.sizes?.header?.height ?? 64}px`};
  padding-inline: ${LAYOUT_HEADER_PADDING_INLINE_PX}px;
  background: ${({ theme }) => theme.colors?.backgroundSecondary};
  color: ${({ theme }) => theme.colors?.text};
  border-block-end: 1px solid ${({ theme }) => theme.colors?.border};
  position: ${({ $sticky }) => ($sticky ? 'sticky' : 'relative')};
  inset-block-start: ${({ $sticky }) => ($sticky ? '0' : 'auto')};
  z-index: ${({ $sticky, theme }) => ($sticky ? (theme.zIndex?.header ?? 1000) : 'auto')};
`;

/**
 * Подвал каркаса.
 */
export const LayoutFooterSlot = styled.footer.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})`
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: ${({ theme }) => `${theme.sizes?.footer?.height ?? 60}px`};
  padding-inline: ${LAYOUT_HEADER_PADDING_INLINE_PX}px;
  background: ${({ theme }) => theme.colors?.backgroundSecondary};
  color: ${({ theme }) => theme.colors?.text};
  border-block-start: 1px solid ${({ theme }) => theme.colors?.border};
`;

type LayoutContentStyleProps = {
  $scrollContent: boolean;
  $order: number;
};

/**
 * Основная область.
 * @property $scrollContent - overflow auto при scrollMode content
 * @property $order - flex order
 */
export const LayoutContentSlot = styled.main.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<LayoutContentStyleProps>`
  box-sizing: border-box;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  order: ${({ $order }) => $order};
  overflow: ${({ $scrollContent }) => ($scrollContent ? 'auto' : 'visible')};
  background: ${({ theme }) => theme.colors?.background};
  color: ${({ theme }) => theme.colors?.text};
`;

type LayoutSidebarStyleProps = {
  $widthCss: string;
  $order: number;
  $sticky: boolean;
  $placement: 'start' | 'end';
  $position: 'relative' | 'absolute' | 'sticky';
  $transitionMs: number;
};

/**
 * Боковая колонка.
 * @property $widthCss - Ширина
 * @property $order - flex order
 * @property $sticky - растяжение
 * @property $placement - start | end
 * @property $position - relative, sticky или absolute
 * @property $transitionMs - Длительность ширины
 */
export const LayoutSidebarSlot = styled.aside.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<LayoutSidebarStyleProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: ${({ $widthCss }) => $widthCss};
  min-width: ${({ $widthCss }) => $widthCss};
  order: ${({ $order }) => $order};
  position: ${({ $position }) => $position};
  inset-block: ${({ $position }) => ($position === 'absolute' ? '0' : 'auto')};
  inset-inline-start: ${({ $position, $placement }) =>
    $position === 'absolute' && $placement === 'start' ? '0' : 'auto'};
  inset-inline-end: ${({ $position, $placement }) =>
    $position === 'absolute' && $placement === 'end' ? '0' : 'auto'};
  align-self: stretch;
  top: ${({ $position }) => ($position === 'sticky' ? '0' : 'auto')};
  z-index: ${({ $position, theme }) =>
    $position === 'absolute' || $position === 'sticky' ? (theme.zIndex?.header ?? 1000) : 'auto'};
  overflow: hidden;
  background: ${({ theme }) => theme.colors?.backgroundSecondary};
  color: ${({ theme }) => theme.colors?.text};
  border-inline-end: ${({ $placement, theme }) =>
    $placement === 'start' ? `1px solid ${theme.colors?.border}` : 'none'};
  border-inline-start: ${({ $placement, theme }) =>
    $placement === 'end' ? `1px solid ${theme.colors?.border}` : 'none'};
  box-shadow: ${({ $position, theme }) =>
    $position === 'absolute' ? (theme.boxShadow?.md ?? theme.colors?.shadow ?? 'none') : 'none'};
  transition: width ${({ $transitionMs }) => $transitionMs}ms ease,
    min-width ${({ $transitionMs }) => $transitionMs}ms ease;

  &[aria-hidden='true'] {
    visibility: hidden;
    pointer-events: none;
  }
`;

/**
 * Тело сайдбара (контент).
 */
export const LayoutSidebarBody = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
`;

/**
 * Низ сайдбара с триггером.
 */
export const LayoutSidebarTriggerBar = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  padding: 8px;
`;

type LayoutSidebarTriggerIconStyleProps = {
  $rotationDeg: number;
};

/**
 * Иконка шеврона триггера.
 * @property $rotationDeg - Поворот
 */
export const LayoutSidebarTriggerIcon = styled.span.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<LayoutSidebarTriggerIconStyleProps>`
  display: inline-flex;
  line-height: 0;
  transform: rotate(${({ $rotationDeg }) => $rotationDeg}deg);
`;

type LayoutSidebarGutterStyleProps = {
  $widthCss: string;
  $order: number;
};

/**
 * Spacer в потоке, когда сайдбар в overlay.
 * @property $widthCss - Ширина gutter
 * @property $order - Как у сайдбара
 */
export const LayoutSidebarGutter = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<LayoutSidebarGutterStyleProps>`
  flex-shrink: 0;
  width: ${({ $widthCss }) => $widthCss};
  min-width: ${({ $widthCss }) => $widthCss};
  order: ${({ $order }) => $order};
  pointer-events: none;
`;

type LayoutZeroWidthTriggerSlotStyleProps = {
  $placement: 'start' | 'end';
};

/**
 * Кнопка у края при collapsedWidth 0.
 * @property $placement - Логическая сторона
 */
export const LayoutZeroWidthTriggerSlot = styled.div.withConfig({
  shouldForwardProp: createStyledShouldForwardProp(),
})<LayoutZeroWidthTriggerSlotStyleProps>`
  position: absolute;
  inset-block-start: 50%;
  transform: translateY(-50%);
  inset-inline-start: ${({ $placement }) => ($placement === 'start' ? '0' : 'auto')};
  inset-inline-end: ${({ $placement }) => ($placement === 'end' ? '0' : 'auto')};
  z-index: ${({ theme }) => theme.zIndex?.header ?? 1000};
  width: ${LAYOUT_ZERO_WIDTH_TRIGGER_SIZE_PX}px;
  height: ${LAYOUT_ZERO_WIDTH_TRIGGER_SIZE_PX}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors?.backgroundSecondary};
  color: ${({ theme }) => theme.colors?.text};
  border: 1px solid ${({ theme }) => theme.colors?.border};
`;
