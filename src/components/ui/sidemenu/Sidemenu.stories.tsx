import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Sidemenu } from './Sidemenu';
import { Badge } from '../Badge/Badge';
import { NavigationMenu } from '../NavigationMenu';
import { Button } from '../buttons/Button';
import {
  BadgeVariant,
  ButtonVariant,
  HintPosition,
  NavigationMenuActiveAppearance,
  NavigationMenuExpandInteraction,
  NavigationMenuItemStatus,
  SidemenuVariant,
  TooltipPosition,
  type SidemenuItem,
} from '../../../types/ui';
import { Icon } from '../Icon/Icon';
import { IconSize, Size } from '@/types/sizes';
import { DOC_SIDEMENU } from '@/components/ui/storyDocs/uiKitDocs';
import {
  applySidemenuActiveId,
  pickSidemenuPropsFromStoryArgs,
  SidemenuStoryWithActiveState,
} from './Sidemenu.stories.helpers';
import { SidemenuLogoIconSlot, SidemenuLogoTitleText } from './Sidemenu.style';
import { SidemenuDemoFooterActions, SidemenuDemoHeaderBrand } from './Sidemenu.stories.slots.styles';
import { sidemenuStoriesStyles } from './Sidemenu.stories.styles';

const meta: Meta<typeof Sidemenu> = {
  title: 'UI Kit/Navigation/Sidemenu',
  component: Sidemenu,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_SIDEMENU,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Пункты меню: id, label, icon, active, notificationCount, onClick',
      control: false,
      table: {
        type: { summary: 'SidemenuItem[]' },
      },
    },
    logo: {
      description: 'Блок логотипа в шапке (если не задан logoSlot)',
      control: false,
      table: {
        type: { summary: '{ icon?: ReactNode; title?: string }' },
      },
    },
    logoSlot: {
      description:
        'Произвольный контент слева в шапке вместо logo.icon + logo.title (имеет приоритет).',
      control: false,
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(SidemenuVariant),
      description: 'Вариант отображения бокового меню',
      table: {
        type: { summary: 'expanded или collapsed (SidemenuVariant)' },
      },
    },
    onItemClick: {
      description: 'Клик по пункту (в дополнение к собственному onClick у элемента)',
      control: false,
      table: {
        type: { summary: '(item: SidemenuItem) => void' },
      },
    },
    footer: {
      description:
        'Нижний слот под основным списком: любой ReactNode (второе меню, действия). Обёртка не участвует в переключении раскрытия по клику по панели.',
      control: false,
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    slotStyles: {
      description:
        'Стили зон панели: header, body, footer — высота (min/max), overflow, flex и др. (см. SidemenuSlotStyles).',
      control: false,
      table: {
        type: { summary: 'SidemenuSlotStyles' },
      },
    },
    edgeAttached: {
      description:
        'Панель как колонна у левого края: без скруглений и тени, min-height 100vh, граница только справа.',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Создаем тестовые данные для меню
/** Шаблон пунктов: активный id задаёт обёртка сторис */
const defaultItems: SidemenuItem[] = [
  {
    id: 'home',
    label: 'Главная страница',
    icon: <Icon name="IconExUser" size={IconSize.MD} />,
  },
  {
    id: 'analytics',
    label: 'Аналитика',
    icon: <Icon name="IconExChart" size={IconSize.MD} />,
    notificationCount: 3,
  },
  {
    id: 'projects',
    label: 'Проекты',
    icon: <Icon name="IconExCase" size={IconSize.MD} />,
  },
  {
    id: 'tasks',
    label: 'Задачи',
    icon: <Icon name="IconExCheck" size={IconSize.MD} />,
  },
  {
    id: 'users',
    label: 'Пользователи',
    icon: <Icon name="IconExUsers" size={IconSize.MD} />,
  },
];

const expandedItems: SidemenuItem[] = [
  {
    id: 'dashboard',
    label: 'Панель управления',
    icon: <Icon name="IconExUser" size={IconSize.MD} />,
  },
  {
    id: 'orders',
    label: 'Заказы',
    icon: <Icon name="IconExCart" size={IconSize.MD} />,
    notificationCount: 12,
  },
  {
    id: 'customers',
    label: 'Клиенты',
    icon: <Icon name="IconExAddUser" size={IconSize.MD} />,
  },
  {
    id: 'products',
    label: 'Товары',
    icon: <Icon name="IconExBox1" size={IconSize.MD} />,
  },
  {
    id: 'reports',
    label: 'Отчеты',
    icon: <Icon name="IconExDocument" size={IconSize.MD} />,
  },
  {
    id: 'settings',
    label: 'Настройки',
    icon: <Icon name="IconExSettings" size={IconSize.MD} />,
  },
];

const multipleNotificationsItems: SidemenuItem[] = [
  {
    id: 'dashboard',
    label: 'Панель управления',
    icon: <Icon name="IconExUser" size={IconSize.MD} />,
  },
  {
    id: 'orders',
    label: 'Заказы',
    icon: <Icon name="IconExCart" size={IconSize.MD} />,
    notificationCount: 25,
  },
  {
    id: 'messages',
    label: 'Сообщения',
    icon: <Icon name="IconExMessageSquare" size={IconSize.MD} />,
    notificationCount: 99,
  },
  {
    id: 'alerts',
    label: 'Уведомления',
    icon: <Icon name="IconExBell" size={IconSize.MD} />,
    notificationCount: 5,
  },
  {
    id: 'tasks',
    label: 'Задачи',
    icon: <Icon name="IconExCheck" size={IconSize.MD} />,
    notificationCount: 12,
  },
  {
    id: 'reports',
    label: 'Отчеты',
    icon: <Icon name="IconExDocument" size={IconSize.MD} />,
  },
];

const longLabelsItems: SidemenuItem[] = [
  {
    id: 'dashboard',
    label: 'Панель управления и мониторинг',
    icon: <Icon name="IconExUser" size={IconSize.MD} />,
  },
  {
    id: 'orders',
    label: 'Управление заказами и доставкой',
    icon: <Icon name="IconExCart" size={IconSize.MD} />,
    notificationCount: 3,
  },
  {
    id: 'customers',
    label: 'База данных клиентов',
    icon: <Icon name="IconExAddUser" size={IconSize.MD} />,
  },
  {
    id: 'analytics',
    label: 'Аналитика и отчетность',
    icon: <Icon name="IconExChart" size={IconSize.MD} />,
  },
  {
    id: 'settings',
    label: 'Настройки системы',
    icon: <Icon name="IconExSettings" size={IconSize.MD} />,
  },
];

// Основные варианты
export const Expanded: Story = {
  args: {
    logo: {
      icon: <Icon name="IconExStar" size={IconSize.MD} />,
    },
    variant: SidemenuVariant.EXPANDED,
  },
  render: args => (
    <SidemenuStoryWithActiveState
      itemsTemplate={defaultItems}
      initialActiveId="home"
      {...pickSidemenuPropsFromStoryArgs(args)}
    />
  ),
};

export const Collapsed: Story = {
  args: {
    logo: {
      icon: <Icon name="IconExStar" size={IconSize.MD} />,
    },
    variant: SidemenuVariant.COLLAPSED,
  },
  render: args => (
    <SidemenuStoryWithActiveState
      itemsTemplate={defaultItems}
      initialActiveId="home"
      {...pickSidemenuPropsFromStoryArgs(args)}
    />
  ),
};

/** Колонна у левого края приложения: см. **edgeAttached**; рядом блок контента (как в реальном layout). */
export const EdgeAttachedLayout: Story = {
  name: 'У левого края экрана (edgeAttached)',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Родитель: `display: flex; min-height: 100vh`. **Sidemenu** с **edgeAttached** — без «карточки», разделитель с основой только цветом/линией справа.',
      },
    },
  },
  args: {
    edgeAttached: true,
    variant: SidemenuVariant.COLLAPSED,
    logo: {
      icon: <Icon name="IconExStar" size={IconSize.MD} />,
    },
  },
  render: args => {
    const [activeId, setActiveId] = React.useState('home');
    const items = React.useMemo(
      () => applySidemenuActiveId(defaultItems, activeId),
      [activeId],
    );
    const sidemenuProps = pickSidemenuPropsFromStoryArgs(args);

    return (
      <div style={sidemenuStoriesStyles.edgeAttachedPageRoot}>
        <p
          role="status"
          aria-live="polite"
          style={sidemenuStoriesStyles.edgeAttachedStatus}
        >
          <span style={sidemenuStoriesStyles.edgeAttachedStatusMuted}>Активный пункт: </span>
          <strong>{activeId}</strong>
        </p>
        <div style={sidemenuStoriesStyles.edgeAttachedContentRow}>
          <Sidemenu
            {...sidemenuProps}
            items={items}
            onItemClick={item => {
              setActiveId(item.id);
              sidemenuProps.onItemClick?.(item);
            }}
          />
          <main style={sidemenuStoriesStyles.edgeAttachedMain}>
            Область контента приложения рядом с боковой колонной.
          </main>
        </div>
      </div>
    );
  },
};

