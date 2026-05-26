import type { Meta, StoryObj } from '@storybook/react';
import React, { useMemo } from 'react';
import { useTheme as useStyledTheme } from 'styled-components';
import { useTheme } from '@/themes/themeContext';
import { Button } from '@/components/ui/buttons/Button';
import { Typography } from '@/components/ui/Typography';
import { ThemeColorScheme } from '@/types/theme';
import { lightTheme } from '@/themes/themes';
import { mergeTheme } from '@/themes/mergeTheme';
import { useMergeTheme } from '@/hooks/useMergeTheme';
import {
  brandPlainervThemeParameters,
  brandThemeOverrides,
} from './CustomTheme.stories.helpers';
import { customThemeStoriesStyles } from './CustomTheme.stories.styles';

/**
 * Базовый превью для autodocs и сторис кастомной темы.
 */
const CustomThemePreview = () => {
  const theme = useStyledTheme();

  return (
    <div style={customThemeStoriesStyles.row}>
      <div style={customThemeStoriesStyles.colorSwatch(theme.colors?.primary ?? '')} />
      <Typography variant="body2">
        theme.colors.primary: <strong>{theme.colors?.primary}</strong>
      </Typography>
    </div>
  );
};

const meta: Meta<typeof CustomThemePreview> = {
  title: 'UI Kit/Theming/Custom theme',
  component: CustomThemePreview,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Кастомизация: **themeOverrides**, каталог **defineThemeCatalog**, **mergeTheme**, **useMergeTheme**.

- **ThemeMode** — id темы (\`ThemeMode.light\`, \`appThemes.themeMode.ocean\`)
- **ThemeColorScheme** — палитра (\`theme.mode\` в styled-components)

Недостающие токены подставляются из \`lightTheme\` / \`darkTheme\`.
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Демо хука useMergeTheme (режим из контекста глобального ThemeProvider).
 */
const MergeThemeHookPreview = () => {
  const mergedTheme = useMergeTheme({
    colors: {
      primary: '#0D9488',
      primaryHover: '#0F766E',
    },
  });

  return (
    <pre style={customThemeStoriesStyles.codeResult}>
      {`useMergeTheme → colors.primary: ${mergedTheme.colors.primary}`}
    </pre>
  );
};

export const BrandThemeOverrides: Story = {
  name: 'ThemeProvider + themeOverrides',
  parameters: {
    ...brandPlainervThemeParameters,
    docs: {
      description: {
        story:
          'Передайте `themeOverrides` в `ThemeProvider` — кнопки и остальные компоненты подхватят брендовый primary.',
      },
      source: {
        code: `import { ThemeProvider } from '@velkinvv/plainerv';

const brandThemeOverrides = {
  light: {
    colors: {
      primary: '#7C3AED',
      primaryHover: '#6D28D9',
      primaryActive: '#5B21B6',
    },
  },
  dark: {
    colors: {
      primary: '#A78BFA',
      primaryHover: '#8B5CF6',
      primaryActive: '#7C3AED',
    },
  },
};

<ThemeProvider themeOverrides={brandThemeOverrides}>
  <App />
</ThemeProvider>`,
      },
    },
  },
  render: () => (
    <div style={customThemeStoriesStyles.stack}>
      <CustomThemePreview />
      <div style={customThemeStoriesStyles.row}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>
    </div>
  ),
};

export const MergeThemeFunction: Story = {
  name: 'mergeTheme (функция)',
  parameters: {
    docs: {
      description: {
        story:
          'Соберите тему до передачи в провайдер или для CSS-переменных. Вложенные объекты сливаются рекурсивно.',
      },
      source: {
        code: `import { mergeTheme, lightTheme } from '@velkinvv/plainerv';

const myLightTheme = mergeTheme(lightTheme, {
  colors: { primary: '#0D9488' },
});`,
      },
    },
  },
  render: () => {
    const mergedTheme = useMemo(
      () =>
        mergeTheme(lightTheme, {
          colors: {
            primary: '#0D9488',
            primaryHover: '#0F766E',
          },
        }),
      [],
    );

    return (
      <div style={customThemeStoriesStyles.stack}>
        <pre style={customThemeStoriesStyles.codeResult}>
          {`mergeTheme(lightTheme, …)\n→ primary: ${mergedTheme.colors.primary}\n→ background (из базы): ${mergedTheme.colors.background}`}
        </pre>
        <Typography variant="body2" color="secondary">
          Стандартный primary: {lightTheme.colors.primary}
        </Typography>
      </div>
    );
  },
};

export const UseMergeThemeHook: Story = {
  name: 'useMergeTheme (хук)',
  parameters: {
    docs: {
      description: {
        story:
          'Внутри `ThemeProvider` база берётся из активной темы; снаружи — `themeMode` или `colorScheme`.',
      },
      source: {
        code: `import { useMergeTheme, ThemeColorScheme } from '@velkinvv/plainerv';

const brandLight = useMergeTheme(
  { colors: { primary: '#0D9488' } },
  { colorScheme: ThemeColorScheme.LIGHT },
);`,
      },
    },
  },
  render: () => (
    <div style={customThemeStoriesStyles.stack}>
      <MergeThemeHookPreview />
      <Typography variant="caption" color="secondary">
        Хук мемоизирует результат; объект переопределения лучше держать стабильным (useMemo).
      </Typography>
    </div>
  ),
};

export const ProgrammaticThemeSwitch: Story = {
  name: 'Переключение themeMode в коде',
  parameters: brandPlainervThemeParameters,
  render: () => {
    const { themeMode, setThemeMode, themeModes, cycleTheme, themes } = useTheme();

    return (
      <div style={customThemeStoriesStyles.stack}>
        <Typography variant="body2">
          Активная тема: <strong>{themeMode}</strong> (
          {themes.find((item) => item.name === themeMode)?.label})
        </Typography>
        <div style={customThemeStoriesStyles.row}>
          {themeModes.map((catalogThemeMode) => (
            <Button
              key={catalogThemeMode}
              variant={catalogThemeMode === themeMode ? 'primary' : 'outline'}
              onClick={() => setThemeMode(catalogThemeMode)}
            >
              {catalogThemeMode}
            </Button>
          ))}
          <Button variant="ghost" onClick={cycleTheme}>
            cycleTheme()
          </Button>
        </div>
        <CustomThemePreview />
      </div>
    );
  },
};

export const CompareDefaultAndBrand: Story = {
  name: 'Сравнение: стандарт и бренд',
  parameters: brandPlainervThemeParameters,
  render: () => {
    const { colorScheme } = useTheme();

    return (
      <div style={customThemeStoriesStyles.stack}>
        <Typography variant="h6">Палитра: {colorScheme}</Typography>
        <Typography variant="body2" color="secondary">
          Переключите тему в тулбаре Storybook — брендовые токены меняются для light/dark.
        </Typography>
        <CustomThemePreview />
        <Button variant="primary">Брендовая primary</Button>
      </div>
    );
  },
};

/** Экспорт для подсказок в docs (не используется в рантайме сторис). */
export { brandThemeOverrides };
