import { css, type RuleSet } from 'styled-components';
import type { TableShellVariant } from '@/types/ui';
import type { ThemeType } from '@/types/theme';
import { tableBorderRadiusFromCssVar } from './tableThemeRadiusHandlers';

/** Какие углы скруглять у блока сетки (клип, шапка split-layout, тело). */
export type TableScrollClipCornerMode = 'none' | 'top' | 'bottom' | 'all';

/**
 * Режим скругления для шапки или тела в split-layout / clip.
 * @param shellVariant — `card` | `embedded`
 * @param shellInset — отступ сетки от рамки карточки
 * @param embeddedPaginationBelow — ниже идёт встроенная пагинация
 * @param surface — шапка или прокручиваемое тело
 */
export function resolveTableScrollClipCornerMode(
  shellVariant: TableShellVariant,
  shellInset: boolean,
  embeddedPaginationBelow: boolean,
  surface: 'header' | 'body',
): TableScrollClipCornerMode {
  if (shellInset || shellVariant === 'embedded') {
    return 'none';
  }

  if (embeddedPaginationBelow) {
    return surface === 'header' ? 'top' : 'none';
  }

  return surface === 'header' ? 'top' : 'bottom';
}

/**
 * Режим скругления для `TableContainerScrollClip` (как раньше: всё / только верх / без скругления).
 * @param shellVariant — `card` | `embedded`
 * @param shellInset — отступ сетки от рамки карточки
 * @param embeddedPaginationBelow — ниже идёт встроенная пагинация
 */
export function resolveTableContainerScrollClipCornerMode(
  shellVariant: TableShellVariant,
  shellInset: boolean,
  embeddedPaginationBelow: boolean,
): TableScrollClipCornerMode {
  if (shellInset || shellVariant === 'embedded') {
    return 'none';
  }

  if (embeddedPaginationBelow) {
    return 'top';
  }

  return 'all';
}

/**
 * CSS скругления углов блока сетки.
 * @param theme — тема styled-components
 * @param cornerMode — какие углы скруглять
 */
export function tableScrollClipCornerRadiusCss(
  theme: ThemeType,
  cornerMode: TableScrollClipCornerMode,
): RuleSet {
  const borderRadius = tableBorderRadiusFromCssVar(theme);

  switch (cornerMode) {
    case 'none':
      return css`
        border-radius: 0;
      `;
    case 'top':
      return css`
        border-top-left-radius: ${borderRadius};
        border-top-right-radius: ${borderRadius};
      `;
    case 'bottom':
      return css`
        border-bottom-left-radius: ${borderRadius};
        border-bottom-right-radius: ${borderRadius};
      `;
    case 'all':
      return css`
        border-radius: ${borderRadius};
      `;
    default:
      return css`
        border-radius: 0;
      `;
  }
}
