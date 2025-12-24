import { getColor } from '../themes/colors/colorTheme';
import { Size, IconSize } from '../types/sizes';
import type { ColorTheme, ThemeMode } from '../types/theme';
// import { getColor } from '../themes/theme';

// Хендлеры для размеров кнопок согласно Figma макету
export const ButtonSizeHandler = (size: Size = Size.MD): string => {
  const sizeMap: Record<Size, string> = {
    [Size.XS]: '28px', // xs в макете
    [Size.SM]: '32px', // sm в макете
    [Size.MD]: '36px', // md в макете
    [Size.LG]: '40px', // lg в макете
    [Size.XL]: '64px', // дополнительный размер
  };
  return sizeMap[size];
};

export const ButtonPaddingHandler = (size: Size = Size.MD): string => {
  const paddingMap: Record<Size, string> = {
    [Size.XS]: '6px 8px', // xs: 6px 8px
    [Size.SM]: '8px 12px', // sm: 8px 12px
    [Size.MD]: '10px 18px', // md: 10px 18px
    [Size.LG]: '12px 20px', // lg: 12px 20px
    [Size.XL]: '16px 28px', // дополнительный размер
  };
  return paddingMap[size];
};

export const ButtonFontSizeHandler = (size: Size = Size.MD): string => {
  const fontSizeMap: Record<Size, string> = {
    [Size.XS]: '12px', // xs: 12px
    [Size.SM]: '14px', // sm: 14px
    [Size.MD]: '14px', // md: 14px
    [Size.LG]: '16px', // lg: 16px
    [Size.XL]: '20px', // дополнительный размер
  };
  return fontSizeMap[size];
};

// Хендлеры для размеров IconButton
export const IconButtonSizeHandler = (size: IconSize = IconSize.MD): string => {
  const sizeMap: Record<IconSize, string> = {
    [IconSize.XS]: '24px',
    [IconSize.SM]: '36px',
    [IconSize.MD]: '44px',
    [IconSize.LG]: '50px',
    [IconSize.XL]: '56px',
  };
  return sizeMap[size];
};

export const IconButtonPaddingHandler = (size: IconSize = IconSize.MD): string => {
  const paddingMap: Record<IconSize, string> = {
    [IconSize.XS]: '8px',
    [IconSize.SM]: '10px',
    [IconSize.MD]: '12px',
    [IconSize.LG]: '14px',
    [IconSize.XL]: '16px',
  };
  return paddingMap[size];
};

// Хендлеры для размеров Input
export const InputSizeHandler = (size: Size = Size.MD): string => {
  const sizeMap: Record<Size, string> = {
    [Size.XS]: '40px',
    [Size.SM]: '45px',
    [Size.MD]: '50px',
    [Size.LG]: '60px',
    [Size.XL]: '70px',
  };
  return sizeMap[size];
};

export const InputPaddingHandler = (size: Size = Size.MD): string => {
  const paddingMap: Record<Size, string> = {
    [Size.XS]: '8px 12px',
    [Size.SM]: '10px 15px',
    [Size.MD]: '12px 16px',
    [Size.LG]: '14px 18px',
    [Size.XL]: '16px 20px',
  };
  return paddingMap[size];
};

export const InputFontSizeHandler = (size: Size = Size.MD): string => {
  const fontSizeMap: Record<Size, string> = {
    [Size.XS]: '12px',
    [Size.SM]: '14px',
    [Size.MD]: '16px',
    [Size.LG]: '18px',
    [Size.XL]: '20px',
  };
  return fontSizeMap[size];
};

// Хендлеры для размеров Badge согласно дизайн-системе
export const BadgeSizeHandler = (size: Size = Size.MD): string => {
  const sizeMap: Record<Size, string> = {
    [Size.XS]: '16px', // sm в макете
    [Size.SM]: '20px', // md в макете
    [Size.MD]: '24px', // lg в макете
    [Size.LG]: '30px', // xl в макете
    [Size.XL]: '34px', // дополнительный размер
  };
  return sizeMap[size];
};

