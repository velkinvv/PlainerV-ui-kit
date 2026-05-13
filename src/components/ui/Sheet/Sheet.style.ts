import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { Overlay } from '../Modal/Modal.style';
import type { SheetPlacement } from '../../../types/ui';
import { BorderRadiusHandler } from '../../../handlers/uiHandlers';

/**
 * Оверлей sheet: как у drawer, выравнивание по стороне.
 * @property $sheetPlacement - Сторона выезда панели
 */
export const SheetOverlay = styled(Overlay).withConfig({
  shouldForwardProp: (prop) => prop !== '$sheetPlacement',
})<{ $sheetPlacement: SheetPlacement }>`
  padding: 0 !important;
  justify-content: ${({ $sheetPlacement }) =>
    $sheetPlacement === 'right'
      ? 'flex-end'
      : $sheetPlacement === 'left'
        ? 'flex-start'
        : 'center'};
  align-items: ${({ $sheetPlacement }) =>
    $sheetPlacement === 'bottom'
      ? 'flex-end'
      : $sheetPlacement === 'top'
        ? 'flex-start'
        : 'stretch'};
  flex-direction: ${({ $sheetPlacement }) =>
    $sheetPlacement === 'top' || $sheetPlacement === 'bottom' ? 'column' : 'row'};
`;

/**
 * Панель sheet (часто нижний лист): safe-area снизу при `placement="bottom"`.
 * @property $widthCss - CSS ширина (для left/right)
 * @property $heightCss - CSS высота (для top/bottom)
 * @property $placement - Сторона (скругления у края экрана)
 */
export const SheetPanel = styled(motion.aside).withConfig({
  shouldForwardProp: (prop) => !['$widthCss', '$heightCss', '$placement'].includes(prop),
})<{
  $widthCss: string;
  $heightCss: string;
  $placement: SheetPlacement;
}>`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors?.background ?? '#ffffff'};
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  max-width: 100vw;
  max-height: 100dvh;

  ${({ $placement, $widthCss, $heightCss }) =>
    $placement === 'left' || $placement === 'right'
      ? `
    width: ${$widthCss};
    height: 100%;
    min-height: 0;
  `
      : `
    width: 100%;
    height: ${$heightCss};
    min-width: 0;
  `}

  ${({ $placement, theme }) => {
    const br = BorderRadiusHandler(theme.borderRadius);
    if ($placement === 'left') {
      return `border-radius: 0 ${br} ${br} 0;`;
    }
    if ($placement === 'right') {
      return `border-radius: ${br} 0 0 ${br};`;
    }
    if ($placement === 'top') {
      return `border-radius: 0 0 ${br} ${br};`;
    }
    return `border-radius: ${br} ${br} 0 0;`;
  }}

  ${({ $placement }) =>
    $placement === 'bottom' &&
    css`
      padding-bottom: env(safe-area-inset-bottom, 0px);
    `}
`;

export const SheetHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  padding: 16px 16px 0 16px;
`;

export const SheetHeaderSpacer = styled.span`
  flex: 1;
  min-width: 0;
`;

export const SheetTitle = styled.h2`
  margin: 0;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: ${({ theme }) => theme.typography?.h2?.fontFamily ?? 'inherit'};
  font-size: ${({ theme }) => theme.typography?.h2?.fontSize ?? '18px'};
  font-weight: ${({ theme }) => theme.typography?.h2?.fontWeight ?? 600};
  line-height: ${({ theme }) => theme.typography?.h2?.lineHeight ?? 1.3};
  color: ${({ theme }) => theme.colors?.text ?? '#111'};
`;

export const SheetBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 16px;
`;
