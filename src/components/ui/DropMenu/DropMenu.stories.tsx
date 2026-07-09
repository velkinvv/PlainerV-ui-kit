import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { DropMenu } from './DropMenu';
import { Button } from '../buttons/Button/Button';
import { IconButton } from '../buttons/IconButton/IconButton';
import { Icon } from '../Icon/Icon';
import { IconSize, Size } from '../../../types/sizes';
import { ButtonVariant } from '../../../types/ui';
import { DOC_DROP_MENU } from '@/components/ui/storyDocs/uiKitDocs';
import {
  DropMenuStoriesCaption,
  DropMenuStoriesRow,
  DropMenuStoriesSectionTitle,
  DropMenuStoriesStack,
} from './DropMenu.stories.style';

const sampleItems = [
  { value: 'edit', label: 'Редактировать' },
  { value: 'copy', label: 'Копировать' },
  { value: 'delete', label: 'Удалить', tone: 'danger' as const },
];

const searchableItems = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'angular', label: 'Angular' },
];

const meta: Meta<typeof DropMenu> = {
  title: 'UI Kit/Navigation/DropMenu',
  component: DropMenu,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_DROP_MENU,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: false,
      description: 'Пункты меню (`Dropdown` items)',
    },
    buttonProps: {
      control: false,
      description: 'Пропсы дефолтной кнопки-триггера',
    },
    trigger: {
      control: false,
      description: 'Кастомный триггер (приоритет ниже `renderContentProp`)',
    },
    renderContentProp: {
      control: false,
      description: 'Render-prop триггера (высший приоритет)',
    },
    isVisible: {
      description: 'Controlled видимость (алиас `isMenuOpen`)',
    },
    onVisibilityChange: {
      action: 'onVisibilityChange',
      description: 'Смена видимости меню',
    },
    onSelectItem: {
      action: 'onSelectItem',
      description: 'Канонический колбэк выбора пункта',
    },
    selected: {
      description: 'Fallback для `value`, если `value` не задан',
    },
    disabled: {
      control: 'boolean',
      description: 'Блокировка триггера и меню',
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки меню',
    },
    searchable: {
      control: 'boolean',
      description: 'Поиск по пунктам',
    },
    multiSelection: {
      control: 'boolean',
      description: 'Множественный выбор',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: sampleItems,
    buttonProps: { children: 'Действия' },
    onSelectItem: fn(),
    onVisibilityChange: fn(),
  },
};

export const WithTriggerProp: Story = {
  args: {
    items: sampleItems,
    trigger: <Button variant={ButtonVariant.SECONDARY}>Триггер</Button>,
    onSelectItem: fn(),
  },
};

export const RenderContentProp: Story = {
  render: () => (
    <DropMenu
      items={sampleItems}
      onSelectItem={fn()}
      renderContentProp={({ buttonRef, menuState, handleClick, handleKeyDown, statusIcon, disabled }) => (
        <Button
          ref={buttonRef as React.Ref<HTMLButtonElement>}
          type="button"
          disabled={disabled}
          aria-expanded={menuState}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          iconEnd={statusIcon}
        >
          Кастомный триггер
        </Button>
      )}
    />
  ),
};

export const IconButtonTrigger: Story = {
  render: () => (
    <DropMenu
      items={sampleItems}
      onSelectItem={fn()}
      renderContentProp={({ buttonRef, menuState, handleClick, handleKeyDown, disabled }) => (
        <IconButton
          ref={buttonRef as React.Ref<HTMLButtonElement>}
          aria-label="Меню действий"
          aria-expanded={menuState}
          disabled={disabled}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          icon={<Icon name="IconExDots" size={IconSize.MD} color="currentColor" />}
        />
      )}
    />
  ),
};

export const ControlledVisibility: Story = {
  render: function ControlledVisibilityStory() {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <DropMenuStoriesStack>
        <DropMenuStoriesCaption>
          Видимость снаружи: {isVisible ? 'открыто' : 'закрыто'}
        </DropMenuStoriesCaption>
        <DropMenu
          items={sampleItems}
          isVisible={isVisible}
          onVisibilityChange={setIsVisible}
          buttonProps={{ children: 'Controlled' }}
          onSelectItem={fn()}
        />
      </DropMenuStoriesStack>
    );
  },
};

export const SearchableMulti: Story = {
  render: function SearchableMultiStory() {
    const [selectedValues, setSelectedValues] = useState<string[]>(['react']);

    return (
      <DropMenu
        items={searchableItems}
        multiSelection
        searchable
        value={selectedValues}
        onSelectItem={(nextValue) => {
          if (nextValue == null) {
            return;
          }
          const stringValue = String(nextValue);
          setSelectedValues((previous) =>
            previous.includes(stringValue)
              ? previous.filter((entry) => entry !== stringValue)
              : [...previous, stringValue],
          );
        }}
        buttonProps={{ children: `Выбрано: ${selectedValues.length}` }}
      />
    );
  },
};

export const LoadingDisabled: Story = {
  render: () => (
    <DropMenuStoriesRow>
      <DropMenu items={sampleItems} loading buttonProps={{ children: 'Loading' }} />
      <DropMenu items={sampleItems} disabled buttonProps={{ children: 'Disabled' }} />
    </DropMenuStoriesRow>
  ),
};

export const WithPanels: Story = {
  args: {
    items: sampleItems,
    buttonProps: { children: 'С панелями' },
    onSelectItem: fn(),
    renderTopPanel: () => <DropMenuStoriesCaption>Верхняя панель</DropMenuStoriesCaption>,
    renderBottomPanel: () => <DropMenuStoriesCaption>Нижняя панель</DropMenuStoriesCaption>,
  },
};

export const Showcase: Story = {
  render: () => (
    <DropMenuStoriesStack>
      <section>
        <DropMenuStoriesSectionTitle>Варианты триггера</DropMenuStoriesSectionTitle>
        <DropMenuStoriesRow>
          <DropMenu items={sampleItems} buttonProps={{ children: 'Кнопка' }} onSelectItem={fn()} />
          <DropMenu
            items={sampleItems}
            size={Size.SM}
            buttonProps={{ children: 'SM', size: Size.SM }}
            onSelectItem={fn()}
          />
          <DropMenu
            items={sampleItems}
            onSelectItem={fn()}
            renderContentProp={({ buttonRef, handleClick, handleKeyDown, menuState }) => (
              <Button
                ref={buttonRef as React.Ref<HTMLButtonElement>}
                variant={ButtonVariant.OUTLINE}
                aria-expanded={menuState}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
              >
                Outline
              </Button>
            )}
          />
        </DropMenuStoriesRow>
      </section>
    </DropMenuStoriesStack>
  ),
};