export const WithNotifications: Story = {
  args: {
    logo: {
      icon: <Icon name="IconExStar" size={IconSize.MD} />,
    },
    variant: SidemenuVariant.EXPANDED,
  },
  render: args => (
    <SidemenuStoryWithActiveState
      itemsTemplate={expandedItems}
      initialActiveId="dashboard"
      {...pickSidemenuPropsFromStoryArgs(args)}
    />
  ),
};

export const WithoutLogo: Story = {
  args: {
    variant: SidemenuVariant.EXPANDED,
  },
  render: args => (
    <SidemenuStoryWithActiveState
      itemsTemplate={defaultItems}
      initialActiveId="home"
      {...pickSidemenuPropsFromStoryArgs(args)}
    />
  ),
};

export const WithLogoOnly: Story = {
  args: {
    logo: {
      icon: <Icon name="IconExStar" size={IconSize.MD} />,
    },
    variant: SidemenuVariant.EXPANDED,
  },
  render: args => (
    <SidemenuStoryWithActiveState
      itemsTemplate={defaultItems}
      initialActiveId="home"
      {...pickSidemenuPropsFromStoryArgs(args)}
    />
  ),
};

/** Интерактивно: клики по пунктам + переключение expanded/collapsed */
const InteractiveExample: React.FC = () => {
  const [variant, setVariant] = React.useState<SidemenuVariant>(SidemenuVariant.EXPANDED);

  return (
    <div style={sidemenuStoriesStyles.interactiveRoot}>
      <SidemenuStoryWithActiveState
        itemsTemplate={defaultItems}
        initialActiveId="home"
        logo={{
          icon: <Icon name="IconExStar" size={IconSize.MD} />,
        }}
        variant={variant}
        onItemClick={fn()}
      />

      <div style={sidemenuStoriesStyles.interactiveControlsPanel}>
        <h3>Контролы</h3>
        <div style={sidemenuStoriesStyles.interactiveCheckboxWrap}>
          <label>
            <input
              type="checkbox"
              checked={variant === SidemenuVariant.COLLAPSED}
              onChange={event =>
                setVariant(
                  event.target.checked ? SidemenuVariant.COLLAPSED : SidemenuVariant.EXPANDED,
                )
              }
            />
            Свернуть меню
          </label>
        </div>
        <p style={sidemenuStoriesStyles.interactiveHelperText}>
          Клик по пунктам меняет подсветку; строка «Активный пункт» — над меню.
        </p>
      </div>
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveExample />,
  parameters: {
    layout: 'padded',
  },
};

// Пример с множественными уведомлениями
export const MultipleNotifications: Story = {
  render: () => (
    <SidemenuStoryWithActiveState
      itemsTemplate={multipleNotificationsItems}
      initialActiveId="dashboard"
      logo={{
        icon: <Icon name="IconExStar" size={IconSize.MD} />,
      }}
      variant={SidemenuVariant.EXPANDED}
    />
  ),
};

// Пример с длинными названиями
export const LongLabels: Story = {
  render: () => (
    <SidemenuStoryWithActiveState
      itemsTemplate={longLabelsItems}
      initialActiveId="dashboard"
      logo={{
        icon: <Icon name="IconExStar" size={IconSize.MD} />,
      }}
      variant={SidemenuVariant.EXPANDED}
    />
  ),
};

/** Анимированная панель: наведите на меню — разворот с 100px до 310px */
export const ExpandPanelOnHover: Story = {
  args: {
    logo: {
      icon: <Icon name="IconExStar" size={IconSize.MD} />,
    },
    variant: SidemenuVariant.COLLAPSED,
    expandInteraction: NavigationMenuExpandInteraction.HOVER,
    defaultExpanded: false,
    onExpand: fn(),
    onCollapse: fn(),
  },
  render: args => (
    <SidemenuStoryWithActiveState
      itemsTemplate={defaultItems}
      initialActiveId="home"
      {...pickSidemenuPropsFromStoryArgs(args)}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Компактная панель по умолчанию; при наведении на область меню ширина и подписи плавно появляются. **onExpand** / **onCollapse** — при завершении перехода.',
      },
    },
  },
};

