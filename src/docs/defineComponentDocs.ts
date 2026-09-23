import type { ComponentDocsDefinition } from './types';

/**
 * Типизированный helper для декларации DSL-документации компонента.
 * В рантайме возвращает объект как есть.
 */
export const defineComponentDocs = <T extends ComponentDocsDefinition>(
  docs: T,
): T => docs;
