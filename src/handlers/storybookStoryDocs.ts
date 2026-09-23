import type { StoryContext } from '@storybook/react';
import {
  buildUsageSnippetFromRenderSource,
  extractRenderSectionFromExport,
  extractStoryExportBlock,
  wrapUsageSnippetForDocs,
} from './storybookUsageExtract';
import {
  buildComponentUsageSnippetFromArgs,
  resolveStoryComponentName,
} from './storybookStoryDocsCore';

export {
  buildComponentUsageSnippetFromArgs,
  formatUsagePropsFromArgs,
  resolveStoryComponentName,
} from './storybookStoryDocsCore';

/**
 * Параметры Docs сторис: описание и пример кода использования компонента (не реализация render).
 * @param description - Текст сценария на русском.
 * @param usageCode - JSX/TS пример для вкладки «Код» в Docs (как использовать в приложении).
 */
/**
 * Описание сторис + пример кода из тех же `args`, что и у экспорта (без дублирования вручную).
 * @param description - Текст сценария.
 * @param componentName - Имя компонента в JSX.
 * @param args - Пропсы, совпадающие с `Story.args`.
 * @param options.wrapInForm - Обернуть в Form.
 */
export const describeStoryWithArgs = (
  description: string,
  componentName: string,
  args: Record<string, unknown>,
  options?: { wrapInForm?: boolean },
) => describeStory(description, buildComponentUsageSnippetFromArgs(componentName, args, options));

export const describeStory = (description: string, usageCode?: string) => ({
  parameters: {
    docs: {
      description: { story: description },
      source: usageCode?.trim()
        ? {
            /** Явный пример — без transform */
            type: 'code' as const,
            code: usageCode.trim(),
            language: 'tsx' as const,
          }
        : {
            /** Пример собирается через `getStoryDocsSourceCode` (global transform) */
            language: 'tsx' as const,
          },
    },
  },
});

/**
 * Разбор исходника сторис кэшируется: Storybook передаёт один и тот же текст в transform
 * на каждый рендер docs-блока, а извлечение блока экспорта и секции `render` — регулярки
 * по всему файлу. Ключ кэша — сам исходник, значение `null` означает «в этом файле нет».
 */
type ParsedStorySource = {
  exportBlocks: Map<string, string | null>;
  renderSections: Map<string, string | null>;
};

const parsedStorySourceCache = new Map<string, ParsedStorySource>();

/** Кэш не должен расти бесконечно: держим разбор недавно открытых сторис. */
const PARSED_STORY_SOURCE_CACHE_LIMIT = 50;

/**
 * @param generatedSource - Исходник модуля сторис из Storybook.
 * @returns Кэш разбора для этого исходника.
 */
const getParsedStorySource = (generatedSource: string): ParsedStorySource => {
  const cached = parsedStorySourceCache.get(generatedSource);
  if (cached) {
    return cached;
  }

  if (parsedStorySourceCache.size >= PARSED_STORY_SOURCE_CACHE_LIMIT) {
    const oldestKey = parsedStorySourceCache.keys().next().value;
    if (oldestKey !== undefined) {
      parsedStorySourceCache.delete(oldestKey);
    }
  }

  const parsed: ParsedStorySource = { exportBlocks: new Map(), renderSections: new Map() };
  parsedStorySourceCache.set(generatedSource, parsed);
  return parsed;
};

/**
 * @param cache - Кэш разбора конкретного исходника.
 * @param exportName - Имя экспорта-сторис.
 * @param compute - Разбор при промахе кэша.
 * @returns Найденный фрагмент или undefined.
 */
const readCachedFragment = (
  cache: Map<string, string | null>,
  exportName: string,
  compute: () => string | null | undefined,
): string | undefined => {
  const cached = cache.get(exportName);
  if (cached !== undefined) {
    return cached ?? undefined;
  }

  const computed = compute() ?? null;
  cache.set(exportName, computed);
  return computed ?? undefined;
};

