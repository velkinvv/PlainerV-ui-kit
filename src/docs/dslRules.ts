export interface DslRule {
  id: string;
  level: 'error' | 'warning';
  description: string;
}

/**
 * Набор правил формата DSL-файлов `*.docs.tsx`.
 * Используется валидатором манифеста и ревью-правилами.
 */
export const DSL_RULES: DslRule[] = [
  {
    id: 'top-level-static-object',
    level: 'error',
    description:
      'На верхнем уровне допускается только литерал объекта, переданный в defineComponentDocs(...).',
  },
  {
    id: 'no-computed-keys',
    level: 'error',
    description:
      'Запрещены вычисляемые ключи в объекте документации и во вложенных секциях.',
  },
  {
    id: 'no-top-level-conditions',
    level: 'error',
    description:
      'Запрещены условные ветки и циклы на верхнем уровне DSL-файла.',
  },
  {
    id: 'no-top-level-runtime-calls',
    level: 'error',
    description:
      'Запрещены произвольные runtime-вызовы на верхнем уровне (кроме defineComponentDocs).',
  },
  {
    id: 'example-id-unique',
    level: 'error',
    description: 'Идентификаторы examples[*].id должны быть уникальны внутри компонента.',
  },
  {
    id: 'variant-id-unique',
    level: 'error',
    description:
      'Идентификаторы variants[*].id и variants[*].items[*].id должны быть уникальны внутри компонента.',
  },
  {
    id: 'example-code-required',
    level: 'error',
    description: 'Для каждого example обязателен непустой code и render.',
  },
  {
    id: 'no-helper-imports-for-schema',
    level: 'warning',
    description:
      'Не рекомендуется импортировать вспомогательные обертки для объявления структуры DSL; схема должна быть максимально декларативной.',
  },
];