/** Общая разметка «страницы» для демо off-screen у края экрана */
const OffScreenStorySurface: React.FC<{ summary: string; children: React.ReactNode }> = ({
  summary,
  children,
}) => (
  <div style={sidemenuStoriesStyles.offScreenSurface}>
    <p style={sidemenuStoriesStyles.offScreenSummary}>{summary}</p>
    {children}
  </div>
);

const offScreenStoryParameters: Story['parameters'] = {
  layout: 'fullscreen',
  docs: {
    description: {
      story:
        'Режим **offScreenHoverReveal**: полоса у левого края; панель выезжает / **уезжает влево за экран** (translateX). Колбэки **onOffScreenShow** / **onOffScreenHide** — после смены видимости.',
    },
  },
};

/** Панель за краем: полный статический вид (EXPANDED), без expandInteraction */
export const OffScreenHoverReveal: Story = {
  render: () => (
    <OffScreenStorySurface
      summary={
        'Развёрнутое меню (variant EXPANDED). Наведите на полосу у левого края — панель выезжает; уведите курсор в контент — уезжает за экран.'
      }
    >
      <SidemenuStoryWithActiveState
        itemsTemplate={defaultItems}
        initialActiveId="home"
        offScreenHoverReveal
        logo={{
          icon: <Icon name="IconExStar" size={IconSize.MD} />,
        }}
        variant={SidemenuVariant.EXPANDED}
        onOffScreenShow={fn()}
        onOffScreenHide={fn()}
      />
    </OffScreenStorySurface>
  ),
  parameters: offScreenStoryParameters,
};

