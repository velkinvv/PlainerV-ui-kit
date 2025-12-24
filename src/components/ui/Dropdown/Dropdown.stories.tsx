import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { css } from 'styled-components';
import { Dropdown } from './Dropdown';
import { DropdownDivider } from './Dropdown.style';
import { Button } from '../buttons/Button/Button';
import { ButtonVariant } from '../../../types/ui';
import type { DropdownMenuItemProps, DropdownProps } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuItem } from './DropdownMenuItem';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Компонент выпадающего меню',
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
  argTypes: {
    trigger: {
      description:
        'Опциональный React-элемент, который открывает меню. Если не задан, используется встроенная кнопка.',
      control: false,
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'Button' },
      },
    },
    buttonProps: {
      description:
        'Пропсы для кнопки по умолчанию (variant, size, иконки, children). onClick переопределяется компонентом.',
      control: false,
    },
    items: {
      description:
        'Массив элементов меню (`DropdownMenuItemProps[]`). Если задан, имеет приоритет над `children` и автоматически оборачивается в `DropdownMenu`.',
      control: false,
    },
    children: {
      description:
        'Содержимое выпадающего меню. Рекомендуемый вариант — использовать `DropdownMenu` и `DropdownMenuItem`, но можно передать любой React-узел.',
      control: false,
    },
    size: {
      description:
        'Размер dropdown: влияет на ширину, отступы и типографику. Значения: `SM`, `MD`, `LG`.',
      options: [Size.SM, Size.MD, Size.LG],
      control: { type: 'inline-radio' },
      table: {
        defaultValue: { summary: 'Size.MD' },
      },
    },
    variant: {
      description:
        'Вариант визуального оформления контейнера: `default` (базовый), `elevated` (усиленная тень) или `outlined` (обводка).',
      options: ['default', 'elevated', 'outlined'],
      control: { type: 'inline-radio' },
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    multiSelection: {
      description:
        'Режим множественного выбора. Если `true`, позволяет выбрать несколько элементов, показывает чекбоксы в элементах меню, меню не закрывается при выборе. В этом режиме `value` должен быть массивом значений.',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disableSelectedOptionHighlight: {
      description:
        'Отключает подсветку выбранной опции. Полезно для режима множественного выбора, когда у каждой опции есть чекбокс и подсветка не нужна.',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    virtualScroll: {
      description:
        'Включение виртуального скролла для меню. Максимальная высота меню рассчитывается исходя из высоты 1 пункта. Если `itemHeight` = "auto", то в расчет идет высота согласно dimension из темы. Объект с полем `itemHeight`: число (высота в пикселях) или "auto" (автоматический расчет из темы).',
      control: false,
      table: {
        type: { summary: '{ itemHeight: number | "auto" }' },
        defaultValue: { summary: 'undefined' },
      },
    },
    className: {
      description:
        'Дополнительный CSS-класс для точечной кастомизации через styled-components или глобальные стили.',
      control: { type: 'text' },
    },
    loading: {
      description:
        'Состояние загрузки для всего dropdown. Показывает индикатор загрузки вместо содержимого меню.',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    skeleton: {
      description:
        'Состояние скелетона. Применяется только к кнопке-триггеру, не влияет на меню и элементы меню. Полезно для предзагрузки структуры кнопки перед получением данных.',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    disableAutoFocus: {
      description:
        'Отключает автоматическую установку фокуса на встроенную кнопку-триггер при монтировании компонента.',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    defaultOpen: {
      description: 'Открывать меню по умолчанию при монтировании компонента.',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      description:
        'Значение выбранного элемента. Сравнивается с `value` каждого элемента меню для определения выбранного состояния. Полезно для контролируемых компонентов.',
      control: { type: 'text' },
    },
    isMenuOpen: {
      description:
        'Управляет открытием меню извне (контролируемый компонент). Если задан, имеет приоритет над внутренним состоянием.',
      control: { type: 'boolean' },
    },
    onMenuOpenChange: {
      description:
        'Колбэк, вызываемый при изменении состояния открытия/закрытия меню. Получает boolean значение (true - открыто, false - закрыто).',
      control: false,
    },
    disabled: {
      description: 'Отключение компонента. Блокирует открытие меню и взаимодействие с компонентом.',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    targetElement: {
      description:
        'Элемент, относительно которого позиционируется выпадающее меню. Если не задан, используется trigger элемент.',
      control: false,
    },
    onSelect: {
      description:
        'Колбэк, который вызывается при выборе пункта меню. Получает значение элемента (`value`) и нативное событие клика.',
      control: false,
    },
    onActivateItem: {
      description:
        'Обработчик активации (hover) элемента меню. Вызывается при наведении курсора на элемент меню. Получает значение элемента (`value`).',
      control: false,
    },
    renderTopPanel: {
      description:
        'Функция для рендеринга панели сверху над выпадающим списком. Получает объект с пропсами dropdown (`size`, `variant`, `disabled`). Возвращает React-узел, который будет отображен над списком элементов меню.',
      control: false,
    },
    renderBottomPanel: {
      description:
        'Функция для рендеринга панели снизу под выпадающим списком. Получает объект с пропсами dropdown (`size`, `variant`, `disabled`). Возвращает React-узел, который будет отображен под списком элементов меню.',
      control: false,
    },
    onClickOutside: {
      description:
        'Обработчик клика вне компонента и его детей. Вызывается при клике вне триггера и меню (включая другие Dropdown компоненты). Получает нативное событие (`Event`).',
      control: false,
    },
    menuWidth: {
      description:
        'Ширина меню. Может быть строкой (например, "200px", "50%", "20rem") или числом (в пикселях). Если не задана, используется минимальная и максимальная ширина из темы.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    menuMaxHeight: {
      description:
        'Максимальная высота меню. Может быть строкой или числом (в пикселях). При превышении высоты контент внутри меню становится прокручиваемым по вертикали.',
      control: { type: 'text' },
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: 'undefined' },
      },
    },
    alignSelf: {
      description:
        'Управляет выравниванием контейнера dropdown внутри flex-родителя. Значения соответствуют CSS `align-self`.',
      options: ['auto', 'center', 'stretch', 'flex-start', 'flex-end', 'baseline'],
      control: { type: 'inline-radio' },
      table: {
        defaultValue: { summary: 'undefined' },
      },
    },
    dropContainerStyle: {
      description:
        'Дополнительные инлайн-стили, которые применяются к контейнеру выпадающего меню (`DropdownContent`).',
      control: { type: 'object' },
      table: {
        type: { summary: 'React.CSSProperties' },
        defaultValue: { summary: 'undefined' },
      },
    },
    dropContainerCssMixin: {
      description:
        'Миксин, созданный через `styled-components/css`, который позволяет подключить сложные стили к контейнеру меню (например, псевдоэлементы, медиавыражения).',
      control: false,
      table: {
        type: { summary: 'DropdownCssMixin' },
        defaultValue: { summary: 'undefined' },
      },
    },
    searchable: {
      description:
        'Включает строку поиска внутри меню. Поиск применяется к `items` по `label` и `description` (по умолчанию) или через кастомный фильтр.',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    searchPlaceholder: {
      description: 'Placeholder для поля поиска.',
      control: { type: 'text' },
      table: {
        defaultValue: { summary: 'Поиск...' },
      },
    },
    searchValue: {
      description: 'Контролируемое значение строки поиска.',
      control: { type: 'text' },
    },
    defaultSearchValue: {
      description: 'Начальное значение для строки поиска (в неконтролируемом режиме).',
      control: { type: 'text' },
    },
    onSearch: {
      description: 'Колбэк, вызываемый при изменении текста поиска.',
      control: false,
    },
    searchFilter: {
      description:
        'Кастомная функция фильтрации пунктов меню. Получает строку поиска и элемент `DropdownMenuItemProps`.',
      control: false,
    },
    renderEmptyState: {
      description: 'Кастомное пустое состояние (когда нет элементов меню).',
      control: false,
    },
    emptyMessage: {
      description: 'Сообщение по умолчанию для пустого состояния, если `renderEmptyState` не задан.',
      control: { type: 'text' },
      table: {
        defaultValue: { summary: 'Нет данных' },
      },
    },
    enableKeyboardNavigation: {
      description: 'Включает стрелочную навигацию, Home/End и focus trap внутри меню.',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    renderErrorState: {
      description:
        'Кастомная отрисовка ошибки (например, при ленивой загрузке). Получает ошибку и функцию повтора.',
      control: false,
    },
    inline: {
      description:
        'Режим без портала. Меню рендерится внутри контейнера и позиционируется через `position: absolute` относительно триггера.',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    loadItems: {
      description: 'Функция ленивой загрузки пунктов меню. Вызывается при открытии dropdown.',
      control: false,
    },
    onLoadItemsError: {
      description: 'Колбэк, который вызывается при ошибке загрузки пунктов меню.',
      control: false,
    },
    positioningMode: {
      description:
        'Алгоритм позиционирования меню. `default` — всегда вниз. `autoFlip` — открывает вверх, если снизу мало места. `autoFit` — дополнительно смещает меню по горизонтали, чтобы не выходить за пределы экрана.',
      options: ['default', 'autoFlip', 'autoFit'],
      control: { type: 'inline-radio' },
      table: {
        defaultValue: { summary: 'default' },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    buttonProps: {
      variant: ButtonVariant.PRIMARY,
      children: 'Открыть меню',
      iconEnd: (
        <span role="presentation" aria-hidden="true">
          ▼
        </span>
      ),
    },
    items: [
      { label: 'Option 1', value: 'option-1' },
      { label: 'Option 2', value: 'option-2' },
      { label: 'Option 3', value: 'option-3' },
    ] as DropdownMenuItemProps[],
  },
};

export const WithIcons: Story = {
  args: {
    trigger: (
      <Button>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>⚙️ Settings</span>
      </Button>
    ),
    items: [
      { label: 'Profile', icon: <span>👤</span> },
      { label: 'Security', icon: <span>🔒</span> },
      { label: 'Appearance', icon: <span>🎨</span> },
      { label: 'Help', icon: <span>❓</span> },
    ] as DropdownMenuItemProps[],
  },
};

export const WithActions: Story = {
  args: {
    buttonProps: {
      variant: ButtonVariant.OUTLINE,
      children: 'Actions',
    },
    items: [
      { label: 'Edit', icon: <span>✏️</span>, onSelect: () => alert('Edit clicked!') },
      { label: 'Copy', icon: <span>📋</span>, onSelect: () => alert('Copy clicked!') },
      {
        label: 'Delete',
        icon: <span>🗑️</span>,
        tone: 'danger',
        onSelect: () => alert('Delete clicked!'),
      },
    ] as DropdownMenuItemProps[],
  },
};

export const WithDivider: Story = {
  args: {
    buttonProps: {
      variant: ButtonVariant.OUTLINE,
      children: 'Menu with divider',
    },
    children: (
      <DropdownMenu>
        <DropdownMenuItem label="Информация" />
        <DropdownDivider />
        <DropdownMenuItem label="Настройки" />
        <DropdownMenuItem label="Удалить" tone="danger" />
      </DropdownMenu>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Вариант с использованием `DropdownDivider` для визуального отделения блоков пунктов меню. Divider доступен из `Dropdown.style`.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      {[Size.SM, Size.MD, Size.LG].map(size => {
        const caption =
          size === Size.SM ? 'SM / 32px' : size === Size.MD ? 'MD / 40px' : 'LG / 48px';

        return (
          <Dropdown
            key={size}
            size={size}
            buttonProps={{
              size,
              variant: ButtonVariant.OUTLINE,
              children: `Размер ${caption}`,
            }}
            items={
              [
                { label: 'Первый пункт' },
                { label: 'Второй пункт' },
                { label: 'Третий пункт' },
              ] as DropdownMenuItemProps[]
            }
          />
        );
      })}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Компонент поддерживает размеры `Size.SM`, `Size.MD` (по умолчанию) и `Size.LG`. Размер влияет на отступы, высоту и типографику.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      {[
        {
          dropdownVariant: 'default',
          buttonVariant: ButtonVariant.PRIMARY,
          label: 'Вариант default',
        },
        {
          dropdownVariant: 'elevated',
          buttonVariant: ButtonVariant.SECONDARY,
          label: 'Вариант elevated',
        },
        {
          dropdownVariant: 'outlined',
          buttonVariant: ButtonVariant.OUTLINE,
          label: 'Вариант outlined',
        },
      ].map(variantConfig => (
        <Dropdown
          key={variantConfig.dropdownVariant}
          variant={variantConfig.dropdownVariant as 'default' | 'elevated' | 'outlined'}
          buttonProps={{
            variant: variantConfig.buttonVariant,
            children: variantConfig.label,
          }}
          items={
            [
              { label: 'Просмотр' },
              { label: 'Редактировать' },
              { label: 'Удалить', tone: 'danger' },
            ] as DropdownMenuItemProps[]
          }
        />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Доступны варианты контейнера: `default`, `elevated` (усиленная тень) и `outlined` (рамка). Каждый вариант наследует настройки из темы.',
      },
    },
  },
};

export const UserMenu: Story = {
  args: {
    trigger: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          padding: '8px 12px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          backgroundColor: '#f9fafb',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#68d5f8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          JD
        </div>
        <span>John Doe</span>
        <span>▼</span>
      </div>
    ),
    items: [
      { label: 'My Profile', icon: <span>👤</span> },
      { label: 'Settings', icon: <span>⚙️</span> },
      { label: 'Messages', icon: <span>💬</span> },
      { label: 'Sign Out', icon: <span>🚪</span>, tone: 'danger' },
    ] as DropdownMenuItemProps[],
  },
};

export const NotificationDropdown: Story = {
  args: {
    buttonProps: {
      variant: ButtonVariant.GHOST,
      children: (
        <span
          style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          🔔 Notifications
          <span
            style={{
              position: 'absolute',
              top: -6,
              right: -6,
              backgroundColor: '#ef4444',
              color: 'white',
              borderRadius: '50%',
              width: '16px',
              height: '16px',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            3
          </span>
        </span>
      ),
    },
    children: (
      <DropdownMenu>
        <DropdownMenuItem
          label="New message"
          description="You have a new message from Alice"
          rightSlot="2 minutes ago"
          style={{ backgroundColor: '#fef3c7', borderBottom: '1px solid #e5e7eb' }}
        />
        <DropdownMenuItem
          label="Task completed"
          description="Project X has been completed"
          rightSlot="1 hour ago"
          style={{ backgroundColor: '#dbeafe', borderBottom: '1px solid #e5e7eb' }}
        />
        <DropdownMenuItem
          label="System update"
          description="System will be updated tonight"
          rightSlot="3 hours ago"
          style={{ backgroundColor: '#f3e8ff' }}
        />
      </DropdownMenu>
    ),
  },
};

export const LanguageSelector: Story = {
  args: {
    buttonProps: {
      variant: ButtonVariant.OUTLINE,
      children: '🌐 Language',
    },
    items: [
      { label: '🇺🇸 English' },
      { label: '🇪🇸 Español' },
      { label: '🇫🇷 Français' },
      { label: '🇩🇪 Deutsch' },
      { label: '🇷🇺 Русский' },
    ] as DropdownMenuItemProps[],
  },
};

export const CustomTrigger: Story = {
  args: {
    trigger: (
      <Button variant={ButtonVariant.SECONDARY}>
        Кастомный триггер <span role="presentation">▼</span>
      </Button>
    ),
    items: [
      { label: 'Первый пункт' },
      { label: 'Второй пункт' },
      { label: 'Третий пункт' },
    ] as DropdownMenuItemProps[],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Если нужен полностью кастомный триггер, достаточно передать его через проп `trigger`.',
      },
    },
  },
};

export const LoadingState: Story = {
  args: {
    buttonProps: {
      variant: ButtonVariant.PRIMARY,
      children: 'Загрузка...',
    },
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Состояние загрузки скрывает список и показывает спиннер. Полезно, когда пункты меню нужно получить из API.',
      },
    },
  },
};

export const SkeletonState: Story = {
  args: {
    buttonProps: {
      variant: ButtonVariant.PRIMARY,
      children: 'Меню',
    },
    skeleton: true,
    items: [
      { label: 'Первый пункт' },
      { label: 'Второй пункт' },
      { label: 'Третий пункт' },
    ] as DropdownMenuItemProps[],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Состояние скелетона применяется только к кнопке-триггеру. Меню и элементы меню не затрагиваются. Полезно для предзагрузки структуры кнопки перед получением данных.',
      },
    },
  },
};

export const SkeletonButtonSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <Dropdown
        buttonProps={{ variant: ButtonVariant.OUTLINE, size: Size.SM }}
        skeleton
        items={[{ label: 'Пункт 1' }, { label: 'Пункт 2' }] as DropdownMenuItemProps[]}
      />
      <Dropdown
        buttonProps={{ variant: ButtonVariant.OUTLINE, size: Size.MD }}
        skeleton
        items={[{ label: 'Пункт 1' }, { label: 'Пункт 2' }] as DropdownMenuItemProps[]}
      />
      <Dropdown
        buttonProps={{ variant: ButtonVariant.OUTLINE, size: Size.LG }}
        skeleton
        items={[{ label: 'Пункт 1' }, { label: 'Пункт 2' }] as DropdownMenuItemProps[]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Скелетон кнопки автоматически адаптируется под размер, указанный в `buttonProps.size`.',
      },
    },
  },
};

export const SkeletonMenuItems: Story = {
  args: {
    buttonProps: {
      variant: ButtonVariant.PRIMARY,
      children: 'Меню с элементами-скелетонами',
    },
    defaultOpen: true,
    items: [
      { label: 'Обычный пункт' },
      { skeleton: true },
      { label: 'Ещё один пункт' },
      { skeleton: true },
    ] as DropdownMenuItemProps[],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Каждый элемент меню может иметь свой собственный проп `skeleton`, который показывает скелетон-плейсхолдер для этого конкретного элемента. Это не зависит от пропа `skeleton` в Dropdown.',
      },
    },
  },
};

