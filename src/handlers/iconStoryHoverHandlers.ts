import type { MouseEvent } from 'react';
import { lightTheme } from '@/themes/themes';

/**
 * Применяет hover-состояние карточки иконки в Storybook.
 * @param mouseEvent Событие наведения на карточку предпросмотра иконки.
 */
export const handleIconStoryCardMouseEnter = (mouseEvent: MouseEvent<HTMLDivElement>): void => {
  mouseEvent.currentTarget.style.transform = 'translateY(-2px)';
  mouseEvent.currentTarget.style.boxShadow = lightTheme.boxShadow.md;
  mouseEvent.currentTarget.style.borderColor = lightTheme.colors.info;
};

/**
 * Сбрасывает hover-состояние карточки иконки в Storybook.
 * @param mouseEvent Событие ухода курсора с карточки предпросмотра иконки.
 */
export const handleIconStoryCardMouseLeave = (mouseEvent: MouseEvent<HTMLDivElement>): void => {
  mouseEvent.currentTarget.style.transform = 'translateY(0)';
  mouseEvent.currentTarget.style.boxShadow = 'none';
  mouseEvent.currentTarget.style.borderColor = lightTheme.colors.border;
};
