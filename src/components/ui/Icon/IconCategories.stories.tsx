import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import * as PlainerIconsModule from '../../../icons/plainer';
import * as IconExIconsModule from '../../../icons/iconex';
import { IconSize } from '../../../types/sizes';
import {
  handleIconStoryCardMouseEnter,
  handleIconStoryCardMouseLeave,
} from '../../../handlers/iconStoryHoverHandlers';
import type { IconVariant } from '../../../types/ui';
import type { IconName } from '../../../icons';
import { DOC_ICON_CATEGORIES } from '@/components/ui/storyDocs/uiKitDocs';
import { buildIconStoriesScrollableGridStyle, iconStoriesStyles } from './Icon.stories.styles';

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

  return {
    plainerIcons: plainerIcons as IconName[],
    iconexIcons: iconexIcons as IconName[],
  };
};

// Функция для проверки существования иконки
const iconExists = (name: string, variant: IconVariant): boolean => {
  if (variant === 'plainer') {
    const plainerIconName = (
      name.startsWith('IconPlainer') ? name : `IconPlainer${name}`
    ) as keyof typeof PlainerIconsModule;
    return !!(
      PlainerIconsModule[plainerIconName] &&
      typeof PlainerIconsModule[plainerIconName] === 'function'
    );
  }

  if (variant === 'iconEx') {
    const iconexIconName = (name.startsWith('IconEx') ? name : `IconEx${name}`) as keyof
      typeof IconExIconsModule;
    return !!(
      IconExIconsModule[iconexIconName] && typeof IconExIconsModule[iconexIconName] === 'function'
    );
  }

  return false;
};

