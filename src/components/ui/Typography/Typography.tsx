import React from 'react';
import { StyledTypography } from './Typography.style';

/**
 * Варианты типографики
 * Определяет доступные стили для компонента Typography
 */
export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'bodySmall'
  | 'bodyLarge'
  | 'caption'
  | 'button'
  | 'input'
  | 'label'
  | 'inherit';

/**
 * Интерфейс для пропсов компонента Typography
 */
export interface TypographyProps {
  /** Содержимое компонента */
  children: React.ReactNode;
  /** Вариант типографики */
  variant?: TypographyVariant;
  /** HTML тег для рендеринга */
  as?: keyof JSX.IntrinsicElements;
  /** HTML тег для рендеринга (алиас для as) */
  component?: keyof JSX.IntrinsicElements;
  /** Цвет текста */
  color?: string;
  /** Выравнивание текста */
  align?: 'left' | 'center' | 'right' | 'justify';
  /** Дополнительный CSS класс */
  className?: string;
  /** Инлайн стили */
  style?: React.CSSProperties;
  /** Обработчик клика */
  onClick?: () => void;
  /** Жирность шрифта */
  fontWeight?: string;
  /** Размер шрифта */
  fontSize?: string;
  /** Высота строки */
  lineHeight?: string;
  /** Семейство шрифтов */
  fontFamily?: string;
  /** Трансформация текста */
  textTransform?: string;
  /** Декорация текста */
  textDecoration?: string;
  /** Декорация текста (алиас для textDecoration) */
  decoration?: string;
  /** Межбуквенный интервал */
  letterSpacing?: string;
  /** Межсловный интервал */
  wordSpacing?: string;
  /** Адаптивность */
  responsive?: boolean;
  /** Анимация */
  animate?: boolean;
  /** Верхний регистр */
  uppercase?: boolean;
  /** Нижний регистр */
  lowercase?: boolean;
  /** Заглавные буквы */
  capitalize?: boolean;
  /** Без переноса строк */
  noWrap?: boolean;
  /** Дополнительные HTML атрибуты */
  [key: string]: unknown;
}

/**
 * Компонент Typography
 * Универсальный компонент для отображения текста с различными стилями
 */
export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  as,
  component,
  color,
  align,
  className,
  style,
  onClick,
  fontWeight,
  fontSize,
  lineHeight,
  fontFamily,
  textTransform,
  textDecoration,
  decoration,
  letterSpacing,
  wordSpacing,
  responsive,
  animate,
  uppercase,
  lowercase,
  capitalize,
  noWrap,
  ...props
}) => {
  // Определяем HTML тег на основе варианта
  const getTag = (): keyof JSX.IntrinsicElements => {
    if (as) return as;
    if (component) return component;

    switch (variant) {
      case 'h1':
        return 'h1';
      case 'h2':
        return 'h2';
      case 'h3':
        return 'h3';
      case 'h4':
        return 'h4';
      case 'h5':
        return 'h5';
      case 'h6':
        return 'h6';
      case 'button':
        return 'span';
      case 'input':
        return 'span';
      case 'label':
        return 'label';
      default:
        return 'p';
    }
  };

  const Tag = getTag();

  // Определяем textTransform на основе boolean пропсов
  const getTextTransform = () => {
    if (textTransform) return textTransform;
    if (uppercase) return 'uppercase';
    if (lowercase) return 'lowercase';
    if (capitalize) return 'capitalize';
    return undefined;
  };

  // Определяем textDecoration (приоритет: textDecoration > decoration)
  const getTextDecoration = () => {
    return textDecoration || decoration;
  };

  return (
    <StyledTypography
      as={Tag}
      $variant={variant}
      $color={color}
      $align={align}
      $fontWeight={fontWeight}
      $fontSize={fontSize}
      $lineHeight={lineHeight}
      $fontFamily={fontFamily}
      $textTransform={getTextTransform()}
      $textDecoration={getTextDecoration()}
      $letterSpacing={letterSpacing}
      $wordSpacing={wordSpacing}
      $responsive={responsive}
      $animate={animate}
      $noWrap={noWrap}
      className={className}
      style={style}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledTypography>
  );
};

Typography.displayName = 'Typography';