/** Тот же off-screen: только иконки (COLLAPSED), без интерактивного expand по ширине */
export const OffScreenHoverRevealCollapsed: Story = {
  render: () => (
    <OffScreenStorySurface
      summary={
        'Компактный статический вид (variant COLLAPSED): узкая панель уезжает за экран при скрытии; полоса края та же.'
      }
    >
      <SidemenuStoryWithActiveState
        itemsTemplate={defaultItems}
        initialActiveId="home"
        offScreenHoverReveal
        logo={{
          icon: <Icon name="IconExStar" size={IconSize.MD} />,
        }}
        variant={SidemenuVariant.COLLAPSED}
        onOffScreenShow={fn()}
        onOffScreenHide={fn()}
      />
    </OffScreenStorySurface>
  ),
  parameters: offScreenStoryParameters,
};

/** Off-screen + раскрытие панели по hover (компакт → полная ширина внутри выехавшей области) */
export const OffScreenHoverRevealExpandOnHover: Story = {
  render: () => (
    <OffScreenStorySurface
      summary={
        'Сначала наведите на полосу у края (панель выезжает), затем наведите на область меню — ширина и подписи разворачиваются; уход курсора с меню сворачивает и прячет панель за экран.'
      }
    >
      <SidemenuStoryWithActiveState
        itemsTemplate={defaultItems}
        initialActiveId="home"
        offScreenHoverReveal
        logo={{
          icon: <Icon name="IconExStar" size={IconSize.MD} />,
        }}
        variant={SidemenuVariant.COLLAPSED}
        expandInteraction={NavigationMenuExpandInteraction.HOVER}
        defaultExpanded={false}
        onExpand={fn()}
        onCollapse={fn()}
        onOffScreenShow={fn()}
        onOffScreenHide={fn()}
      />
    </OffScreenStorySurface>
  ),
  parameters: offScreenStoryParameters,
};

/** Off-screen + раскрытие по клику по оболочке навигации */
export const OffScreenHoverRevealExpandOnClick: Story = {
  render: () => (
    <OffScreenStorySurface
      summary={
        'Полоса у края показывает панель; клик по пустой области меню (не по пунктам и не по нижнему блоку) переключает компактный / полный вид внутри панели.'
      }
    >
      <SidemenuStoryWithActiveState
        itemsTemplate={defaultItems}
        initialActiveId="home"
        offScreenHoverReveal
        logo={{
          icon: <Icon name="IconExStar" size={IconSize.MD} />,
        }}
        variant={SidemenuVariant.COLLAPSED}
        expandInteraction={NavigationMenuExpandInteraction.CLICK}
        defaultExpanded={false}
        onExpand={fn()}
        onCollapse={fn()}
        onOffScreenShow={fn()}
        onOffScreenHide={fn()}
      />
    </OffScreenStorySurface>
  ),
  parameters: offScreenStoryParameters,
};

