import { MDXProvider } from '@mdx-js/react';
import type { ComponentType, ReactNode } from 'react';

/**
 * MDX-контент старых версий ссылается на компоненты прежней документации
 * (`<ButtonInteractiveExamples />` и подобные). В новом docs-app их нет, и MDX
 * падал с «Expected component ... to be defined», оставляя страницу пустой.
 * Заглушка отвечает на любой PascalCase-тег: показываем пояснение вместо
 * живого интерактива, который для архивной версии невозможен.
 */
const LegacyComponentPlaceholder = () => (
  <div className="docs-preview-placeholder" role="note">
    Этот блок относился к интерактивным примерам прежней документации. Откройте актуальную
    версию, чтобы работать с живыми примерами.
  </div>
);

// Имена взяты из фактического контента (`content/docs/**/components-*.mdx`).
// MDX раскрывает контекст провайдера через spread, поэтому Proxy здесь не
// работает — нужен обычный объект с перечисленными ключами.
const legacyComponents: Record<string, ComponentType> = {
  ButtonInteractiveExamples: LegacyComponentPlaceholder,
  FormInteractiveExamples: LegacyComponentPlaceholder,
  InputSelectInteractiveExamples: LegacyComponentPlaceholder,
  ModalDrawerInteractiveExamples: LegacyComponentPlaceholder,
  TabsPaginationInteractiveExamples: LegacyComponentPlaceholder,
  ToastSnackbarInteractiveExamples: LegacyComponentPlaceholder,
};

export const MdxProviders = ({ children }: { children: ReactNode }) => (
  <MDXProvider components={legacyComponents}>{children}</MDXProvider>
);
