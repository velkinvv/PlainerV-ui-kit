import type { Preview } from '@storybook/react';
import addonThemes from '@storybook/addon-themes';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { withStorybookUiKitTheme } from './withStorybookUiKitTheme';
import { withStorybookDocsChromeTheme } from './withStorybookDocsChromeTheme';
import { withStoryCanvasRoom } from './withStoryCanvasRoom';
import { withStorybookMotion } from './withStorybookMotion';
import './preview-storybook-overlays.css';
import './preview-storybook-docs-theme.css';
import './preview-storybook-motion.css';
import { getStoryDocsSourceCode } from '../src/handlers/storybookStoryDocs';

const themeAddonAnnotations = addonThemes();

/**
 * Стартовое значение глобала `theme` (тулбар аддона тем) — как у {@link ThemeProvider} / `localStorage`.
 */
function getInitialStorybookThemeGlobal(): 'light' | 'dark' {
  if (typeof window === 'undefined') {
    return 'light';
  }
  return window.localStorage.getItem('storybook-theme') === 'dark' ? 'dark' : 'light';
}

/**
 * Глобальные параметры превью.
 * Декоратор {@link withStorybookUiKitTheme} подключает `ThemeProvider` для styled-components: без `theme` в
 * контексте падает доступ к `theme.sizes` / `theme.buttons` и т.д.
 * **Не оборачивайте** сторис в ещё один `ThemeProvider`: используйте `parameters.plainervTheme`
 * (`themeOverrides`, `themes`, `applyGlobalStyles`) — см. {@link withStorybookUiKitTheme}.
 *
 * `@storybook/addon-themes`: `withThemeByDataAttribute` выставляет `data-theme` на `<html>` (CSS / селекторы).
 * {@link withStorybookUiKitTheme} читает `context.globals.theme` и передаёт тему в {@link ThemeProvider} в iframe превью.
 * Оформление shell (сайдбар, хедер) — в `.storybook/manager.ts` через палитру UI-kit.
 *
 * `withStoryCanvasRoom` — внутри `ThemeProvider` (в массиве — перед `withStorybookUiKitTheme`), в Docs фон `backgroundSecondary`.
 * {@link withStorybookDocsChromeTheme} + `preview-storybook-docs-theme.css` — тёмные Docs (таблица, превью, тулбар).
 *
 * Выпадающие меню / Hint / Tooltip рендерятся через `createPortal` в `document.body` текущего документа
 * и `position: fixed`. Портал в `window.top.document` не используется: стили styled-components
 * вешаются на `document` iframe, узлы в другом документе остаются без стилей.
 * См. `preview-storybook-overlays.css` и `dropdownInline` / `portalContainer`.
 */