export const WithSelectedItem: Story = {
  args: {
    buttonProps: {
      variant: ButtonVariant.PRIMARY,
      children: 'Меню с выбранным элементом',
    },
    defaultOpen: true,
    value: 'option-2',
    items: [
      { label: 'Первый пункт', value: 'option-1' },
      { label: 'Второй пункт (выбран)', value: 'option-2' },
      { label: 'Третий пункт', value: 'option-3' },
    ] as DropdownMenuItemProps[],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Проп `value` позволяет управлять состоянием выбранного элемента извне через сравнение с `value` каждого элемента. Полезно для контролируемых компонентов, когда нужно синхронизировать состояние с внешним стейтом.',
      },
    },
  },
};

export const ControlledMenu: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Dropdown
            buttonProps={{
              variant: ButtonVariant.PRIMARY,
              children: isOpen ? 'Закрыть меню' : 'Открыть меню',
            }}
            isMenuOpen={isOpen}
            onMenuOpenChange={setIsOpen}
            items={
              [
                { label: 'Первый пункт', value: 'option-1' },
                { label: 'Второй пункт', value: 'option-2' },
                { label: 'Третий пункт', value: 'option-3' },
              ] as DropdownMenuItemProps[]
            }
          />
          <span style={{ fontSize: '14px', color: '#6b7280' }}>
            Меню {isOpen ? 'открыто' : 'закрыто'}
          </span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Контролируемый режим: проп `isMenuOpen` управляет состоянием меню извне, а `onMenuOpenChange` вызывается при каждом изменении состояния. Полезно для синхронизации с внешним стейтом или для программного управления меню.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    buttonProps: {
      variant: ButtonVariant.PRIMARY,
      children: 'Отключенное меню',
    },
    disabled: true,
    items: [
      { label: 'Первый пункт', value: 'option-1' },
      { label: 'Второй пункт', value: 'option-2' },
      { label: 'Третий пункт', value: 'option-3' },
    ] as DropdownMenuItemProps[],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Проп `disabled` отключает компонент: блокирует открытие меню, делает кнопку неактивной и закрывает меню, если оно было открыто.',
      },
    },
  },
};

