import React from 'react';
import { Typography } from './Typography';
import { Link, LinkMode } from './Link';
import { Breadcrumb } from './Breadcrumb';
import { Pill } from './Pill';
import { Skeleton } from './Skeleton';
import { AvatarGroup } from './AvatarGroup';
import { Icon } from './Icon';
import { ThemeToggle } from './ThemeToggle';
import { SkeletonVariant, type BreadcrumbItem } from '../../types/ui';
import { Size, IconSize } from '../../types/sizes';
import { themeShowcaseStoriesStyles } from './ThemeShowcase.stories.styles';

const breadcrumbItems: BreadcrumbItem[] = [
  { id: 'home', label: 'Главная', href: '/' },
  { id: 'catalog', label: 'Каталог', href: '/catalog' },
  { id: 'current', label: 'Текущая страница' },
];

const avatarGroupItems = [
  { src: 'https://i.pravatar.cc/150?img=4', alt: 'Пользователь 1' },
  { src: 'https://i.pravatar.cc/150?img=5', alt: 'Пользователь 2' },
  { src: 'https://i.pravatar.cc/150?img=6', alt: 'Пользователь 3' },
  { src: 'https://i.pravatar.cc/150?img=7', alt: 'Пользователь 4' },
];

/**
 * Typography, Link, Breadcrumb, Pill, Skeleton, AvatarGroup, Icon и ThemeToggle.
 */
export const ThemeShowcaseDisplayBlock = () => (
  <div style={themeShowcaseStoriesStyles.badgeAvatarSection}>
    <div style={themeShowcaseStoriesStyles.badgeAvatarGroup}>
      <span style={themeShowcaseStoriesStyles.badgeAvatarGroupLabel}>Typography</span>
      <Typography variant="h4">Заголовок H4</Typography>
      <Typography variant="body">Основной текст body</Typography>
      <Typography variant="caption">Подпись caption</Typography>
    </div>

    <div style={themeShowcaseStoriesStyles.badgeAvatarGroup}>
      <span style={themeShowcaseStoriesStyles.badgeAvatarGroupLabel}>Link</span>
      <div style={themeShowcaseStoriesStyles.badgeAvatarRow}>
        <Link href="#" mode={LinkMode.TEXT}>
          Текстовая ссылка
        </Link>
        <Link href="#" mode={LinkMode.BUTTON}>
          Ссылка-кнопка
        </Link>
      </div>
    </div>

    <Breadcrumb items={breadcrumbItems} ariaLabel="Навигация" size={Size.SM} />

    <div style={themeShowcaseStoriesStyles.badgeAvatarGroup}>
      <span style={themeShowcaseStoriesStyles.badgeAvatarGroupLabel}>Pill & Skeleton</span>
      <div style={themeShowcaseStoriesStyles.badgeAvatarRow}>
        <Pill status="success">Активен</Pill>
        <Pill status="warning">Ожидание</Pill>
        <Pill status="danger">Ошибка</Pill>
      </div>
      <Skeleton variant={SkeletonVariant.TEXT} width="100%" height={16} />
      <Skeleton variant={SkeletonVariant.CUSTOM} width="60%" height={48} />
    </div>

    <div style={themeShowcaseStoriesStyles.badgeAvatarGroup}>
      <span style={themeShowcaseStoriesStyles.badgeAvatarGroupLabel}>AvatarGroup</span>
      <AvatarGroup avatars={avatarGroupItems} maxVisible={4} size={Size.MD} />
    </div>

    <div style={themeShowcaseStoriesStyles.badgeAvatarGroup}>
      <span style={themeShowcaseStoriesStyles.badgeAvatarGroupLabel}>Icon</span>
      <div style={themeShowcaseStoriesStyles.badgeAvatarRow}>
        <Icon name="IconExUser" size={IconSize.MD} />
        <Icon name="IconExSettings" size={IconSize.MD} />
        <Icon name="IconExBell" size={IconSize.MD} />
      </div>
    </div>

    <div style={themeShowcaseStoriesStyles.badgeAvatarGroup}>
      <span style={themeShowcaseStoriesStyles.badgeAvatarGroupLabel}>ThemeToggle</span>
      <ThemeToggle />
    </div>
  </div>
);
