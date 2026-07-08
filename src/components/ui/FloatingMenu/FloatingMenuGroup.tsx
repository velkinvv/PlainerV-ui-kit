import React, { useId, useLayoutEffect, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { FloatingMenuGroupVariant, type FloatingMenuGroupProps } from '@/types/ui';
import { FloatingMenuGroupContext, useFloatingMenuRootContext } from './FloatingMenuContext';
import { FloatingMenuGroupInner } from './FloatingMenu.style';
import { FloatingMenuGroupItemPresenceMotion } from './FloatingMenuGroupItemPresenceMotion';

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
  const groupId = useId();
  const {
    dynamicSize,
    orientation,
    registerGroupItemCount,
    unregisterGroupItemCount,
    endSizeAnimation,
  } = useFloatingMenuRootContext();

  const groupContextValue = useMemo(() => ({ variant }), [variant]);

  const childElements = useMemo(
    () => React.Children.toArray(children).filter(React.isValidElement),
    [children],
  );

  useLayoutEffect(() => {
    if (!dynamicSize) {
      return undefined;
    }

    registerGroupItemCount(groupId, childElements.length);

    return () => {
      unregisterGroupItemCount(groupId);
    };
  }, [
    childElements.length,
    dynamicSize,
    groupId,
    registerGroupItemCount,
    unregisterGroupItemCount,
  ]);

  const renderedChildren = dynamicSize ? (
    <AnimatePresence initial={false} mode="sync" onExitComplete={endSizeAnimation}>
      {childElements.map((childElement, childIndex) => {
        const presenceKey = String(childElement.key ?? childIndex);

        return (
          <FloatingMenuGroupItemPresenceMotion
            key={presenceKey}
            isLastItem={childIndex === childElements.length - 1}
          >
            {childElement}
          </FloatingMenuGroupItemPresenceMotion>
        );
      })}
    </AnimatePresence>
  ) : (
    children
  );

  return (
    <FloatingMenuGroupContext.Provider value={groupContextValue}>
      <FloatingMenuGroupInner
        className={clsx('ui-floating-menu-group', className)}
        $variant={variant}
        $dynamicSize={dynamicSize}
        $orientation={orientation}
        role="group"
      >
        {renderedChildren}
      </FloatingMenuGroupInner>
    </FloatingMenuGroupContext.Provider>
  );
};

FloatingMenuGroup.displayName = 'FloatingMenuGroup';