export const AlignSelfDemo: Story = {
  render: () => {
    const sharedItems: DropdownMenuItemProps[] = [
      { label: 'Новая задача', value: 'task' },
      { label: 'Новая заметка', value: 'note' },
      { label: 'Загрузить файл', value: 'upload' },
    ];

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'stretch',
          gap: 24,
          minHeight: 220,
          padding: 16,
          border: '1px dashed #d1d5db',
          borderRadius: 12,
        }}
      >
        <Dropdown
          alignSelf="flex-start"
          buttonProps={{ children: 'flex-start', variant: ButtonVariant.PRIMARY }}
          items={sharedItems}
        />
        <Dropdown
          alignSelf="center"
          buttonProps={{ children: 'center', variant: ButtonVariant.SECONDARY }}
          items={sharedItems}
        />
        <Dropdown
          alignSelf="flex-end"
          buttonProps={{ children: 'flex-end', variant: ButtonVariant.OUTLINE }}
          items={sharedItems}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '`alignSelf` управляет выравниванием всего компонента внутри flex-родителя. В примере показаны варианты `flex-start`, `center` и `flex-end`.',
      },
    },
  },
};

export const CustomContainerStyle: Story = {
  args: {
    buttonProps: {
      variant: ButtonVariant.PRIMARY,
      children: 'Кастомный контейнер',
    },
    defaultOpen: true,
    dropContainerStyle: {
      border: '2px dashed #2563eb',
      boxShadow: '0 12px 24px rgba(37, 99, 235, 0.25)',
      background:
        'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(37,99,235,0.12) 100%)',
      backdropFilter: 'blur(6px)',
    },
    items: [
      { label: 'Интенсивный режим', description: 'Повышенная нагрузка системы' },
      { label: 'Тёмная тема', description: 'Авто при закате', value: 'theme' },
      { label: 'Уведомления', description: 'Все события', value: 'notifications' },
    ] as DropdownMenuItemProps[],
  },
  parameters: {
    docs: {
      description: {
        story:
          '`dropContainerStyle` позволяет точечно стилизовать обертку меню: границы, фон, тень, фильтры и любые CSS-свойства. Можно комбинировать с `menuWidth` и `menuMaxHeight` для полного контроля над внешним видом.',
      },
    },
  },
};

