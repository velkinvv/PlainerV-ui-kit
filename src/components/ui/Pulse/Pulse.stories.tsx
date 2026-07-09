import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Pulse } from './Pulse';
import { Size } from '../../../types/sizes';
import type { PulseStatus } from '../../../types/ui';
import { DOC_PULSE } from '@/components/ui/storyDocs/uiKitDocs';
import {
  PulseStoriesLabel,
  PulseStoriesRow,
  PulseStoriesSectionTitle,
  PulseStoriesStack,
} from './Pulse.stories.style';

const statuses: PulseStatus[] = ['info', 'success', 'warning', 'danger'];

const meta: Meta<typeof Pulse> = {
  title: 'UI Kit/Feedback/Pulse',
  component: Pulse,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_PULSE,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD, Size.LG],
      description: 'Диаметр точки: `SM` / `MD` / `LG`',
      table: { type: { summary: 'Size.SM | Size.MD | Size.LG' } },
    },
    status: {
      control: { type: 'select' },
      options: statuses,
      description: 'Семантический цвет волны и точки',
      table: { type: { summary: 'PulseStatus' } },
    },
    customColors: {
      control: false,
      description: '`{ background }` — перекрывает `status`',
      table: { type: { summary: 'PulseCustomColors' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: Size.MD,
    status: 'info',
  },
};

export const Statuses: Story = {
  render: () => (
    <PulseStoriesRow>
      {statuses.map((status) => (
        <PulseStoriesLabel key={status}>
          <Pulse status={status} />
          {status}
        </PulseStoriesLabel>
      ))}
    </PulseStoriesRow>
  ),
};

export const Sizes: Story = {
  render: () => (
    <PulseStoriesRow>
      <PulseStoriesLabel>
        <Pulse size={Size.SM} />
        SM
      </PulseStoriesLabel>
      <PulseStoriesLabel>
        <Pulse size={Size.MD} />
        MD
      </PulseStoriesLabel>
      <PulseStoriesLabel>
        <Pulse size={Size.LG} />
        LG
      </PulseStoriesLabel>
    </PulseStoriesRow>
  ),
};

export const CustomColor: Story = {
  args: {
    customColors: { background: '#7c3aed' },
    size: Size.MD,
  },
};

export const Showcase: Story = {
  render: () => (
    <PulseStoriesStack>
      <section>
        <PulseStoriesSectionTitle>Статусы</PulseStoriesSectionTitle>
        <PulseStoriesRow>
          {statuses.map((status) => (
            <PulseStoriesLabel key={status}>
              <Pulse status={status} size={Size.MD} />
              {status}
            </PulseStoriesLabel>
          ))}
        </PulseStoriesRow>
      </section>
      <section>
        <PulseStoriesSectionTitle>Размеры</PulseStoriesSectionTitle>
        <PulseStoriesRow>
          <Pulse size={Size.SM} status="success" />
          <Pulse size={Size.MD} status="success" />
          <Pulse size={Size.LG} status="success" />
        </PulseStoriesRow>
      </section>
      <section>
        <PulseStoriesSectionTitle>Кастомный цвет</PulseStoriesSectionTitle>
        <Pulse customColors={{ background: '#7c3aed' }} size={Size.LG} />
      </section>
    </PulseStoriesStack>
  ),
};
