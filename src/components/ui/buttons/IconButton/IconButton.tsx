import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { type IconButtonProps, ButtonVariant } from '../../../../types/ui';
import { Size } from '../../../../types/sizes';
import { useUiMotionPresets } from '../../../../hooks/useUiMotion';
import { StyledIconButton, LoadingSpinner, IconContentWrapper } from './IconButton.style';
import { Tooltip } from '../../Tooltip/Tooltip';

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

  const buttonElement = (
    <StyledIconButton
      ref={ref}
      variant={variant}
      size={size}
      disabled={disabled}
      loading={loading}
      fullWidth={fullWidth}
      rounded={rounded}
      icon={icon}
      className={clsx('ui-icon-button', className)}
      onClick={onClick}
      {...uiMotion.buttonPress(!(disabled || loading))}
      {...props}
    >
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