export const CustomContainerMixin: Story = {
  args: {
    buttonProps: {
      variant: ButtonVariant.SECONDARY,
      children: 'CSS mixin',
    },
    defaultOpen: true,
    dropContainerCssMixin: css`
      border: 1px solid rgba(0, 0, 0, 0.08);
      backdrop-filter: blur(8px);
      background: rgba(255, 255, 255, 0.85);

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        border: 2px dashed rgba(59, 130, 246, 0.25);
      }
    `,
    items: [
      { label: 'Аналитика', description: 'Отчёты и дашборды' },
      { label: 'Интеграции', description: 'Настройка внешних сервисов' },
      { label: 'Экспорт', description: 'CSV, PDF, XLSX' },
    ] as DropdownMenuItemProps[],
  },
  parameters: {
    docs: {
      description: {
        story:
          '`dropContainerCssMixin` полезен, когда нужно подключить сложный mixin через `styled-components/css`: добавить псевдоэлементы, blur, media-запросы. Миксин применяется поверх стандартных стилей контейнера.',
      },
    },
  },
};

export const SmartPositioning: Story = {
  render: () => (
    <div
      style={{
        border: '1px solid #d1d5db',
        borderRadius: 12,
        height: 320,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ alignSelf: 'flex-start' }}>
        <Dropdown
          positioningMode="autoFlip"
          defaultOpen
          buttonProps={{ children: 'Auto flip вниз/вверх', variant: ButtonVariant.PRIMARY }}
          items={[
            { label: 'Верхний пункт' },
            { label: 'Средний пункт' },
            { label: 'Нижний пункт' },
          ]}
        />
      </div>
      <div style={{ alignSelf: 'flex-end' }}>
        <Dropdown
          positioningMode="autoFit"
          defaultOpen
          buttonProps={{ children: 'Auto fit по краям', variant: ButtonVariant.SECONDARY }}
          items={[
            { label: 'Элемент 1', description: 'Смещение по оси X' },
            { label: 'Элемент 2', description: 'Меню не выходит за экран' },
            { label: 'Элемент 3', description: 'Проверьте горизонтальные границы' },
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '`positioningMode` демонстрирует автоматическое изменение положения: `autoFlip` открывает меню вверх при недостатке места снизу, а `autoFit` дополнительно удерживает меню внутри горизонтальных границ.',
      },
    },
  },
};

