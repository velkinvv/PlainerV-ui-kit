import React from 'react';
import type { DataGridColumn } from '@/types/ui';
import { ButtonVariant } from '@/types/ui';
import { Size, IconSize } from '@/types/sizes';
import { Avatar } from '../../Avatar/Avatar';
import { Icon } from '../../Icon/Icon';
import { IconButton } from '../../buttons/IconButton/IconButton';
import { Tag } from '../../Tag/Tag';
import { StoryTableInline } from '../basicTable/Table.stories.style';
import type { DataGridStoryDemoRow } from './dataGridStoryDemoData';

/**
 * Колонки грида для демо-данных `TABLE_STORY_DEMO_ROWS` (визуально близко к `TableStoriesDataGridDemo`).
 * @returns Массив колонок с `render` для тега, аватара и кнопки действий
 */
export function getDataGridStoryDemoColumns(): DataGridColumn<DataGridStoryDemoRow>[] {
  return [
    {
      field: 'user',
      headerName: 'Пользователь',
      sortable: true,
      width: 160,
    },
    {
      field: 'tag.color',
      headerName: 'Статус',
      sortable: true,
      width: 140,
      render: ({ row }) => (
        <Tag
          colorVariant={row.tag?.color}
          appearance="outline"
          size={Size.SM}
          leftIcon={<Icon name="IconExLayers" size={IconSize.SM} color="currentColor" />}
        >
          {row.tag?.label}
        </Tag>
      ),
    },
    {
      field: 'socialChannel',
      headerName: 'Сервис',
      sortable: true,
      width: 120,
    },
    {
      field: 'login',
      headerName: 'Профиль',
      sortable: true,
      width: 180,
      render: ({ row }) => (
        <StoryTableInline>
          <Avatar size={Size.SM} userName={row.avatarSeed} />
          <span>{row.login}</span>
        </StoryTableInline>
      ),
    },
    {
      field: 'dateLabel',
      headerName: 'Дата',
      sortable: true,
      align: 'right',
      width: 160,
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      width: 56,
      align: 'center',
      disableReorder: true,
      render: ({ row }) => (
        <IconButton
          type="button"
          variant={ButtonVariant.GHOST}
          size={Size.SM}
          aria-label={`Действия для ${row.user}`}
          disabled={Boolean(row.disableRow)}
          icon={<Icon name="IconExDots" size={IconSize.SM} color="currentColor" />}
        />
      ),
    },
  ];
}
