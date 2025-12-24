import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { type ButtonProps, ButtonVariant } from '../../../../types/ui';
import { Size } from '../../../../types/sizes';
import { StyledButton, LoadingContainer, LoadingSpinner } from './Button.style';
import { getButtonAnimations } from '../../../../handlers/buttonThemeHandlers';
import { useTheme } from 'styled-components';
import { Tooltip } from '../../Tooltip/Tooltip';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = ButtonVariant.PRIMARY,
      size = Size.MD,
      disabled = false,
      loading = false,
      fullWidth = false,
      rounded = false,
      iconStart,
      iconEnd,
      showTooltip = false,
      tooltipText,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const animations = getButtonAnimations(theme.buttons);
    const renderContent = () => {
      if (loading) {
        return (
          <LoadingContainer>
            <LoadingSpinner />
            Загрузка...
          </LoadingContainer>
        );
      }

      // Если есть только иконки без текста
      if ((iconStart || iconEnd) && !children) {
        return (
          <>
            {iconStart}
            {iconEnd}
          </>
        );
      }

      // Если есть иконки с текстом
      if ((iconStart || iconEnd) && children) {
        return (
          <>
            {iconStart}
            {children}
            {iconEnd}
          </>
        );
      }

      // Только текст
      return children;
    };

    const buttonElement = (
      <StyledButton
        ref={ref}
        variant={variant}
        size={size}
        disabled={disabled || loading}
        loading={loading}
        fullWidth={fullWidth}
        rounded={rounded}
        className={clsx('ui-button', className)}
        onClick={onClick}
        whileHover={!disabled && !loading ? { scale: animations.hoverScale } : undefined}
        whileTap={!disabled && !loading ? { scale: animations.tapScale } : undefined}
        {...props}
      >
        {renderContent()}
      </StyledButton>
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
  },
);

Button.displayName = 'Button';
