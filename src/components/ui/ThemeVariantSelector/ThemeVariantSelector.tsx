import React, { useId } from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import type { ThemeVariantSelectorProps } from '@/types/ui';
import { themeVariantLabels } from '@/handlers/themeVariantHandlers';
import {
  ThemeSelectorControl,
  ThemeSelectorLabel,
  ThemeSelectorRoot,
} from '../ThemeSelector/ThemeSelector.style';

/**
 * Переключатель варианта оформления (стандартная / стеклянная и т.д.).
 * Сохраняет текущую палитру (светлая / тёмная) при смене варианта.
 */
export const ThemeVariantSelector: React.FC<ThemeVariantSelectorProps> = ({
  className,
  showLabel = true,
  label = 'Вариант оформления',
  ariaLabel,
}) => {
  const { themeVariant, themeVariants, setThemeVariant } = useTheme();
  const fieldId = useId();

  if (themeVariants.length <= 1 || !themeVariant) {
    return null;
  }

  return (
    <ThemeSelectorRoot className={className} htmlFor={fieldId}>
      {showLabel ? <ThemeSelectorLabel>{label}</ThemeSelectorLabel> : null}
      <ThemeSelectorControl
        id={fieldId}
        value={themeVariant}
        aria-label={ariaLabel ?? label}
        onChange={(event) => setThemeVariant(event.target.value as typeof themeVariant)}
      >
        {themeVariants.map((variant) => (
          <option key={variant} value={variant}>
            {themeVariantLabels[variant]}
          </option>
        ))}
      </ThemeSelectorControl>
    </ThemeSelectorRoot>
  );
};
