import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Tree } from './Tree';
import { Size } from '../../../types/sizes';
import { DOC_TREE } from '@/components/ui/storyDocs/uiKitDocs';
import type { TreeDropArgs, TreeItemData } from '../../../types/ui';
import { HintPosition, TooltipPosition } from '../../../types/ui';
import { Icon } from '../Icon/Icon';
import { IconSize } from '../../../types/sizes';
import {
  TreeStoriesCaption,
  TreeStoriesExternalZone,
  TreeStoriesStack,
} from './Tree.stories.style';
import { applyTreeDrop } from './handlers';

const demoItems: TreeItemData[] = [
  {
    id: 'docs',
    label: 'Документы',
    icon: <Icon name="IconExFolder" size={IconSize.SM} />,
    children: [
      { id: 'docs-report', label: 'Отчёт Q1' },
      { id: 'docs-plan', label: 'План' },
    ],
  },
  {
    id: 'media',
    label: 'Медиа',
    children: [
      { id: 'media-photo', label: 'Фото' },
      { id: 'media-video', label: 'Видео', disabled: true },
    ],
  },
  { id: 'archive', label: 'Архив' },
];

const meta: Meta<typeof Tree> = {
  title: 'UI Kit/Data Display/Tree',
  component: Tree,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_TREE,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: [Size.SM, Size.MD],
    },
    checkable: { control: 'boolean' },
    selectionControl: {
      control: { type: 'select' },
      options: ['none', 'checkbox', 'radio'],
    },
    checkStrictly: { control: 'boolean' },
    checkOnRowClick: { control: 'boolean' },
    selectionMode: {
      control: { type: 'select' },
      options: ['single', 'multiple'],
    },
    draggable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Каталог',
    defaultExpandedIds: ['docs'],
    items: demoItems,
  },
};

export const Checkable: Story = {
  args: {
    'aria-label': 'Выбор разделов',
    checkable: true,
    defaultExpandedIds: ['docs', 'media'],
    items: demoItems,
  },
};

export const Radio: Story = {
  render: function RadioTreeStory() {
    const [selectedIds, setSelectedIds] = useState<string[]>(['docs-report']);

    return (
      <TreeStoriesStack>
        <TreeStoriesCaption>Выбрано: {selectedIds[0] ?? '—'}</TreeStoriesCaption>
        <Tree
          aria-label="Один раздел"
          selectionControl="radio"
          items={demoItems}
          defaultExpandedIds={['docs', 'media']}
          selectedIds={selectedIds}
          onSelectedChange={setSelectedIds}
        />
      </TreeStoriesStack>
    );
  },
};

export const TooltipAndHint: Story = {
  name: 'Tooltip и Hint',
  render: () => (
    <TreeStoriesStack>
      <TreeStoriesCaption>
        Hint приоритетнее Tooltip (как у NavigationMenu.Item)
      </TreeStoriesCaption>
      <Tree aria-label="Подсказки" defaultExpandedIds={['docs']}>
        <Tree.Item
          id="docs"
          label="Документы"
          tooltip={{
            content: 'Краткий тултип',
            position: TooltipPosition.RIGHT,
          }}
        >
          <Tree.Item
            id="docs-hint"
            label="С Hint"
            hint={{
              content: 'Расширенная подсказка Hint',
              placement: HintPosition.RIGHT,
            }}
          />
          <Tree.Item
            id="docs-both"
            label="Hint важнее tooltip"
            tooltip={{ content: 'Не покажется', position: TooltipPosition.RIGHT }}
            hint={{
              content: 'При обоих пропах виден Hint',
              placement: HintPosition.RIGHT,
            }}
          />
        </Tree.Item>
      </Tree>
    </TreeStoriesStack>
  ),
};

export const ItemClickAndSelect: Story = {
  name: 'Клик и выбор',
  render: function ItemClickSelectStory() {
    const [log, setLog] = useState('Кликните по узлу');
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    return (
      <TreeStoriesStack>
        <TreeStoriesCaption>{log}</TreeStoriesCaption>
        <Tree
          aria-label="События"
          items={demoItems}
          defaultExpandedIds={['docs']}
          selectedIds={selectedIds}
          onSelectedChange={setSelectedIds}
          onItemClick={({ itemId }) => setLog(`onItemClick: ${itemId}`)}
          onItemSelect={({ itemId, selectedIds: nextIds }) =>
            setLog(`onItemSelect: ${itemId} → [${nextIds.join(', ')}]`)
          }
        />
      </TreeStoriesStack>
    );
  },
};

