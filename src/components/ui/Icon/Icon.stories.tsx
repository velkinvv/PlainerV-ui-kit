import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import * as PlainerIconsModule from '../../../icons/plainer';
import * as IconExIconsModule from '../../../icons/iconex';
import * as PhosphorIconsModule from '../../../icons/phosphor/regular';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { IconSize } from '../../../types/sizes';
import { Hint } from '../Hint/Hint';
import { sizeMap } from '../../../handlers/iconHandlers';
import type { IconVariant } from '../../../types/ui';
import type { IconName } from '../../../icons';

// Функция для получения реально существующих иконок
const getExistingIcons = () => {
  // Получаем иконки Plainer
  const plainerIcons = Object.keys(PlainerIconsModule)
    // .map(key => key.replace('IconPlainer', ''))
    .filter(name => name.length > 0);

  // Получаем иконки IconEx
  const iconexIcons = Object.keys(IconExIconsModule)
    // .map(key => key.replace('IconEx', ''))
    .filter(name => name.length > 0);

  // Получаем иконки Phosphor
  const phosphorIcons = Object.keys(PhosphorIconsModule)
    // .map(key => key.replace('Phosphor', ''))
    .filter(name => name.length > 0);

  return { plainerIcons, iconexIcons, phosphorIcons };
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

  // Проверяем, есть ли иконка в Phosphor (по полному имени)
  if (name.includes('Phosphor')) {
    return 'phosphor';
  }

  // Если не найдена ни в одной библиотеке, возвращаем 'iconex' как fallback
  return 'iconEx';
};

const meta: Meta<typeof Icon> = {
  title: ' Components/Icon',
  component: Icon,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Компонент иконки с поддержкой библиотек Plainer, IconEx и Phosphor',
      },
    },
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Название иконки',
    },
    size: {
      control: 'select',
      options: [...Object.values(IconSize)],
      description: 'Размер иконки',
    },
    // variant: {
    //   control: 'select',
    //   options: ['plainer', 'iconEx'],
    //   description: 'Библиотека иконок',
    // },
    // color: {
    //   control: { type: 'color' },
    //   description: 'Цвет иконки',
    // },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Базовые истории
export const Default: Story = {
  args: {
    name: 'IconPlainerUser',
    size: IconSize.MD,
    // variant: 'plainer',
  },
};

export const Large: Story = {
  args: {
    name: 'IconExStar',
    size: IconSize.XL,
    // variant: 'iconEx',
  },
};

export const Small: Story = {
  args: {
    name: 'IconPlainerUser',
    size: IconSize.SM,
    // variant: 'plainer',
  },
};

export const WithColor: Story = {
  args: {
    name: 'IconExHeart',
    size: IconSize.LG,
    color: '#ef4444',
    // variant: 'iconEx',
  },
};

