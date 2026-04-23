import styled, { css } from 'styled-components';
import { Size } from '../../../types/sizes';
import { TransitionHandler } from '../../../handlers/uiHandlers';

const sizeStyles = (size: Size | undefined) => {
  switch (size) {
    case Size.SM:
    case Size.XS:
      return css`
        font-size: ${({ theme }) => theme.typography?.caption?.fontSize ?? '12px'};
        line-height: ${({ theme }) => theme.typography?.caption?.lineHeight ?? 1.3};
      `;
    case Size.LG:
    case Size.XL:
      return css`
        font-size: ${({ theme }) => theme.typography?.body?.fontSize ?? '16px'};
        line-height: ${({ theme }) => theme.typography?.body?.lineHeight ?? 1.5};
      `;
    case Size.MD:
    default:
      return css`
        font-size: ${({ theme }) => theme.typography?.body?.fontSize ?? '14px'};
        line-height: ${({ theme }) => theme.typography?.body?.lineHeight ?? 1.45};
      `;
  }
};

/** Корневой `nav`. */
export const BreadcrumbNav = styled.nav<{ $size?: Size }>`
  width: 100%;
  ${({ $size }) => sizeStyles($size)}
`;

/** Список пунктов (`ol`). */
export const BreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

/** Элемент списка (`li`). */
export const BreadcrumbListItem = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
`;

/** Разделитель «>» между пунктами. */
export const BreadcrumbSeparator = styled.span`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.textTertiary};
  user-select: none;
  line-height: 0;
`;

/** Строка: иконка + подпись */
export const BreadcrumbCrumbRow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
`;

/**
 * Слот иконки слева.
 * @property $muted - Приглушение (disabled)
 */
export const BreadcrumbCrumbIcon = styled.span
  .withConfig({ shouldForwardProp: p => p !== '$muted' })<{ $muted?: boolean }>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  line-height: 0;
  color: inherit;
  opacity: ${({ $muted }) => ($muted ? 0.55 : 1)};
`;

/** Текстовая часть крошки с обрезкой */
export const BreadcrumbCrumbLabel = styled.span`
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const pillShell = css`
  padding: 4px 12px;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.backgroundTertiary};
`;

type CrumbShell = { $pill?: boolean; $muted?: boolean };

const crumbShell = css<CrumbShell>`
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  border: none;
  font: inherit;
  transition: ${TransitionHandler()};

  ${({ $pill, theme }) =>
    $pill &&
    css`
      ${pillShell}
      color: ${theme.colors.text};
    `}

  ${({ $pill, $muted, theme }) =>
    !$pill &&
    css`
      padding: 0;
      background: none;
      color: ${$muted ? theme.colors.textTertiary : theme.colors.text};
    `}
`;

const crumbInteractive = css`
  cursor: pointer;
  text-decoration: none;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: 4px;
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.textTertiary};
    cursor: not-allowed;
    text-decoration: none;
    opacity: 0.65;
  }
`;

/** Ссылка в цепочке. */
export const BreadcrumbCrumbLink = styled.a
  .withConfig({ shouldForwardProp: p => p !== '$pill' && p !== '$muted' })<CrumbShell>`
  ${crumbShell}
  ${crumbInteractive}
`;

/** Кнопка-крошка (без `href`, с `onClick`). */
export const BreadcrumbCrumbButton = styled.button
  .withConfig({ shouldForwardProp: p => p !== '$pill' && p !== '$muted' })<CrumbShell>`
  ${crumbShell}
  ${crumbInteractive}
`;

/** Текущая страница или неактивный текст. */
export const BreadcrumbCrumbText = styled.span
  .withConfig({ shouldForwardProp: p => p !== '$pill' && p !== '$muted' })<CrumbShell>`
  ${crumbShell}
`;

/**
 * Свернутый сегмент «…» (макет Figma).
 * @property $disabled - Блокировка
 */
export const BreadcrumbEllipsisButton = styled.button
  .withConfig({ shouldForwardProp: p => p !== '$disabled' })<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-height: 26px;
  min-width: 36px;
  margin: 0;
  padding: 4px 12px;
  border: none;
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.backgroundTertiary};
  color: ${({ theme }) => theme.colors.textSecondary};
  font: inherit;
  font-weight: 500;
  letter-spacing: 0.12em;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: ${TransitionHandler()};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.backgroundQuaternary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
