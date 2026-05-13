import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon/Icon';
import * as PlainerIconsModule from '../../icons/plainer';
import * as IconExIconsModule from '../../icons/iconex';
import { Hint } from './Hint/Hint';
import { IconSize } from '../../types/sizes';
import { sizeMap } from '../../handlers/iconHandlers';
import {
  handleIconStoryCardMouseEnter,
  handleIconStoryCardMouseLeave,
} from '../../handlers/iconStoryHoverHandlers';
import type { IconVariant } from '../../types/ui';
import type { IconName } from '../../icons';
import { DOC_ICON_SHOWCASE } from '@/components/ui/storyDocs/uiKitDocs';
import {
  buildCenteredIconPreviewCardStyle,
  buildIconStoriesScrollableGridStyle,
  iconStoriesStyles,
} from './Icon/Icon.stories.styles';

// Функция для получения реально существующих иконок
const getExistingIcons = () => {
  // Получаем иконки Plainer (сохраняем полные имена)
  const plainerIcons = Object.keys(PlainerIconsModule).filter((name) => name.length > 0);

  // Получаем иконки IconEx (сохраняем полные имена)
  const iconexIcons = Object.keys(IconExIconsModule).filter((name) => name.length > 0);

  return { plainerIcons, iconexIcons };
};

// Функция для определения варианта иконки
const getIconVariant = (name: string): IconVariant => {
  // Проверяем, есть ли иконка в Plainer (по полному имени)
  if (name.includes('IconPlainer')) {
    return 'plainer';
  }

  // Проверяем, есть ли иконка в IconEx (по полному имени)
  if (name.includes('IconEx')) {
    return 'iconEx';
  }

  // Если не найдена ни в одной библиотеке, возвращаем 'iconex' как fallback
  return 'iconEx';
};

const meta: Meta<typeof Icon> = {
  title: 'UI Kit/Data Display/Icon/Showcase',
  component: Icon,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_ICON_SHOWCASE,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// История всех иконок
export const AllIcons: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedVariant, setSelectedVariant] = React.useState<IconVariant | 'all'>('all');
    const [selectedSize, setSelectedSize] = React.useState<IconSize>(IconSize.MD);
    const [copiedIcon, setCopiedIcon] = React.useState<string | null>(null);

    const { plainerIcons, iconexIcons } = React.useMemo(() => getExistingIcons(), []);

    // Функция для копирования кода иконки
    const copyIconCode = React.useCallback((code: string) => {
      navigator.clipboard.writeText(code).then(() => {
        setCopiedIcon(code);
        setTimeout(() => setCopiedIcon(null), 2000);
      });
    }, []);

    const hintContent = React.useCallback(
      (iconName: string, variant: IconVariant, size: IconSize) => {
        const code = `<Icon name="${iconName}" size={IconSize.${size}} variant="${variant}" />`;
        return (
          <div className="icon-tooltip-content">
            <div style={iconStoriesStyles.hintTitle}>
              <strong>{iconName}</strong>
            </div>
            <div style={iconStoriesStyles.hintMeta}>Библиотека: {variant}</div>
            <div style={iconStoriesStyles.hintCode}>{code}</div>
            <button
              className={`icon-copy-button ${copiedIcon === code ? 'copied' : ''}`}
              onClick={(clickEvent) => {
                clickEvent.stopPropagation();
                copyIconCode(code);
              }}
            >
              {copiedIcon === code ? 'Скопировано!' : 'Копировать код'}
            </button>
          </div>
        );
      },
      [copiedIcon, copyIconCode],
    );

    // Фильтрация иконок
    let allIcons: IconName[] = [];
    if (selectedVariant === 'all') {
      allIcons = [...(plainerIcons as IconName[]), ...(iconexIcons as IconName[])];
    } else if (selectedVariant === 'plainer') {
      allIcons = plainerIcons as IconName[];
    } else if (selectedVariant === 'iconEx') {
      allIcons = iconexIcons as IconName[];
    }

    const filteredIcons = (allIcons || []).filter((name: IconName) =>
      String(name).toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Вычисляем высоту блока на основе размера иконки
    const iconSize = sizeMap[selectedSize] || sizeMap[IconSize.MD];
    const iconHeight = iconSize + 40; // иконка + отступы + текст
    const maxHeight = Math.min(400, iconHeight * 6); // максимум 6 строк

    return (
      <div style={iconStoriesStyles.pageRoot}>
        <style>{iconStoriesStyles.hintTooltipCss}</style>
        <h2>Полная демонстрация всех доступных иконок</h2>
        <p style={iconStoriesStyles.description}>
          Наведите на иконку для просмотра информации и копирования кода
        </p>

        {/* Панель управления */}
        <div style={iconStoriesStyles.controlsRowEnd}>
          <div>
            <label style={iconStoriesStyles.controlLabel}>Поиск:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(changeEvent) => setSearchTerm(changeEvent.target.value)}
              placeholder="Введите название иконки..."
              style={iconStoriesStyles.searchInput}
            />
          </div>

          <div>
            <label style={iconStoriesStyles.controlLabel}>Библиотека:</label>
            <select
              value={selectedVariant}
              onChange={(changeEvent) =>
                setSelectedVariant(changeEvent.target.value as IconVariant | 'all')
              }
              style={iconStoriesStyles.controlInput}
            >
              <option value="all">Все библиотеки</option>
              <option value="plainer">Plainer</option>
              <option value="iconEx">IconEx</option>
            </select>
          </div>

          <div>
            <label style={iconStoriesStyles.controlLabel}>Размер иконок:</label>
            <select
              value={selectedSize}
              onChange={(changeEvent) => setSelectedSize(changeEvent.target.value as IconSize)}
              style={iconStoriesStyles.controlInput}
            >
              <option value={IconSize.XS}>{sizeMap[IconSize.XS]}px</option>
              <option value={IconSize.SM}>{sizeMap[IconSize.SM]}px</option>
              <option value={IconSize.MD}>{sizeMap[IconSize.MD]}px</option>
              <option value={IconSize.LG}>{sizeMap[IconSize.LG]}px</option>
              <option value={IconSize.XL}>{sizeMap[IconSize.XL]}px</option>
            </select>
          </div>
        </div>

        {/* Статистика */}
        <div style={iconStoriesStyles.statsPanel}>
          <strong>
            Найдено: {filteredIcons.length} из {allIcons.length} иконок
          </strong>
          {selectedVariant === 'all' && (
            <div style={iconStoriesStyles.statsMeta}>
              Plainer: {plainerIcons.length} | IconEx: {iconexIcons.length}
            </div>
          )}
        </div>

        {/* Единый блок со всеми иконками */}
        <div
          className="icon-stories-scroll"
          style={buildIconStoriesScrollableGridStyle(iconHeight, maxHeight)}
        >
          {(filteredIcons || []).map((iconName: IconName) => {
            const variant = selectedVariant === 'all' ? getIconVariant(iconName) : selectedVariant;

            return (
              <Hint key={iconName} content={hintContent(iconName, variant, selectedSize)}>
                <div
                  style={buildCenteredIconPreviewCardStyle(iconHeight)}
                  onMouseEnter={handleIconStoryCardMouseEnter}
                  onMouseLeave={handleIconStoryCardMouseLeave}
                >
                  <Icon
                    name={iconName}
                    size={selectedSize}
                    // variant={variant}
                  />
                  <div style={iconStoriesStyles.iconVariantLabel}>{variant}</div>
                </div>
              </Hint>
            );
          })}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Полная библиотека всех доступных иконок с поиском, фильтрацией и интерактивным интерфейсом',
      },
    },
  },
};
