import React, { forwardRef, useCallback, type ComponentProps } from 'react';
import { clsx } from 'clsx';
import { type ButtonProps, ButtonVariant } from '../../../../types/ui';
import { Size } from '../../../../types/sizes';
import { useUiMotionPresets } from '../../../../hooks/useUiMotion';
import { StyledButton, StyledLinkButton, LoadingContainer, LoadingSpinner } from './Button.style';
import { mergeAnchorRel } from '../../../../handlers/linkHandlers';
import { omitMotionConflictingDomHandlers } from '../../../../handlers/styledComponentHandlers';
import { Tooltip } from '../../Tooltip/Tooltip';

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
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
      href,
      target,
      rel,
      download,
      type,
      ...props
    },
    ref,
  ) => {
    const uiMotion = useUiMotionPresets();
    const isAnchor = Boolean(href);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (isAnchor && (disabled || loading)) {
          e.preventDefault();
        }
        onClick?.(e as React.MouseEvent<HTMLButtonElement>);
      },
      [isAnchor, disabled, loading, onClick],
    );

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

    const mergedRel = isAnchor ? mergeAnchorRel(target, rel) : undefined;

    const motionProps: ComponentProps<typeof StyledButton> = {
      ref: ref as React.Ref<HTMLButtonElement>,
      href: isAnchor ? href : undefined,
      target: isAnchor ? target : undefined,
      rel: mergedRel,
      download: isAnchor ? download : undefined,
      type: isAnchor ? undefined : type,
      variant,
      size,
      disabled: disabled || loading,
      loading,
      fullWidth,
      rounded,
      'aria-disabled': isAnchor && (disabled || loading) ? true : undefined,
      className: clsx('ui-button', isAnchor ? 'ui-button--link' : null, className),
      onClick: handleClick,
      ...uiMotion.buttonPress(!(disabled || loading)),
      ...omitMotionConflictingDomHandlers(props),
    };

    const buttonElement = isAnchor ? (
      <StyledLinkButton {...(motionProps as ComponentProps<typeof StyledLinkButton>)}>
        {renderContent()}
      </StyledLinkButton>
    ) : (
      <StyledButton {...motionProps}>{renderContent()}</StyledButton>
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
