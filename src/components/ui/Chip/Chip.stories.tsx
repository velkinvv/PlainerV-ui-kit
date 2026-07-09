import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { Chip } from './Chip';
import { Chips } from './Chips';
import { Icon } from '../Icon/Icon';
import { IconSize, Size } from '../../../types/sizes';
import type { ChipAppearance } from '../../../types/ui';
import { DOC_CHIP } from '@/components/ui/storyDocs/uiKitDocs';
import {
  ChipStoriesCaption,
  ChipStoriesRow,
  ChipStoriesSectionTitle,
  ChipStoriesStack,
} from './Chip.stories.style';

const sampleIcon = <Icon name="IconExCopy" size={IconSize.XS} color="currentColor" />;

const meta: Meta<typeof Chip> = {
  title: 'UI Kit/Data Display/Chip',
  component: Chip,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_CHIP,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Текст / контент чипа',
      table: { type: { summary: 'ReactNode' } },
    },
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD],
      description: 'Размер: `SM` или `MD`',
      table: { type: { summary: 'Size.SM | Size.MD' } },
    },
    appearance: {
      control: { type: 'select' },
      options: ['filled', 'outline'] satisfies ChipAppearance[],
      description: 'Вид заливки',
    },
    selected: {
      description: 'Выбранное состояние',
    },
    disabled: {
      description: 'Блокировка',
    },
    badge: {
      description: 'Число справа от текста (`0` не показывается)',
    },
    onClose: {
      action: 'onClose',
      description: 'Удаление: показывает крестик',
    },
    onClick: {
      action: 'onClick',
      description: 'Клик по чипу',
    },
    leftIcon: {
      control: false,
      description: 'Иконка слева от текста',
    },
    rightIcon: {
      control: false,
      description: 'Иконка справа; скрывается при `onClose`',
    },
    value: {
      description: 'Идентификатор в группе `Chips`',
    },
    tooltipWhenTruncated: {
      control: 'boolean',
      description: 'Tooltip при ellipsis',
    },
    maxWidth: {
      description: 'Ограничение ширины (для обрезки текста)',
    },
    as: {
      control: { type: 'select' },
      options: ['span', 'button'],
      description: 'Корневой элемент',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Chip',
    size: Size.SM,
    appearance: 'filled',
  },
};

export const Selected: Story = {
  args: {
    children: 'Выбран',
    selected: true,
  },
};

export const WithClose: Story = {
  args: {
    children: 'Удаляемый',
    onClose: fn(),
  },
};

export const WithBadgeAndIcon: Story = {
  args: {
    children: 'С бейджем',
    leftIcon: sampleIcon,
    badge: 5,
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    appearance: 'outline',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
    onClose: fn(),
  },
};

export const Truncated: Story = {
  args: {
    children: 'Очень длинная подпись чипа для проверки обрезки',
    maxWidth: 120,
    tooltipWhenTruncated: true,
    onClose: fn(),
  },
};

export const Showcase: Story = {
  render: () => (
    <ChipStoriesStack>
      <section>
        <ChipStoriesSectionTitle>Размеры и appearance</ChipStoriesSectionTitle>
        <ChipStoriesRow>
          <Chip size={Size.SM}>SM filled</Chip>
          <Chip size={Size.MD}>MD filled</Chip>
          <Chip size={Size.SM} appearance="outline">
            SM outline
          </Chip>
          <Chip size={Size.MD} appearance="outline" selected>
            MD selected
          </Chip>
        </ChipStoriesRow>
      </section>
      <section>
        <ChipStoriesSectionTitle>Иконки, badge, close</ChipStoriesSectionTitle>
        <ChipStoriesRow>
          <Chip leftIcon={sampleIcon}>С иконкой</Chip>
          <Chip badge={12}>С бейджем</Chip>
          <Chip onClose={fn()}>С удалением</Chip>
          <Chip leftIcon={sampleIcon} badge={3} onClose={fn()} selected>
            Всё сразу
          </Chip>
        </ChipStoriesRow>
      </section>
    </ChipStoriesStack>
  ),
};

/**
 * Интерактивная группа: single / multiple.
 */
export const GroupSelection: Story = {
  render: function GroupSelectionStory() {
    const [singleValue, setSingleValue] = useState<string>('filter');
    const [multipleValue, setMultipleValue] = useState<string[]>(['react']);

    return (
      <ChipStoriesStack>
        <section>
          <ChipStoriesSectionTitle>Single</ChipStoriesSectionTitle>
          <ChipStoriesCaption>Как radio: повторный клик не снимает выбор</ChipStoriesCaption>
          <Chips
            selectionMode="single"
            value={singleValue}
            onChange={(nextValue) => setSingleValue(String(nextValue))}
            aria-label="Одиночный выбор"
          >
            <Chip value="filter">Фильтр</Chip>
            <Chip value="sort">Сортировка</Chip>
            <Chip value="view">Вид</Chip>
          </Chips>
        </section>
        <section>
          <ChipStoriesSectionTitle>Multiple</ChipStoriesSectionTitle>
          <ChipStoriesCaption>Переключение нескольких значений</ChipStoriesCaption>
          <Chips
            selectionMode="multiple"
            value={multipleValue}
            onChange={(nextValue) => setMultipleValue(nextValue as string[])}
            appearance="outline"
            aria-label="Множественный выбор"
          >
            <Chip value="react">React</Chip>
            <Chip value="vue">Vue</Chip>
            <Chip value="svelte">Svelte</Chip>
          </Chips>
        </section>
        <section>
          <ChipStoriesSectionTitle>Только layout (selectionMode none)</ChipStoriesSectionTitle>
          <Chips selectionMode="none" aria-label="Список тегов">
            <Chip onClose={fn()}>Токен 1</Chip>
            <Chip onClose={fn()}>Токен 2</Chip>
            <Chip badge={2}>Токен 3</Chip>
          </Chips>
        </section>
      </ChipStoriesStack>
    );
  },
};