/** EdgeAttached в режиме off-screen: те же сценарии hover reveal и expand/collapse. */
export const EdgeAttachedOffScreenInteractive: Story = {
  name: 'У края + скрытие/показ и раскрытие',
  render: () => (
    <OffScreenStorySurface
      summary={
        'Вариант edgeAttached поддерживает те же сценарии: полоса у края показывает панель, клик по оболочке переключает compact/full.'
      }
    >
      <SidemenuStoryWithActiveState
        itemsTemplate={defaultItems}
        initialActiveId="home"
        edgeAttached
        offScreenHoverReveal
        logo={{
          icon: <Icon name="IconExStar" size={IconSize.MD} />,
        }}
        variant={SidemenuVariant.COLLAPSED}
        expandInteraction={NavigationMenuExpandInteraction.CLICK}
        defaultExpanded={false}
        onExpand={fn()}
        onCollapse={fn()}
        onOffScreenShow={fn()}
        onOffScreenHide={fn()}
      />
    </OffScreenStorySurface>
  ),
  parameters: offScreenStoryParameters,
};

/** Только кнопка в шапке: без клика по оболочке (`expandInteraction: toggleButton`) */
export const ExpandPanelToggleButton: Story = {
  name: 'Раскрытие по кнопке (TOGGLE_BUTTON)',
  render: () => (
    <SidemenuStoryWithActiveState
      itemsTemplate={defaultItems}
      initialActiveId="home"
      logo={{
        icon: <Icon name="IconExStar" size={IconSize.MD} />,
      }}
      variant={SidemenuVariant.COLLAPSED}
      expandInteraction={NavigationMenuExpandInteraction.TOGGLE_BUTTON}
      defaultExpanded={false}
      onExpand={fn()}
      onCollapse={fn()}
      onExpandToggleClick={fn()}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Шеврон в шапке переключает ширину и подписи; клик по пустой области панели **не** меняет режим. **onExpandToggleClick** — перед сменой состояния (через **preventDefault** у события от встроенной кнопки можно отменить).',
      },
    },
  },
};

/** Стили демо-кнопки в сторис «Кастомная кнопка раскрытия»: узкая панель — короткая подпись + полная через aria-label */
/** Кастомная кнопка через expandToggleRender */
export const ExpandPanelCustomToggle: Story = {
  name: 'Кастомная кнопка раскрытия',
  render: () => (
    <SidemenuStoryWithActiveState
      itemsTemplate={defaultItems}
      initialActiveId="home"
      variant={SidemenuVariant.COLLAPSED}
      expandInteraction={NavigationMenuExpandInteraction.TOGGLE_BUTTON}
      defaultExpanded={false}
      onExpandToggleClick={fn()}
      expandToggleRender={({ isExpanded, toggleExpanded }) => (
        <button
          type="button"
          style={sidemenuStoriesStyles.customToggleButton}
          onClick={() => toggleExpanded()}
          aria-label={
            isExpanded ? 'Свернуть боковую панель' : 'Развернуть боковую панель'
          }
        >
          {isExpanded ? 'Свернуть' : 'Меню'}
        </button>
      )}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Проп **expandToggleRender**: контекст **isExpanded** и **toggleExpanded** (вызывает **onExpandToggleClick** без DOM-события). В узкой панели используйте короткий текст или **aria-label**; слот шапки (**SidemenuExpandToggleSlot**) даёт **min-width: 0**, чтобы кнопка не обрезалась контейнером.',
      },
    },
  },
};

/** Клик по пустой области панели (не по пунктам и не по нижнему блоку) переключает вид */
export const ExpandPanelOnClick: Story = {
  args: {
    logo: {
      icon: <Icon name="IconExStar" size={IconSize.MD} />,
    },
    variant: SidemenuVariant.COLLAPSED,
    expandInteraction: NavigationMenuExpandInteraction.CLICK,
    defaultExpanded: false,
    onExpand: fn(),
    onCollapse: fn(),
  },
  render: args => (
    <SidemenuStoryWithActiveState
      itemsTemplate={defaultItems}
      initialActiveId="home"
      {...pickSidemenuPropsFromStoryArgs(args)}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Тот же сценарий, что и при наведении, но переключение по клику по оболочке (иконки уведомлений и аватар не триггерят раскрытие).',
      },
    },
  },
};

const sidemenuPopoverPanelStyle: React.CSSProperties = {
  padding: 12,
  minWidth: 220,
  fontSize: 14,
};

const sidemenuLogoStar = { icon: <Icon name="IconExStar" size={IconSize.MD} /> };

