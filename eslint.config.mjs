import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import unusedImports from 'eslint-plugin-unused-imports';
import storybook from 'eslint-plugin-storybook';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        navigator: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        console: 'readonly',
        window: 'readonly',
        document: 'readonly',
        React: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'prettier': prettier,
      'unused-imports': unusedImports,
      'storybook': storybook,
      'react': react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...typescript.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // TypeScript правила
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', {
        'vars': 'all',
        'args': 'after-used',
        'ignoreRestSiblings': false,
        'argsIgnorePattern': '^_',
        'varsIgnorePattern': '^_'
      }],
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

      // React правила
      'react/react-in-jsx-scope': 'off', // React 17+ не требует импорта React
      'react/prop-types': 'off', // Используем TypeScript
      'react/display-name': 'warn',
      'react/jsx-key': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react/no-children-prop': 'error',
      'react/no-danger-with-children': 'error',
      'react/no-deprecated': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-find-dom-node': 'error',
      'react/no-is-mounted': 'error',
      'react/no-render-return-value': 'error',
      'react/no-string-refs': 'error',
      'react/no-unescaped-entities': 'warn', // Смягчаем для автоматического исправления
      'react/no-unknown-property': 'error',
      'react/no-unsafe': 'warn',
      'react/require-render-return': 'error',

      // React Hooks правила
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Общие правила с автоисправлением
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': ['warn', {
        'vars': 'all',
        'varsIgnorePattern': '^_',
        'args': 'after-used',
        'argsIgnorePattern': '^_'
      }],
      'prettier/prettier': 'error',
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': 'off', // Отключаем в пользу @typescript-eslint/no-unused-vars
      'no-undef': 'off', // TypeScript проверяет это
      'no-redeclare': 'error',
      'no-duplicate-imports': 'warn', // Смягчаем для автоматического исправления
      'no-useless-rename': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'template-curly-spacing': 'error',
      'arrow-spacing': 'error',
      // Отключаем правила ESLint, которые конфликтуют с Prettier
      'comma-dangle': 'off', // Prettier управляет trailing commas
      'comma-spacing': 'off', // Prettier управляет пробелами вокруг запятых
      'comma-style': 'off', // Prettier управляет стилем запятых
      'computed-property-spacing': 'off', // Prettier управляет пробелами
      'func-call-spacing': 'off', // Prettier управляет пробелами
      'key-spacing': 'off', // Prettier управляет пробелами
      'keyword-spacing': 'off', // Prettier управляет пробелами
      'object-curly-spacing': 'off', // Prettier управляет пробелами
      'semi': 'off', // Prettier управляет точками с запятой
      'semi-spacing': 'off', // Prettier управляет пробелами
      'space-before-blocks': 'off', // Prettier управляет пробелами
      'space-before-function-paren': 'off', // Prettier управляет пробелами
      'space-in-parens': 'off', // Prettier управляет пробелами
      'space-infix-ops': 'off', // Prettier управляет пробелами
      'space-unary-ops': 'off', // Prettier управляет пробелами
      'spaced-comment': 'error', // Оставляем для комментариев
      'quotes': 'off', // Prettier управляет кавычками
      'jsx-quotes': 'off', // Prettier управляет JSX кавычками
      'eol-last': 'off', // Prettier управляет окончаниями строк
      'no-multiple-empty-lines': 'off', // Prettier управляет пустыми строками
      'no-trailing-spaces': 'off', // Prettier управляет пробелами
      'no-useless-escape': 'warn', // Смягчаем для автоматического исправления
      'indent': 'off', // Prettier управляет отступами
      'max-len': 'off', // Prettier управляет длиной строк
    },
  },
  {
    files: ['**/*.stories.{ts,tsx}'],
    rules: {
      ...storybook.configs.recommended.rules,
      'react/display-name': 'off', // Storybook может требовать displayName
      'react-hooks/rules-of-hooks': 'off', // Storybook может использовать хуки в render функциях
      'no-console': 'off', // Разрешаем console в Storybook
      '@typescript-eslint/no-explicit-any': 'off', // Разрешаем any в Storybook
      '@typescript-eslint/no-unused-vars': 'warn', // Смягчаем для Storybook
      'unused-imports/no-unused-vars': 'warn', // Смягчаем для Storybook
    },
  },
];