/**
 * Slug сторис из `id` (`with-helper-text`) в имя экспорта (`WithHelperText`).
 * @param storySlug - Последний сегмент `context.id` после `--`.
 */
const storySlugToExportName = (storySlug: string): string =>
  storySlug
    .split('-')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join('');

/**
 * Имя экспорта CSF (`WithHelperText`) из контекста Storybook.
 * `context.name` в Docs часто человекочитаемый (`With Helper Text`), не совпадает с экспортом.
 * @param context - Контекст сторис.
 * @param generatedSource - Исходник модуля сторис из Storybook.
 */
const resolveStoryExportName = (
  context: StoryContext,
  generatedSource: string,
): string | undefined => {
  const candidates: string[] = [];
  const storySlug = context.id?.includes('--') ? context.id.split('--').pop() : undefined;

  /** Slug из `id` надёжнее humanized `context.name` (`With Helper Text`). */
  if (storySlug) {
    candidates.push(storySlugToExportName(storySlug));
  }

  if (typeof context.name === 'string' && context.name.length > 0) {
    candidates.push(context.name);
  }

  for (const candidate of candidates) {
    if (generatedSource.includes(`export const ${candidate}`)) {
      return candidate;
    }
  }

  if (storySlug) {
    const exportPattern = /export const (\w+)\s*=/g;
    const normalizedSlug = storySlug.replace(/-/g, '').toLowerCase();
    let match = exportPattern.exec(generatedSource);
    while (match !== null) {
      const exportName = match[1];
      if (exportName.toLowerCase() === normalizedSlug) {
        return exportName;
      }
      match = exportPattern.exec(generatedSource);
    }
  }

  return undefined;
};

/**
 * Возвращает код для вкладки Docs: явный usageCode, сниппет из render/args.
 * @param generatedSource - Исходник сторис из Storybook.
 * @param context - Контекст сторис.
 */
export const getStoryDocsSourceCode = (generatedSource: string, context: StoryContext): string => {
  const storyTitle = String(context.title ?? '');
  const wrapInForm =
    Boolean(context.parameters?.docs?.wrapUsageInForm) || storyTitle.startsWith('UI Kit/Inputs/');

  const componentName = resolveStoryComponentName(context);
  const storyArgs = context.args as Record<string, unknown> | undefined;

  const exportName = resolveStoryExportName(context, generatedSource);
  const parsedSource = getParsedStorySource(generatedSource);
  let scopedSource = exportName
    ? (readCachedFragment(parsedSource.exportBlocks, exportName, () =>
        extractStoryExportBlock(generatedSource, exportName),
      ) ?? generatedSource)
    : generatedSource;

  if (exportName && !/render\s*:/.test(scopedSource)) {
    const renderSection = readCachedFragment(parsedSource.renderSections, exportName, () =>
      extractRenderSectionFromExport(generatedSource, exportName),
    );
    if (renderSection) {
      scopedSource = renderSection;
    }
  }

  /** Явный `source.code` (describeStory / inputArgsStory) важнее автоизвлечения из render */
  const explicitCode = context.parameters?.docs?.source?.code;
  if (typeof explicitCode === 'string' && explicitCode.trim().length > 0) {
    return wrapUsageSnippetForDocs(explicitCode.trim(), wrapInForm);
  }

  const storyBlockHasRender = /render\s*:/.test(scopedSource);
  const fromRender = storyBlockHasRender
    ? buildUsageSnippetFromRenderSource(scopedSource, { wrapInForm })
    : null;

  if (fromRender) {
    return fromRender;
  }
  const hasStorySpecificArgs =
    componentName && storyArgs && Object.keys(storyArgs).length > 0 && !storyBlockHasRender;

  if (hasStorySpecificArgs) {
    return buildComponentUsageSnippetFromArgs(componentName, storyArgs, { wrapInForm });
  }

  if (componentName) {
    const minimal = wrapInForm
      ? `<Form formId="example-form">\n  <${componentName} />\n</Form>`
      : `<${componentName} />`;
    return minimal;
  }

  return scopedSource;
};
