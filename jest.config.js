const fs = require('fs');
const path = require('path');

const webNodeModulesDirectory = path.join(__dirname, 'node_modules');
const workspaceRootNodeModulesDirectory = path.join(__dirname, '..', 'node_modules');

/**
 * npm workspaces поднимает часть зависимостей в корень монорепы — Jest должен видеть один путь.
 *
 * @param {string} packageName - имя пакета в node_modules
 * @returns {string} абсолютный путь к каталогу пакета
 */
function resolveNodeModuleDirectory(packageName) {
  const localPackageDirectory = path.join(webNodeModulesDirectory, packageName);
  if (fs.existsSync(localPackageDirectory)) {
    return localPackageDirectory;
  }

  const hoistedPackageDirectory = path.join(workspaceRootNodeModulesDirectory, packageName);
  if (fs.existsSync(hoistedPackageDirectory)) {
    return hoistedPackageDirectory;
  }

  throw new Error(
    `Jest: пакет "${packageName}" не найден ни в ${webNodeModulesDirectory}, ни в ${workspaceRootNodeModulesDirectory}. Выполните npm install в корне монорепы.`,
  );
}

const reactDirectory = resolveNodeModuleDirectory('react');
const reactDomDirectory = resolveNodeModuleDirectory('react-dom');
const styledComponentsDirectory = resolveNodeModuleDirectory('styled-components');
const framerMotionDirectory = resolveNodeModuleDirectory('framer-motion');

module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Один экземпляр React для тестов: иначе ThemeProvider и хуки попадают на разные копии.
    '^react$': reactDirectory,
    '^react-dom$': reactDomDirectory,
    '^react/jsx-runtime$': path.join(reactDirectory, 'jsx-runtime'),
    '^react/jsx-dev-runtime$': path.join(reactDirectory, 'jsx-dev-runtime'),
    '^styled-components$': styledComponentsDirectory,
    '^styled-components/(.*)$': path.join(styledComponentsDirectory, '$1'),
    '^framer-motion$': framerMotionDirectory,
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(ts|tsx)',
    '<rootDir>/src/**/*.(test|spec).(ts|tsx)',
  ],
  collectCoverageFrom: [
    'src/**/*.(ts|tsx)',
    '!src/**/*.d.ts',
    '!src/**/*.stories.(ts|tsx)',
    '!src/**/*.stories.styles.ts',
    '!src/**/*.stories.style.ts',
    '!src/**/*.test.(ts|tsx)',
    '!src/index.ts',
    // SVG-иконки и вспомогательные темы для Storybook не гоняются юнит-тестами — не учитываем в пороге
    '!src/icons/**',
    '!src/**/dark-theme-examples.tsx',
    '!src/**/light-theme-examples.tsx',
    '!src/styles/**',
    '!src/variables/cssVariables/**',
    '!src/variables/size/**',
    '!src/components/ui/storyDocs/**',
    '!src/components/ui/table/storyDocs/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      // Минимумы по фактическому покрытию unit-тестами (иконки/story-стили исключены из collectCoverageFrom).
      // Повышать по мере добавления тестов; целевой ориентир проекта — около 60%.
      branches: 27,
      functions: 28,
      lines: 40,
      statements: 40,
    },
  },
};
