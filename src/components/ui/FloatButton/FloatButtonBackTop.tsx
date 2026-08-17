import React from 'react';
import type { FloatButtonBackTopProps } from '../../../types/ui';
import { FloatButton } from './FloatButton';

/**
 * Кнопка «наверх»: видна после порога прокрутки.
 *
 * @param props.visibilityHeight - Порог показа
 * @param props.showProgress - Кольцо прогресса
 * @param props.getScrollContainer - Цель прокрутки
 */
export const FloatButtonBackTop: React.FC<FloatButtonBackTopProps> = (props) => (
  <FloatButton backTop {...props} />
);

FloatButtonBackTop.displayName = 'FloatButton.BackTop';

FloatButton.BackTop = FloatButtonBackTop;
