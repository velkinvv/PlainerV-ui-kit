import styled from 'styled-components';
import { BorderRadiusHandler } from '../../../handlers/uiHandlers';

/** Ряд локальных якорей в сторис */
export const FloatButtonStoriesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

/** Локальный контейнер-якорь, чтобы кнопка не уходила в viewport */
export const FloatButtonStoriesAnchorBox = styled.section`
  position: relative;
  box-sizing: border-box;
  min-height: 220px;
  width: 200px;
  overflow: visible;
  border: 1px solid ${({ theme }) => theme.colors?.border};
  border-radius: ${BorderRadiusHandler()};
  background: ${({ theme }) => theme.colors?.background};
`;

/** Прокручиваемый контейнер для якоря и BackTop */
export const FloatButtonStoriesScrollBox = styled.section`
  position: relative;
  box-sizing: border-box;
  height: 280px;
  overflow: auto;
  border: 1px solid ${({ theme }) => theme.colors?.border};
  border-radius: ${BorderRadiusHandler()};
  background: ${({ theme }) => theme.colors?.background};
`;

/** Высокий контент внутри скролл-бокса */
export const FloatButtonStoriesScrollInner = styled.div`
  box-sizing: border-box;
  min-height: 960px;
  padding: 16px;
  color: ${({ theme }) => theme.colors?.text};
`;

/** Подпись секции */
export const FloatButtonStoriesCaption = styled.p`
  margin: 0 0 8px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors?.textSecondary};
`;
