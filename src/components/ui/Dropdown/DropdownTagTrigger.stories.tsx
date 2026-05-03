import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { Dropdown } from './Dropdown';
import { DropdownMenu } from './DropdownMenu';
import { DropdownMenuItem } from './DropdownMenuItem';
import { Icon } from '../Icon/Icon';
import { IconSize, Size } from '../../../types/sizes';
import type { DropdownMenuItemProps, DropdownProps, TagColorVariant } from '../../../types/ui';
import { mapTagSizeToDropdownMenuSize } from './tagTriggerHandlers';
import {
  TagStoriesStack,
  TagStoriesSectionTitle,
  TagStoriesRow,
  TagStoriesColumn,
  TagStoriesCaption,
  TagStoriesCaptionTitle,
  TagStoriesCaptionCode,
} from '../Tag/Tag.stories.style';

const sampleItems: DropdownMenuItemProps[] = [
  { label: 'Редактировать', value: 'edit' },
  { label: 'Копировать', value: 'copy' },
  { label: 'Удалить', value: 'delete', tone: 'danger' },
];

const filterItems: DropdownMenuItemProps[] = [
  { label: 'Все', value: 'all' },
  { label: 'Активные', value: 'active' },
  { label: 'Черновики', value: 'draft' },
  { label: 'Архив', value: 'archived' },
];

/** Варианты палитры для ряда превью (без `custom`) */
const TAG_MENU_COLORS: readonly TagColorVariant[] = [
  'neutral',
  'secondary',
  'primary',
  'danger',
  'info',
  'success',
  'warning',
  'purple',
  'teal',
  'cyan',
  'pink',
];

const TAG_MENU_SIZES = [Size.XS, Size.SM, Size.MD, Size.LG, Size.XL] as const;

/**
 * Тег-триггер (`defaultTriggerKind="tag"`). Тот же `title`, что у `Dropdown.stories.tsx`, чтобы истории были в **Navigation → Dropdown** рядом с остальными, а не в отдельной вложенной папке.
 */
