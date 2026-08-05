import React from 'react';
import { useTheme as useStyledTheme } from 'styled-components';
import * as PlainerIcons from '../../../icons/plainer';
import * as IconExIcons from '../../../icons/iconex';
import * as PhosphorIcons from '../../../icons/phosphor/regular';
import type { IconProps } from '../../../types/ui';
import type { IconComponentProps } from '../../../types/icon';
import { /* iconSizeHandler, */ sizeMap } from '../../../handlers/iconHandlers';
import { IconSize } from '../../../types/sizes';
import { IconMissingPlaceholder } from './Icon.style';

/** Тип одной SVG-иконки из наборов plainer / iconex / phosphor */
type SvgIconComponent = React.ComponentType<IconComponentProps>;

// Create a mapping of icon names without prefixes for easier access
const plainerIconMap: Record<string, SvgIconComponent> = {};
Object.keys(PlainerIcons).forEach((key) => {
  const name = key.replace('IconPlainer', '');
  plainerIconMap[name] = PlainerIcons[key as keyof typeof PlainerIcons] as SvgIconComponent;
});

const iconexIconMap: Record<string, SvgIconComponent> = {};
Object.keys(IconExIcons).forEach((key) => {
  const name = key.replace('IconEx', '');
  iconexIconMap[name] = IconExIcons[key as keyof typeof IconExIcons] as SvgIconComponent;
});

const phosphorIconMap: Record<string, SvgIconComponent> = {};
Object.keys(PhosphorIcons).forEach((key) => {
  const name = key.replace('Phosphor', '');
  phosphorIconMap[name] = PhosphorIcons[key as keyof typeof PhosphorIcons] as SvgIconComponent;
});

export const Icons: Record<string, SvgIconComponent> = {
  ...plainerIconMap,
  ...iconexIconMap,
  ...phosphorIconMap,
};

export const Icon: React.FC<IconProps> = React.memo(
  ({
    name,
    // size,
    size = IconSize.MD,
    color,
    className,
    // variant = 'iconEx',
  }) => {
    // const iconSize = iconSizeHandler(size, size);
    const iconSize = sizeMap[size] || sizeMap[IconSize.MD]; // fallback к MD если размер не найден
    const theme = useStyledTheme();
    const themeColor = color || theme.colors?.text;

    // Функция для безопасного рендеринга иконки
    const renderIcon = React.useCallback(
      (IconComponent: SvgIconComponent | undefined) => {
        if (!IconComponent || typeof IconComponent !== 'function') {
          return null;
        }

        try {
          return (
            <IconComponent
              width={iconSize}
              height={iconSize}
              color={themeColor}
              className={className}
            />
          );
        } catch {
          // console.warn(`Error rendering icon "${name}":`, error);
          return null;
        }
      },
      [iconSize, themeColor, className],
    );

    // Сначала пробуем найти иконку в указанном варианте
    if (typeof name === 'string' && name.includes('IconPlainer')) {
      const PlainerIconComponent = PlainerIcons[name as keyof typeof PlainerIcons];
      if (PlainerIconComponent) {
        const rendered = renderIcon(PlainerIconComponent);
        if (rendered) return rendered;
      }
    }

    if (typeof name === 'string' && name.includes('IconEx')) {
      const IconexIconComponent = IconExIcons[name as keyof typeof IconExIcons];
      if (IconexIconComponent) {
        const rendered = renderIcon(IconexIconComponent);
        if (rendered) return rendered;
      }
    }

    if (typeof name === 'string' && name.includes('Phosphor')) {
      const PhosphorIconComponent = PhosphorIcons[name as keyof typeof PhosphorIcons];
      if (PhosphorIconComponent) {
        const rendered = renderIcon(PhosphorIconComponent);
        if (rendered) return rendered;
      }
    }

    // Если не найден иконка в указанном варианте, ищем в общем маппинге
    const IconComponent = Icons[name];
    if (IconComponent) {
      const rendered = renderIcon(IconComponent);
      if (rendered) return rendered;
    }

    // Если иконка не найдена нигде, показываем заглушку
    // console.warn(`Icon "${name}" not found in any variant`);
    return (
      <IconMissingPlaceholder $sizePx={iconSize} title={`Icon "${name}" not found`}>
        ?
      </IconMissingPlaceholder>
    );
  },
  (prevProps, nextProps) => {
    // Кастомная функция сравнения для предотвращения лишних перерендеров
    return (
      prevProps.name === nextProps.name &&
      prevProps.size === nextProps.size &&
      prevProps.color === nextProps.color &&
      prevProps.className === nextProps.className
    );
  },
);

Icon.displayName = 'Icon';
