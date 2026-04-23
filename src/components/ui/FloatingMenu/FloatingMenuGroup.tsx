import React, { useMemo } from 'react';
import { clsx } from 'clsx';
import { FloatingMenuGroupVariant, type FloatingMenuGroupProps } from '@/types/ui';
import { FloatingMenuGroupContext } from './FloatingMenuContext';
import { FloatingMenuGroupInner } from './FloatingMenu.style';

/**
 * Группа кнопок на плавающей панели.
 * @property variant — `INSET` — серый вложенный блок как в макете Figma справа
 * @property className — доп. класс
 * @property children — `FloatingMenuGroupItem` и т.п.
 */
export const FloatingMenuGroup: React.FC<FloatingMenuGroupProps> = ({
  variant = FloatingMenuGroupVariant.DEFAULT,
  className,
  children,
}) => {
  const value = useMemo(() => ({ variant }), [variant]);

  return (
    <FloatingMenuGroupContext.Provider value={value}>
      <FloatingMenuGroupInner
        className={clsx('ui-floating-menu-group', className)}
        $variant={variant}
        role="group"
      >
        {children}
      </FloatingMenuGroupInner>
    </FloatingMenuGroupContext.Provider>
  );
};

FloatingMenuGroup.displayName = 'FloatingMenuGroup';
