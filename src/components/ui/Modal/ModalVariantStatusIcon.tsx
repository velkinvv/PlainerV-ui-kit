import React, { useMemo } from 'react';
import { useTheme } from 'styled-components';
import { Icon } from '../Icon/Icon';
import { IconSize } from '@/types/sizes';
import type { ModalStatusVariant } from './modalStatusIconHandlers';
import { getModalStatusIconConfig } from './modalStatusIconHandlers';
import { ModalStatusIconGlow } from './ModalStatusIconGlow.style';

/**
 * Иконка статуса слева в шапке модалки (цветная иконка + размытая подсветка).
 *
 * @param variant — `danger` | `success` | `info`
 */
export type ModalVariantStatusIconProps = {
  variant: ModalStatusVariant;
};

export function ModalVariantStatusIcon({
  variant,
}: ModalVariantStatusIconProps): React.ReactElement {
  const theme = useTheme();
  const statusConfig = useMemo(
    () => getModalStatusIconConfig(variant, theme),
    [variant, theme],
  );

  return (
    <ModalStatusIconGlow $accentColor={statusConfig.accentColor} aria-hidden>
      <Icon name={statusConfig.iconName} size={IconSize.MD} color={statusConfig.accentColor} />
    </ModalStatusIconGlow>
  );
}

ModalVariantStatusIcon.displayName = 'ModalVariantStatusIcon';
