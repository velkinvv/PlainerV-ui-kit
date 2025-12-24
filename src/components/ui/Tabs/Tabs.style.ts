import styled from 'styled-components';
import { TabsDirection, TabItemTextPosition, type TabItemTextOrientation } from '../../../types/ui';

/**
 * TabsTrigger
 */
export const TabsTrigger = styled.button<{
  $isActive: boolean;
  $direction: TabsDirection;
  $textOrientation?: TabItemTextOrientation;
  $textPosition?: TabItemTextPosition;
  $hasIcons?: boolean;
  $flexDirection?: string;
  $gap?: string;
}>`
  padding: 12px 24px;
  background: ${({ $isActive, theme }) => ($isActive ? theme.colors.primary : 'transparent')};
  color: ${({ $isActive, theme }) => ($isActive ? '#ffffff' : theme.colors.textSecondary)};
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ $flexDirection }) => $flexDirection || 'row'};
  gap: ${({ $gap }) => $gap || '0'};

  /* Горизонтальное направление: border-bottom */
  border-bottom: ${({ $isActive, $direction, theme }) =>
    $direction === TabsDirection.HORIZONTAL
      ? `2px solid ${$isActive ? theme.colors.primary : 'transparent'}`
      : 'none'};

  /* Вертикальное направление: border-right */
  border-right: ${({ $isActive, $direction, theme }) =>
    $direction === TabsDirection.VERTICAL
      ? `2px solid ${$isActive ? theme.colors.primary : 'transparent'}`
      : 'none'};

  /* Поворот текста */
  ${({ $textOrientation, $textPosition }) => {
    if ($textOrientation === 'vertical') {
      // По умолчанию используется правая позиция
      const position = $textPosition || TabItemTextPosition.RIGHT;
      // LEFT: текст идёт сверху вниз, слева направо (vertical-lr)
      // RIGHT: текст идёт сверху вниз, справа налево (vertical-rl)
      // Поворот на 180 градусов применяется к span внутри компонента
      if (position === TabItemTextPosition.RIGHT) {
        return `
          writing-mode: vertical-rl;
          text-orientation: mixed;
        `;
      }
      // LEFT
      return `
        writing-mode: vertical-lr;
        text-orientation: mixed;
      `;
    }
    return '';
  }}

  /* Выравнивание текста в вертикальном режиме текста */
  ${({ $textOrientation, $textPosition }) => {
    if ($textOrientation === 'vertical') {
      // По умолчанию используется правая позиция
      const position = $textPosition || TabItemTextPosition.RIGHT;
      if (position === TabItemTextPosition.LEFT) {
        return `
          justify-content: flex-start;
        `;
      }
      if (position === TabItemTextPosition.RIGHT) {
        return `
          justify-content: flex-end;
        `;
      }
      return `
        justify-content: flex-end;
      `;
    }
    return '';
  }}

  &:hover {
    background: ${({ $isActive, theme }) =>
      $isActive ? theme.colors.primary : theme.colors.backgroundTertiary};
    color: ${({ $isActive, theme }) => ($isActive ? '#ffffff' : theme.colors.text)};
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: -2px;
  }
`;

/**
 * TabsContent
 */
export const TabsContent = styled.div<{
  $isActive: boolean;
  $direction: TabsDirection;
}>`
  display: ${({ $isActive }) => ($isActive ? 'block' : 'none')};
  padding: 16px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  flex: 1;

  /* В вертикальном режиме контент должен занимать оставшееся пространство */
  ${({ $direction }) =>
    $direction === TabsDirection.VERTICAL
      ? `
    min-width: 0;
  `
      : ''}
`;
