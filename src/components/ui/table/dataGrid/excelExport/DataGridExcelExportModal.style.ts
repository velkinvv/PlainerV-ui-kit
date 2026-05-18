import styled from 'styled-components';

/** Форма выбора диапазона страниц в модалке выгрузки */
export const DataGridExcelExportForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

/** Подсказка над полями диапазона */
export const DataGridExcelExportHint = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** Сводка по объёму выгрузки */
export const DataGridExcelExportSummary = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** Две колонки полей «от» / «до» */
export const DataGridExcelExportFieldsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

/** Обёртка прогресса загрузки */
export const DataGridExcelExportProgressWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 0;
`;

/** Подпись к прогресс-бару */
export const DataGridExcelExportProgressLabel = styled.span`
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.text};
`;