/** Вложенные `items` у пунктов — те же правила, что у NavigationMenu */
const sidemenuNestedItemsTemplate: SidemenuItem[] = [
  {
    id: 'sm-home',
    label: 'Главная',
    icon: <Icon name="IconExHome" size={IconSize.MD} />,
  },
  {
    id: 'sm-catalog',
    label: 'Каталог',
    icon: <Icon name="IconExFolder" size={IconSize.MD} />,
    items: [
      {
        id: 'sm-group-a',
        label: 'Группа A',
        icon: <Icon name="IconExBox1" size={IconSize.MD} />,
        items: [
          {
            id: 'sm-leaf-deep',
            label: 'Вложенный пункт',
            icon: <Icon name="IconExDocument" size={IconSize.MD} />,
          },
          {
            id: 'sm-leaf-a2',
            label: 'Ещё пункт',
            icon: <Icon name="IconExCheck" size={IconSize.MD} />,
          },
        ],
      },
      {
        id: 'sm-group-b',
        label: 'Группа B',
        icon: <Icon name="IconExChart" size={IconSize.MD} />,
        items: [
          {
            id: 'sm-leaf-b1',
            label: 'Пункт B1',
            icon: <Icon name="IconExUser" size={IconSize.MD} />,
          },
        ],
      },
    ],
  },
  {
    id: 'sm-settings',
    label: 'Настройки',
    icon: <Icon name="IconExSettings" size={IconSize.MD} />,
  },
];

export const MenuNestedItems: Story = {
  name: 'Меню: вложенность',
  render: () => (
    <SidemenuStoryWithActiveState
      initialActiveId="sm-leaf-deep"
      itemsTemplate={sidemenuNestedItemsTemplate}
      logo={sidemenuLogoStar}
      variant={SidemenuVariant.EXPANDED}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Поле **items** у `SidemenuItem` — дерево; id уникальны; раскрытие ветки по клику. Строка «Активный пункт» синхронизирована с подсветкой.',
      },
    },
  },
};

/** Tooltip, hint, popover — компактный вид удобнее для подсказок у иконок */
const sidemenuOverlaysItemsTemplate: SidemenuItem[] = [
  {
    id: 'sm-row-tooltip',
    label: 'Tooltip',
    icon: <Icon name="IconExHome" size={IconSize.MD} />,
    tooltip: { content: 'Тултип у пункта сайдменю', position: TooltipPosition.RIGHT },
  },
  {
    id: 'sm-row-hint',
    label: 'Hint',
    icon: <Icon name="IconExUser" size={IconSize.MD} />,
    hint: {
      content: 'Расширенная подсказка (Hint)',
      placement: HintPosition.RIGHT,
    },
  },
  {
    id: 'sm-row-hint-wins',
    label: 'Hint важнее',
    icon: <Icon name="IconExBell" size={IconSize.MD} />,
    tooltip: { content: 'Не показывается при hint', position: TooltipPosition.RIGHT },
    hint: {
      content: 'При hint и tooltip показывается hint',
      placement: HintPosition.RIGHT,
    },
  },
  {
    id: 'sm-row-popover',
    label: 'Popover',
    icon: <Icon name="IconExBox1" size={IconSize.MD} />,
    popover: {
      size: Size.MD,
      contentAriaLabel: 'Панель действий',
      children: (
        <div style={sidemenuPopoverPanelStyle}>
          Клик по строке открывает панель; по умолчанию активный пункт меню не меняется.
        </div>
      ),
    },
  },
  {
    id: 'sm-row-popover-active',
    label: 'Popover + active',
    icon: <Icon name="IconExCheck" size={IconSize.MD} />,
    popoverActivateNavigation: true,
    popover: {
      size: Size.SM,
      contentAriaLabel: 'С выделением строки',
      children: (
        <div style={sidemenuPopoverPanelStyle}>
          Задан **popoverActivateNavigation** — клик и открывает панель, и выделяет пункт.
        </div>
      ),
    },
  },
];

export const MenuTooltipHintPopover: Story = {
  name: 'Меню: tooltip, hint, popover',
  render: () => (
    <SidemenuStoryWithActiveState
      initialActiveId="sm-row-tooltip"
      itemsTemplate={sidemenuOverlaysItemsTemplate}
      logo={sidemenuLogoStar}
      variant={SidemenuVariant.COLLAPSED}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Те же пропсы **tooltip**, **hint**, **popover**, что у `NavigationMenu.Item`, задаются на **SidemenuItem** (маппинг внутри компонента).',
      },
    },
  },
};

