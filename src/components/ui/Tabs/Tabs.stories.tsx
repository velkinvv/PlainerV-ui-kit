import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { TabItem } from './TabItem';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import {
  TabsDirection,
  TabsVerticalPosition,
  TabsVariant,
  TabItemTextOrientation,
  TabItemTextPosition,
} from '../../../types/ui';
import { Icon } from '../Icon/Icon';
import { DOC_TABS } from '@/components/ui/storyDocs/uiKitDocs';

const meta: Meta<typeof Tabs> = {
  title: 'UI Kit/Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: DOC_TABS,
      },
    },
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    defaultActiveTab: {
      control: { type: 'text' },
      description: 'Активная вкладка по умолчанию (value активного TabItem)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    direction: {
      control: { type: 'select' },
      options: [TabsDirection.HORIZONTAL, TabsDirection.VERTICAL],
      description:
        'Направление отображения табов. HORIZONTAL - табы сверху, контент снизу. VERTICAL - табы слева/справа, контент рядом.',
      table: {
        type: { summary: '"horizontal", "vertical"' },
        defaultValue: { summary: 'HORIZONTAL' },
      },
    },
    tabsPosition: {
      control: { type: 'select' },
      options: [TabsVerticalPosition.START, TabsVerticalPosition.END],
      description:
        'Позиция табов в вертикальном режиме. START - табы слева от контента (по умолчанию). END - табы справа от контента. Применяется только при direction=VERTICAL.',
      if: { arg: 'direction', eq: TabsDirection.VERTICAL },
      table: {
        type: { summary: '"start", "end"' },
        defaultValue: { summary: 'START' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: [TabsVariant.PILL, TabsVariant.LINE],
      description:
        'PILL — сегментированный трек. LINE — линия-индикатор. Если не задан: горизонтально pill, вертикально line.',
      table: {
        type: { summary: '"pill", "line"' },
        defaultValue: { summary: 'undefined (авто)' },
      },
    },
    onChange: {
      description:
        'Обработчик изменения активной вкладки. Вызывается при переключении вкладки с параметром value активной вкладки.',
      table: {
        type: { summary: '(activeTab: string) => void' },
        defaultValue: { summary: 'undefined' },
      },
      control: false, // Функции не контролируются через UI
    },
    className: {
      description: 'CSS класс для дополнительной стилизации компонента',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    children: {
      description:
        'Дочерние элементы компонента. Обычно содержит Tabs.List с TabItem компонентами.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
      control: false, // ReactNode не контролируется через UI
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Сегменты, иконки и бейджи */
export const PillSegmentedWithIconsAndBadge: Story = {
  args: {
    defaultActiveTab: 'inbox',
    children: (
      <>
        <Tabs.List>
          <TabItem
            value="inbox"
            label="Входящие"
            iconStart={<Icon name="IconExHome" size="md" />}
            badge={3}
          >
            <div style={{ padding: '16px' }}>Контент «Входящие»</div>
          </TabItem>
          <TabItem value="folders" label="Папки" iconEnd={<Icon name="IconExSettings" size="md" />}>
            <div style={{ padding: '16px' }}>Контент «Папки»</div>
          </TabItem>
          <TabItem
            value="archive"
            label="Архив"
            iconStart={<Icon name="IconExUser" size="md" />}
            badge={12}
          >
            <div style={{ padding: '16px' }}>Контент «Архив»</div>
          </TabItem>
        </Tabs.List>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
  },
};

/** Горизонтальные табы с нижней линией (явный variant=LINE) */
export const LineHorizontal: Story = {
  args: {
    variant: TabsVariant.LINE,
    children: (
      <>
        <Tabs.List>
          <TabItem value="a" label="Вкладка A">
            <div style={{ padding: '16px' }}>Контент A</div>
          </TabItem>
          <TabItem value="b" label="Вкладка B">
            <div style={{ padding: '16px' }}>Контент B</div>
          </TabItem>
        </Tabs.List>
      </>
    ),
  },
  parameters: { layout: 'padded' },
};

export const Default: Story = {
  args: {
    children: (
      <>
        <Tabs.List>
          <TabItem value="overview" label="Overview">
            <div style={{ padding: '16px' }}>
              <h3>Overview</h3>
              <p>This is the overview content of the tabs component.</p>
            </div>
          </TabItem>
          <TabItem value="details" label="Details">
            <div style={{ padding: '16px' }}>
              <h3>Details</h3>
              <p>Detailed information about the component.</p>
            </div>
          </TabItem>
          <TabItem value="settings" label="Settings">
            <div style={{ padding: '16px' }}>
              <h3>Settings</h3>
              <p>Configuration options and settings.</p>
            </div>
          </TabItem>
        </Tabs.List>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithDefaultActive: Story = {
  args: {
    defaultActiveTab: 'details',
    children: (
      <>
        <Tabs.List>
          <TabItem value="overview" label="Overview">
            <div style={{ padding: '16px' }}>
              <h3>Overview</h3>
              <p>This tab is not active by default.</p>
            </div>
          </TabItem>
          <TabItem value="details" label="Details">
            <div style={{ padding: '16px' }}>
              <h3>Details</h3>
              <p>This tab is active by default.</p>
            </div>
          </TabItem>
          <TabItem value="settings" label="Settings">
            <div style={{ padding: '16px' }}>
              <h3>Settings</h3>
              <p>This tab is not active by default.</p>
            </div>
          </TabItem>
        </Tabs.List>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithIcons: Story = {
  args: {
    children: (
      <>
        <Tabs.List>
          <TabItem value="home" label="🏠 Home">
            <div style={{ padding: '16px' }}>
              <h3>Home</h3>
              <p>Welcome to the home page!</p>
            </div>
          </TabItem>
          <TabItem value="profile" label="👤 Profile">
            <div style={{ padding: '16px' }}>
              <h3>Profile</h3>
              <p>User profile information.</p>
            </div>
          </TabItem>
          <TabItem value="settings" label="⚙️ Settings">
            <div style={{ padding: '16px' }}>
              <h3>Settings</h3>
              <p>Application settings and preferences.</p>
            </div>
          </TabItem>
        </Tabs.List>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithComplexContent: Story = {
  args: {
    children: (
      <>
        <Tabs.List>
          <TabItem value="code" label="Code">
            <div style={{ padding: '16px' }}>
              <h3>Code Example</h3>
              <pre
                style={{
                  backgroundColor: '#f8fafc',
                  padding: '12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  overflow: 'auto',
                }}
              >
                {`import { Tabs } from './Tabs';
import { TabItem } from './TabItem';

<Tabs>
  <Tabs.List>
    <TabItem value="tab1" label="Tab 1">
      Content for tab 1
    </TabItem>
    <TabItem value="tab2" label="Tab 2">
      Content for tab 2
    </TabItem>
  </Tabs.List>
</Tabs>`}
              </pre>
            </div>
          </TabItem>
          <TabItem value="preview" label="Preview">
            <div style={{ padding: '16px' }}>
              <h3>Live Preview</h3>
              <div
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '16px',
                  backgroundColor: '#f9fafb',
                }}
              >
                <p>This is a live preview of the tabs component.</p>
              </div>
            </div>
          </TabItem>
          <TabItem value="docs" label="Documentation">
            <div style={{ padding: '16px' }}>
              <h3>Documentation</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <h4>Props</h4>
                  <ul>
                    <li>
                      <strong>defaultActiveTab</strong>: Sets the default active tab
                    </li>
                    <li>
                      <strong>onChange</strong>: Callback when tab changes
                    </li>
                  </ul>
                </div>
                <div>
                  <h4>Usage</h4>
                  <p>
                    The Tabs component provides an organized way to display multiple sections of
                    content.
                  </p>
                </div>
              </div>
            </div>
          </TabItem>
        </Tabs.List>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
  },
};

export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState('tab1');

    const handleChange = (newTab: string) => {
      setActiveTab(newTab);
    };

    return (
      <div style={{ width: '500px' }}>
        <p style={{ marginBottom: '16px' }}>
          Active tab: <strong>{activeTab}</strong>
        </p>
        <Tabs defaultActiveTab={activeTab} onChange={handleChange}>
          <Tabs.List>
            <TabItem value="tab1" label="Tab 1">
              <div style={{ padding: '16px' }}>
                <h3>Tab 1 Content</h3>
                <p>This is controlled externally.</p>
              </div>
            </TabItem>
            <TabItem value="tab2" label="Tab 2">
              <div style={{ padding: '16px' }}>
                <h3>Tab 2 Content</h3>
                <p>This is also controlled externally.</p>
              </div>
            </TabItem>
            <TabItem value="tab3" label="Tab 3">
              <div style={{ padding: '16px' }}>
                <h3>Tab 3 Content</h3>
                <p>This is controlled externally as well.</p>
              </div>
            </TabItem>
          </Tabs.List>
        </Tabs>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

export const Vertical: Story = {
  args: {
    direction: TabsDirection.VERTICAL,
    children: (
      <>
        <Tabs.List>
          <TabItem value="overview" label="Overview">
            <div style={{ padding: '16px' }}>
              <h3>Overview</h3>
              <p>This is the overview content in vertical tabs layout.</p>
              <p>
                Vertical tabs are useful when you have many tabs or when you want to save horizontal
                space.
              </p>
            </div>
          </TabItem>
          <TabItem value="details" label="Details">
            <div style={{ padding: '16px' }}>
              <h3>Details</h3>
              <p>Detailed information about the component in vertical layout.</p>
              <p>You can see that tabs are now displayed on the left side.</p>
            </div>
          </TabItem>
          <TabItem value="settings" label="Settings">
            <div style={{ padding: '16px' }}>
              <h3>Settings</h3>
              <p>Configuration options and settings in vertical layout.</p>
              <p>The active tab indicator is now on the right side of the trigger.</p>
            </div>
          </TabItem>
          <TabItem value="advanced" label="Advanced">
            <div style={{ padding: '16px' }}>
              <h3>Advanced</h3>
              <p>Advanced settings and options in vertical layout.</p>
              <p>This demonstrates how vertical tabs can accommodate more content.</p>
            </div>
          </TabItem>
        </Tabs.List>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Пример использования табов в вертикальном режиме. Вкладки отображаются слева, а контент справа.',
      },
    },
  },
};

export const VerticalWithIcons: Story = {
  args: {
    direction: TabsDirection.VERTICAL,
    children: (
      <>
        <Tabs.List>
          <TabItem value="home" label="🏠 Home">
            <div style={{ padding: '16px' }}>
              <h3>Home</h3>
              <p>Welcome to the home page in vertical tabs layout!</p>
            </div>
          </TabItem>
          <TabItem value="profile" label="👤 Profile">
            <div style={{ padding: '16px' }}>
              <h3>Profile</h3>
              <p>User profile information in vertical layout.</p>
            </div>
          </TabItem>
          <TabItem value="messages" label="💬 Messages">
            <div style={{ padding: '16px' }}>
              <h3>Messages</h3>
              <p>Your messages in vertical tabs layout.</p>
            </div>
          </TabItem>
          <TabItem value="settings" label="⚙️ Settings">
            <div style={{ padding: '16px' }}>
              <h3>Settings</h3>
              <p>Application settings in vertical layout.</p>
            </div>
          </TabItem>
        </Tabs.List>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Вертикальные табы с иконками в лейблах.',
      },
    },
  },
};

export const Horizontal: Story = {
  args: {
    direction: TabsDirection.HORIZONTAL,
    children: (
      <>
        <Tabs.List>
          <TabItem value="overview" label="Overview">
            <div style={{ padding: '16px' }}>
              <h3>Overview</h3>
              <p>This is the overview content in horizontal tabs layout (default).</p>
            </div>
          </TabItem>
          <TabItem value="details" label="Details">
            <div style={{ padding: '16px' }}>
              <h3>Details</h3>
              <p>Detailed information in horizontal layout.</p>
            </div>
          </TabItem>
          <TabItem value="settings" label="Settings">
            <div style={{ padding: '16px' }}>
              <h3>Settings</h3>
              <p>Configuration options in horizontal layout.</p>
            </div>
          </TabItem>
        </Tabs.List>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Пример использования табов в горизонтальном режиме (режим по умолчанию). Вкладки отображаются сверху, а контент снизу.',
      },
    },
  },
};

export const VerticalWithVerticalText: Story = {
  args: {
    direction: TabsDirection.VERTICAL,
    children: (
      <>
        <Tabs.List>
          <TabItem
            value="overview"
            label="Overview"
            textOrientation={TabItemTextOrientation.VERTICAL}
          >
            <div style={{ padding: '16px' }}>
              <h3>Overview</h3>
              <p>This is the overview content in vertical tabs layout with vertical text.</p>
              <p>Vertical text is useful when you have limited horizontal space.</p>
            </div>
          </TabItem>
          <TabItem
            value="details"
            label="Details"
            textOrientation={TabItemTextOrientation.VERTICAL}
          >
            <div style={{ padding: '16px' }}>
              <h3>Details</h3>
              <p>Detailed information about the component in vertical layout with vertical text.</p>
            </div>
          </TabItem>
          <TabItem
            value="settings"
            label="Settings"
            textOrientation={TabItemTextOrientation.VERTICAL}
          >
            <div style={{ padding: '16px' }}>
              <h3>Settings</h3>
              <p>Configuration options and settings in vertical layout with vertical text.</p>
            </div>
          </TabItem>
          <TabItem
            value="advanced"
            label="Advanced"
            textOrientation={TabItemTextOrientation.VERTICAL}
          >
            <div style={{ padding: '16px' }}>
              <h3>Advanced</h3>
              <p>Advanced settings and options in vertical layout with vertical text.</p>
            </div>
          </TabItem>
        </Tabs.List>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Пример использования вертикальных табов с вертикальным текстом в TabItem. Вкладки отображаются слева с вертикальным текстом, а контент справа.',
      },
    },
  },
};

export const VerticalWithVerticalTextLeft: Story = {
  args: {
    direction: TabsDirection.VERTICAL,
    children: (
      <>
        <Tabs.List>
          <TabItem
            value="overview"
            label="Overview"
            textOrientation={TabItemTextOrientation.VERTICAL}
            textPosition={TabItemTextPosition.LEFT}
          >
            <div style={{ padding: '16px' }}>
              <h3>Overview</h3>
              <p>Vertical tabs with vertical text positioned on the left side.</p>
            </div>
          </TabItem>
          <TabItem
            value="details"
            label="Details"
            textOrientation={TabItemTextOrientation.VERTICAL}
            textPosition={TabItemTextPosition.LEFT}
          >
            <div style={{ padding: '16px' }}>
              <h3>Details</h3>
              <p>Detailed information with left-aligned vertical text.</p>
            </div>
          </TabItem>
          <TabItem
            value="settings"
            label="Settings"
            textOrientation={TabItemTextOrientation.VERTICAL}
            textPosition={TabItemTextPosition.LEFT}
          >
            <div style={{ padding: '16px' }}>
              <h3>Settings</h3>
              <p>Settings with left-aligned vertical text.</p>
            </div>
          </TabItem>
        </Tabs.List>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Вертикальные табы с вертикальным текстом, выровненным по левому краю (textPosition=LEFT).',
      },
    },
  },
};

export const VerticalWithVerticalTextRight: Story = {
  args: {
    direction: TabsDirection.VERTICAL,
    children: (
      <>
        <Tabs.List>
          <TabItem
            value="overview"
            label="Overview"
            textOrientation={TabItemTextOrientation.VERTICAL}
            textPosition={TabItemTextPosition.RIGHT}
          >
            <div style={{ padding: '16px' }}>
              <h3>Overview</h3>
              <p>Vertical tabs with vertical text positioned on the right side (default).</p>
            </div>
          </TabItem>
          <TabItem
            value="details"
            label="Details"
            textOrientation={TabItemTextOrientation.VERTICAL}
            textPosition={TabItemTextPosition.RIGHT}
          >
            <div style={{ padding: '16px' }}>
              <h3>Details</h3>
              <p>Detailed information with right-aligned vertical text.</p>
            </div>
          </TabItem>
          <TabItem
            value="settings"
            label="Settings"
            textOrientation={TabItemTextOrientation.VERTICAL}
            textPosition={TabItemTextPosition.RIGHT}
          >
            <div style={{ padding: '16px' }}>
              <h3>Settings</h3>
              <p>Settings with right-aligned vertical text.</p>
            </div>
          </TabItem>
        </Tabs.List>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Вертикальные табы с вертикальным текстом, выровненным по правому краю (textPosition=RIGHT, значение по умолчанию).',
      },
    },
  },
};

export const VerticalWithVerticalTextAndIcons: Story = {
  args: {
    direction: TabsDirection.VERTICAL,
    children: (
      <>
        <Tabs.List>
          <TabItem
            value="home"
            label="Home"
            textOrientation={TabItemTextOrientation.VERTICAL}
            iconStart={<Icon name="IconExHome" size="md" />}
          >
            <div style={{ padding: '16px' }}>
              <h3>Home</h3>
              <p>Welcome to the home page with vertical text and icon!</p>
            </div>
          </TabItem>
          <TabItem
            value="profile"
            label="Profile"
            textOrientation={TabItemTextOrientation.VERTICAL}
            iconStart={<Icon name="IconExUser" size="md" />}
          >
            <div style={{ padding: '16px' }}>
              <h3>Profile</h3>
              <p>User profile information with vertical text and icon.</p>
            </div>
          </TabItem>
          <TabItem
            value="settings"
            label="Settings"
            textOrientation={TabItemTextOrientation.VERTICAL}
            iconStart={<Icon name="IconExSettings" size="md" />}
          >
            <div style={{ padding: '16px' }}>
              <h3>Settings</h3>
              <p>Application settings with vertical text and icon.</p>
            </div>
          </TabItem>
        </Tabs.List>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Вертикальные табы с вертикальным текстом и иконками. Иконки отображаются сверху текста (iconStart).',
      },
    },
  },
};

export const VerticalTabsOnRight: Story = {
  args: {
    direction: TabsDirection.VERTICAL,
    tabsPosition: TabsVerticalPosition.END,
    children: (
      <>
        <Tabs.List>
          <TabItem value="overview" label="Overview">
            <div style={{ padding: '16px' }}>
              <h3>Overview</h3>
              <p>This is the overview content. Tabs are positioned on the right side.</p>
            </div>
          </TabItem>
          <TabItem value="details" label="Details">
            <div style={{ padding: '16px' }}>
              <h3>Details</h3>
              <p>Detailed information. Tabs are on the right, content is on the left.</p>
            </div>
          </TabItem>
          <TabItem value="settings" label="Settings">
            <div style={{ padding: '16px' }}>
              <h3>Settings</h3>
              <p>Configuration options. Tabs positioned on the right side.</p>
            </div>
          </TabItem>
        </Tabs.List>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Вертикальные табы, расположенные справа от контента (tabsPosition=END). Контент отображается слева, табы справа.',
      },
    },
  },
};

export const VerticalTabsOnRightWithVerticalText: Story = {
  args: {
    direction: TabsDirection.VERTICAL,
    tabsPosition: TabsVerticalPosition.END,
    children: (
      <>
        <Tabs.List>
          <TabItem
            value="overview"
            label="Overview"
            textOrientation={TabItemTextOrientation.VERTICAL}
          >
            <div style={{ padding: '16px' }}>
              <h3>Overview</h3>
              <p>Vertical tabs on the right with vertical text orientation.</p>
            </div>
          </TabItem>
          <TabItem
            value="details"
            label="Details"
            textOrientation={TabItemTextOrientation.VERTICAL}
          >
            <div style={{ padding: '16px' }}>
              <h3>Details</h3>
              <p>Detailed information with tabs on the right and vertical text.</p>
            </div>
          </TabItem>
          <TabItem
            value="settings"
            label="Settings"
            textOrientation={TabItemTextOrientation.VERTICAL}
          >
            <div style={{ padding: '16px' }}>
              <h3>Settings</h3>
              <p>Settings with tabs on the right and vertical text.</p>
            </div>
          </TabItem>
        </Tabs.List>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Вертикальные табы справа от контента с вертикальным текстом. Контент слева, табы справа с вертикальным текстом.',
      },
    },
  },
};

