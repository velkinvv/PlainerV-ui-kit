import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tag } from './Tag';
import { Icon } from '../Icon/Icon';
import { IconSize } from '../../../types/sizes';
import type { TagAppearance, TagColorVariant } from '../../../types/ui';

const sampleIcon = <Icon name="IconExCopy" size={IconSize.XS} color="currentColor" />;

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/nXAzUL74f5DbMpolFYlKl7/%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82--Copy-?node-id=4779-60121',
    },
    docs: {
      description: {
        component:
          'Теги: палитры neutral / danger / info / success / warning и виды filled / outline; текст, иконка слева или справа.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    colorVariant: {
      control: 'select',
      options: ['neutral', 'danger', 'info', 'success', 'warning'] satisfies TagColorVariant[],
    },
    appearance: { control: 'select', options: ['filled', 'outline'] satisfies TagAppearance[] },
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
        {appearances.map(app => (
          <section key={app}>
            <h3 style={{ fontSize: 14, marginBottom: 8 }}>{app}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {colors.map(c => (
                <div key={c} style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
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