export const SearchableMenu: Story = {
  render: function RenderSearchableMenu() {
    const [query, setQuery] = React.useState('');

    return (
      <Dropdown
        buttonProps={{ variant: ButtonVariant.PRIMARY, children: 'Поиск по пунктам' }}
        searchable
        searchValue={query}
        onSearch={setQuery}
        items={[
          { label: 'Профиль пользователя', description: 'Настройка данных' },
          { label: 'Команды', description: 'Управление участниками' },
          { label: 'Биллинг', description: 'Подписки и счета' },
          { label: 'API токены', description: 'Доступ для интеграций' },
        ]}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Пример поиска по `items`. Ввод обновляется извне, `onSearch` получает значение и может использоваться для аналитики или кастомной фильтрации.',
      },
    },
  },
};

export const KeyboardNavigationStory: Story = {
  args: {
    buttonProps: {
      variant: ButtonVariant.OUTLINE,
      children: 'Стрелочная навигация',
    },
    defaultOpen: true,
    enableKeyboardNavigation: true,
    items: [
      { label: 'Пункт меню 1' },
      { label: 'Пункт меню 2' },
      { label: 'Пункт меню 3' },
      { label: 'Пункт меню 4' },
    ] as DropdownMenuItemProps[],
  },
  parameters: {
    docs: {
      description: {
        story:
          'При включённом `enableKeyboardNavigation` можно перемещаться стрелками, Home/End и Tab/Shift+Tab без выхода фокуса за пределы меню.',
      },
    },
  },
};

export const AsyncItems: Story = {
  render: function RenderAsyncDropdown() {
    const loadItems = React.useCallback(() => {
      return new Promise<DropdownMenuItemProps[]>(resolve => {
        setTimeout(() => {
          resolve([
            { label: 'Отчёты', description: 'Финансовая аналитика' },
            { label: 'Импорт', description: 'CSV, XLSX' },
            { label: 'Интеграции', description: 'Webhook и API' },
          ]);
        }, 1200);
      });
    }, []);

    return (
      <Dropdown
        buttonProps={{ variant: ButtonVariant.PRIMARY, children: 'Загрузить пункты' }}
        loadItems={loadItems}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: '`loadItems` лениво подгружает список при открытии меню и показывает состояние загрузки/ошибки.',
      },
    },
  },
};

export const GroupedItems: Story = {
  args: {
    buttonProps: {
      variant: ButtonVariant.PRIMARY,
      children: 'Группы и закрепление',
    },
    defaultOpen: true,
    items: [
      {
        title: 'Закреплено сверху',
        pinned: 'top',
        items: [
          { label: 'Важная задача', description: 'С высоким приоритетом' },
          { label: 'Критический инцидент', tone: 'danger' },
        ],
      },
      {
        title: 'Основные действия',
        description: 'Повседневные задачи',
        items: [
          { label: 'Создать документ' },
          { label: 'Поделиться доступом' },
          { label: 'Настроить интеграцию' },
        ],
      },
      {
        title: 'Закреплено снизу',
        pinned: 'bottom',
        items: [{ label: 'Архив', description: 'Старые элементы каталога' }],
      },
    ] as DropdownProps['items'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'В `items` можно передавать объекты `DropdownMenuGroup` с заголовком, описанием и флагом `pinned`, чтобы фиксировать группы в начале или конце меню.',
      },
    },
  },
};

export const EmptyStateStory: Story = {
  args: {
    buttonProps: {
      variant: ButtonVariant.OUTLINE,
      children: 'Пустой список',
    },
    defaultOpen: true,
    items: [],
    emptyMessage: 'Нет подходящих результатов',
  },
  parameters: {
    docs: {
      description: {
        story: 'Если `items` пустой массив, будет показано стандартное или кастомное пустое состояние.',
      },
    },
  },
};

export const ErrorStateStory: Story = {
  render: function RenderErrorState() {
    const loadItems = React.useCallback(() => {
      return new Promise<DropdownMenuItemProps[]>((_, reject) => {
        setTimeout(() => reject(new Error('Сервер недоступен')), 800);
      });
    }, []);

    return (
      <Dropdown
        buttonProps={{ variant: ButtonVariant.DANGER, children: 'Ошибка загрузки' }}
        loadItems={loadItems}
        renderErrorState={(error, retry) => (
          <div style={{ padding: 24, textAlign: 'center' }}>
            <strong style={{ display: 'block', marginBottom: 8 }}>
              Ошибка: {(error as Error)?.message}
            </strong>
            <Button variant={ButtonVariant.SECONDARY} size={Size.SM} onClick={retry}>
              Повторить попытку
            </Button>
          </div>
        )}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Через `renderErrorState` можно полностью переопределить отображение ошибки (например, показать кастомное сообщение и кнопку повтора).',
      },
    },
  },
};

export const InlineMode: Story = {
  render: () => (
    <div
      style={{
        border: '1px solid #e5e7eb',
        padding: 24,
        borderRadius: 12,
        width: 320,
        height: 220,
        overflow: 'auto',
        position: 'relative',
      }}
    >
      <div style={{ height: 120 }} />
      <Dropdown
        inline
        buttonProps={{ variant: ButtonVariant.PRIMARY, children: 'Inline внутри блока' }}
        positioningMode="autoFit"
        items={[
          { label: 'Скопировать ссылку' },
          { label: 'Сохранить локально' },
          { label: 'Удалить', tone: 'danger' },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Пример режима `inline`, когда меню рендерится внутри контейнера (без портала) и не выходит за его пределы.',
      },
    },
  },
};

