import React from 'react';
import * as PlainerIcons from '../../../icons/plainer';
import * as IconExIcons from '../../../icons/iconex';
import * as PhosphorIcons from '../../../icons/phosphor/regular';
import { useTheme } from '../../../themes/ThemeProvider';
import type { IconProps } from '../../../types/ui';
import type { IconComponentProps } from '../../../types/icon';
import { /* iconSizeHandler, */ sizeMap } from '../../../handlers/iconHandlers';
import { IconSize } from '../../../types/sizes';

/** Тип одной SVG-иконки из наборов plainer / iconex / phosphor */
type SvgIconComponent = React.ComponentType<IconComponentProps>;

// Create a mapping of icon names without prefixes for easier access
const plainerIconMap: Record<string, SvgIconComponent> = {};
Object.keys(PlainerIcons).forEach(key => {
  const name = key.replace('IconPlainer', '');
  plainerIconMap[name] = PlainerIcons[key as keyof typeof PlainerIcons] as SvgIconComponent;
});

const iconexIconMap: Record<string, SvgIconComponent> = {};
Object.keys(IconExIcons).forEach(key => {
  const name = key.replace('IconEx', '');
  iconexIconMap[name] = IconExIcons[key as keyof typeof IconExIcons] as SvgIconComponent;
});

const phosphorIconMap: Record<string, SvgIconComponent> = {};
Object.keys(PhosphorIcons).forEach(key => {
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
    const { mode } = useTheme();
    const themeColor = color || (mode === 'dark' ? '#f5f5f5' : '#262626');

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
      <div
        style={{
          width: iconSize,
          height: iconSize,
          backgroundColor: '#f3f4f6',
          border: '1px dashed #d1d5db',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          color: '#6b7280',
        }}
        title={`Icon "${name}" not found`}
      >
        ?
      </div>
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
