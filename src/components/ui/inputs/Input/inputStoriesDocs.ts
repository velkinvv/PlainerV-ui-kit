import { describeStory, describeStoryWithArgs } from '@/handlers/storybookStoryDocs';

const INPUT_WRAP_IN_FORM = { wrapInForm: true as const };

/**
 * Документация и пример кода для args-сторис Input (совпадает с `Story.args`).
 * @param description - Текст сценария в Docs.
 * @param args - Пропсы, как в экспорте сторис (без `clearIconProps` из meta).
 */
export const inputArgsStory = (description: string, args: Record<string, unknown>) =>
  describeStoryWithArgs(description, 'Input', args, INPUT_WRAP_IN_FORM);

/**
 * Документация для render-сторис Input.
 * Без `usageCode` — пример из `render` через `getStoryDocsSourceCode`.
 * С `usageCode` — фиксированный сниппет (контролируемые поля, хуки), совпадает с канвасом.
 * @param description - Текст сценария.
 * @param usageCode - Явный TSX/JSX для Docs (опционально).
 */
export const inputRenderStory = (description: string, usageCode?: string) =>
  describeStory(description, usageCode);
