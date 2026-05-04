import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon/Icon';
import * as PlainerIconsModule from '../../icons/plainer';
import * as IconExIconsModule from '../../icons/iconex';
import { Hint } from './Hint/Hint';
import { IconSize } from '../../types/sizes';
import { sizeMap } from '../../handlers/iconHandlers';
import type { IconVariant } from '../../types/ui';
import type { IconName } from '../../icons';
import { DOC_ICON_SHOWCASE } from '@/components/ui/storyDocs/uiKitDocs';

// Функция для получения реально существующих иконок
const getExistingIcons = () => {
  // Получаем иконки Plainer (сохраняем полные имена)
  const plainerIcons = Object.keys(PlainerIconsModule).filter(name => name.length > 0);

  // Получаем иконки IconEx (сохраняем полные имена)
  const iconexIcons = Object.keys(IconExIconsModule).filter(name => name.length > 0);

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
          <div className="tooltip-content">
            <div style={{ marginBottom: '8px' }}>
              <strong>{iconName}</strong>
            </div>
            <div style={{ marginBottom: '8px', fontSize: '11px' }}>Библиотека: {variant}</div>
            <div
              style={{
                marginBottom: '8px',
                fontSize: '11px',
                fontFamily: 'monospace',
              }}
            >
              {code}
            </div>
            <button
              className={`copy-button ${copiedIcon === code ? 'copied' : ''}`}
              onClick={e => {
                e.stopPropagation();
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
      <div style={{ padding: '20px' }}>
        <h2>Полная демонстрация всех доступных иконок</h2>
        <p style={{ marginBottom: '20px', color: '#666' }}>
          Наведите на иконку для просмотра информации и копирования кода
        </p>

        {/* Панель управления */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            alignItems: 'end',
          }}
        >
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>Поиск:</label>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Введите название иконки..."
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                minWidth: '200px',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>Библиотека:</label>
            <select
              value={selectedVariant}
              onChange={e => setSelectedVariant(e.target.value as IconVariant)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
              }}
            >
              <option value="all">Все библиотеки</option>
              <option value="plainer">Plainer</option>
              <option value="iconEx">IconEx</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>Размер иконок:</label>
            <select
              value={selectedSize}
              onChange={e => setSelectedSize(e.target.value as IconSize)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
              }}
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
        <div
          style={{
            marginBottom: '20px',
            padding: '12px',
            backgroundColor: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
          }}
        >
          <strong>
            Найдено: {filteredIcons.length} из {allIcons.length} иконок
          </strong>
          {selectedVariant === 'all' && (
            <div style={{ marginTop: '4px', fontSize: '14px', color: '#64748b' }}>
              Plainer: {plainerIcons.length} | IconEx: {iconexIcons.length}
            </div>
          )}
        </div>

        {/* Единый блок со всеми иконками */}
        <div
          className="icon-showcase-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
            gap: '16px',
            minHeight: iconHeight,
            maxHeight,
            overflowY: 'auto',
            padding: '8px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            backgroundColor: '#fafafa',
            scrollbarWidth: 'thin',
            scrollbarColor: '#cbd5e1 #f1f5f9',
          }}
        >
          {(filteredIcons || []).map((iconName: IconName) => {
            const variant = selectedVariant === 'all' ? getIconVariant(iconName) : selectedVariant;

            return (
              <Hint key={iconName} content={hintContent(iconName, variant, selectedSize)}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    minHeight: iconHeight,
                    justifyContent: 'center',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon
                    name={iconName}
                    size={selectedSize}
                    // variant={variant}
                  />
                  <div
                    style={{
                      fontSize: '10px',
                      color: '#9ca3af',
                      marginTop: '4px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {variant}
                  </div>
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

