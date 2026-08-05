import React from 'react';
import { clsx } from 'clsx';
import type { AlertTitleProps } from '../../../types/ui';
import { AlertTitleRoot } from './Alert.style';
import { useAlertTitleContext } from './AlertTitleContext';

/**
 * Заголовок Alert (можно вложить в children или передать через `title`).
 * @param props.children - Текст заголовка
 * @param props.className - CSS-класс
 */
export const AlertTitle: React.FC<AlertTitleProps> = ({ children, className }) => {
  const titleContext = useAlertTitleContext();
  if (children == null || children === false) {
    return null;
  }

  return (
    <AlertTitleRoot
      as="strong"
      className={clsx('ui-alert__title', className)}
      $titleColor={titleContext?.titleColor ?? 'inherit'}
      $fontSize={titleContext?.fontSize ?? 'inherit'}
    >
      {children}
    </AlertTitleRoot>
  );
};

AlertTitle.displayName = 'Alert.Title';