export const CheckStrictly: Story = {
  args: {
    'aria-label': 'Независимые чекбоксы',
    checkable: true,
    checkStrictly: true,
    defaultExpandedIds: ['docs'],
    items: demoItems,
  },
};

export const MultiSelect: Story = {
  args: {
    'aria-label': 'Множественный выбор',
    selectionMode: 'multiple',
    defaultExpandedIds: ['docs'],
    items: demoItems,
  },
};

export const Controlled: Story = {
  render: function ControlledTreeStory() {
    const [expandedIds, setExpandedIds] = useState<string[]>(['docs']);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [checkedIds, setCheckedIds] = useState<string[]>([]);

    return (
      <TreeStoriesStack>
        <TreeStoriesCaption>
          expanded: {expandedIds.join(', ') || '—'}; selected:{' '}
          {selectedIds.join(', ') || '—'}; checked: {checkedIds.join(', ') || '—'}
        </TreeStoriesCaption>
        <Tree
          aria-label="Контролируемое дерево"
          checkable
          items={demoItems}
          expandedIds={expandedIds}
          onExpandedChange={setExpandedIds}
          selectedIds={selectedIds}
          onSelectedChange={setSelectedIds}
          checkedIds={checkedIds}
          onCheckedChange={setCheckedIds}
        />
      </TreeStoriesStack>
    );
  },
};

export const Draggable: Story = {
  render: function DraggableTreeStory() {
    const [items, setItems] = useState<TreeItemData[]>(demoItems);

    const handleDrop = (dropArgs: TreeDropArgs) => {
      setItems((previousItems) => applyTreeDrop(previousItems, dropArgs));
    };

    return (
      <TreeStoriesStack>
        <TreeStoriesCaption>Перетащите узлы: before / into / after</TreeStoriesCaption>
        <Tree
          aria-label="Дерево с DnD"
          items={items}
          defaultExpandedIds={['docs', 'media']}
          draggable
          onDrop={handleDrop}
        />
      </TreeStoriesStack>
    );
  },
};

export const ExternalDrop: Story = {
  render: function ExternalDropTreeStory() {
    const [log, setLog] = useState('Перетащите чип на узел');

    return (
      <TreeStoriesStack>
        <TreeStoriesExternalZone
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData('text/plain', 'external-chip');
            event.dataTransfer.effectAllowed = 'copy';
          }}
        >
          Внешний элемент (drag me)
        </TreeStoriesExternalZone>
        <TreeStoriesCaption>{log}</TreeStoriesCaption>
        <Tree
          aria-label="Внешний drop"
          items={demoItems}
          defaultExpandedIds={['docs']}
          onExternalDrop={(_event, targetId) => {
            setLog(`Внешний drop на: ${targetId ?? 'корень'}`);
          }}
        />
      </TreeStoriesStack>
    );
  },
};

export const Disabled: Story = {
  args: {
    'aria-label': 'С disabled',
    defaultExpandedIds: ['media'],
    items: demoItems,
  },
};

export const Sizes: Story = {
  render: () => (
    <TreeStoriesStack>
      <div>
        <TreeStoriesCaption>SM</TreeStoriesCaption>
        <Tree
          aria-label="SM"
          size={Size.SM}
          items={demoItems}
          defaultExpandedIds={['docs']}
        />
      </div>
      <div>
        <TreeStoriesCaption>MD</TreeStoriesCaption>
        <Tree
          aria-label="MD"
          size={Size.MD}
          items={demoItems}
          defaultExpandedIds={['docs']}
        />
      </div>
    </TreeStoriesStack>
  ),
};

export const ItemsProp: Story = {
  args: {
    'aria-label': 'Только items',
    items: demoItems,
    defaultExpandedIds: ['docs'],
    checkable: true,
  },
};

export const CompoundApi: Story = {
  render: () => (
    <Tree aria-label="Compound" defaultExpandedIds={['root']} checkable>
      <Tree.Item id="root" label="Корень" icon={<Icon name="IconExFolder" size={IconSize.SM} />}>
        <Tree.Item id="child-a" label="Дочерний A" />
        <Tree.Item id="child-b" label="Дочерний B">
          <Tree.Item id="grandchild" label="Внук" />
        </Tree.Item>
      </Tree.Item>
    </Tree>
  ),
};