// Специальный обработчик для dot размера (8x8px)
export const BadgeDotSizeHandler = (): string => '8px';

export const BadgePaddingHandler = (size: Size = Size.MD): string => {
  const paddingMap: Record<Size, string> = {
    [Size.XS]: '10px', // sm: 16x16px с padding 10px
    [Size.SM]: '10px', // md: 20x20px с padding 10px
    [Size.MD]: '10px 9px 10px 10px', // lg: 24x24px с асимметричным padding
    [Size.LG]: '10px 9px 10px 10px', // xl: 30x30px с асимметричным padding
    [Size.XL]: '10px 9px 10px 10px', // дополнительный размер
  };
  return paddingMap[size];
};

// Специальный обработчик для dot размера (без padding)
export const BadgeDotPaddingHandler = (): string => '0px';

export const BadgeFontSizeHandler = (size: Size = Size.MD): string => {
  const fontSizeMap: Record<Size, string> = {
    [Size.XS]: '10px', // sm: Montserrat 10/Regular
    [Size.SM]: '12px', // md: Montserrat 12/Medium
    [Size.MD]: '12px', // lg: Montserrat 12/Medium
    [Size.LG]: '14px', // xl: Montserrat 14/Medium
    [Size.XL]: '14px', // дополнительный размер
  };
  return fontSizeMap[size];
};

// Хендлеры для размеров Avatar
export const AvatarSizeHandler = (size: Size = Size.MD): string => {
  const sizeMap: Record<Size, string> = {
    [Size.XS]: '32px',
    [Size.SM]: '40px',
    [Size.MD]: '48px',
    [Size.LG]: '56px',
    [Size.XL]: '64px',
  };
  return sizeMap[size];
};

// Хендлеры для размеров Spinner
export const SpinnerSizeHandler = (size: Size = Size.MD): string => {
  const sizeMap: Record<Size, string> = {
    [Size.XS]: '16px',
    [Size.SM]: '24px',
    [Size.MD]: '32px',
    [Size.LG]: '40px',
    [Size.XL]: '48px',
  };
  return sizeMap[size];
};

// Хендлеры для размеров Progress
export const ProgressSizeHandler = (size: Size = Size.MD): string => {
  const sizeMap: Record<Size, string> = {
    [Size.XS]: '4px',
    [Size.SM]: '8px',
    [Size.MD]: '12px',
    [Size.LG]: '16px',
    [Size.XL]: '20px',
  };
  return sizeMap[size];
};

// Хендлеры для размеров Divider
export const DividerSizeHandler = (size: Size = Size.MD): string => {
  const sizeMap: Record<Size, string> = {
    [Size.XS]: '1px',
    [Size.SM]: '2px',
    [Size.MD]: '3px',
    [Size.LG]: '4px',
    [Size.XL]: '5px',
  };
  return sizeMap[size];
};

// Хендлеры для цветов
export const ColorHandler = (color?: string, fallback?: string): string => {
  return color || fallback || '#68d5f8';
};

// Хендлеры для цветов из темы
export const ThemeColorHandler = (
  mode: ThemeMode,
  colorKey: keyof ColorTheme,
  fallback?: string,
): string | undefined => {
  return getColor(mode, colorKey, fallback);
};

// Хендлеры для получения цветов из темы
export const getBackgroundColor = (mode: ThemeMode): string => {
  return getColor(mode, 'background');
};

export const getTextColor = (mode: ThemeMode): string => {
  return getColor(mode, 'text');
};

export const getBorderColor = (mode: ThemeMode): string => {
  return getColor(mode, 'border');
};

export const getPrimaryColor = (mode: ThemeMode): string => {
  return getColor(mode, 'primary');
};

export const getSecondaryColor = (mode: ThemeMode): string => {
  return getColor(mode, 'secondary');
};

