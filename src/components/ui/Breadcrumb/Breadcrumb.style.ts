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
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

/** Элемент списка (`li`). */
export const BreadcrumbListItem = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

/** Разделитель между пунктами (второй элемент внутри `li`). */
export const BreadcrumbSeparator = styled.span`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors?.textTertiary ?? '#9e9e9e'};
  user-select: none;
`;

const crumbInteractive = css`
  color: ${({ theme }) => theme.colors?.primary ?? '#2563eb'};
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  transition: ${TransitionHandler()};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors?.primaryHover ?? theme.colors?.primary ?? '#1d4ed8'};
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors?.primary ?? '#2563eb'};
    outline-offset: 2px;
    border-radius: 2px;
  }

  &:disabled {
    color: ${({ theme }) => theme.colors?.textTertiary ?? '#9e9e9e'};
    cursor: not-allowed;
    text-decoration: none;
  }
`;

/** Ссылка в цепочке. */
export const BreadcrumbCrumbLink = styled.a`
  ${crumbInteractive}
`;

/** Кнопка-заглушка навигации (без `href`, с `onClick`). */
export const BreadcrumbCrumbButton = styled.button`
  ${crumbInteractive}
`;

/** Текущая страница или неактивный текст. */
export const BreadcrumbCrumbText = styled.span<{ $muted?: boolean }>`
  color: ${({ theme, $muted }) =>
    $muted ? theme.colors?.textTertiary ?? '#9e9e9e' : theme.colors?.text ?? '#111827'};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
