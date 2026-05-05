import styled from 'styled-components';

/**
 * Вертикальный блок кнопок в примере пропа **footer** (сторис сайдменю).
 * Ограничивает ширину по колонке и выравнивает элементы на всю ширину слота.
 */
export const SidemenuDemoFooterActions = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  align-items: stretch;
  box-sizing: border-box;
`;

/**
 * Горизонтальная строка для примеров **logoSlot**: иконка, заголовок, бейдж.
 * Перенос строк на узкой панели.
 */
export const SidemenuDemoHeaderBrand = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 0;
`;
