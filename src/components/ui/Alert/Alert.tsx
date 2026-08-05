import React, { useMemo } from 'react';
import { clsx } from 'clsx';
import { useTheme } from 'styled-components';
import type { AlertProps } from '../../../types/ui';
import { IconSize, Size } from '../../../types/sizes';
import { Icon } from '../Icon/Icon';
import {
  getAlertDefaultIconName,
  resolveAlertCloseHitAreaPx,
  resolveAlertIconNode,
  resolveAlertIconSizePx,
  resolveAlertPaletteKey,
  resolveAlertSurfaceTokens,
  shouldUseAlertDefaultIconName,
} from './handlers';
import {
  AlertActionSlot,
  AlertBody,
  AlertCloseButton,
  AlertIconSlot,
  AlertRoot,
  AlertTitleRoot,
  getAlertGeometry,
} from './Alert.style';
import { AlertTitle } from './AlertTitle';
import { AlertTitleProvider } from './AlertTitleContext';

type AlertComponent = React.FC<AlertProps> & {
  Title: typeof AlertTitle;
};

/**
 * Сопоставление Size Alert → IconSize для иконки / крестика.
 * @param size - Размер Alert
 */
const resolveCloseIconSize = (size: Size): IconSize => {
  switch (size) {
    case Size.XS:
    case Size.SM:
      return IconSize.SM;
    case Size.LG:
    case Size.XL:
      return IconSize.MD;
    case Size.MD:
    default:
      return IconSize.SM;
  }
};

/**
 * Inline Alert: severity, варианты оформления, иконка, заголовок, action, закрытие.
 *
 * @param props.severity - success | info | warning | error
 * @param props.variant - standard | filled | outlined
 * @param props.color - Override палитры
 * @param props.title - Заголовок
 * @param props.children - Контент
 * @param props.icon - Кастом / `false` чтобы скрыть
 * @param props.iconMapping - Override иконок по severity
 * @param props.action - Слот действия
 * @param props.onClose - Крестик закрытия
 * @param props.role - alert | status
 */
const AlertBase: React.FC<AlertProps> = ({
  severity = 'success',
  variant = 'standard',
  color,
  title,
  children,
  icon,
  iconMapping,
  action,
  onClose,
  closeAriaLabel = 'Закрыть',
  role = 'alert',
  size = Size.MD,
  fullWidth = false,
  className,
}) => {
  const theme = useTheme();
  const geometry = useMemo(() => getAlertGeometry(size), [size]);
  const paletteKey = resolveAlertPaletteKey(severity, color);
  const surface = useMemo(
    () => resolveAlertSurfaceTokens(theme, variant, paletteKey),
    [paletteKey, theme, variant],
  );

  const customIcon = resolveAlertIconNode({ severity, icon, iconMapping });
  const useDefaultIcon = shouldUseAlertDefaultIconName({ severity, icon, iconMapping });
  const iconSizePx = resolveAlertIconSizePx(size);
  const showIcon = customIcon != null || useDefaultIcon;

  const iconAccent = variant === 'filled' ? surface.text : surface.accent;
  const titleColor = surface.title;

  const resolvedAction =
    action != null ? (
      action
    ) : onClose ? (
      <AlertCloseButton
        type="button"
        aria-label={closeAriaLabel}
        onClick={onClose}
        $iconColor={surface.text}
        $sizePx={resolveAlertCloseHitAreaPx(size)}
      >
        <Icon name="PhosphorX" size={resolveCloseIconSize(size)} color="currentColor" />
      </AlertCloseButton>
    ) : null;

  return (
    <AlertRoot
      className={clsx('ui-alert', className)}
      role={role}
      data-severity={severity}
      data-variant={variant}
      $fullWidth={fullWidth}
      $background={surface.background}
      $border={surface.border}
      $text={surface.text}
      $padding={geometry.padding}
      $gap={geometry.gap}
    >
      {showIcon ? (
        <AlertIconSlot $accent={iconAccent} $iconSizePx={iconSizePx} aria-hidden>
          {useDefaultIcon ? (
            <Icon
              name={getAlertDefaultIconName(severity)}
              size={resolveCloseIconSize(size)}
              color="currentColor"
            />
          ) : (
            customIcon
          )}
        </AlertIconSlot>
      ) : null}

      <AlertTitleProvider
        value={{ titleColor, fontSize: geometry.titleFontSize }}
      >
        <AlertBody $fontSize={geometry.fontSize}>
          {title != null && title !== false ? (
            <AlertTitleRoot $titleColor={titleColor} $fontSize={geometry.titleFontSize}>
              {title}
            </AlertTitleRoot>
          ) : null}
          {children != null && children !== false ? children : null}
        </AlertBody>
      </AlertTitleProvider>

      {resolvedAction != null ? <AlertActionSlot>{resolvedAction}</AlertActionSlot> : null}
    </AlertRoot>
  );
};

AlertBase.displayName = 'Alert';

export const Alert = AlertBase as AlertComponent;
Alert.Title = AlertTitle;