// Полная история всех иконок
export const AllIcons: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedVariant, setSelectedVariant] = React.useState<IconVariant | 'all'>('all');
    const [selectedSize, setSelectedSize] = React.useState(IconSize.MD);
    const [copiedIcon, setCopiedIcon] = React.useState<string | null>(null);

    // Определяем списки иконок по категориям
    const { plainerIcons, iconexIcons, phosphorIcons } = getExistingIcons();

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
              {copiedIcon === iconName ? 'Скопировано!' : 'Копировать код'}
            </button>
          </div>
        );
      },
      [copiedIcon, copyIconCode],
    );

    // Фильтрация иконок
    let allIcons: IconName[] = [];
    if (selectedVariant === 'all') {
      allIcons = [
        ...(plainerIcons as IconName[]),
        ...(iconexIcons as IconName[]),
        ...(phosphorIcons as IconName[]),
      ];
    } else if (selectedVariant === 'plainer') {
      allIcons = plainerIcons as IconName[];
    } else if (selectedVariant === 'iconEx') {
      allIcons = iconexIcons as IconName[];
    } else if (selectedVariant === 'phosphor') {
      allIcons = phosphorIcons as IconName[];
    }

    const filteredIcons = (allIcons || []).filter((name: IconName) =>
      String(name).toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Вычисляем высоту блока на основе размера иконки
    // Одна строка = размер иконки + отступы + высота текста
    const iconSize = sizeMap[selectedSize] || sizeMap[IconSize.MD]; // fallback к MD если размер не найден
    const iconHeight = iconSize + 40; // иконка + отступы + текст
    const maxHeight = iconHeight * 10; // максимум 10 строк

    return (
      <div style={{ padding: '20px', maxWidth: '1200px' }}>
        <style>
          {`
            .icon-grid::-webkit-scrollbar {
              width: 8px;
            }
            .icon-grid::-webkit-scrollbar-track {
              background: #f1f5f9;
              border-radius: 4px;
            }
            .icon-grid::-webkit-scrollbar-thumb {
              background: #cbd5e1;
              border-radius: 4px;
            }
            .icon-grid::-webkit-scrollbar-thumb:hover {
              background: #94a3b8;
            }

            .icon-tooltip {
              position: relative;
            }
            .icon-tooltip .tooltip-content {
              visibility: hidden;
              position: absolute;
              z-index: 99999;
              bottom: 125%;
              left: 50%;
              transform: translateX(-50%);
              background-color: #1f2937;
              color: white;
              text-align: center;
              padding: 12px;
              border-radius: 8px;
              font-size: 12px;
              white-space: nowrap;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              opacity: 0;
              transition: opacity 0.3s;
              pointer-events: none;
            }

            .icon-tooltip .tooltip-content::after {
              content: "";
              position: absolute;
              top: 100%;
              left: 50%;
              margin-left: -5px;
              border-width: 5px;
              border-style: solid;
              border-color: #1f2937 transparent transparent transparent;
            }

            .icon-tooltip:hover .tooltip-content {
              visibility: visible;
              opacity: 1;
            }

            .copy-button {
              background: #3b82f6;
              color: white;
              border: none;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 10px;
              cursor: pointer;
              margin-top: 4px;
              transition: background 0.2s;
              pointer-events: auto;
            }

            .copy-button:hover {
              background: #2563eb;
            }

            .copy-button.copied {
              background: #10b981;
            }
          `}
        </style>

        <h1>Все иконки</h1>
        <p>
          Единый блок со всеми иконками, поиском, переключением категории и отображением количества
          иконок. Блоки иконок отображают по высоте минимум одну строку и максимум 10 строк,
          остальное в прокрутке.
        </p>

        {/* Контролы */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <div>
            <label style={{ display: 'block', marginBottom: '4px' }}>Поиск иконок:</label>
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
              onChange={e => setSelectedVariant(e.target.value as IconVariant | 'all')}
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
              <option value="phosphor">Phosphor</option>
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
              <option value={IconSize.XS}>XS (16px)</option>
              <option value={IconSize.SM}>SM (20px)</option>
              <option value={IconSize.MD}>MD (24px)</option>
              <option value={IconSize.LG}>LG (32px)</option>
              <option value={IconSize.XL}>XL (40px)</option>
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
              Plainer: {plainerIcons.length} | IconEx: {iconexIcons.length} | Phosphor:{' '}
              {phosphorIcons.length}
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
            const variant =
              selectedVariant === 'all' ? getIconVariant(String(iconName)) : selectedVariant;
            return (
              <Hint
                key={String(iconName)}
                content={hintContent(String(iconName), variant, selectedSize)}
              >
                <div
                  className="icon-tooltip"
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
                    height: `${iconHeight + 40}px`,
                    boxSizing: 'border-box',
                  }}
                >
                  <Icon
                    name={iconName}
                    size={selectedSize}
                    // variant={variant}
                  />
                  <div
                    style={{
                      marginTop: '8px',
                      fontSize: '12px',
                      textAlign: 'center',
                      color: '#6b7280',
                      wordBreak: 'break-word',
                      flex: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {String(iconName)}
                  </div>
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

// Истории по категориям
export const PlainerIcons: Story = {
  render: () => {
    // Получаем все иконки Plainer напрямую из импорта
    const plainerIconNames = [
      'IconPlainerUser',
      'IconPlainerSearch',
      'IconPlainerArrowUp',
      'IconPlainerClose',
      'IconPlainerPlus',
      'IconPlainerArrowRight',
      'IconPlainerArrowLeft',
      'IconPlainerArrowDown',
      'IconPlainerChevronDown',
      'IconPlainerDollar',
      'IconPlainerPercent',
      'IconPlainerSun',
      'IconPlainerMoon',
      'IconPlainerWarning',
      'IconPlainerCheck',
      'IconPlainerCalendar',
      'IconPlainerClock',
    ];

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '16px',
          padding: '20px',
        }}
      >
        {plainerIconNames.map(iconName => (
          <div
            key={iconName}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              backgroundColor: 'white',
            }}
          >
            <Icon
              name={iconName as IconName}
              size={IconSize.LG}
              // variant="plainer"
            />
            <div
              style={{
                marginTop: '8px',
                fontSize: '12px',
                textAlign: 'center',
                color: '#6b7280',
              }}
            >
              {iconName}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Примеры иконок из библиотеки Plainer',
      },
    },
  },
};

export const IconExIcons: Story = {
  render: () => {
    // Получаем все иконки IconEx напрямую из импорта, исключая некоторые
    const iconExIconNames = [
      'IconExAddUser',
      'IconExAlarmClock',
      'IconExBag1',
      'IconExBag2',
      'IconExBag3',
      'IconExBasketBall',
      'IconExBell',
      'IconExBook',
      'IconExBookmark',
      'IconExBox1',
      'IconExBox2',
      'IconExBrowser',
      'IconExBurger',
      'IconExCalendar',
      'IconExCallMissed',
      'IconExCalcSilent',
      'IconExCall',
      'IconExCalling',
      'IconExCamera',
      'IconExCart',
      'IconExCase',
      'IconExCategory2',
      'IconExCategory',
      'IconExChart1',
      'IconExChart',
      'IconExCheck',
      'IconExCilPen',
      'IconExClose2',
      'IconExClose3',
      'IconExCloud',
      'IconExCloudDownload',
      'IconExCloudUpload',
      'IconExCoffee',
      'IconExCoins',
      'IconExColorPalette',
      'IconExCompas',
      'IconExCopy',
      'IconExCoupon1',
      'IconExCoupon2',
      'IconExCoupon3',
      'IconExCreditCard',
      'IconExDanger',
      'IconExDocument',
      'IconExDocument2',
      'IconExDocumentAdd',
      'IconExDocumentDelete',
      'IconExDots',
      'IconExDownload2',
      'IconExEdit1',
      'IconExEdit2',
      'IconExEye',
      'IconExFigma',
      'IconExFilter',
      'IconExFilter2',
      'IconExFire',
      'IconExFlag',
      'IconExFolder',
      'IconExGamePad',
      'IconExGift',
      'IconExGraph',
      'IconExHeadPhones',
      'IconExHeart',
      'IconExHeartBeat',
      'IconExHide',
      'IconExHome',
      'IconExIconsHeck',
      'IconExImage',
      'IconExInfoCircle',
      'IconExInfoSquare',
      'IconExIphone',
      'IconExKey',
      'IconExLaptop',
      'IconExLayers',
      'IconExLightning',
      'IconExLink',
      'IconExLink2',
      'IconExLoading',
      'IconExLocation',
      'IconExLock',
      'IconExLockCheck',
      'IconExLockOpen',
      'IconExLockX',
      'IconExLogin',
      'IconExLogout',
      'IconExLogout2',
      'IconExMail',
      'IconExMessageCircle',
      'IconExMessageSquare',
      'IconExMicrophone',
      'IconExMinus',
      'IconExMoreCircle',
      'IconExMoreSquare',
      'IconExMouse',
      'IconExMusic',
      'IconExMusicPlate',
      'IconExNoSound',
      'IconExOldSchoolGamepad',
      'IconExPaperClip',
      'IconExPause',
      'IconExPin',
      'IconExPlay',
      'IconExReceipt',
      'IconExRocket',
      'IconExSale',
      'IconExSave',
      'IconExScale',
      'IconExScanner',
      'IconExScreen',
      'IconExSearch2',
      'IconExSend',
      'IconExSettings',
      'IconExShare',
      'IconExShield',
      'IconExShield2',
      'IconExShield3',
      'IconExStar',
      'IconExStop',
      'IconExTimeCircle',
      'IconExTimeSquare',
      'IconExTimer',
      'IconExToggleLeft',
      'IconExToggleRight',
      'IconExTrash',
      'IconExUsers',
      'IconExVideo',
      'IconExVolumeDown',
      'IconExVolumeOff',
      'IconExVolumeOff2',
      'IconExVolumeUp',
      'IconExWallet',
      'IconExZoomIn',
      'IconExZoomOut',
      'IconExCalculator',
    ];

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '16px',
          padding: '20px',
        }}
      >
        {iconExIconNames.slice(0, 20).map(iconName => (
          <div
            key={iconName}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              backgroundColor: 'white',
            }}
          >
            <Icon
              name={iconName as IconName}
              size={IconSize.LG}
              // variant="iconEx"
            />
            <div
              style={{
                marginTop: '8px',
                fontSize: '12px',
                textAlign: 'center',
                color: '#6b7280',
              }}
            >
              {iconName}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Примеры иконок из библиотеки IconEx',
      },
    },
  },
};