export const CustomPortalContainer: Story = {
  render: function RenderCustomPortal() {
    const portalRef = React.useRef<HTMLDivElement>(null);

    return (
      <div
        style={{
          border: '1px solid #cbd5f5',
          padding: 24,
          borderRadius: 12,
          position: 'relative',
          minHeight: 220,
        }}
      >
        <div
          ref={portalRef}
          style={{
            position: 'absolute',
            inset: 16,
            pointerEvents: 'none',
          }}
        />
        <Dropdown
          buttonProps={{ variant: ButtonVariant.PRIMARY, children: 'Внутренний портал' }}
          defaultOpen
          portalContainer={portalRef.current}
          items={[
            { label: 'Локальное меню', description: 'Закреплено внутри блока' },
            { label: 'Позиционирование', description: 'Не выходит за границы' },
            { label: 'Гибкая настройка' },
          ]}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '`portalContainer` позволяет указать DOM-узел, в который будет смонтировано меню. Это полезно для модалок и областей с особым управлением z-index.',
      },
    },
  },
};

export const WithTargetElement: Story = {
  render: () => {
    const targetRef = React.useRef<HTMLDivElement>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div
          ref={targetRef}
          style={{
            padding: '16px',
            backgroundColor: '#e5e7eb',
            borderRadius: '8px',
            width: '200px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          Целевой элемент для позиционирования
        </div>
        <Dropdown
          buttonProps={{
            variant: ButtonVariant.OUTLINE,
            children: 'Открыть меню',
          }}
          targetElement={targetRef.current}
          defaultOpen={true}
          items={
            [
              { label: 'Первый пункт', value: 'option-1' },
              { label: 'Второй пункт', value: 'option-2' },
              { label: 'Третий пункт', value: 'option-3' },
            ] as DropdownMenuItemProps[]
          }
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Проп `targetElement` позволяет позиционировать меню относительно любого элемента DOM, а не только относительно trigger. Полезно для сложных сценариев, когда нужно позиционировать меню относительно другого элемента.',
      },
    },
  },
};

export const WithActivateItem: Story = {
  render: () => {
    const [activatedValue, setActivatedValue] = React.useState<string | undefined>(undefined);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Dropdown
          buttonProps={{
            variant: ButtonVariant.PRIMARY,
            children: 'Меню с обработчиком hover',
          }}
          defaultOpen={true}
          onActivateItem={value => {
            setActivatedValue(value as string);
          }}
          items={
            [
              { label: 'Первый пункт', value: 'option-1' },
              { label: 'Второй пункт', value: 'option-2' },
              { label: 'Третий пункт', value: 'option-3' },
            ] as DropdownMenuItemProps[]
          }
        />
        {activatedValue && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            Активирован элемент: <strong>{activatedValue}</strong>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Проп `onActivateItem` вызывается при наведении курсора на элемент меню (hover). Получает значение элемента (`value`). Полезно для реализации предпросмотра контента или других интерактивных эффектов при наведении.',
      },
    },
  },
};

export const WithTopPanel: Story = {
  render: () => {
    return (
      <Dropdown
        buttonProps={{
          variant: ButtonVariant.PRIMARY,
          children: 'Меню с панелью сверху',
        }}
        defaultOpen={true}
        renderTopPanel={({ size, variant, disabled }) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              backgroundColor: disabled ? '#f3f4f6' : '#f9fafb',
              borderRadius: '6px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Поиск и фильтры</span>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                Размер: {size}, Вариант: {variant}
              </span>
            </div>
            <input
              type="text"
              placeholder="Поиск..."
              disabled={disabled}
              style={{
                padding: '6px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                width: '150px',
              }}
            />
          </div>
        )}
        items={
          [
            { label: 'Первый пункт', value: 'option-1' },
            { label: 'Второй пункт', value: 'option-2' },
            { label: 'Третий пункт', value: 'option-3' },
          ] as DropdownMenuItemProps[]
        }
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Проп `renderTopPanel` позволяет добавить кастомную панель сверху над выпадающим списком. Функция получает объект с пропсами dropdown (`size`, `variant`, `disabled`), что позволяет адаптировать панель под текущие настройки. Полезно для добавления поиска, фильтров или другой интерактивной панели управления.',
      },
    },
  },
};

export const WithBottomPanel: Story = {
  render: () => {
    return (
      <Dropdown
        buttonProps={{
          variant: ButtonVariant.PRIMARY,
          children: 'Меню с панелью снизу',
        }}
        defaultOpen={true}
        renderBottomPanel={({ size, variant, disabled }) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              backgroundColor: disabled ? '#f3f4f6' : '#f9fafb',
              borderRadius: '6px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '14px', fontWeight: 600 }}>Дополнительные действия</span>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>
                Размер: {size}, Вариант: {variant}
              </span>
            </div>
            <button
              disabled={disabled}
              style={{
                padding: '6px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                backgroundColor: disabled ? '#e5e7eb' : '#ffffff',
                cursor: disabled ? 'not-allowed' : 'pointer',
              }}
            >
              Применить
            </button>
          </div>
        )}
        items={
          [
            { label: 'Первый пункт', value: 'option-1' },
            { label: 'Второй пункт', value: 'option-2' },
            { label: 'Третий пункт', value: 'option-3' },
          ] as DropdownMenuItemProps[]
        }
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Проп `renderBottomPanel` позволяет добавить кастомную панель снизу под выпадающим списком. Функция получает объект с пропсами dropdown (`size`, `variant`, `disabled`), что позволяет адаптировать панель под текущие настройки. Полезно для добавления кнопок действий, счетчиков или другой интерактивной панели управления.',
      },
    },
  },
};

