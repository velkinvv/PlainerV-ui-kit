import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon/Icon';
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

type IconCatalog = {
  plainerIcons: string[];
  iconexIcons: string[];
  isLoading: boolean;
};

let plainerIconNamesCache: string[] | null = null;
let iconexIconNamesCache: string[] | null = null;

const getIconNamesFromModule = (iconModule: Record<string, unknown>): string[] =>
  Object.keys(iconModule).filter((name) => name.length > 0);

const loadPlainerIconNames = async () => {
  if (plainerIconNamesCache) {
    return plainerIconNamesCache;
  }

  const iconModule = await import('../../icons/plainer');
  plainerIconNamesCache = getIconNamesFromModule(iconModule);

  return plainerIconNamesCache;
};

const loadIconExIconNames = async () => {
  if (iconexIconNamesCache) {
    return iconexIconNamesCache;
  }

  const iconModule = await import('../../icons/iconex');
  iconexIconNamesCache = getIconNamesFromModule(iconModule);

  return iconexIconNamesCache;
};

const useIconCatalog = (variant: IconVariant | 'all'): IconCatalog => {
  const [catalog, setCatalog] = React.useState<IconCatalog>({
    plainerIcons: [],
    iconexIcons: [],
    isLoading: true,
  });

  React.useEffect(() => {
    let isCancelled = false;

    const loadCatalog = async () => {
      setCatalog((previousCatalog) => ({ ...previousCatalog, isLoading: true }));

      if (variant === 'plainer') {
        const plainerIcons = await loadPlainerIconNames();
        if (!isCancelled) {
          setCatalog({ plainerIcons, iconexIcons: [], isLoading: false });
        }
        return;
      }

      if (variant === 'iconEx') {
        const iconexIcons = await loadIconExIconNames();
        if (!isCancelled) {
          setCatalog({ plainerIcons: [], iconexIcons, isLoading: false });
        }
        return;
      }

      const [plainerIcons, iconexIcons] = await Promise.all([
        loadPlainerIconNames(),
        loadIconExIconNames(),
      ]);

      if (!isCancelled) {
        setCatalog({ plainerIcons, iconexIcons, isLoading: false });
      }
    };

    void loadCatalog();

    return () => {
      isCancelled = true;
    };
  }, [variant]);

  return catalog;
};

const LazyIcon = React.lazy(async () => {
  const iconModule = await import('./Icon/Icon');
  return { default: iconModule.Icon };
});

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
    const [currentPage, setCurrentPage] = React.useState(1);

    const iconsPerPage = 120;
    const { plainerIcons, iconexIcons, isLoading } = useIconCatalog(selectedVariant);

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

    const totalPages = Math.max(1, Math.ceil(filteredIcons.length / iconsPerPage));
    const safeCurrentPage = Math.min(currentPage, totalPages);
    const pageStartIndex = (safeCurrentPage - 1) * iconsPerPage;
    const paginatedIcons = filteredIcons.slice(pageStartIndex, pageStartIndex + iconsPerPage);

    React.useEffect(() => {
      setCurrentPage(1);
    }, [searchTerm, selectedVariant]);

    React.useEffect(() => {
      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }
    }, [currentPage, totalPages]);

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
          <div style={iconStoriesStyles.statsMeta}>
            {isLoading
              ? 'Загрузка иконок...'
              : `Страница ${safeCurrentPage} из ${totalPages} · показано ${paginatedIcons.length} шт.`}
          </div>
        </div>

        {/* Единый блок со всеми иконками */}
        <React.Suspense
          fallback={<div style={iconStoriesStyles.statsPanel}>Загрузка компонента иконок...</div>}
        >
          <div
            className="icon-stories-scroll"
            style={buildIconStoriesScrollableGridStyle(iconHeight, maxHeight)}
          >
            {(paginatedIcons || []).map((iconName: IconName) => {
              const variant = selectedVariant === 'all' ? getIconVariant(iconName) : selectedVariant;

              return (
                <Hint key={iconName} content={hintContent(iconName, variant, selectedSize)}>
                  <div
                    style={buildCenteredIconPreviewCardStyle(iconHeight)}
                    onMouseEnter={handleIconStoryCardMouseEnter}
                    onMouseLeave={handleIconStoryCardMouseLeave}
                  >
                    <LazyIcon
                      name={iconName}
                      size={selectedSize}
                      variant={variant}
                    />
                    <div style={iconStoriesStyles.iconVariantLabel}>{variant}</div>
                  </div>
                </Hint>
              );
            })}
          </div>
        </React.Suspense>

        {totalPages > 1 && (
          <div style={iconStoriesStyles.controlsRowEnd}>
            <button
              type="button"
              onClick={() => setCurrentPage((previousPage) => Math.max(1, previousPage - 1))}
              disabled={safeCurrentPage <= 1 || isLoading}
            >
              Назад
            </button>
            <span style={iconStoriesStyles.controlLabel}>
              Страница {safeCurrentPage} / {totalPages}
            </span>
            <button
              type="button"
              onClick={() =>
                setCurrentPage((previousPage) => Math.min(totalPages, previousPage + 1))
              }
              disabled={safeCurrentPage >= totalPages || isLoading}
            >
              Вперёд
            </button>
          </div>
        )}
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
