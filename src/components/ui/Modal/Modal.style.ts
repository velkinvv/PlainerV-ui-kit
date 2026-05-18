import styled, { type DefaultTheme } from 'styled-components';
import { motion } from 'framer-motion';
import { ModalSize } from '../../../types/sizes';
import {
  getModalContainerStyles,
  getModalOverlayStyles,
  getModalComponentStyles,
  getModalSize,
} from '../../../handlers/modalThemeHandlers';

/**
 * Оверлей модального окна
 */
type OverlayCss = string;
type ModalVariant = 'default' | 'danger' | 'success' | 'info';
type OverlayVariant = 'default' | 'blur' | 'dark' | 'frosted';

type OverlayVariantTokens = {
  background?: string;
  backdropFilter?: string;
  extraCss?: string;
};

type ModalVariantOverride = {
  headerBackground?: string;
  titleColor?: string;
};

type ModalThemeOverrides = {
  overlayVariants?: Record<string, OverlayVariantTokens>;
  mobilePadding?: string;
  variants?: Record<string, ModalVariantOverride>;
};

const getModalThemeOverrides = (theme: DefaultTheme): ModalThemeOverrides =>
  (theme.modals as ModalThemeOverrides) || {};

const overlayVariantPresets: Record<OverlayVariant, OverlayVariantTokens> = {
  default: {},
  blur: {
    background: 'rgba(15, 23, 42, 0.55)',
    backdropFilter: 'blur(8px)',
  },
  dark: {
    background: 'rgba(7, 10, 16, 0.85)',
  },
  frosted: {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(16px) saturate(160%)',
  },
};

const modalVariantStyles: Record<
  ModalVariant,
  {
    headerBackground?: string;
    titleColor?: string;
  }
> = {
  default: {
    headerBackground: 'transparent',
    titleColor: '#1f2937',
  },
  danger: {
    headerBackground: '#fef2f2',
    titleColor: '#b91c1c',
  },
  success: {
    headerBackground: '#ecfdf5',
    titleColor: '#047857',
  },
  info: {
    headerBackground: '#eff6ff',
    titleColor: '#1d4ed8',
  },
};

const getThemeVariantOverrides = (theme: DefaultTheme, variant: ModalVariant) =>
  getModalThemeOverrides(theme).variants?.[variant];

const getOverlayVariantFromTheme = (theme: DefaultTheme, variant: OverlayVariant) =>
  getModalThemeOverrides(theme).overlayVariants?.[variant];

export const Overlay = styled(motion.div)<{
  $mobile?: boolean;
  $overlayCss?: OverlayCss;
  $overlayVariant?: OverlayVariant;
}>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({
    theme,
    $mobile,
    $overlayCss,
    $overlayVariant = 'default',
  }: {
    theme: DefaultTheme;
    $mobile?: boolean;
    $overlayCss?: OverlayCss;
    $overlayVariant?: OverlayVariant;
  }) => {
    const overlayStyles = getModalOverlayStyles(theme.modals);
    const overrides = getModalThemeOverrides(theme);
    const variantOverrides = getOverlayVariantFromTheme(theme, $overlayVariant);
    const variantPreset = overlayVariantPresets[$overlayVariant];
    const background =
      variantOverrides?.background ?? variantPreset.background ?? overlayStyles.background;
    const backdropFilter =
      variantOverrides?.backdropFilter ??
      variantPreset.backdropFilter ??
      overlayStyles.backdropFilter;
    const extraCss = variantOverrides?.extraCss ?? variantPreset.extraCss ?? '';
    const mobilePadding = overrides.mobilePadding ?? '0';
    return `
      background: ${background};
      backdrop-filter: ${backdropFilter};
      padding: ${overlayStyles.padding};
      z-index: ${overlayStyles.zIndex};
      ${
        $mobile
          ? `
        align-items: flex-start;
        padding: ${mobilePadding};
      `
          : ''
      }
      ${extraCss}
      ${$overlayCss ?? ''}
    `;
  }}
