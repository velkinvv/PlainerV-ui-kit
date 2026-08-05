import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { TabItem, TabItemGroupList } from './TabItem';
import { TabItemTextOrientation, TabItemTextPosition, TabsDirection } from '../../../types/ui';
import { Icon } from '../Icon/Icon';
import { DOC_TAB_ITEM } from '@/components/ui/storyDocs/uiKitDocs';
import {
  TabItemStoriesIconLabelRow,
  TabItemStoriesPanelContent,
} from './TabItem.stories.styles';

const meta: Meta<typeof TabItem> = {
  title: 'UI Kit/Navigation/Tabs/TabItem',
  component: TabItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_TAB_ITEM,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
      description: 'Уникальное значение вкладки',
      table: {
        type: { summary: 'string' },
      },
    },
    label: {
      control: { type: 'text' },
      description: 'Текст для кнопки вкладки',
      table: {
        type: { summary: 'string' },
      },
    },
    textOrientation: {
      control: { type: 'select' },
      options: [TabItemTextOrientation.HORIZONTAL, TabItemTextOrientation.VERTICAL],
      description: 'Ориентация текста; значения: `horizontal`, `vertical`',
      table: {
        type: { summary: 'horizontal или vertical (TabItemTextOrientation)' },
      },
    },
    textPosition: {
      control: { type: 'select' },
      options: [TabItemTextPosition.LEFT, TabItemTextPosition.RIGHT],
      description: 'Позиция текста в вертикальном режиме; значения: `left`, `right`',
      table: {
        type: { summary: 'left или right (TabItemTextPosition)' },
      },
    },
    triggerClassName: {
      control: { type: 'text' },
      description: 'Класс для кнопки вкладки',
      table: {
        type: { summary: 'string' },
      },
    },
    contentClassName: {
      control: { type: 'text' },
      description: 'Класс для содержимого вкладки',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TabItem value="tab1" label="Tab 1" defaultActive>
      <TabItemStoriesPanelContent>
        <h3>Tab 1 Content</h3>
        <p>This is the content of the first tab using TabItem component.</p>
      </TabItemStoriesPanelContent>
    </TabItem>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Базовое использование самодостаточного компонента TabItem с горизонтальным текстом.',
      },
    },
  },
};

export const HorizontalText: Story = {
  render: () => (
    <Tabs>
      <TabItem
        value="tab1"
        label="Horizontal Text"
        textOrientation={TabItemTextOrientation.HORIZONTAL}
      >
        <TabItemStoriesPanelContent>
          <h3>Horizontal Text Tab</h3>
          <p>This tab has horizontal text orientation.</p>
        </TabItemStoriesPanelContent>
      </TabItem>
    </Tabs>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'TabItem с горизонтальной ориентацией текста (по умолчанию).',
      },
    },
  },
};

export const VerticalText: Story = {
  render: () => (
    <TabItem
      value="tab1"
      label="Vertical Text"
      textOrientation={TabItemTextOrientation.VERTICAL}
      defaultActive
    >
      <TabItemStoriesPanelContent>
        <h3>Vertical Text Tab</h3>
        <p>This tab has vertical text orientation.</p>
      </TabItemStoriesPanelContent>
    </TabItem>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'TabItem с вертикальной ориентацией текста.',
      },
    },
  },
};

export const VerticalTextLeft: Story = {
  render: () => (
    <Tabs>
      <TabItem
        value="tab1"
        label="Left Aligned"
        textOrientation={TabItemTextOrientation.VERTICAL}
        textPosition={TabItemTextPosition.LEFT}
      >
        <TabItemStoriesPanelContent>
          <h3>Vertical Text Left</h3>
          <p>This tab has vertical text orientation with left alignment.</p>
        </TabItemStoriesPanelContent>
      </TabItem>
    </Tabs>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'TabItem с вертикальной ориентацией текста и выравниванием по левому краю.',
      },
    },
  },
};

export const VerticalTextRight: Story = {
  render: () => (
    <TabItem
      value="tab1"
      label="Right Aligned"
      textOrientation={TabItemTextOrientation.VERTICAL}
      textPosition={TabItemTextPosition.RIGHT}
      defaultActive
    >
      <TabItemStoriesPanelContent>
        <h3>Vertical Text Right</h3>
        <p>This tab has vertical text orientation with right alignment.</p>
      </TabItemStoriesPanelContent>
    </TabItem>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'TabItem с вертикальной ориентацией текста и выравниванием по правому краю.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <Tabs>
      <TabItem value="home" label={<TabItemStoriesIconLabelRow>🏠 Home</TabItemStoriesIconLabelRow>}>
        <TabItemStoriesPanelContent>
          <h3>Home</h3>
          <p>Welcome to the home page using TabItem!</p>
        </TabItemStoriesPanelContent>
      </TabItem>
    </Tabs>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Пример использования TabItem с иконками в лейблах.',
      },
    },
  },
};

