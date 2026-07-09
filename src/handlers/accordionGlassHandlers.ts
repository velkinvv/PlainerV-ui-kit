import type { AccordionTheme, Colors } from '../types/theme';
import { ThemeColorScheme } from '../types/theme';

/** Позиция элемента в группе аккордеона */
export type AccordionItemPosition = 'start' | 'center' | 'last';

/** Токены поверхности аккордеона */
export interface AccordionSurfaceTokens {
  background: string;
  hoverBackground: string;
  disabledBackground: string;
  textColor: string;
  disabledTextColor: string;
  dividerBorder: string;
}

/** Стили границ элемента аккордеона по позиции */
export type AccordionPositionStyles = {
  borderRadius: string;
  borderTop?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRight?: string;
};

/** Контекст темы для резолва токенов аккордеона */
export type AccordionThemeContext = {
  mode: ThemeColorScheme;
  colors: Colors;
  accordions: AccordionTheme;
};

/**
 * Проверяет, активна ли glass-тема для аккордеона.
 * @param context — режим темы и секция `accordions`
 */
export function isAccordionGlassTheme(context: AccordionThemeContext): boolean {
  return Boolean(context.accordions?.settings?.backdropFilter);
}

/**
 * Glass-палитра аккордеона — лёгкая прозрачность как у pagination.
 * @param context — контекст темы
 */
export function getAccordionGlassSurfaceTokens(
  context: AccordionThemeContext,
): AccordionSurfaceTokens {
  const isDark = context.mode === ThemeColorScheme.DARK;
  const dividerBorder = `1px solid ${context.colors.borderSecondary}`;

  return {
    background: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.26)',
    hoverBackground: isDark ? 'rgba(255, 255, 255, 0.10)' : 'rgba(255, 255, 255, 0.18)',
    disabledBackground: isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.14)',
    textColor: context.accordions.variants.default.color,
    disabledTextColor: context.accordions.variants.disabled.color,
    dividerBorder,
  };
}

/**
 * Палитра аккордеона по теме (glass или обычная).
 * @param context — контекст темы
 */
export function getAccordionSurfaceTokens(context: AccordionThemeContext): AccordionSurfaceTokens {
  if (isAccordionGlassTheme(context)) {
    return getAccordionGlassSurfaceTokens(context);
  }

  const { default: defaultVariant, hover, disabled } = context.accordions.variants;

  return {
    background: defaultVariant.background,
    hoverBackground: hover.background,
    disabledBackground: disabled.background,
    textColor: defaultVariant.color,
    disabledTextColor: disabled.color,
    dividerBorder: `1px solid ${context.colors.borderSecondary}`,
  };
}

/**
 * Границы и радиусы элемента аккордеона с учётом glass-темы.
 * @param position — позиция элемента в группе
 * @param context — контекст темы
 */
export function getAccordionPositionStyles(
  position: AccordionItemPosition,
  context: AccordionThemeContext,
): AccordionPositionStyles {
  const positionConfig = context.accordions.positions[position];
  const surfaceTokens = getAccordionSurfaceTokens(context);

  if (!isAccordionGlassTheme(context)) {
    return positionConfig;
  }

  if (position === 'start') {
    return {
      borderRadius: positionConfig.borderRadius,
      borderBottom: surfaceTokens.dividerBorder,
    };
  }

  if (position === 'center') {
    return {
      borderRadius: positionConfig.borderRadius,
      borderTop: surfaceTokens.dividerBorder,
      borderBottom: surfaceTokens.dividerBorder,
    };
  }

  return {
    borderRadius: positionConfig.borderRadius,
    borderTop: surfaceTokens.dividerBorder,
  };
}
