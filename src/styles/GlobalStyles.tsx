import styled, { createGlobalStyle } from 'styled-components';
import './fonts.css';

/**
 * Глобальные стили приложения
 * Определяет базовые стили для всего приложения
 */
const GlobalStylesComponent = createGlobalStyle`
  /* Сброс стилей */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* HTML и Body */
  html {
    font-size: 16px;
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: ${({ theme }) => theme.lineHeights.normal};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    transition: color 0.3s ease, background-color 0.3s ease;
  }

  /* Заголовки */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
    line-height: ${({ theme }) => theme.lineHeights.tight};
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }

  h1 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  }

  h4 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  h5 {
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  h6 {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  /* Параграфы */
  p {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
  }

  /* Ссылки */
  a {
    font-family: ${({ theme }) => theme.fonts.primary};
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primaryHover};
    }
  }

  /* Кнопки */
  button {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    line-height: ${({ theme }) => theme.lineHeights.normal};
  }

  /* Поля ввода */
  input, textarea, select {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: ${({ theme }) => theme.lineHeights.normal};
  }

  /* Списки */
  ul, ol {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
    color: ${({ theme }) => theme.colors.text};
  }

  /* Таблицы */
  table {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: ${({ theme }) => theme.lineHeights.normal};
  }

  /* Код */
  code, pre {
    font-family: ${({ theme }) => theme.fonts.monospace || 'monospace'};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: ${({ theme }) => theme.lineHeights.normal};
  }

  /* Утилиты для типографики */
  .text-xs {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }

  .text-sm {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  .text-base {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }

  .text-lg {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  .text-xl {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  .text-2xl {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }

  .text-3xl {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }

  .text-4xl {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }

  .text-5xl {
    font-size: ${({ theme }) => theme.fontSizes['5xl']};
  }

  /* Веса шрифтов */
  .font-thin {
    font-weight: ${({ theme }) => theme.fontWeights.thin};
  }

  .font-extra-light {
    font-weight: ${({ theme }) => theme.fontWeights.extraLight};
  }

  .font-light {
    font-weight: ${({ theme }) => theme.fontWeights.light};
  }

  .font-regular {
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }

  .font-medium {
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  .font-semi-bold {
    font-weight: ${({ theme }) => theme.fontWeights.semiBold};
  }

  .font-bold {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }

  .font-extra-bold {
    font-weight: ${({ theme }) => theme.fontWeights.extraBold};
  }

  .font-black {
    font-weight: ${({ theme }) => theme.fontWeights.black};
  }

  /* Высота строк */
  .leading-tight {
    line-height: ${({ theme }) => theme.lineHeights.tight};
  }

  .leading-normal {
    line-height: ${({ theme }) => theme.lineHeights.normal};
  }

  .leading-relaxed {
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
  }

  .leading-loose {
    line-height: ${({ theme }) => theme.lineHeights.loose};
  }

  /* Анимации */
  @keyframes skeleton-loading {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

// Экспорт для использования в компонентах
export const GlobalStyles = GlobalStylesComponent;
