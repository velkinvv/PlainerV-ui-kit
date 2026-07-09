import React, { useState } from 'react';
import { Chip, Chips } from './Chip';
import { List } from './List';
import { DropMenu } from './DropMenu';
import { MultiButton } from './buttons/MultiButton';
import { SegmentedControl } from './SegmentedControl';
import { Pulse } from './Pulse';
import { Size } from '../../types/sizes';
import { themeShowcaseStoriesStyles } from './ThemeShowcase.stories.styles';

const dropMenuItems = [
  { value: 'edit', label: 'Редактировать' },
  { value: 'copy', label: 'Копировать' },
];

const multiButtonItems = [
  { value: 'draft', label: 'Черновик' },
  { value: 'template', label: 'Шаблон' },
];

/**
 * Chip, List, DropMenu, MultiButton, SegmentedControl и Pulse для Theme Showcase.
 */
export const ThemeShowcaseNewComponentsBlock = () => {
  const [chipValue, setChipValue] = useState<string[]>(['react']);
  const [segmentValue, setSegmentValue] = useState<string>('list');

  return (
    <div style={themeShowcaseStoriesStyles.badgeAvatarSection}>
      <div style={themeShowcaseStoriesStyles.badgeAvatarGroup}>
        <span style={themeShowcaseStoriesStyles.badgeAvatarGroupLabel}>Chip / Chips</span>
        <Chips
          selectionMode="multiple"
          value={chipValue}
          onChange={(nextValue) => setChipValue(nextValue as string[])}
          aria-label="Стек"
        >
          <Chip value="react">React</Chip>
          <Chip value="vue">Vue</Chip>
          <Chip value="svelte" appearance="outline">
            Svelte
          </Chip>
        </Chips>
      </div>

      <div style={themeShowcaseStoriesStyles.badgeAvatarGroup}>
        <span style={themeShowcaseStoriesStyles.badgeAvatarGroupLabel}>List</span>
        <List variant="unordered" markerStyle="bullet" size={Size.SM}>
          <List.Item>Первый пункт</List.Item>
          <List.Item>Второй пункт</List.Item>
        </List>
      </div>

      <div style={themeShowcaseStoriesStyles.badgeAvatarGroup}>
        <span style={themeShowcaseStoriesStyles.badgeAvatarGroupLabel}>DropMenu & MultiButton</span>
        <div style={themeShowcaseStoriesStyles.badgeAvatarRow}>
          <DropMenu items={dropMenuItems} buttonProps={{ children: 'Меню' }} />
          <MultiButton items={multiButtonItems} appearance="outline" size={Size.SM}>
            Сохранить
          </MultiButton>
        </div>
      </div>

      <div style={themeShowcaseStoriesStyles.badgeAvatarGroup}>
        <span style={themeShowcaseStoriesStyles.badgeAvatarGroupLabel}>SegmentedControl</span>
        <SegmentedControl
          appearance="outline"
          size={Size.SM}
          value={segmentValue}
          onChange={(nextValue) => setSegmentValue(String(nextValue))}
          ariaLabel="Вид"
        >
          <SegmentedControl.Item value="list">Список</SegmentedControl.Item>
          <SegmentedControl.Item value="grid">Сетка</SegmentedControl.Item>
        </SegmentedControl>
      </div>

      <div style={themeShowcaseStoriesStyles.badgeAvatarGroup}>
        <span style={themeShowcaseStoriesStyles.badgeAvatarGroupLabel}>Pulse</span>
        <div style={themeShowcaseStoriesStyles.badgeAvatarRow}>
          <Pulse status="info" size={Size.SM} />
          <Pulse status="success" size={Size.MD} />
          <Pulse status="warning" size={Size.MD} />
          <Pulse status="danger" size={Size.LG} />
        </div>
      </div>
    </div>
  );
};
