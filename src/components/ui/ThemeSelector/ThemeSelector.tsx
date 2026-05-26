import React, { useId } from 'react';
import { useTheme } from '@/themes/ThemeProvider';
import type { ThemeSelectorProps } from '@/types/ui';
import { ThemeSelectorControl, ThemeSelectorLabel, ThemeSelectorRoot } from './ThemeSelector.style';

/**
 * Переключатель тем из каталога {@link ThemeProvider}.
 * Подходит для любого числа тем (2, 5, N).
 */
export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  className,
  showLabel = true,
  label = 'Тема',
  ariaLabel,
}) => {
  const { themeMode, setThemeMode, themes } = useTheme();
  const fieldId = useId();

  if (themes.length <= 1) {
    return null;
  }

  return (
    <ThemeSelectorRoot className={className} htmlFor={fieldId}>
      {showLabel ? <ThemeSelectorLabel>{label}</ThemeSelectorLabel> : null}
      <ThemeSelectorControl
        id={fieldId}
        value={themeMode}
        aria-label={ariaLabel ?? label}
        onChange={(event) => setThemeMode(event.target.value as typeof themeMode)}
      >
        {themes.map((themeMeta) => (
          <option key={themeMeta.name} value={themeMeta.name}>
            {themeMeta.label}
          </option>
        ))}
      </ThemeSelectorControl>
    </ThemeSelectorRoot>
  );
};