`;

/**
 * Контейнер модального окна
 * @param size - размер модального окна
 */
export const ModalContainer = styled(motion.div)<{ size: ModalSize; $mobile?: boolean }>`
  background: #ffffff;
  box-shadow: 0px 16px 32px 0px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  ${({ theme, size = ModalSize.MD, $mobile }) => {
    const containerStyles = getModalContainerStyles(theme.modals, size);
    const sizeStyles = getModalSize(theme.modals, size);

    return `
      width: ${containerStyles.width};
      max-width: ${containerStyles.maxWidth};
      padding: ${containerStyles.padding};
      border-radius: ${containerStyles.borderRadius};
      max-height: ${containerStyles.maxHeight};
      font-family: ${containerStyles.fontFamily};
      z-index: ${containerStyles.zIndex};
      ${
        size === ModalSize.FULL && 'height' in sizeStyles && sizeStyles.height
          ? `height: ${sizeStyles.height};`
          : ''
      }
      ${
        $mobile
          ? `
        width: 100%;
        max-width: 100%;
        height: 100%;
        border-radius: 0;
        margin: 0;
      `
          : ''
      }
    `;
  }}
`;

/**
 * Заголовок модального окна
 */
export const ModalHeader = styled.div<{ $variant: ModalVariant }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
  margin-bottom: 12px;

  ${({ theme, $variant }: { theme: DefaultTheme; $variant: ModalVariant }) => {
    const headerStyles = getModalComponentStyles(theme.modals).header;
    const variant = modalVariantStyles[$variant];

    const background =
      getThemeVariantOverrides(theme, $variant)?.headerBackground ??
      variant.headerBackground ??
      'transparent';

    return `
      padding: ${headerStyles.padding};
      border-bottom: ${headerStyles.borderBottom};
      background: ${background};
    `;
  }}
`;

export const ModalHeaderTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

export const ModalHeaderIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

/**
 * Заголовок модального окна
 */
export const ModalTitle = styled.h2<{ $variant: ModalVariant }>`
  margin: 0;
  padding: 0;
  flex: 1;
  display: block;

  ${({ theme, $variant }: { theme: DefaultTheme; $variant: ModalVariant }) => {
    const titleStyles = getModalComponentStyles(theme.modals).title;
    const variant = modalVariantStyles[$variant];

    const themeOverrides = getThemeVariantOverrides(theme, $variant);
    const titleColor = themeOverrides?.titleColor ?? variant.titleColor ?? titleStyles.color;
    return `
      font-size: ${titleStyles.fontSize};
      font-weight: ${titleStyles.fontWeight};
      line-height: ${titleStyles.lineHeight};
      color: ${titleColor};
    `;
  }}
`;

/**
 * Кнопка закрытия модального окна
 */
export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  padding: 0;
  margin: 0;

  ${({ theme }) => {
    const closeButtonStyles = getModalComponentStyles(theme.modals).closeButton;
    return `
      width: ${closeButtonStyles.width};
      height: ${closeButtonStyles.height};
      border-radius: ${closeButtonStyles.borderRadius};
      color: ${closeButtonStyles.color};
    `;
  }}

  svg {
    width: 26px;
    height: 26px;
  }

  &:hover {
    ${({ theme }) => {
      const closeButtonStyles = getModalComponentStyles(theme.modals).closeButton;
      return `
        background: ${closeButtonStyles.hoverBackground};
      `;
    }}

    svg {
      ${({ theme }) => {
        const closeButtonStyles = getModalComponentStyles(theme.modals).closeButton;
        return `
          color: ${closeButtonStyles.hoverColor};
        `;
      }}
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  }
`;

/**
 * Контент модального окна
 */
export const ModalContent = styled.div`
  flex: 1;
  overflow-y: auto;
  width: 100%;
  margin-bottom: 0;

  ${({ theme }) => {
    const contentStyles = getModalComponentStyles(theme.modals).content;
    return `
      padding: ${contentStyles.padding};
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5em;
      color: #757575;
    `;
  }}

  p {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5em;
    color: #757575;
  }
`;

export const ModalContentIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin-bottom: 12px;
`;

/**
 * Футер модального окна
 */
export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
  background: transparent;

  ${({ theme }) => {
    const footerStyles = getModalComponentStyles(theme.modals).footer;
    return `
      padding: ${footerStyles.padding};
      border-top: ${footerStyles.borderTop};
      margin-top: ${footerStyles.marginTop};
    `;
  }}
`;

/**
 * Действия модального окна
 */
export const ModalActions = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1.5rem;
`;

/**
 * Контейнер для кнопок модального окна
 */
export const ModalButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
  margin-top: 12px;
`;

export const ModalButtonsIcon = styled.div`
  margin-right: auto;
  display: flex;
  align-items: center;
  font-size: 20px;
`;

/**
 * Описание модального окна
 */
export const ModalDescription = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
`;
