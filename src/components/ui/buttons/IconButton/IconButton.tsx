import React, { forwardRef, type ComponentProps } from 'react';
import { clsx } from 'clsx';
import { type IconButtonProps, ButtonVariant } from '../../../../types/ui';
import { Size } from '../../../../types/sizes';
import { useUiMotionPresets } from '../../../../hooks/useUiMotion';
import { StyledIconButton, LoadingSpinner, IconContentWrapper } from './IconButton.style';
import { Tooltip } from '../../Tooltip/Tooltip';
import { omitMotionConflictingDomHandlers } from '../../../../handlers/styledComponentHandlers';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    variant = ButtonVariant.PRIMARY,
    size = Size.MD,
    disabled = false,
    loading = false,
    fullWidth = false,
    rounded = false, // По умолчанию радиус берётся из темы
    icon,
    showTooltip = false,
    tooltipText,
    className,
    onClick,
    ...props
  },
  ref,
) {
  const uiMotion = useUiMotionPresets();

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner />;
    }

    return icon;
  };

  const motionProps: ComponentProps<typeof StyledIconButton> = {
    ref,
    variant,
    size,
    disabled: disabled || loading,
    loading,
    fullWidth,
    rounded,
    className: clsx('ui-icon-button', className),
    onClick,
    ...uiMotion.buttonPress(!(disabled || loading)),
    ...omitMotionConflictingDomHandlers(props),
  };

  const buttonElement = (
    <StyledIconButton {...motionProps}>
      <IconContentWrapper className="ui-icon-button-content">{renderContent()}</IconContentWrapper>
    </StyledIconButton>
  );

  // Если нужно показать тултип и есть текст тултипа
  if (showTooltip && tooltipText) {
    return (
      <Tooltip content={tooltipText} disabled={disabled || loading}>
        {buttonElement}
      </Tooltip>
    );
  }

  return buttonElement;
});