const meta: Meta<typeof Icon> = {
  title: 'UI Kit/Data Display/Icon/Categories',
  component: Icon,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_ICON_CATEGORIES,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Компонент для отображения сетки иконок
const IconGrid = ({
  icons,
  variant: _variant = 'plainer',
  title,
}: {
  icons: IconName[];
  variant?: IconVariant;
  title: string;
}) => (
  <div style={iconStoriesStyles.pageSection}>
    <style>{iconStoriesStyles.hintTooltipCss}</style>
    <h3 style={iconStoriesStyles.titleWithMargin}>{title}</h3>
    <div
      className="icon-stories-scroll"
      style={buildIconStoriesScrollableGridStyle(0, 600)}
    >
      {icons.map((iconName: IconName) => (
        <div
          key={iconName}
          style={iconStoriesStyles.iconCategoryCard}
          onMouseEnter={handleIconStoryCardMouseEnter}
          onMouseLeave={handleIconStoryCardMouseLeave}
        >
          <Icon
            name={iconName}
            size={IconSize.MD}
            // variant={variant}
          />
          <span style={iconStoriesStyles.iconNameLabel}>
            {iconName}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// Категории иконок
const iconCategories = {
  navigation: {
    plainer: ['ArrowUp', 'ArrowRight', 'ArrowLeft', 'ChevronDown'].filter(name =>
      iconExists(name, 'plainer'),
    ) as IconName[],
    iconex: ['IconExHome', 'IconExBurger', 'IconExLocation', 'IconExLink'].filter(name =>
      iconExists(name, 'iconEx'),
    ) as IconName[],
  },
  user: {
    plainer: ['IconPlainerUser'].filter(name => iconExists(name, 'plainer')) as IconName[],
    iconex: ['IconExUsers', 'IconExAddUser'].filter(name =>
      iconExists(name, 'iconEx'),
    ) as IconName[],
  },
  actions: {
    plainer: ['IconPlainerPlus', 'IconPlainerClose', 'IconPlainerSearch'].filter(name =>
      iconExists(name, 'plainer'),
    ) as IconName[],
    iconex: [
      'IconExClose2',
      'IconExClose3',
      'IconExSearch2',
      'IconExEdit1',
      'IconExEdit2',
      'IconExCopy',
      'IconExSave',
      'IconExMinus',
      'IconExDots',
      'IconExMoreSquare',
      'IconExMoreCircle',
    ].filter(name => iconExists(name, 'iconEx')) as IconName[],
  },
  media: {
    plainer: [],
    iconex: [
      'IconExVideo',
      'IconExMusic',
      'IconExMusicPlate',
      'IconExVolumeUp',
      'IconExVolumeOff',
      'IconExVolumeOff2',
      'IconExVolumeDown',
      'IconExPlay',
      'IconExPause',
      'IconExStop',
      'IconExCamera',
      'IconExMicrophone',
    ].filter(name => iconExists(name, 'iconEx')) as IconName[],
  },
  communication: {
    plainer: [],
    iconex: [
      'IconExMail',
      'IconExMessageSquare',
      'IconExMessageCircle',
      'IconExSend',
      'IconExCall',
      'IconExCalling',
      'IconExCallMissed',
    ].filter(name => iconExists(name, 'iconEx')) as IconName[],
  },
  security: {
    plainer: [],
    iconex: [
      'IconExLock',
      'IconExLockOpen',
      'IconExLockCheck',
      'IconExLockX',
      'IconExShield',
      'IconExShield2',
      'IconExShield3',
      'IconExKey',
    ].filter(name => iconExists(name, 'iconEx')) as IconName[],
  },
  files: {
    plainer: [],
    iconex: [
      'IconExDocument',
      'IconExDocument2',
      'IconExDocumentAdd',
      'IconExDocumentDelete',
      'IconExFolder',
      'IconExDownload2',
      'IconExPaperClip',
      'IconExCloud',
      'IconExCloudDownload',
      'IconExCloudUpload',
    ].filter(name => iconExists(name, 'iconEx')) as IconName[],
  },
  settings: {
    plainer: [],
    iconex: [
      'IconExSettings',
      'IconExToggleRight',
      'IconExToggleLeft',
      'IconExFilter',
      'IconExFilter2',
    ].filter(name => iconExists(name, 'iconEx')) as IconName[],
  },
  time: {
    plainer: [],
    iconex: [
      'IconExTimer',
      'IconExTimeSquare',
      'IconExTimeCircle',
      'IconExCalendar',
      'IconExAlarmClock',
    ].filter(name => iconExists(name, 'iconEx')) as IconName[],
  },
  status: {
    plainer: [],
    iconex: [
      'IconExCheck',
      'IconExStar',
      'IconExHeart',
      'IconExInfoSquare',
      'IconExInfoCircle',
      'IconExDanger',
    ].filter(name => iconExists(name, 'iconEx')) as IconName[],
  },
  shopping: {
    plainer: [],
    iconex: [
      'IconExCart',
      'IconExBag1',
      'IconExBag2',
      'IconExBag3',
      'IconExWallet',
      'IconExCreditCard',
      'IconExCoins',
      'IconExSale',
      'IconExReceipt',
      'IconExCoupon1',
      'IconExCoupon2',
      'IconExCoupon3',
    ].filter(name => iconExists(name, 'iconEx')) as IconName[],
  },
  entertainment: {
    plainer: [],
    iconex: [
      'IconExGamePad',
      'IconExOldSchoolGamepad',
      'IconExBasketBall',
      'IconExMusic',
      'IconExMusicPlate',
      'IconExVideo',
      'IconExHeadPhones',
    ].filter(name => iconExists(name, 'iconEx')) as IconName[],
  },
  tools: {
    plainer: [],
    iconex: [
      'IconExCalculator',
      'IconExCalcSilent',
      'IconExScale',
      'IconExScanner',
      'IconExCilPen',
      'IconExBrowser',
      'IconExScreen',
      'IconExLaptop',
      'IconExIphone',
      'IconExMouse',
    ].filter(name => iconExists(name, 'iconEx')) as IconName[],
  },
  business: {
    plainer: [],
    iconex: [
      'IconExChart',
      'IconExChart1',
      'IconExGraph',
      'IconExCase',
      'IconExCategory',
      'IconExCategory2',
      'IconExBox1',
      'IconExBox2',
    ].filter(name => iconExists(name, 'iconEx')) as IconName[],
  },
  nature: {
    plainer: [],
    iconex: [
      'IconExFire',
      'IconExLightning',
      'IconExFlag',
      'IconExCompass',
      'IconExColorPalette',
    ].filter(name => iconExists(name, 'iconEx')) as IconName[],
  },
};

// История всех категорий
export const AllCategories: Story = {
  render: () => (
    <div style={iconStoriesStyles.pageRoot}>
      <h1>Категории иконок</h1>

      {/* Plainer иконки */}
      <section style={iconStoriesStyles.pageSection}>
        <h2>Plainer иконки</h2>
        <IconGrid
          icons={getExistingIcons().plainerIcons}
          variant="plainer"
          title="Все Plainer иконки"
        />
      </section>

      {/* IconEx иконки по категориям */}
      <section>
        <h2>IconEx иконки по категориям</h2>

        <IconGrid icons={iconCategories.navigation.iconex} variant="iconEx" title="Навигация" />

        <IconGrid icons={iconCategories.user.iconex} variant="iconEx" title="Пользователи" />

        <IconGrid icons={iconCategories.actions.iconex} variant="iconEx" title="Действия" />

        <IconGrid icons={iconCategories.media.iconex} variant="iconEx" title="Медиа" />

        <IconGrid
          icons={iconCategories.communication.iconex}
          variant="iconEx"
          title="Коммуникация"
        />

        <IconGrid icons={iconCategories.security.iconex} variant="iconEx" title="Безопасность" />

        <IconGrid icons={iconCategories.files.iconex} variant="iconEx" title="Файлы" />

        <IconGrid icons={iconCategories.settings.iconex} variant="iconEx" title="Настройки" />

        <IconGrid icons={iconCategories.time.iconex} variant="iconEx" title="Время" />

        <IconGrid icons={iconCategories.status.iconex} variant="iconEx" title="Статус" />

        <IconGrid icons={iconCategories.shopping.iconex} variant="iconEx" title="Покупки" />

        <IconGrid
          icons={iconCategories.entertainment.iconex}
          variant="iconEx"
          title="Развлечения"
        />

        <IconGrid icons={iconCategories.tools.iconex} variant="iconEx" title="Инструменты" />

        <IconGrid icons={iconCategories.business.iconex} variant="iconEx" title="Бизнес" />

        <IconGrid icons={iconCategories.nature.iconex} variant="iconEx" title="Природа" />
      </section>
    </div>
  ),
};

// Отдельные истории для каждой категории
export const NavigationIcons: Story = {
  render: () => (
    <IconGrid icons={iconCategories.navigation.iconex} variant="iconEx" title="Иконки навигации" />
  ),
};

export const UserIcons: Story = {
  render: () => (
    <IconGrid icons={iconCategories.user.iconex} variant="iconEx" title="Иконки пользователей" />
  ),
};

export const ActionIcons: Story = {
  render: () => (
    <IconGrid icons={iconCategories.actions.iconex} variant="iconEx" title="Иконки действий" />
  ),
};

export const MediaIcons: Story = {
  render: () => (
    <IconGrid icons={iconCategories.media.iconex} variant="iconEx" title="Медиа иконки" />
  ),
};

export const CommunicationIcons: Story = {
  render: () => (
    <IconGrid
      icons={iconCategories.communication.iconex}
      variant="iconEx"
      title="Иконки коммуникации"
    />
  ),
};

export const SecurityIcons: Story = {
  render: () => (
    <IconGrid icons={iconCategories.security.iconex} variant="iconEx" title="Иконки безопасности" />
  ),
};

export const FileIcons: Story = {
  render: () => (
    <IconGrid icons={iconCategories.files.iconex} variant="iconEx" title="Иконки файлов" />
  ),
};

export const SettingsIcons: Story = {
  render: () => (
    <IconGrid icons={iconCategories.settings.iconex} variant="iconEx" title="Иконки настроек" />
  ),
};

export const TimeIcons: Story = {
  render: () => (
    <IconGrid icons={iconCategories.time.iconex} variant="iconEx" title="Иконки времени" />
  ),
};

export const StatusIcons: Story = {
  render: () => (
    <IconGrid icons={iconCategories.status.iconex} variant="iconEx" title="Иконки статуса" />
  ),
};

export const ShoppingIcons: Story = {
  render: () => (
    <IconGrid icons={iconCategories.shopping.iconex} variant="iconEx" title="Иконки покупок" />
  ),
};

export const EntertainmentIcons: Story = {
  render: () => (
    <IconGrid
      icons={iconCategories.entertainment.iconex}
      variant="iconEx"
      title="Иконки развлечений"
    />
  ),
};

export const ToolsIcons: Story = {
  render: () => (
    <IconGrid icons={iconCategories.tools.iconex} variant="iconEx" title="Иконки инструментов" />
  ),
};

export const BusinessIcons: Story = {
  render: () => (
    <IconGrid icons={iconCategories.business.iconex} variant="iconEx" title="Иконки бизнеса" />
  ),
};

export const NatureIcons: Story = {
  render: () => (
    <IconGrid icons={iconCategories.nature.iconex} variant="iconEx" title="Иконки природы" />
  ),
};