const meta: Meta<typeof Dropdown> = {
  title: 'UI Kit/Navigation/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Тег-триггер через `Dropdown`: `defaultTriggerKind="tag"`, подпись — `buttonProps.children`, оформление тега — `tagTriggerProps`.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultTriggerKind: { control: false },
    buttonProps: { control: 'object', description: 'Подпись триггера: `children`' },
    tagTriggerProps: { control: 'object', description: 'Пропсы `Tag` (размер, палитра, иконки)' },
    items: { control: false },
    children: { control: false },
    onSelect: { control: false },
    searchable: { control: 'boolean', description: 'Поиск по пунктам (`Dropdown`)' },
    multiSelection: { control: 'boolean' },
    disabled: { control: 'boolean' },
    labelFromSelection: { control: 'boolean' },
    tagTriggerShowChevron: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const tagDropdownBase: Pick<
  DropdownProps,
  'defaultTriggerKind' | 'onSelect' | 'items' | 'buttonProps' | 'tagTriggerProps' | 'size'
> = {
  defaultTriggerKind: 'tag',
  onSelect: fn(),
  items: sampleItems,
  size: Size.SM,
  buttonProps: { children: 'Действия' },
  tagTriggerProps: { size: Size.SM, colorVariant: 'neutral', appearance: 'filled' },
};

/** Базовый пример: триггер — `Tag`, `defaultTriggerKind="tag"`. */
export const TagTriggerPlayground: Story = {
  name: 'Tag trigger — playground',
  args: {
    ...tagDropdownBase,
  },
};

/** Подпись на теге подставляется из выбранного пункта (`labelFromSelection`). */
export const TagTriggerSelectionLabel: Story = {
  name: 'Tag trigger — подпись из выбранного пункта',
  render: () => {
    const [selectedValue, setSelectedValue] = useState<string | undefined>('copy');
    return (
      <Dropdown
        defaultTriggerKind="tag"
        items={sampleItems}
        value={selectedValue}
        labelFromSelection
        buttonProps={{ children: 'Не выбрано' }}
        tagTriggerProps={{ size: Size.SM, colorVariant: 'neutral', appearance: 'filled' }}
        size={Size.SM}
        onSelect={(nextValue) =>
          setSelectedValue(nextValue === undefined ? undefined : String(nextValue))
        }
      />
    );
  },
};

/** Акцентная палитра и режим outline. */
export const TagTriggerPrimaryOutline: Story = {
  name: 'Tag trigger — primary outline',
  args: {
    defaultTriggerKind: 'tag',
    onSelect: fn(),
    buttonProps: { children: 'Фильтр' },
    tagTriggerProps: {
      size: Size.SM,
      colorVariant: 'primary',
      appearance: 'outline',
    },
    items: filterItems,
    size: Size.SM,
  },
};

/** Все размеры тега; размер меню согласуется через {@link mapTagSizeToDropdownMenuSize}. */
export const TagTriggerAllSizes: Story = {
  name: 'Tag trigger — размеры тега',
  render: () => (
    <TagStoriesRow aria-label="Dropdown tag trigger по размерам">
      {TAG_MENU_SIZES.map((tagSize) => (
        <TagStoriesColumn key={tagSize}>
          <TagStoriesCaption>
            <TagStoriesCaptionTitle>{tagSize}</TagStoriesCaptionTitle>
            <TagStoriesCaptionCode>{`tagTriggerProps.size={Size.${tagSize}}`}</TagStoriesCaptionCode>
          </TagStoriesCaption>
          <Dropdown
            defaultTriggerKind="tag"
            buttonProps={{ children: 'Меню' }}
            tagTriggerProps={{ size: tagSize, colorVariant: 'neutral', appearance: 'filled' }}
            size={mapTagSizeToDropdownMenuSize(tagSize)}
            items={sampleItems}
            onSelect={fn()}
          />
        </TagStoriesColumn>
      ))}
    </TagStoriesRow>
  ),
};

/** Семантика и дополнительные акценты темы. */
export const TagTriggerColorVariants: Story = {
  name: 'Tag trigger — палитра',
  render: () => (
    <TagStoriesStack>
      <TagStoriesSectionTitle>filled</TagStoriesSectionTitle>
      <TagStoriesRow>
        {TAG_MENU_COLORS.map((colorVariant) => (
          <Dropdown
            key={colorVariant}
            defaultTriggerKind="tag"
            buttonProps={{ children: colorVariant }}
            tagTriggerProps={{ size: Size.SM, colorVariant, appearance: 'filled' }}
            size={Size.SM}
            items={filterItems}
            onSelect={fn()}
          />
        ))}
      </TagStoriesRow>
      <TagStoriesSectionTitle>outline</TagStoriesSectionTitle>
      <TagStoriesRow>
        {TAG_MENU_COLORS.map((colorVariant) => (
          <Dropdown
            key={`o-${colorVariant}`}
            defaultTriggerKind="tag"
            buttonProps={{ children: colorVariant }}
            tagTriggerProps={{ size: Size.SM, colorVariant, appearance: 'outline' }}
            size={Size.SM}
            items={filterItems}
            onSelect={fn()}
          />
        ))}
      </TagStoriesRow>
    </TagStoriesStack>
  ),
};

/** Неактивный триггер и меню не открывается (имя экспорта отличается от сторис «Отключён» у кнопки). */
export const TagTriggerDisabled: Story = {
  name: 'Tag trigger — отключён',
  args: {
    defaultTriggerKind: 'tag',
    onSelect: fn(),
    buttonProps: { children: 'Недоступно' },
    tagTriggerProps: { size: Size.SM, colorVariant: 'neutral', appearance: 'filled' },
    items: sampleItems,
    size: Size.SM,
    disabled: true,
  },
};

/** Цветная метка слева на теге (`statusDisplay="marker"`). */
export const TagTriggerStatusMarker: Story = {
  name: 'Tag trigger — маркер статуса',
  render: () => (
    <TagStoriesRow>
      <Dropdown
        defaultTriggerKind="tag"
        buttonProps={{ children: 'Статус' }}
        tagTriggerProps={{
          size: Size.SM,
          statusDisplay: 'marker',
          colorVariant: 'success',
          appearance: 'filled',
        }}
        size={Size.SM}
        items={[
          { label: 'Онлайн', value: 'online' },
          { label: 'Занят', value: 'busy' },
          { label: 'Не беспокоить', value: 'dnd' },
        ]}
        onSelect={fn()}
      />
      <Dropdown
        defaultTriggerKind="tag"
        buttonProps={{ children: 'Приоритет' }}
        tagTriggerProps={{
          size: Size.SM,
          statusDisplay: 'marker',
          colorVariant: 'warning',
          appearance: 'outline',
        }}
        size={Size.SM}
        items={[
          { label: 'Низкий', value: 'low' },
          { label: 'Высокий', value: 'high' },
        ]}
        onSelect={fn()}
      />
    </TagStoriesRow>
  ),
};

/** Встроенный поиск по пунктам (`searchable`). */
export const TagTriggerSearchableMenu: Story = {
  name: 'Tag trigger — поиск в меню',
  args: {
    defaultTriggerKind: 'tag',
    onSelect: fn(),
    buttonProps: { children: 'Выберите город' },
    tagTriggerProps: { size: Size.SM, colorVariant: 'neutral', appearance: 'filled' },
    searchable: true,
    searchPlaceholder: 'Начните ввод…',
    menuMaxHeight: 280,
    size: Size.SM,
    items: [
      { label: 'Москва', value: 'msk' },
      { label: 'Санкт-Петербург', value: 'spb' },
      { label: 'Казань', value: 'kzn' },
      { label: 'Екатеринбург', value: 'ekb' },
      { label: 'Новосибирск', value: 'nsk' },
    ],
  },
};

/** Несколько значений; пункты с чекбоксами; меню не закрывается после одного выбора. */
export const TagTriggerMultiSelection: Story = {
  name: 'Tag trigger — мультивыбор',
  args: {
    defaultTriggerKind: 'tag',
    onSelect: fn(),
    buttonProps: { children: 'Несколько значений' },
    tagTriggerProps: { size: Size.SM, colorVariant: 'neutral', appearance: 'filled' },
    multiSelection: true,
    size: Size.SM,
    items: filterItems.filter((item) => item.value !== 'all'),
  },
};

/** Меню через слот `children` (`DropdownMenu` / `DropdownMenuItem`), без массива `items`. */
export const TagTriggerCustomMenuSlot: Story = {
  name: 'Tag trigger — кастомное меню (children)',
  render: () => (
    <Dropdown
      defaultTriggerKind="tag"
      buttonProps={{ children: 'Ещё' }}
      tagTriggerProps={{ size: Size.SM, colorVariant: 'neutral', appearance: 'filled' }}
      size={Size.SM}
      onSelect={fn()}
    >
      <DropdownMenu>
        <DropdownMenuItem label="Экспорт CSV" value="csv" />
        <DropdownMenuItem label="Экспорт PDF" value="pdf" />
        <DropdownMenuItem label="Печать" value="print" />
      </DropdownMenu>
    </Dropdown>
  ),
};

/** Иконка в левом слоте тега. */
export const TagTriggerWithLeftIcon: Story = {
  name: 'Tag trigger — иконка слева',
  args: {
    defaultTriggerKind: 'tag',
    onSelect: fn(),
    buttonProps: { children: 'Метка' },
    tagTriggerProps: {
      size: Size.SM,
      colorVariant: 'info',
      appearance: 'filled',
      leftIcon: <Icon name="IconExCopy" size={IconSize.XS} color="currentColor" />,
    },
    items: sampleItems,
    size: Size.SM,
  },
};

/** Своя правая иконка или без шеврона для компактного вида. */
export const TagTriggerChevronVariants: Story = {
  name: 'Tag trigger — шеврон и правый слот',
  render: () => (
    <TagStoriesRow>
      <Dropdown
        defaultTriggerKind="tag"
        buttonProps={{ children: 'По умолчанию' }}
        tagTriggerProps={{ size: Size.SM, colorVariant: 'neutral', appearance: 'filled' }}
        size={Size.SM}
        items={sampleItems}
        onSelect={fn()}
      />
      <Dropdown
        defaultTriggerKind="tag"
        buttonProps={{ children: 'Без шеврона' }}
        tagTriggerProps={{ size: Size.SM, colorVariant: 'neutral', appearance: 'filled' }}
        tagTriggerShowChevron={false}
        size={Size.SM}
        items={sampleItems}
        onSelect={fn()}
      />
      <Dropdown
        defaultTriggerKind="tag"
        buttonProps={{ children: 'Своя иконка' }}
        tagTriggerProps={{
          size: Size.SM,
          colorVariant: 'neutral',
          appearance: 'filled',
          rightIcon: <Icon name="IconExMoreCircle" size={IconSize.SM} color="currentColor" />,
        }}
        size={Size.SM}
        items={sampleItems}
        onSelect={fn()}
      />
    </TagStoriesRow>
  ),
};

/** Плейсхолдер-триггер при загрузке (`skeleton` на теге). */
export const TagTriggerSkeleton: Story = {
  name: 'Tag trigger — скелетон',
  args: {
    defaultTriggerKind: 'tag',
    onSelect: fn(),
    buttonProps: { children: '—' },
    tagTriggerProps: { size: Size.SM, colorVariant: 'neutral', appearance: 'filled' },
    skeleton: true,
    items: sampleItems,
    size: Size.SM,
  },
};

/** Несколько тегов в строке (типичный сценарий фильтров). */
export const TagTriggerFilterRow: Story = {
  name: 'Tag trigger — строка фильтров',
  render: () => (
    <TagStoriesRow>
      <Dropdown
        defaultTriggerKind="tag"
        buttonProps={{ children: 'Статус' }}
        tagTriggerProps={{ size: Size.SM, colorVariant: 'neutral', appearance: 'outline' }}
        size={Size.SM}
        items={filterItems}
        onSelect={fn()}
      />
      <Dropdown
        defaultTriggerKind="tag"
        buttonProps={{ children: 'Категория' }}
        tagTriggerProps={{ size: Size.SM, colorVariant: 'neutral', appearance: 'outline' }}
        size={Size.SM}
        items={[
          { label: 'Документы', value: 'doc' },
          { label: 'Медиа', value: 'media' },
        ]}
        onSelect={fn()}
      />
      <Dropdown
        defaultTriggerKind="tag"
        buttonProps={{ children: 'Сортировка' }}
        tagTriggerProps={{ size: Size.SM, colorVariant: 'primary', appearance: 'outline' }}
        size={Size.SM}
        items={[
          { label: 'По дате', value: 'date' },
          { label: 'По имени', value: 'name' },
        ]}
        onSelect={fn()}
      />
    </TagStoriesRow>
  ),
};
