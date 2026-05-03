import React, { forwardRef, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import type { ButtonGroupProps } from '@/types/ui';
import { ButtonVariant } from '@/types/ui';
import { Size } from '@/types/sizes';
import { ButtonGroupRoot } from './ButtonGroup.style';

/**
 * Группа кнопок: общий `role="group"`, горизонталь или вертикаль, опционально склеенные границы (`attached`) по макету Figma.
 * @param props - Пропсы `ButtonGroupProps`.
 * @param ref - Ref на корневой `div`.
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      children,
      orientation = 'horizontal',
      attached = false,
      size = Size.MD,
      attachedShape = 'segment',
      fullWidth = false,
      selectable = false,
      activeIndex,
      defaultActiveIndex = 0,
      onActiveIndexChange,
      activeButtonVariant = ButtonVariant.PRIMARY,
      inactiveButtonVariant = ButtonVariant.OUTLINE,
      role = 'group',
      ariaLabel,
      className,
    },
    ref,
  ) => {
    const [localActiveButtonIndex, setLocalActiveButtonIndex] = useState(defaultActiveIndex);
    const resolvedActiveButtonIndex =
      typeof activeIndex === 'number' ? activeIndex : localActiveButtonIndex;

    const preparedChildren = useMemo(() => {
      if (!selectable) {
        return children;
      }

      return React.Children.map(children, (childNode, childIndex) => {
        if (!React.isValidElement(childNode)) {
          return childNode;
        }

        const childProps = (childNode.props ?? {}) as {
          onClick?: (event: React.MouseEvent<HTMLElement>) => void;
          variant?: ButtonVariant;
        };
        const isActiveButton = childIndex === resolvedActiveButtonIndex;
        const variantForChild = isActiveButton ? activeButtonVariant : inactiveButtonVariant;

        return React.cloneElement(childNode, {
          ...childProps,
          variant: variantForChild,
          'data-active': isActiveButton ? 'true' : 'false',
          'aria-pressed': isActiveButton,
          onClick: (event: React.MouseEvent<HTMLElement>) => {
            childProps.onClick?.(event);
            if (typeof activeIndex !== 'number') {
              setLocalActiveButtonIndex(childIndex);
            }
            onActiveIndexChange?.(childIndex);
          },
        });
      });
    }, [
      selectable,
      children,
      resolvedActiveButtonIndex,
      activeButtonVariant,
      inactiveButtonVariant,
      activeIndex,
      onActiveIndexChange,
    ]);

    return (
      <ButtonGroupRoot
        ref={ref}
        className={clsx('ui-button-group', className)}
        role={role}
        aria-label={ariaLabel}
        $orientation={orientation}
        $attached={attached}
        $size={size}
        $attachedShape={attachedShape}
        $fullWidth={fullWidth}
      >
        {preparedChildren}
      </ButtonGroupRoot>
    );
  },
);

ButtonGroup.displayName = 'ButtonGroup';