export const WithBothPanels: Story = {
  render: () => {
    return (
      <Dropdown
        buttonProps={{
          variant: ButtonVariant.PRIMARY,
          children: 'Меню с обеими панелями',
        }}
        defaultOpen={true}
        renderTopPanel={({ size, variant, disabled }) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              backgroundColor: disabled ? '#f3f4f6' : '#f9fafb',
              borderRadius: '6px',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 600 }}>Поиск</span>
            <input
              type="text"
              placeholder="Поиск..."
              disabled={disabled}
              style={{
                padding: '6px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                width: '150px',
              }}
            />
          </div>
        )}
        renderBottomPanel={({ size, variant, disabled }) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 12px',
              backgroundColor: disabled ? '#f3f4f6' : '#f9fafb',
              borderRadius: '6px',
            }}
          >
            <span style={{ fontSize: '12px', color: '#6b7280' }}>Выбрано: 0 элементов</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                disabled={disabled}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: disabled ? '#e5e7eb' : '#ffffff',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                }}
              >
                Сбросить
              </button>
              <button
                disabled={disabled}
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  backgroundColor: disabled ? '#e5e7eb' : '#3b82f6',
                  color: disabled ? '#9ca3af' : '#ffffff',
                  cursor: disabled ? 'not-allowed' : 'pointer',
                }}
              >
                Применить
              </button>
            </div>
          </div>
        )}
        items={
          [
            { label: 'Первый пункт', value: 'option-1' },
            { label: 'Второй пункт', value: 'option-2' },
            { label: 'Третий пункт', value: 'option-3' },
          ] as DropdownMenuItemProps[]
        }
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Можно использовать обе панели одновременно: `renderTopPanel` для поиска и фильтров сверху, `renderBottomPanel` для действий и счетчиков снизу.',
      },
    },
  },
};

export const MultiSelection: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = React.useState<DropdownMenuItemValue[]>([]);

    const handleSelect = (value?: DropdownMenuItemValue) => {
      if (value === undefined) return;

      setSelectedValues(prev => {
        if (prev.includes(value)) {
          return prev.filter(v => v !== value);
        }
        return [...prev, value];
      });
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Dropdown
          buttonProps={{
            variant: ButtonVariant.PRIMARY,
            children: `Выбрано: ${selectedValues.length} элементов`,
          }}
          defaultOpen={true}
          multiSelection={true}
          value={selectedValues}
          onSelect={handleSelect}
          items={
            [
              { label: 'Первый пункт', value: 'option-1' },
              { label: 'Второй пункт', value: 'option-2' },
              { label: 'Третий пункт', value: 'option-3' },
              { label: 'Четвертый пункт', value: 'option-4' },
              { label: 'Пятый пункт', value: 'option-5' },
            ] as DropdownMenuItemProps[]
          }
        />
        {selectedValues.length > 0 && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            Выбранные значения: <strong>{selectedValues.join(', ')}</strong>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Режим множественного выбора (`multiSelection={true}`) позволяет выбрать несколько элементов. В каждом элементе меню отображается чекбокс. Меню не закрывается при выборе элемента. `value` должен быть массивом значений.',
      },
    },
  },
};

export const MultiSelectionWithDisabled: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = React.useState<DropdownMenuItemValue[]>([
      'option-2',
    ]);

    const handleSelect = (value?: DropdownMenuItemValue) => {
      if (value === undefined) return;

      setSelectedValues(prev => {
        if (prev.includes(value)) {
          return prev.filter(v => v !== value);
        }
        return [...prev, value];
      });
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Dropdown
          buttonProps={{
            variant: ButtonVariant.PRIMARY,
            children: `Выбрано: ${selectedValues.length} элементов`,
          }}
          defaultOpen={true}
          multiSelection={true}
          value={selectedValues}
          onSelect={handleSelect}
          items={
            [
              { label: 'Первый пункт', value: 'option-1' },
              { label: 'Второй пункт (выбран)', value: 'option-2' },
              { label: 'Третий пункт (отключен)', value: 'option-3', disabled: true },
              { label: 'Четвертый пункт', value: 'option-4' },
              { label: 'Пятый пункт (отключен)', value: 'option-5', disabled: true },
            ] as DropdownMenuItemProps[]
          }
        />
        {selectedValues.length > 0 && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            Выбранные значения: <strong>{selectedValues.join(', ')}</strong>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'В режиме множественного выбора отключенные элементы (`disabled={true}`) не могут быть выбраны. Чекбокс у отключенных элементов также отключен.',
      },
    },
  },
};

export const MultiSelectionWithoutHighlight: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = React.useState<DropdownMenuItemValue[]>([
      'option-2',
      'option-4',
    ]);

    const handleSelect = (value?: DropdownMenuItemValue) => {
      if (value === undefined) return;

      setSelectedValues(prev => {
        if (prev.includes(value)) {
          return prev.filter(v => v !== value);
        }
        return [...prev, value];
      });
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Dropdown
            buttonProps={{
              variant: ButtonVariant.PRIMARY,
              children: 'С подсветкой (по умолчанию)',
            }}
            defaultOpen={true}
            multiSelection={true}
            value={selectedValues}
            onSelect={handleSelect}
            items={
              [
                { label: 'Первый пункт', value: 'option-1' },
                { label: 'Второй пункт', value: 'option-2' },
                { label: 'Третий пункт', value: 'option-3' },
                { label: 'Четвертый пункт', value: 'option-4' },
              ] as DropdownMenuItemProps[]
            }
          />
          <Dropdown
            buttonProps={{
              variant: ButtonVariant.PRIMARY,
              children: 'Без подсветки',
            }}
            defaultOpen={true}
            multiSelection={true}
            disableSelectedOptionHighlight={true}
            value={selectedValues}
            onSelect={handleSelect}
            items={
              [
                { label: 'Первый пункт', value: 'option-1' },
                { label: 'Второй пункт', value: 'option-2' },
                { label: 'Третий пункт', value: 'option-3' },
                { label: 'Четвертый пункт', value: 'option-4' },
              ] as DropdownMenuItemProps[]
            }
          />
        </div>
        {selectedValues.length > 0 && (
          <div
            style={{
              padding: '12px',
              backgroundColor: '#e5e7eb',
              borderRadius: '8px',
              fontSize: '14px',
            }}
          >
            Выбранные значения: <strong>{selectedValues.join(', ')}</strong>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Проп `disableSelectedOptionHighlight={true}` отключает подсветку выбранной опции. Полезно для режима множественного выбора, когда у каждой опции есть чекбокс и подсветка не нужна. Сравните два dropdown: слева с подсветкой (по умолчанию), справа без подсветки.',
      },
    },
  },
};

