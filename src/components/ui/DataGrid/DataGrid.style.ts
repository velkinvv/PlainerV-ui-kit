import styled from 'styled-components';
import { ThemeMode } from '@/types/theme';

/** Контейнер таблицы с возможностью наложения оверлея загрузки */
export const DataGridRoot = styled.div`
  position: relative;
  width: 100%;
`;

/** Полупрозрачный оверлей при `isLoading` */
export const DataGridLoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) =>
    theme.mode === ThemeMode.DARK ? 'rgba(0, 0, 0, 0.35)' : 'rgba(255, 255, 255, 0.55)'};
  border-radius: inherit;
  pointer-events: all;
`;

/** Кнопка раскрытия строки (иконка-шеврон) */
/** Обёртка шеврона раскрытия (поворот при открытии) */
export const DataGridChevronWrap = styled.span<{ $open: boolean }>`
  display: inline-flex;
  line-height: 0;
  transform: ${({ $open }) => ($open ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.15s ease;
`;

/** Ручка перетаскивания строки */
export const DataGridRowDragHandle = styled.span<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'grab')};

  &:active {
    cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'grabbing')};
  }
`;

export const DataGridExpandButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 2px;
  border: 0;
  background: transparent;
  cursor: pointer;
  color: inherit;
  border-radius: 4px;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
