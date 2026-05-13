module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
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
