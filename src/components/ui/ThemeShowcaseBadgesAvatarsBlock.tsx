import React from 'react';
import { Badge } from './Badge';
import { Tag } from './Tag';
import { Avatar } from './Avatar';
import { BadgeVariant } from '../../types/ui';
import { Size } from '../../types/sizes';
import { themeShowcaseStoriesStyles } from './ThemeShowcase.stories.styles';

/**
 * Блок «Badges & Avatars» для Theme Showcase: метки (Tag), счётчики (Badge), аватары.
 */
export const ThemeShowcaseBadgesAvatarsBlock = () => (
  <div style={themeShowcaseStoriesStyles.badgeAvatarSection}>
    <div style={themeShowcaseStoriesStyles.badgeAvatarGroup}>
      <span style={themeShowcaseStoriesStyles.badgeAvatarGroupLabel}>Tag</span>
      <div style={themeShowcaseStoriesStyles.badgeAvatarRow}>
        <Tag colorVariant="primary">Primary</Tag>
        <Tag colorVariant="secondary">Secondary</Tag>
        <Tag colorVariant="danger">Destructive</Tag>
        <Tag colorVariant="neutral" appearance="outline">
          Outline
        </Tag>
      </div>
    </div>

    <div style={themeShowcaseStoriesStyles.badgeAvatarGroup}>
      <span style={themeShowcaseStoriesStyles.badgeAvatarGroupLabel}>Badge</span>
      <div style={themeShowcaseStoriesStyles.badgeAvatarRow}>
        <Badge variant={BadgeVariant.DEFAULT}>3</Badge>
        <Badge variant={BadgeVariant.DEFAULT_MAIN}>5</Badge>
        <Badge variant={BadgeVariant.DANGER}>9+</Badge>
        <Badge variant={BadgeVariant.DEFAULT_SUCCESS} isDot />
      </div>
    </div>

    <div style={themeShowcaseStoriesStyles.badgeAvatarGroup}>
      <span style={themeShowcaseStoriesStyles.badgeAvatarGroupLabel}>Avatar</span>
      <div style={themeShowcaseStoriesStyles.badgeAvatarRow}>
        <Avatar size={Size.SM} src="https://i.pravatar.cc/150?img=1" alt="User SM" />
        <Avatar size={Size.MD} src="https://i.pravatar.cc/150?img=2" alt="User MD" />
        <Avatar size={Size.LG} src="https://i.pravatar.cc/150?img=3" alt="User LG" />
      </div>
    </div>
  </div>
);