export const PhosphorIcons: Story = {
  render: () => {
    // Получаем все иконки Phosphor напрямую из импорта
    const phosphorIconNames = [
      'PhosphorRecycle',
      'PhosphorCaretDoubleLeft',
      'PhosphorArrowArcLeft',
      'PhosphorArrowFatLineRight',
      'PhosphorArrowFatLineLeft',
      'PhosphorArrowFatLineDown',
      'PhosphorArrowFatLeft',
      'PhosphorArrowFatDown',
      'PhosphorArrowElbowUpRight',
      'PhosphorArrowElbowUpLeft',
      'PhosphorArrowElbowRightUp',
      'PhosphorArrowElbowRightDown',
      'PhosphorArrowElbowRight',
      'PhosphorArrowElbowLeftUp',
      'PhosphorArrowElbowLeftDown',
      'PhosphorArrowElbowLeft',
      'PhosphorArrowElbowDownRight',
      'PhosphorArrowElbowDownLeft',
      'PhosphorArrowDownRight',
      'PhosphorArrowDownLeft',
      'PhosphorArrowDown',
      'PhosphorArrowCounterClockwise',
      'PhosphorArrowClockwise',
      'PhosphorArrowCircleUpRight',
      'PhosphorArrowCircleUpLeft',
      'PhosphorArrowCircleUp',
      'PhosphorArrowCircleRight',
      'PhosphorArrowCircleLeft',
      'PhosphorArrowCircleDownRight',
      'PhosphorArrowCircleDownLeft',
      'PhosphorArrowCircleDown',
      'PhosphorArrowBendUpRight',
      'PhosphorArrowBendUpLeft',
      'PhosphorArrowBendRightUp',
      'PhosphorArrowBendRightDown',
      'PhosphorArrowBendLeftUp',
      'PhosphorArrowBendLeftDown',
      'PhosphorArrowBendDownRight',
      'PhosphorArrowBendDownLeft',
      'PhosphorArrowBendDoubleUpRight',
      'PhosphorArrowBendDoubleUpLeft',
      'PhosphorArrowArcRight',
      'PhosphorX',
      'PhosphorPushPin',
      'PhosphorBookmarkSimple',
      'PhosphorUserPlus',
      'PhosphorHeartStraight',
      'PhosphorPushPinSlash',
      'PhosphorUserCircle',
    ];

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '16px',
          padding: '20px',
        }}
      >
        {phosphorIconNames.map(iconName => (
          <div
            key={iconName}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              backgroundColor: 'white',
            }}
          >
            <Icon
              name={iconName as IconName}
              size={IconSize.LG}
              // variant="phosphor"
            />
            <div
              style={{
                marginTop: '8px',
                fontSize: '12px',
                textAlign: 'center',
                color: '#6b7280',
              }}
            >
              {iconName}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Примеры иконок из библиотеки Phosphor Regular',
      },
    },
  },
};

