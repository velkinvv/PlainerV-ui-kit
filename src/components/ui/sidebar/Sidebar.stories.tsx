import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';
import { SidebarVariant, type SidebarItem } from '../../../types/ui';
import { Icon } from '../Icon/Icon';
import { IconSize } from '../../../types/sizes';

const meta: Meta<typeof Sidebar> = {
  title: 'UI Kit/Navigation/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Боковое меню с навигацией и различными состояниями',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      description: 'Пункты меню: id, label, icon, active, notificationCount, onClick',
      control: false,
      table: {
        type: { summary: 'SidebarItem[]' },
      },
    },
    logo: {
      description: 'Блок логотипа в шапке',
      control: false,
      table: {
        type: { summary: '{ icon?: ReactNode; title?: string }' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: Object.values(SidebarVariant),
      description: 'Вариант отображения сайдбара',
      table: {
        type: { summary: 'expanded или collapsed (SidebarVariant)' },
      },
    },
    onItemClick: {
      description: 'Клик по пункту (в дополнение к собственному onClick у элемента)',
      control: false,
      table: {
        type: { summary: '(item: SidebarItem) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Создаем тестовые данные для меню
const defaultItems: SidebarItem[] = [
  {
    id: 'home',
    label: 'Главная страница',
    icon: <Icon name="IconExUser" size={IconSize.MD} />,
    active: true,
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

const expandedItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Панель управления',
    icon: <Icon name="IconExUser" size={IconSize.MD} />,
    active: true,
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

// Основные варианты
export const Expanded: Story = {
  args: {
    items: defaultItems,
    logo: {
      icon: <Icon name="IconExStar" size={IconSize.MD} />,
      title: 'ARS AIP',
    },
    variant: SidebarVariant.EXPANDED,
  },
};

export const Collapsed: Story = {
  args: {
    items: defaultItems,
    logo: {
      icon: <Icon name="IconExStar" size={IconSize.MD} />,
    },
    variant: SidebarVariant.COLLAPSED,
  },
};

export const WithNotifications: Story = {
  args: {
    items: expandedItems,
    logo: {
      icon: <Icon name="IconExStar" size={IconSize.MD} />,
      title: 'ARS AIP',
    },
    variant: SidebarVariant.EXPANDED,
  },
};

export const WithoutLogo: Story = {
  args: {
    items: defaultItems,
    variant: SidebarVariant.EXPANDED,
  },
};

export const WithLogoOnly: Story = {
  args: {
    items: defaultItems,
    logo: {
      icon: <Icon name="IconExStar" size={IconSize.MD} />,
    },
    variant: SidebarVariant.EXPANDED,
  },
};

// Интерактивный пример
export const Interactive: Story = {
  render: () => {
    const [activeItem, setActiveItem] = React.useState('home');
    const [variant, setVariant] = React.useState<SidebarVariant>(SidebarVariant.EXPANDED);

    const items: SidebarItem[] = [
      {
        id: 'home',
        label: 'Главная страница',
        icon: <Icon name="IconExUser" size={IconSize.MD} />,
        active: activeItem === 'home',
        onClick: () => setActiveItem('home'),
      },
      {
        id: 'analytics',
        label: 'Аналитика',
        icon: <Icon name="IconExChart" size={IconSize.MD} />,
        active: activeItem === 'analytics',
        notificationCount: 3,
        onClick: () => setActiveItem('analytics'),
      },
      {
        id: 'projects',
        label: 'Проекты',
        icon: <Icon name="IconExCase" size={IconSize.MD} />,
        active: activeItem === 'projects',
        onClick: () => setActiveItem('projects'),
      },
      {
        id: 'tasks',
        label: 'Задачи',
        icon: <Icon name="IconExCheck" size={IconSize.MD} />,
        active: activeItem === 'tasks',
        onClick: () => setActiveItem('tasks'),
      },
      {
        id: 'users',
        label: 'Пользователи',
        icon: <Icon name="IconExUsers" size={IconSize.MD} />,
        active: activeItem === 'users',
        onClick: () => setActiveItem('users'),
      },
    ];

    return (
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <Sidebar
          items={items}
          logo={{
            icon: <Icon name="IconExStar" size={IconSize.MD} />,
            title: 'ARS AIP',
          }}
          variant={variant}
          onItemClick={(item) => console.log('Clicked:', item.id)}
        />

        <div
          style={{
            padding: '20px',
            background: '#f5f5f5',
            borderRadius: '8px',
            minWidth: '200px',
          }}
        >
          <h3>Контролы</h3>
          <div style={{ marginBottom: '16px' }}>
            <label>
              <input
                type="checkbox"
                checked={variant === 'collapsed'}
                onChange={(e) =>
                  setVariant(e.target.checked ? SidebarVariant.COLLAPSED : SidebarVariant.EXPANDED)
                }
              />
              Свернуть сайдбар
            </label>
          </div>

          <div>
            <h4>Активный элемент: {activeItem}</h4>
            <p>Нажмите на элементы меню для изменения активного состояния</p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// Пример с множественными уведомлениями
export const MultipleNotifications: Story = {
  render: () => {
    const itemsWithNotifications: SidebarItem[] = [
      {
        id: 'dashboard',
        label: 'Панель управления',
        icon: <Icon name="IconExUser" size={IconSize.MD} />,
        active: true,
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

    return (
      <Sidebar
        items={itemsWithNotifications}
        logo={{
          icon: <Icon name="IconExStar" size={IconSize.MD} />,
          title: 'ARS AIP',
        }}
        variant={SidebarVariant.EXPANDED}
      />
    );
  },
};

// Пример с длинными названиями
export const LongLabels: Story = {
  render: () => {
    const itemsWithLongLabels: SidebarItem[] = [
      {
        id: 'dashboard',
        label: 'Панель управления и мониторинг',
        icon: <Icon name="IconExUser" size={IconSize.MD} />,
        active: true,
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

    return (
      <Sidebar
        items={itemsWithLongLabels}
        logo={{
          icon: <Icon name="IconExStar" size={IconSize.MD} />,
          title: 'ARS AIP',
        }}
        variant={SidebarVariant.EXPANDED}
      />
    );
  },
};

