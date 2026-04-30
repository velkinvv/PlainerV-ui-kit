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
  title: 'UI Kit/Inputs/ButtonGroup',
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
          'Группа `Button` / `IconButton`: в режиме `attached` — `gap: 0`, скругления только на внешних углах первого и последнего сегмента, внутренние стыки с перекрытием −1px. Проп `size` задаёт внешний радиус (согласуйте с `size` у дочерних кнопок); `attachedShape="pill"` — капсула. У `IconButton` в склеенной группе задавайте `rounded={false}`.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      table: {
        type: { summary: 'horizontal или vertical' },
      },
    },
    attached: {
      control: 'boolean',
      description: 'Склеенная группа: общий радиус и стык −1px',
      table: { type: { summary: 'boolean' } },
    },
    size: {
      control: 'select',
      options: [Size.XS, Size.SM, Size.MD, Size.LG, Size.XL],
      description: 'Внешний радиус сегмента (согласуйте с size у кнопок)',
      table: {
        type: { summary: 'Size: XS, SM, MD, LG, XL' },
      },
    },
    attachedShape: {
      control: 'radio',
      options: ['segment', 'pill'],
      description: 'Форма склеенной группы',
      table: {
        type: { summary: 'segment или pill' },
      },
    },
    fullWidth: {
      control: 'boolean',
      table: { type: { summary: 'boolean' } },
    },
    ariaLabel: {
      description: 'Подпись для `aria-label` на контейнере',
      table: { type: { summary: 'string' } },
    },
    children: {
      control: false,
      description: 'Button и/или IconButton',
      table: { type: { summary: 'ReactNode' } },
    },
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
    <ButtonGroup attached size={Size.MD} ariaLabel="Режим attached">
      <Button variant={ButtonVariant.SECONDARY} size={Size.MD}>
        День
      </Button>
      <Button variant={ButtonVariant.SECONDARY} size={Size.MD}>
        Неделя
      </Button>
      <Button variant={ButtonVariant.SECONDARY} size={Size.MD}>
        Месяц
      </Button>
    </ButtonGroup>
  ),
};

/** Как на скрине: primary + outline, два сегмента */
export const AttachedPrimaryOutline: Story = {
  render: () => (
    <ButtonGroup attached size={Size.MD} ariaLabel="Вид">
      <Button variant={ButtonVariant.PRIMARY} size={Size.MD}>
        Список
      </Button>
      <Button variant={ButtonVariant.OUTLINE} size={Size.MD}>
        Сетка
      </Button>
    </ButtonGroup>
  ),
};

/** Три размера — разный внешний радиус сегмента */
export const AttachedSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ButtonGroup attached size={Size.SM} ariaLabel="SM">
        <Button variant={ButtonVariant.SECONDARY} size={Size.SM}>
          Button
        </Button>
        <Button variant={ButtonVariant.PRIMARY} size={Size.SM}>
          Button
        </Button>
      </ButtonGroup>
      <ButtonGroup attached size={Size.MD} ariaLabel="MD">
        <Button variant={ButtonVariant.SECONDARY} size={Size.MD}>
          Button
        </Button>
        <Button variant={ButtonVariant.PRIMARY} size={Size.MD}>
          Button
        </Button>
      </ButtonGroup>
      <ButtonGroup attached size={Size.LG} ariaLabel="LG">
        <Button variant={ButtonVariant.SECONDARY} size={Size.LG}>
          Button
        </Button>
        <Button variant={ButtonVariant.PRIMARY} size={Size.LG}>
          Button
        </Button>
      </ButtonGroup>
    </div>
  ),
};

/** Капсула (`attachedShape="pill"`) */
export const AttachedPill: Story = {
  render: () => (
    <ButtonGroup attached attachedShape="pill" size={Size.MD} ariaLabel="Pill">
      <Button variant={ButtonVariant.SECONDARY} size={Size.MD}>
        Опция A
      </Button>
      <Button variant={ButtonVariant.SECONDARY} size={Size.MD}>
        Опция B
      </Button>
    </ButtonGroup>
  ),
};

/** Текст + иконка / иконка + текст */
export const AttachedWithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ButtonGroup attached size={Size.MD} ariaLabel="Текст и стрелка справа">
        <Button
          variant={ButtonVariant.SECONDARY}
          size={Size.MD}
          iconEnd={<Icon name="IconPlainerArrowRight" size={IconSize.SM} />}
        >
          Button
        </Button>
        <Button
          variant={ButtonVariant.PRIMARY}
          size={Size.MD}
          iconEnd={<Icon name="IconPlainerArrowRight" size={IconSize.SM} />}
        >
          Button
        </Button>
      </ButtonGroup>
      <ButtonGroup attached size={Size.MD} ariaLabel="Стрелка слева от текста">
        <Button
          variant={ButtonVariant.SECONDARY}
          size={Size.MD}
          iconStart={<Icon name="IconPlainerArrowRight" size={IconSize.SM} />}
        >
          Button
        </Button>
        <Button
          variant={ButtonVariant.PRIMARY}
          size={Size.MD}
          iconStart={<Icon name="IconPlainerArrowRight" size={IconSize.SM} />}
        >
          Button
        </Button>
      </ButtonGroup>
    </div>
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
    <ButtonGroup attached size={Size.SM} ariaLabel="Форматирование">
      <IconButton
        variant={ButtonVariant.OUTLINE}
        size={Size.SM}
        rounded={false}
        aria-label="Жирный"
        icon={<Icon name="PhosphorPushPin" size={IconSize.SM} />}
      />
      <IconButton
        variant={ButtonVariant.OUTLINE}
        size={Size.SM}
        rounded={false}
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

/** Склеенная группа на всю ширину: сегменты делят ширину поровну */
export const AttachedFullWidth: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <ButtonGroup attached fullWidth size={Size.MD} ariaLabel="Две равные колонки">
        <Button variant={ButtonVariant.SECONDARY} size={Size.MD}>
          Нет
        </Button>
        <Button variant={ButtonVariant.PRIMARY} size={Size.MD}>
          Да
        </Button>
      </ButtonGroup>
    </div>
  ),
};