// История для демонстрации размеров
export const IconSizes: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Размеры иконок</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Icon
            name="IconPlainerUser"
            size={IconSize.XS}
            // variant="plainer"
          />
          <p>{sizeMap[IconSize.XS]}px</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon
            name="IconPlainerUser"
            size={IconSize.SM}
            // variant="plainer"
          />
          <p>{sizeMap[IconSize.SM]}px</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon
            name="IconPlainerUser"
            size={IconSize.MD}
            // variant="plainer"
          />
          <p>{sizeMap[IconSize.MD]}px</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon
            name="IconPlainerUser"
            size={IconSize.LG}
            // variant="plainer"
          />
          <p>{sizeMap[IconSize.LG]}px</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon
            name="IconPlainerUser"
            size={IconSize.XL}
            // variant="plainer"
          />
          <p>{sizeMap[IconSize.XL]}px</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon
            name="IconPlainerUser"
            size={IconSize.XL}
            // variant="plainer"
          />
          <p>{sizeMap[IconSize.XL]}px</p>
        </div>
      </div>
    </div>
  ),
};

// История для демонстрации цветов
export const IconColors: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Цвета иконок</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <Icon
            name="IconExHeart"
            size={IconSize.LG}
            color="#ef4444"
            // variant="iconEx"
          />
          <p>Красный</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon
            name="IconExStar"
            size={IconSize.LG}
            color="#f59e0b"
            // variant="iconEx"
          />
          <p>Оранжевый</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon
            name="IconExCheck"
            size={IconSize.LG}
            color="#10b981"
            // variant="iconEx"
          />
          <p>Зеленый</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Icon
            name="IconExInfoSquare"
            size={IconSize.LG}
            color="#3b82f6"
            // variant="iconEx"
          />
          <p>Синий</p>
        </div>
      </div>
    </div>
  ),
};