export const getSuccessColor = (mode: ThemeMode): string => {
  return getColor(mode, 'success');
};

export const getDangerColor = (mode: ThemeMode): string => {
  return getColor(mode, 'danger');
};

export const getWarningColor = (mode: ThemeMode): string => {
  return getColor(mode, 'warning');
};

export const getInfoColor = (mode: ThemeMode): string => {
  return getColor(mode, 'info');
};

// Хендлеры для border-radius согласно Figma макету
export const BorderRadiusHandler = (size: Size = Size.MD): string => {
  const radiusMap: Record<Size, string> = {
    [Size.XS]: '35px', // xs: 35px
    [Size.SM]: '35px', // sm: 35px
    [Size.MD]: '35px', // md: 35px
    [Size.LG]: '35px', // lg: 35px
    [Size.XL]: '35px', // xl: 35px
  };
  return radiusMap[size];
};

// Хендлеры для gap согласно Figma макету
export const GapHandler = (size: Size = Size.MD): string => {
  const gapMap: Record<Size, string> = {
    [Size.XS]: '6px', // xs: 6px
    [Size.SM]: '8px', // sm: 8px
    [Size.MD]: '8px', // md: 8px
    [Size.LG]: '8px', // lg: 8px
    [Size.XL]: '8px', // дополнительный размер
  };
  return gapMap[size];
};

// Хендлеры для padding
export const PaddingHandler = (size: Size = Size.MD): string => {
  const paddingMap: Record<Size, string> = {
    [Size.XS]: '8px 12px',
    [Size.SM]: '12px 16px',
    [Size.MD]: '16px 20px',
    [Size.LG]: '20px 24px',
    [Size.XL]: '24px 32px',
  };
  return paddingMap[size];
};

// Хендлеры для margin
export const MarginHandler = (size: Size = Size.MD): string => {
  const marginMap: Record<Size, string> = {
    [Size.XS]: '8px',
    [Size.SM]: '12px',
    [Size.MD]: '16px',
    [Size.LG]: '24px',
    [Size.XL]: '32px',
  };
  return marginMap[size];
};

// Хендлеры для font-size
export const FontSizeHandler = (size: Size = Size.MD): string => {
  const fontSizeMap: Record<Size, string> = {
    [Size.XS]: '12px',
    [Size.SM]: '14px',
    [Size.MD]: '16px',
    [Size.LG]: '18px',
    [Size.XL]: '20px',
  };
  return fontSizeMap[size];
};

// Хендлеры для line-height
export const LineHeightHandler = (size: Size = Size.MD): string => {
  const lineHeightMap: Record<Size, string> = {
    [Size.XS]: '1.2',
    [Size.SM]: '1.3',
    [Size.MD]: '1.4',
    [Size.LG]: '1.5',
    [Size.XL]: '1.6',
  };
  return lineHeightMap[size];
};

// Хендлеры для font-weight
export const FontWeightHandler = (
  weight: 'normal' | 'medium' | 'semibold' | 'bold' = 'normal',
): string => {
  const weightMap: Record<string, string> = {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  };
  return weightMap[weight];
};

// Хендлеры для transition
export const TransitionHandler = (
  property: string = 'all',
  duration: number = 0.2,
  easing: string = 'ease',
): string => {
  return `${property} ${duration}s ${easing}`;
};

// Хендлеры для box-shadow
export const BoxShadowHandler = (size: Size = Size.MD): string => {
  const shadowMap: Record<Size, string> = {
    [Size.XS]: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    [Size.SM]: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    [Size.MD]: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    [Size.LG]: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    [Size.XL]: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  };
  return shadowMap[size];
};

// Хендлеры для z-index
export const ZIndexHandler = (
  level: 'dropdown' | 'sticky' | 'fixed' | 'modal' | 'popover' | 'tooltip' = 'dropdown',
): number => {
  const zIndexMap: Record<string, number> = {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 11000,
  };
  return zIndexMap[level];
};