const sidemenuStatusesTemplate: SidemenuItem[] = [
  {
    id: 'sm-st-ok',
    label: 'Успех',
    icon: <Icon name="IconExCheck" size={IconSize.MD} />,
    status: NavigationMenuItemStatus.SUCCESS,
  },
  {
    id: 'sm-st-warn',
    label: 'Предупреждение',
    icon: <Icon name="IconExBell" size={IconSize.MD} />,
    status: NavigationMenuItemStatus.WARNING,
  },
  {
    id: 'sm-st-err',
    label: 'Ошибка',
    icon: <Icon name="IconExClose" size={IconSize.MD} />,
    status: NavigationMenuItemStatus.DANGER,
  },
  {
    id: 'sm-st-info',
    label: 'Инфо',
    icon: <Icon name="IconExInfoCircle" size={IconSize.MD} />,
    status: NavigationMenuItemStatus.INFO,
  },
];

export const MenuItemStatuses: Story = {
  name: 'Меню: статусы пунктов',
  render: () => (
    <SidemenuStoryWithActiveState
      initialActiveId="sm-st-ok"
      itemsTemplate={sidemenuStatusesTemplate}
      logo={sidemenuLogoStar}
      variant={SidemenuVariant.EXPANDED}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Проп **status** у элементов списка (`NavigationMenuItemStatus`).',
      },
    },
  },
};

export const LogoSlot: Story = {
  name: 'Шапка: произвольный контент (logoSlot)',
  render: () => (
    <SidemenuStoryWithActiveState
      initialActiveId="home"
      itemsTemplate={defaultItems}
      variant={SidemenuVariant.EXPANDED}
      logoSlot={
        <>
          <SidemenuLogoIconSlot>
            <Icon name="IconExStar" size={IconSize.MD} />
          </SidemenuLogoIconSlot>
          <SidemenuLogoTitleText as="span">Кастомная шапка</SidemenuLogoTitleText>
        </>
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Проп **logoSlot** заменяет стандартную связку **logo.icon** + **logo.title**; можно собрать свой блок (другой логотип, меню, бейдж).',
      },
    },
  },
};

export const FooterSlot: Story = {
  name: 'Нижний слот (footer)',
  render: () => (
    <SidemenuStoryWithActiveState
      initialActiveId="home"
      itemsTemplate={defaultItems}
      logo={sidemenuLogoStar}
      variant={SidemenuVariant.EXPANDED}
      footer={
        <NavigationMenu
          collapsed={false}
          defaultActiveId="sm-footer-settings"
          activeAppearance={NavigationMenuActiveAppearance.HIGHLIGHTED}
          aria-label="Дополнительная навигация"
          className="ui-sidemenu__footer-navigation"
        >
          <NavigationMenu.Item
            id="sm-footer-settings"
            label="Настройки"
            icon={<Icon name="IconExCase" size={IconSize.MD} />}
          />
          <NavigationMenu.Item
            id="sm-footer-logout"
            label="Выход"
            icon={<Icon name="IconExUser" size={IconSize.MD} />}
          />
        </NavigationMenu>
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Проп **footer**: произвольный контент внизу панели (пример — второе **NavigationMenu**).',
      },
    },
  },
};

/** Слоты в сторис «Слоты: …»: уникальные id, чтобы не пересекаться с другими примерами */
const sidemenuSlotsFooterNavIds = {
  help: 'sm-demo-slots-footer-help',
  exit: 'sm-demo-slots-footer-exit',
} as const;

/**
 * Верхний слот: **Badge** + брендовая строка; нижний: второе **NavigationMenu** (сервисные пункты).
 */
export const MenuSlotsHeaderBrandFooterNav: Story = {
  name: 'Слоты: шапка (бренд) и футер (меню)',
  render: () => (
    <SidemenuStoryWithActiveState
      initialActiveId="home"
      itemsTemplate={defaultItems}
      variant={SidemenuVariant.EXPANDED}
      logoSlot={
        <SidemenuDemoHeaderBrand>
          <SidemenuLogoIconSlot>
            <Icon name="IconExStar" size={IconSize.MD} />
          </SidemenuLogoIconSlot>
          <SidemenuLogoTitleText as="span">Plainerv</SidemenuLogoTitleText>
          <Badge variant={BadgeVariant.OUTLINE} size={Size.SM}>
            demo
          </Badge>
        </SidemenuDemoHeaderBrand>
      }
      footer={
        <NavigationMenu
          collapsed={false}
          defaultActiveId={sidemenuSlotsFooterNavIds.help}
          activeAppearance={NavigationMenuActiveAppearance.HIGHLIGHTED}
          aria-label="Сервисные пункты в нижнем слоте"
          className="ui-sidemenu__story-slots-footer-nav"
        >
          <NavigationMenu.Item
            id={sidemenuSlotsFooterNavIds.help}
            label="Помощь"
            icon={<Icon name="IconExInfoCircle" size={IconSize.MD} />}
          />
          <NavigationMenu.Item
            id={sidemenuSlotsFooterNavIds.exit}
            label="Выход"
            icon={<Icon name="IconExClose" size={IconSize.MD} />}
          />
        </NavigationMenu>
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          '**logoSlot** — **SidemenuLogoIconSlot**, заголовок и **Badge**. **footer** — отдельное **NavigationMenu** (другая группа ссылок, не основной список).',
      },
    },
  },
};