export const VerticalTextWithIcons: Story = {
  render: () => (
    <TabItem
      value="home"
      label={<TabItemStoriesIconLabelRow>🏠 Home</TabItemStoriesIconLabelRow>}
      textOrientation={TabItemTextOrientation.VERTICAL}
      defaultActive
    >
      <TabItemStoriesPanelContent>
        <h3>Home</h3>
        <p>Welcome to the home page with vertical text!</p>
      </TabItemStoriesPanelContent>
    </TabItem>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'TabItem с вертикальной ориентацией текста и иконками. Используется позиция по умолчанию (RIGHT).',
      },
    },
  },
};

export const WithIconStart: Story = {
  render: () => (
    <Tabs>
      <TabItem value="home" label="Home" iconStart={<Icon name="IconExHome" size="md" />}>
        <TabItemStoriesPanelContent>
          <h3>Home</h3>
          <p>Tab with icon at the start (left for horizontal text, top for vertical text).</p>
        </TabItemStoriesPanelContent>
      </TabItem>
    </Tabs>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'TabItem с иконкой в начале (слева для горизонтального текста, сверху для вертикального).',
      },
    },
  },
};

export const WithIconEnd: Story = {
  render: () => (
    <TabItem
      value="settings"
      label="Settings"
      iconEnd={<Icon name="IconExSettings" size="md" />}
      defaultActive
    >
      <TabItemStoriesPanelContent>
        <h3>Settings</h3>
        <p>Tab with icon at the end (right for horizontal text, bottom for vertical text).</p>
      </TabItemStoriesPanelContent>
    </TabItem>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'TabItem с иконкой в конце (справа для горизонтального текста, снизу для вертикального).',
      },
    },
  },
};

export const WithBothIcons: Story = {
  render: () => (
    <TabItem
      value="profile"
      label="Profile"
      iconStart={<Icon name="IconExUser" size="md" />}
      iconEnd={<Icon name="IconExSend" size="md" />}
      defaultActive
    >
      <TabItemStoriesPanelContent>
        <h3>Profile</h3>
        <p>Tab with icons at both start and end.</p>
      </TabItemStoriesPanelContent>
    </TabItem>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'TabItem с иконками в начале и в конце.',
      },
    },
  },
};

export const VerticalTextWithIconStart: Story = {
  render: () => (
    <TabItem
      value="home"
      label="Home"
      textOrientation={TabItemTextOrientation.VERTICAL}
      iconStart={<Icon name="IconExHome" size="md" />}
      defaultActive
    >
      <TabItemStoriesPanelContent>
        <h3>Home</h3>
        <p>Vertical text with icon at the start (top).</p>
      </TabItemStoriesPanelContent>
    </TabItem>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'TabItem с вертикальным текстом и иконкой в начале (сверху).',
      },
    },
  },
};

export const VerticalTextWithIconEnd: Story = {
  render: () => (
    <TabItem
      value="settings"
      label="Settings"
      textOrientation={TabItemTextOrientation.VERTICAL}
      iconEnd={<Icon name="IconExSettings" size="md" />}
      defaultActive
    >
      <TabItemStoriesPanelContent>
        <h3>Settings</h3>
        <p>Vertical text with icon at the end (bottom).</p>
      </TabItemStoriesPanelContent>
    </TabItem>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'TabItem с вертикальным текстом и иконкой в конце (снизу).',
      },
    },
  },
};

export const WithGroup: Story = {
  render: () => (
    <TabItem.Group defaultActiveTab="tab1">
      <TabItemGroupList $direction={TabsDirection.HORIZONTAL}>
        <TabItem value="tab1" label="Tab 1">
          <TabItemStoriesPanelContent>
            <h3>Tab 1 Content</h3>
            <p>This is the content of the first tab in a group.</p>
          </TabItemStoriesPanelContent>
        </TabItem>
        <TabItem value="tab2" label="Tab 2">
          <TabItemStoriesPanelContent>
            <h3>Tab 2 Content</h3>
            <p>This is the content of the second tab in a group.</p>
          </TabItemStoriesPanelContent>
        </TabItem>
        <TabItem value="tab3" label="Tab 3">
          <TabItemStoriesPanelContent>
            <h3>Tab 3 Content</h3>
            <p>This is the content of the third tab in a group.</p>
          </TabItemStoriesPanelContent>
        </TabItem>
      </TabItemGroupList>
    </TabItem.Group>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Группа TabItem компонентов, работающих вместе.',
      },
    },
  },
};
