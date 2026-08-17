import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconSize } from '../../../types/sizes';
import { ButtonVariant } from '../../../types/ui';
import { DOC_FLOAT_BUTTON } from '@/components/ui/storyDocs/uiKitDocs';
import { Icon } from '../Icon/Icon';
import { FloatButton } from './FloatButton';
import {
  FloatButtonBackTopProgressDemo,
  FloatButtonGroupClickDemo,
  FloatButtonGroupItemsDemo,
  FloatButtonInContainerDemo,
  FloatButtonStoriesLocalAnchor,
} from './FloatButton.stories.helpers';
import { FloatButtonStoriesCaption, FloatButtonStoriesRow } from './FloatButton.stories.style';

const meta: Meta<typeof FloatButton> = {
  title: 'UI Kit/Buttons/FloatButton',
  component: FloatButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_FLOAT_BUTTON,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    shape: {
      control: 'radio',
      options: ['circle', 'square'],
    },
    variant: {
      control: 'select',
      options: Object.values(ButtonVariant),
    },
    placement: {
      control: 'select',
      options: ['bottom-end', 'bottom-start', 'top-end', 'top-start'],
    },
    backTop: { control: 'boolean' },
    showProgress: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FloatButton>;

export const Basic: Story = {
  render: () => (
    <FloatButtonStoriesLocalAnchor>
      {(getContainer) => (
        <FloatButton
          icon={<Icon name="IconPlainerPlus" size={IconSize.SM} />}
          aria-label="Добавить"
          getContainer={getContainer}
          insetPx={16}
        />
      )}
    </FloatButtonStoriesLocalAnchor>
  ),
};

export const Shapes: Story = {
  render: () => (
    <FloatButtonStoriesRow>
      <article>
        <FloatButtonStoriesCaption>circle</FloatButtonStoriesCaption>
        <FloatButtonStoriesLocalAnchor>
          {(getContainer) => (
            <FloatButton
              shape="circle"
              icon={<Icon name="IconPlainerPlus" size={IconSize.SM} />}
              aria-label="Круглая"
              getContainer={getContainer}
              insetPx={16}
            />
          )}
        </FloatButtonStoriesLocalAnchor>
      </article>
      <article>
        <FloatButtonStoriesCaption>square</FloatButtonStoriesCaption>
        <FloatButtonStoriesLocalAnchor>
          {(getContainer) => (
            <FloatButton
              shape="square"
              icon={<Icon name="IconPlainerPlus" size={IconSize.SM} />}
              aria-label="Квадратная"
              getContainer={getContainer}
              insetPx={16}
            />
          )}
        </FloatButtonStoriesLocalAnchor>
      </article>
    </FloatButtonStoriesRow>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <FloatButtonStoriesLocalAnchor>
      {(getContainer) => (
        <FloatButton
          icon={<Icon name="IconPlainerPlus" size={IconSize.SM} />}
          label="Создать"
          getContainer={getContainer}
          insetPx={16}
        />
      )}
    </FloatButtonStoriesLocalAnchor>
  ),
};

export const BadgeTooltip: Story = {
  render: () => (
    <FloatButtonStoriesLocalAnchor>
      {(getContainer) => (
        <FloatButton
          icon={<Icon name="IconPlainerPlus" size={IconSize.SM} />}
          aria-label="Уведомления"
          badge={3}
          tooltip="Новые действия"
          getContainer={getContainer}
          insetPx={16}
        />
      )}
    </FloatButtonStoriesLocalAnchor>
  ),
};

export const GroupClick: Story = {
  render: () => <FloatButtonGroupClickDemo />,
};

export const GroupItems: Story = {
  render: () => <FloatButtonGroupItemsDemo />,
};

export const BackTopProgress: Story = {
  render: () => <FloatButtonBackTopProgressDemo />,
};

export const InContainer: Story = {
  render: () => <FloatButtonInContainerDemo />,
};
