const path = require('node:path');
const globby = require('globby');

/**
 * Storybook 9 + Vite. Алиас `@` как в `tsconfig` (`baseUrl` + `paths`).
 * @type {import('@storybook/react-vite').StorybookConfig}
 */
module.exports = {
  /**
   * Список файлов сторис через globby с `ignore`, чтобы не подхватывать папку `table_pkg`
   * (остаток после копирования — дубли id вроде `components-datagrid--client-pagination`).
   */
  async stories() {
    const projectRoot = path.join(__dirname, '..');
    const matchedPaths = await globby(
      ['src/**/*.stories.@(js|jsx|mjs|ts|tsx)', 'src/**/*.mdx'],
      {
        cwd: projectRoot,
        ignore: ['**/node_modules/**', '**/dist/**', '**/storybook-static/**', '**/table_pkg/**'],
      },
    );
    // Доп. страховка: на Windows иногда в индекс попадают старые пути к `table_pkg`.
    const withoutTablePkg = matchedPaths.filter(
      relativePath => !String(relativePath).replace(/\\/g, '/').includes('/table_pkg/'),
    );
    /** Явные пути: подстраховка, если glob не подхватил файл сторис */
    const forcedStoryPaths = [
      'src/components/ui/Dropdown/DropdownTagTrigger.stories.tsx',
      'src/components/ui/sidemenu/Sidemenu.stories.tsx',
    ];
    const mergedRelative = [...new Set([...withoutTablePkg, ...forcedStoryPaths])];
    return mergedRelative.map(relativePath => path.join('..', relativePath).replace(/\\/g, '/'));
  },
  addons: ['@storybook/addon-links', '@storybook/addon-docs', '@storybook/addon-themes'],
  /** Полная таблица пропсов из TypeScript (в т.ч. `forwardRef` и поля из `SelectProps` / `DropdownProps`). */
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
    });
  },
};
