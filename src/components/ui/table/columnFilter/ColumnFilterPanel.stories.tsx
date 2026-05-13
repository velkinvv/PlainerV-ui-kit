import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { Size } from '@/types/sizes';
import { Typography } from '../../Typography/Typography';
import { Input } from '../../inputs/Input';
import { ColumnFilterPanel } from './ColumnFilterPanel';
import { DOC_COLUMN_FILTER_PANEL } from '@/components/ui/storyDocs/uiKitDocs';
import { columnFilterPanelStoriesStyles } from './ColumnFilterPanel.stories.styles';

const meta: Meta<typeof ColumnFilterPanel> = {
  title: 'UI Kit/Data Display/Table/ColumnFilterPanel',
  component: ColumnFilterPanel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: DOC_COLUMN_FILTER_PANEL,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ColumnFilterPanel>;

/** Имитация оболочки `Dropdown`: та же ширина/отступы, что в сторис фильтра колонки */
const FakeDropdownMenuSurface = styled.div`
  width: 300px;
  box-sizing: border-box;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.cards?.sizes?.[Size.MD]?.borderRadius ?? '12px'};
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.boxShadow?.dropdown ?? theme.boxShadow?.md ?? 'none'};
`;

/**
 * Локальное состояние поля и колбэки — как в реальном фильтре колонки перед «Применить».
 */
export const Default: Story = {
  render: function ColumnFilterPanelDefaultStory() {
    const [draftValue, setDraftValue] = useState('');
    const [appliedMessage, setAppliedMessage] = useState<string | null>(null);

    return (
      <div style={columnFilterPanelStoriesStyles.defaultStoryStack}>
        <ColumnFilterPanel
          size={Size.SM}
          onApply={() => {
            setAppliedMessage(`Применено: «${draftValue || '(пусто)'}»`);
          }}
          onClear={() => {
            setDraftValue('');
            setAppliedMessage('Фильтр очищен');
          }}
        >
          <Typography variant="label" component="label" htmlFor="column-filter-demo-input">
            Выберите значение:
          </Typography>
          <Input
            id="column-filter-demo-input"
            value={draftValue}
            onChange={(event) => {
              setDraftValue(event.target.value);
            }}
            placeholder="Текст условия"
            size={Size.SM}
          />
        </ColumnFilterPanel>
        {appliedMessage ? (
          <Typography variant="caption" color="textSecondary">
            {appliedMessage}
          </Typography>
        ) : null}
      </div>
    );
  },
};

/**
 * Режим внутри выпадающего меню: без второй «карточки» (как `presentation="embeddedInDropdown"` в **Table › Column filters**).
 */
export const EmbeddedInDropdown: Story = {
  render: function ColumnFilterPanelEmbeddedStory() {
    const [draftValue, setDraftValue] = useState('');

    return (
      <FakeDropdownMenuSurface>
        <ColumnFilterPanel
          presentation="embeddedInDropdown"
          size={Size.SM}
          onApply={() => undefined}
          onClear={() => {
            setDraftValue('');
          }}
        >
          <Typography variant="label" component="label" htmlFor="column-filter-embedded-input">
            Значение:
          </Typography>
          <Input
            id="column-filter-embedded-input"
            value={draftValue}
            onChange={(event) => {
              setDraftValue(event.target.value);
            }}
            placeholder="Введите текст"
            size={Size.SM}
          />
        </ColumnFilterPanel>
      </FakeDropdownMenuSurface>
    );
  },
};

/** Узкие кнопки по содержимому */
export const CompactFooterButtons: Story = {
  args: {
    fullWidthButtons: false,
    children: (
      <Typography variant="bodySmall" component="p">
        Содержимое фильтра передаётся через <code>children</code>.
      </Typography>
    ),
    onApply: () => {},
    onClear: () => {},
  },
};