const preview: Preview = {
  ...themeAddonAnnotations,
  initialGlobals: {
    ...(themeAddonAnnotations.initialGlobals ?? {}),
    theme: getInitialStorybookThemeGlobal(),
  },
  decorators: [
    /**
     * Storybook 9: **первый** декоратор — ближе к сторис, **последний** — снаружи.
     * `withStoryCanvasRoom` должен быть **внутри** `withStorybookUiKitTheme` → в массиве canvas **раньше**, uiKit **позже**.
     * Снаружи → внутрь: data-theme → ThemeProvider → canvas → Docs chrome → motion → сторис.
     */
    withStorybookMotion,
    withStorybookDocsChromeTheme,
    withStoryCanvasRoom,
    withStorybookUiKitTheme,
    withThemeByDataAttribute({
      themes: { light: 'light', dark: 'dark' },
      defaultTheme: getInitialStorybookThemeGlobal(),
    }),
  ],
  parameters: {
    options: {
      /**
       * Порядок в сайдбаре: сначала группы по названию, затем сторис внутри группы по фиксированному списку.
       */
      storySort: (firstStoryEntry, secondStoryEntry) => {
        const getStoryTitle = (storyEntry) => {
          if (Array.isArray(storyEntry)) {
            return storyEntry[1]?.title ?? '';
          }

          return storyEntry?.title ?? storyEntry?.name ?? '';
        };

        const firstStoryTitle = getStoryTitle(firstStoryEntry);
        const secondStoryTitle = getStoryTitle(secondStoryEntry);

        // Без аннотаций TypeScript: Storybook парсит `storySort` и выполняет через eval как JS.
        const groupOrderMap = {
          Inputs: 1,
          'Data Display': 2,
          Feedback: 3,
          Surfaces: 4,
          Navigation: 5,
          Layout: 6,
          Utils: 7,
          Hooks: 8,
          Theming: 9,
        };

        /**
         * Суффикс пути после `UI Kit/<группа>/` — по нему задаётся порядок внутри группы.
         */
        const storyOrderByGroup = {
          Inputs: [
            'Button',
            'IconButton',
            'ButtonGroup',
            'Link',
            'Input',
            'TextArea',
            'FileInput',
            'Select',
            'DateInput',
            'TimeInput',
            'Calendar',
            'Checkbox',
            'Switch',
            'RadioButton',
            'RadioButtonGroup',
            'Slider',
          ],
          'Data Display': [
            'Typography',
            'Avatar',
            'AvatarGroup',
            'Badge',
            'Tag',
            'Pill',
            'Table',
            'DataGrid',
            'Progress',
            'Skeleton',
            'Icon',
            'Icon/Categories',
            'Icon/Showcase',
            'Icon/Test',
            'Icon/Icon Test',
          ],
          Feedback: ['Toast', 'Snackbar', 'Tooltip', 'Hint', 'Spinner', 'Accordion'],
          Surfaces: ['Card', 'Modal', 'Drawer', 'Sheet', 'Divider'],
          Navigation: [
            'Breadcrumb',
            'Menu',
            'Dropdown',
            'Dropdown/DropdownMenu',
            'Dropdown/DropdownMenuItem',
            'FloatingMenu',
            'NavigationMenu',
            'Pagination',
            'Stepper',
            'Sidemenu',
            'Tabs',
            'Tabs/TabItem',
          ],
          Layout: ['Grid', 'GridItem'],
          Utils: [
            'ThemeToggle',
            'Theme Showcase',
            'Handlers/Overview',
            'Handlers/Date Handlers',
            'Handlers/Time Handlers',
            'Handlers/Button Theme Handlers',
            'Handlers/Dropdown Theme Handlers',
            'Variables/Blur Effects',
          ],
          Hooks: [
            'Overview',
            'useClickOutside',
            'useDebounce',
            'useKeyPress',
            'useLocalStorage',
            'useMediaQuery',
            'useModal',
            'useScrollPosition',
            'useSnackbar',
            'useToast',
            'useWindowSize',
          ],
          Theming: ['Custom theme', 'ThemeSelector'],
        };

        /**
         * @param storyTitle — полный `title` сторис (например `UI Kit/Inputs/Button`)
         * @returns приоритет группы в сайдбаре (меньше — выше)
         */
        const getGroupRank = (storyTitle) => {
          const titleParts = storyTitle.split('/');
          if ((titleParts[0] ?? '') !== 'UI Kit') {
            return 999;
          }
          const groupName = titleParts[1] ?? '';
          return groupOrderMap[groupName] ?? 999;
        };

        /**
         * @param storyTitle — полный `title` сторис (например `UI Kit/Inputs/Button`)
         * @returns индекс в таблице порядка внутри группы или -1, если не задано явно
         */
        const getWithinGroupOrderIndex = (storyTitle) => {
          const titleParts = storyTitle.split('/');
          if ((titleParts[0] ?? '') !== 'UI Kit') {
            return -1;
          }
          const groupName = titleParts[1] ?? '';
          const orderedStorySuffixes = storyOrderByGroup[groupName];
          if (!orderedStorySuffixes?.length) {
            return -1;
          }
          const storySuffix = titleParts.slice(2).join('/');
          return orderedStorySuffixes.indexOf(storySuffix);
        };

        const firstGroupRank = getGroupRank(firstStoryTitle);
        const secondGroupRank = getGroupRank(secondStoryTitle);
        if (firstGroupRank !== secondGroupRank) {
          return firstGroupRank - secondGroupRank;
        }

        const firstWithinGroupIndex = getWithinGroupOrderIndex(firstStoryTitle);
        const secondWithinGroupIndex = getWithinGroupOrderIndex(secondStoryTitle);

        if (firstWithinGroupIndex !== -1 || secondWithinGroupIndex !== -1) {
          const firstResolvedIndex = firstWithinGroupIndex === -1 ? Number.MAX_SAFE_INTEGER : firstWithinGroupIndex;
          const secondResolvedIndex = secondWithinGroupIndex === -1 ? Number.MAX_SAFE_INTEGER : secondWithinGroupIndex;
          if (firstResolvedIndex !== secondResolvedIndex) {
            return firstResolvedIndex - secondResolvedIndex;
          }
        }

        return firstStoryTitle.localeCompare(secondStoryTitle, 'en');
      },
    },
    // Минимальная высота блока сторис на странице документации (autodocs), чтобы попапы влезали
    docs: {
      story: {
        height: 'min(90vh, 800px)',
      },
      source: {
        type: 'dynamic',
        excludeDecorators: true,
        /**
         * В Docs показываем пример использования компонента, а не render-функцию сторис.
         * Явный код: parameters.docs.source.code или describeStory(..., usageCode).
         * Для сторис на args без render — сниппет из context.args.
         */
        transform: (generatedSource, context) =>
          getStoryDocsSourceCode(generatedSource, context),
      },
    },
  },
};

export default preview;
