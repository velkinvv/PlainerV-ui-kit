import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { ThemeProvider } from '../../../../themes/ThemeProvider';
import { ButtonVariant } from '@/types/ui';
import { IconSize, Size } from '@/types/sizes';
import { Icon } from '../../Icon/Icon';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/Buttons/ButtonGroup',
  component: ButtonGroup,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Группировка `Button` и `IconButton`: ориентация, отступы между кнопками или режим `attached` со склеенными границами.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
    attached: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    ariaLabel: { description: 'Подпись для `aria-label` на контейнере' },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup ariaLabel="Действия с записью">
      <Button variant={ButtonVariant.OUTLINE}>Изменить</Button>
      <Button variant={ButtonVariant.OUTLINE}>Копировать</Button>
      <Button variant={ButtonVariant.DANGER}>Удалить</Button>
    </ButtonGroup>
  ),
};

export const Attached: Story = {
  render: () => (
    <ButtonGroup attached ariaLabel="Режим attached">
      <Button variant={ButtonVariant.SECONDARY}>День</Button>
      <Button variant={ButtonVariant.SECONDARY}>Неделя</Button>
      <Button variant={ButtonVariant.SECONDARY}>Месяц</Button>
    </ButtonGroup>
  ),
};

export const AttachedPrimary: Story = {
  render: () => (
    <ButtonGroup attached ariaLabel="Переключатель вида">
      <Button variant={ButtonVariant.PRIMARY}>Список</Button>
      <Button variant={ButtonVariant.OUTLINE}>Сетка</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical" ariaLabel="Вертикальная группа">
      <Button variant={ButtonVariant.OUTLINE} size={Size.SM}>
        Вверх
      </Button>
      <Button variant={ButtonVariant.OUTLINE} size={Size.SM}>
        Вниз
      </Button>
    </ButtonGroup>
  ),
};

export const WithIconButtons: Story = {
  render: () => (
    <ButtonGroup attached ariaLabel="Форматирование">
      <IconButton
        variant={ButtonVariant.OUTLINE}
        size={Size.SM}
        aria-label="Жирный"
        icon={<Icon name="PhosphorPushPin" size={IconSize.SM} />}
      />
      <IconButton
        variant={ButtonVariant.OUTLINE}
        size={Size.SM}
        aria-label="Курсив"
        icon={<Icon name="PhosphorBookmarkSimple" size={IconSize.SM} />}
      />
    </ButtonGroup>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <ButtonGroup fullWidth ariaLabel="Полная ширина">
        <Button variant={ButtonVariant.PRIMARY} fullWidth>
          Сохранить
        </Button>
        <Button variant={ButtonVariant.OUTLINE} fullWidth>
          Отмена
        </Button>
      </ButtonGroup>
    </div>
  ),
};
