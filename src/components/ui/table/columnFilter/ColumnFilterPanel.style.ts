import styled, { css } from 'styled-components';
import type { ColumnFilterPanelPresentation } from '@/types/ui';
import { Size } from '../../../../types/sizes';
import type { ThemeType } from '../../../../types/theme';

/**
 * Отступы и скругление панели из токенов карточки без принудительной min-height.
 * @param theme — активная тема
 * @param panelSize — ступень размера (`Size`)
 */
const getCardPaddingAndRadius = (
  theme: ThemeType,
  panelSize: Size,
): { padding: string; borderRadius: string } => {
  const tier = theme.cards?.sizes?.[panelSize] ?? theme.cards.sizes[Size.MD];
  return {
    padding: tier.padding,
    borderRadius: tier.borderRadius,
  };
};

/** Отступы и скругление для режима отдельной карточки (вынесено из шаблона, чтобы не ломать парсер `css`) */
function columnFilterElevatedPaddingAndRadius(theme: ThemeType, panelSize: Size) {
  const { padding, borderRadius } = getCardPaddingAndRadius(theme, panelSize);
  return css`
    padding: ${padding};
    border-radius: ${borderRadius};
  `;
}

/** Корневая панель: фон, тень и типографика как у elevated-карточки; в режиме `embeddedInDropdown` — без дублирования оболочки `Dropdown` */
export const ColumnFilterPanelRoot = styled.section<{
  $panelSize: Size;
  $presentation: ColumnFilterPanelPresentation;
}>`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0;
  width: ${({ $presentation }) => ($presentation === 'embeddedInDropdown' ? '100%' : 'auto')};
  min-width: ${({ $presentation }) =>
    $presentation === 'embeddedInDropdown' ? '0' : 'min(280px, 100vw - 24px)'};
  max-width: ${({ $presentation }) => ($presentation === 'embeddedInDropdown' ? '100%' : 'none')};

  ${({ theme, $panelSize, $presentation }) =>
    $presentation === 'embeddedInDropdown'
      ? css`
          /* Фон и тень уже у родительского DropdownContent — иначе «карточка в карточке» и обрезание по overflow */
          background: transparent;
          color: ${theme.cards.variants.elevated.color};
          box-shadow: none;
          border-radius: 0;
          padding: 0;
        `
      : css`
          background: ${theme.cards.variants.elevated.background};
          color: ${theme.cards.variants.elevated.color};
          box-shadow: ${theme.boxShadow?.dropdown ?? theme.boxShadow.md};
          ${columnFilterElevatedPaddingAndRadius(theme, $panelSize)}
        `}
`;

/** Область под произвольные поля фильтра */
export const ColumnFilterPanelBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.cards.components.actions.gap};
  min-width: 0;
`;

/** Ряд кнопок «Применить» / «Очистить» с разделителем из токена границы */
export const ColumnFilterPanelFooter = styled.footer<{ $equalWidthButtons: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: ${({ theme }) => theme.cards.components.actions.gap};
  margin-top: ${({ theme }) => theme.cards.components.footer.marginTop};
  padding-top: ${({ theme }) => theme.cards.components.footer.paddingTop};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  & > button {
    ${({ $equalWidthButtons }) =>
      $equalWidthButtons
        ? css`
            flex: 1 1 0;
            min-width: 0;
          `
        : css`
            flex: 0 0 auto;
          `}
  }
`;
