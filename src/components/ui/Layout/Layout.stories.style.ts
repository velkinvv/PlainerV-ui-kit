import styled from 'styled-components';
import { BorderRadiusHandler } from '../../../handlers/uiHandlers';

/** Рамка демо каркаса */
export const LayoutStoriesFrame = styled.section`
  box-sizing: border-box;
  min-height: 360px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors?.border};
  border-radius: ${BorderRadiusHandler()};
  background: ${({ theme }) => theme.colors?.background};
`;

/** Рамка с фиксированной высотой для scrollMode=content */
export const LayoutStoriesTallFrame = styled.section`
  box-sizing: border-box;
  height: 360px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors?.border};
  border-radius: ${BorderRadiusHandler()};
  background: ${({ theme }) => theme.colors?.background};
`;

/** Рамка со скроллом страницы для sticky */
export const LayoutStoriesPageScrollFrame = styled.section`
  box-sizing: border-box;
  height: 360px;
  overflow: auto;
  border: 1px solid ${({ theme }) => theme.colors?.border};
  border-radius: ${BorderRadiusHandler()};
  background: ${({ theme }) => theme.colors?.background};
`;

/** Плейсхолдер зоны */
export const LayoutStoriesPlaceholder = styled.p`
  margin: 0;
  padding: 16px;
  color: ${({ theme }) => theme.colors?.textSecondary};
`;

/** Высокий контент для прокрутки */
export const LayoutStoriesTallPlaceholder = styled.div`
  box-sizing: border-box;
  min-height: 720px;
  padding: 16px;
  color: ${({ theme }) => theme.colors?.textSecondary};
`;
