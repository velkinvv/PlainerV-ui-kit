const path = require('node:path');

/**
 * Storybook 9 + Vite. Алиас `@` как в `tsconfig` (`baseUrl` + `paths`).
 * @type {import('@storybook/react-vite').StorybookConfig}
 */
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  /**
   * `react-docgen-typescript` — полная таблица пропсов из TypeScript (`forwardRef`, поля из `SelectProps`/`DropdownProps`).
   * Быстрый `react-docgen` пробовали: таблицы пропсов `DataGrid` и `Select` стали заглушками
   * (`propertyName*`), а время сборки не выиграло. Точечного переключения docgen на одну сторис нет.
   */
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
        },
      },
      server: {
        watch: {
          /** Артефакты сборки и тестов держать под наблюдением вотчера незачем. */
          ignored: ['**/node_modules/**', '**/storybook-static/**', '**/coverage/**', '**/dist/**'],
        },
      },
    });
  },
};
