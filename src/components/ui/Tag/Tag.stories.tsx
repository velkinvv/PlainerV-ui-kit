import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tag } from './Tag';
import { Icon } from '../Icon/Icon';
import { IconSize, Size } from '../../../types/sizes';
import type { TagAppearance, TagColorVariant } from '../../../types/ui';

const sampleIcon = <Icon name="IconExCopy" size={IconSize.XS} color="currentColor" />;

const meta: Meta<typeof Tag> = {
  title: 'UI Kit/Data Display/Tag',
  component: Tag,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Теги: палитры neutral / danger / info / success / warning и виды filled / outline; текст, иконка слева или справа.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Текст или разметка внутри тега',
      table: { type: { summary: 'ReactNode' } },
    },
    colorVariant: {
      control: 'select',
      options: ['neutral', 'danger', 'info', 'success', 'warning'] satisfies TagColorVariant[],
      description: 'Палитра тега; значения: `neutral`, `danger`, `info`, `success`, `warning`',
      table: {
        type: { summary: 'neutral, danger, info, success или warning' },
      },
    },
    appearance: {
      control: 'select',
      options: ['filled', 'outline'] satisfies TagAppearance[],
      description: 'Вид заливки; значения: `filled`, `outline`',
      table: {
        type: { summary: 'filled или outline' },
      },
    },
    size: {
      control: { type: 'select' },
      options: Object.values(Size),
      description: 'Размер тега (отступы и типографика; по умолчанию SM)',
      table: {
        type: { summary: 'Size: XS, SM, MD, LG, XL' },
      },
    },
    leftIcon: {
      control: false,
      description: 'Иконка слева от подписи',
      table: { type: { summary: 'ReactNode' } },
    },
    rightIcon: {
      control: false,
      description: 'Иконка справа от подписи',
      table: { type: { summary: 'ReactNode' } },
    },
    onClick: {
      control: false,
      description: 'При передаче тег становится кликабельным (role=button, Enter/Space)',
      table: {
        type: { summary: '(event: React.MouseEvent<HTMLSpanElement>) => void' },
      },
    },
    disabled: {
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    children: 'Tag',
    colorVariant: 'neutral',
    appearance: 'filled',
  },
};

export const Matrix: Story = {
  render: () => {
    const colors = ['neutral', 'danger', 'info', 'success', 'warning'] as const;
    const appearances = ['filled', 'outline'] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {appearances.map((app) => (
          <section key={app}>
            <h3 style={{ fontSize: 14, marginBottom: 8 }}>{app}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {colors.map((c) => (
                <div
                  key={c}
                  style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}
                >
                  <Tag colorVariant={c} appearance={app} rightIcon={sampleIcon}>
                    Tag
                  </Tag>
                  <Tag colorVariant={c} appearance={app}>
                    Tag
                  </Tag>
                  <Tag colorVariant={c} appearance={app} leftIcon={sampleIcon}>
                    Tag
                  </Tag>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  },
};