/**
 * Верхний слот: только кастомный заголовок; нижний: колонка **Button** (типичные вторичные действия).
 */
/** Демо **slotStyles**: разделитель между средним и нижним слотом виден, если задан **footer** */
export const MenuSlotsCustomHeights: Story = {
  name: 'Слоты: настройка высот (slotStyles)',
  render: () => (
    <SidemenuStoryWithActiveState
      initialActiveId="home"
      itemsTemplate={defaultItems}
      variant={SidemenuVariant.EXPANDED}
      logo={sidemenuLogoStar}
      slotStyles={{
        header: { minHeight: 96 },
        body: { minHeight: 260 },
        footer: { minHeight: 80 },
      }}
      footer={
        <SidemenuDemoFooterActions aria-label="Нижняя зона с кастомной минимальной высотой">
          <Button
            type="button"
            variant={ButtonVariant.SECONDARY}
            size={Size.SM}
            fullWidth
            onClick={fn()}
          >
            Действие
          </Button>
        </SidemenuDemoFooterActions>
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Проп **slotStyles**: **header** / **body** / **footer** — в том числе **minHeight** и **height**. Перед футером — разделитель, как под шапкой.',
      },
    },
  },
};

export const MenuSlotsHeaderFooterButtons: Story = {
  name: 'Слоты: шапка и футер (кнопки)',
  render: () => (
    <SidemenuStoryWithActiveState
      initialActiveId="home"
      itemsTemplate={defaultItems}
      variant={SidemenuVariant.EXPANDED}
      logoSlot={
        <SidemenuDemoHeaderBrand>
          <SidemenuLogoIconSlot>
            <Icon name="IconExCase" size={IconSize.MD} />
          </SidemenuLogoIconSlot>
          <SidemenuLogoTitleText as="span">Разделы</SidemenuLogoTitleText>
        </SidemenuDemoHeaderBrand>
      }
      footer={
        <SidemenuDemoFooterActions aria-label="Дополнительные действия в нижнем слоте">
          <Button
            type="button"
            variant={ButtonVariant.SECONDARY}
            size={Size.SM}
            fullWidth
            onClick={fn()}
          >
            Справка
          </Button>
          <Button
            type="button"
            variant={ButtonVariant.SECONDARY}
            size={Size.SM}
            fullWidth
            onClick={fn()}
          >
            Сообщить об ошибке
          </Button>
        </SidemenuDemoFooterActions>
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          '**logoSlot** — иконка и подпись без **logo**. **footer** — вертикальный стек **Button** в **SidemenuDemoFooterActions** (колонка на всю ширину слота).',
      },
    },
  },
};

const sidemenuSkeletonLoadingTemplate: SidemenuItem[] = [
  {
    id: 'sm-sl-ready',
    label: 'Обычный пункт',
    icon: <Icon name="IconExHome" size={IconSize.MD} />,
  },
  {
    id: 'sm-sl-skeleton',
    label: '',
    skeleton: true,
  },
  {
    id: 'sm-sl-loading',
    label: 'Загрузка…',
    icon: <Icon name="IconExLoading" size={IconSize.MD} />,
    loading: true,
  },
  {
    id: 'sm-sl-other',
    label: 'Другой',
    icon: <Icon name="IconExUser" size={IconSize.MD} />,
  },
];

export const MenuSkeletonAndLoading: Story = {
  name: 'Меню: skeleton и loading',
  render: () => (
    <SidemenuStoryWithActiveState
      initialActiveId="sm-sl-ready"
      itemsTemplate={sidemenuSkeletonLoadingTemplate}
      logo={sidemenuLogoStar}
      variant={SidemenuVariant.EXPANDED}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          '**skeleton** — плейсхолдер строки; **loading** — спиннер и блокировка выбора для этого пункта.',
      },
    },
  },
};
