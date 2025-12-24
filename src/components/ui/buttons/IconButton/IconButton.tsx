import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { type IconButtonProps, ButtonVariant } from '../../../../types/ui';
import { Size } from '../../../../types/sizes';
import { StyledIconButton, LoadingSpinner } from './IconButton.style';
import { getButtonAnimations } from '../../../../handlers/buttonThemeHandlers';
import { useTheme } from 'styled-components';
import { Tooltip } from '../../Tooltip/Tooltip';

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    variant = ButtonVariant.PRIMARY,
    size = Size.MD,
    disabled = false,
    loading = false,
    fullWidth = false,
    rounded = true, // По умолчанию круглая
    icon,
    showTooltip = false,
    tooltipText,
    className,
    onClick,
    ...props
  },
  ref,
) {
  const theme = useTheme();
  const animations = theme?.buttons
    ? getButtonAnimations(theme.buttons)
    : {
        transition: 'all 0.2s ease-in-out',
        hoverScale: 1.02,
        tapScale: 0.98,
      };

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
      whileHover={!disabled && !loading ? { scale: animations.hoverScale } : undefined}
      whileTap={!disabled && !loading ? { scale: animations.tapScale } : undefined}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {renderContent()}
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