export const VirtualScroll: Story = {
  render: () => {
    // Создаем большой список элементов для демонстрации виртуального скролла
    const manyItems: DropdownMenuItemProps[] = Array.from({ length: 100 }, (_, i) => ({
      label: `Элемент ${i + 1}`,
      value: `item-${i + 1}`,
    }));

    return (
      <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
        <div>
          <h3>Виртуальный скролл с автоматической высотой (itemHeight="auto")</h3>
          <p style={{ color: '#666', marginBottom: '10px' }}>
            Высота элемента вычисляется автоматически из темы на основе размера dropdown.
          </p>
          <Dropdown
            buttonProps={{
              variant: ButtonVariant.PRIMARY,
              children: 'Открыть меню (100 элементов, auto)',
            }}
            items={manyItems}
            virtualScroll={{ itemHeight: 'auto' }}
            size={Size.MD}
          />
        </div>

        <div>
          <h3>Виртуальный скролл с фиксированной высотой (itemHeight=32)</h3>
          <p style={{ color: '#666', marginBottom: '10px' }}>
            Высота элемента задана явно в пикселях.
          </p>
          <Dropdown
            buttonProps={{
              variant: ButtonVariant.PRIMARY,
              children: 'Открыть меню (100 элементов, 32px)',
            }}
            items={manyItems}
            virtualScroll={{ itemHeight: 32 }}
            size={Size.MD}
          />
        </div>

        <div>
          <h3>Без виртуального скролла (для сравнения)</h3>
          <p style={{ color: '#666', marginBottom: '10px' }}>
            Обычный скролл - все элементы рендерятся одновременно.
          </p>
          <Dropdown
            buttonProps={{
              variant: ButtonVariant.OUTLINE,
              children: 'Открыть меню (100 элементов, без виртуализации)',
            }}
            items={manyItems.slice(0, 20)} // Показываем только 20 для сравнения
            size={Size.MD}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Виртуальный скролл позволяет эффективно отображать большие списки элементов, рендеря только видимые элементы. Это улучшает производительность при работе с большими списками. Максимальная высота меню рассчитывается как `itemHeight * 8` (показывается максимум 8 элементов).',
      },
    },
  },
};

export const WithTooltips: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
      <div>
        <h3>Тултипы с кастомным текстом</h3>
        <p style={{ color: '#666', marginBottom: '10px' }}>
          Элементы меню могут отображать тултипы при наведении. Полезно для длинных названий или дополнительной информации.
        </p>
        <Dropdown
          buttonProps={{
            variant: ButtonVariant.PRIMARY,
            children: 'Меню с тултипами',
          }}
          items={[
            {
              label: 'Редактировать профиль',
              value: 'edit',
              icon: <span>✏️</span>,
              showTooltip: true,
              tooltipText: 'Открыть форму редактирования профиля пользователя',
            },
            {
              label: 'Настройки безопасности',
              value: 'security',
              icon: <span>🔒</span>,
              showTooltip: true,
              tooltipText: 'Управление паролями, двухфакторной аутентификацией и сессиями',
            },
            {
              label: 'Очень длинное название пункта меню, которое не помещается в одну строку',
              value: 'long',
              icon: <span>📄</span>,
              showTooltip: true,
              tooltipText: 'Этот пункт имеет очень длинное название, поэтому тултип помогает увидеть полный текст',
            },
            {
              label: 'Удалить аккаунт',
              value: 'delete',
              icon: <span>🗑️</span>,
              tone: 'danger',
              showTooltip: true,
              tooltipText: 'Внимание! Это действие нельзя отменить. Все данные будут удалены безвозвратно.',
            },
          ] as DropdownMenuItemProps[]}
        />
      </div>

      <div>
        <h3>Тултипы с автоматическим текстом (из label)</h3>
        <p style={{ color: '#666', marginBottom: '10px' }}>
          Если `tooltipText` не указан, но `showTooltip={true}`, тултип будет использовать текст из `label`.
        </p>
        <Dropdown
          buttonProps={{
            variant: ButtonVariant.OUTLINE,
            children: 'Автоматические тултипы',
          }}
          items={[
            {
              label: 'Короткий пункт',
              value: 'short',
              showTooltip: true,
            },
            {
              label: 'Средний пункт меню',
              value: 'medium',
              showTooltip: true,
            },
            {
              label: 'Длинный пункт меню с описанием',
              value: 'long',
              showTooltip: true,
            },
          ] as DropdownMenuItemProps[]}
        />
      </div>

      <div>
        <h3>Смешанные тултипы</h3>
        <p style={{ color: '#666', marginBottom: '10px' }}>
          Некоторые элементы с тултипами, некоторые без. Тултипы автоматически отключаются для disabled элементов.
        </p>
        <Dropdown
          buttonProps={{
            variant: ButtonVariant.PRIMARY,
            children: 'Смешанное меню',
          }}
          items={[
            {
              label: 'С тултипом',
              value: 'with-tooltip',
              showTooltip: true,
              tooltipText: 'Этот элемент имеет тултип',
            },
            {
              label: 'Без тултипа',
              value: 'without-tooltip',
            },
            {
              label: 'Disabled с тултипом',
              value: 'disabled',
              disabled: true,
              showTooltip: true,
              tooltipText: 'Этот элемент отключен, тултип не показывается',
            },
            {
              label: 'Loading с тултипом',
              value: 'loading',
              loading: true,
              showTooltip: true,
              tooltipText: 'Загрузка...',
            },
          ] as DropdownMenuItemProps[]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Элементы меню могут отображать тултипы при наведении. Используйте `showTooltip={true}` для включения тултипа и `tooltipText` для кастомного текста. Если `tooltipText` не указан, используется текст из `label`. Тултипы автоматически отключаются для disabled, loading и skeleton элементов.',
      },
    },
  },
};
