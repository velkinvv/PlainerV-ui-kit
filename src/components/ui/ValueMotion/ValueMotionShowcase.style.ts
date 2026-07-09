import styled from 'styled-components';

/** Корневая обёртка витрины анимаций */
export const ValueMotionShowcaseRoot = styled.main`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 720px;
`;

/** Секция с заголовком и демо */
export const ValueMotionShowcaseSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/** Заголовок секции */
export const ValueMotionShowcaseTitle = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.text};
`;

/** Подпись под демо */
export const ValueMotionShowcaseHint = styled.p`
  margin: 0;
  font-size: 13px;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

/** Область превью компонента */
export const ValueMotionShowcasePreview = styled.div`
  display: flex;
  align-items: center;
  min-height: 48px;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

/** Ряд кнопок управления */
export const ValueMotionShowcaseControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

/** Кнопка управления демо */
export const ValueMotionShowcaseButton = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  line-height: 1.2;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.backgroundTertiary};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

/** Селект управления демо */
export const ValueMotionShowcaseSelect = styled.select`
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 13px;
  line-height: 1.2;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

/** Обёртка для поля ввода в демо */
export const ValueMotionShowcaseField = styled.div`
  width: 100%;
  max-width: 360px;
`;
