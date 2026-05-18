import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { TabItem } from './TabItem';
import {
  TabsDirection,
  TabsVerticalPosition,
  TabsVariant,
  TabItemTextOrientation,
  TabItemTextPosition,
  type TabsItemDefinition,
} from '../../../types/ui';
import { Icon } from '../Icon/Icon';
import { DOC_TABS } from '@/components/ui/storyDocs/uiKitDocs';
import { tabsStoriesStyles } from './Tabs.stories.styles';

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
  tags: ['autodocs'],
  argTypes: {
    defaultActiveTab: {
      control: { type: 'text' },
      description:
        'Неконтролируемый начальный активный сегмент (алиас см. defaultValue); для вкладок с панелями — value активного TabItem.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    defaultValue: {
      control: { type: 'text' },
      description: 'То же, что defaultActiveTab — удобное имя для сегментов без панелей.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    value: {
      control: { type: 'text' },
      description: 'Контролируемый активный сегмент (вместе с onChange).',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    ariaLabel: {
      description:
        'Доступное имя группы (role="group" на корне); рекомендуется для сегментов без панелей.',
      control: { type: 'text' },
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
      options: [TabsVariant.PILL, TabsVariant.MINIMAL, TabsVariant.LINE, TabsVariant.UNDERLINE],
      description:
        '**pill** — трек с «каплёй». **minimal** / **line** / **underline** — текстовый ряд; серая базовая линия: нет / на весь трек / под триггерами. Без **variant**: горизонтально **pill**, вертикально **minimal**.',
      table: {
        type: { summary: '"pill", "minimal", "line", "underline"' },
        defaultValue: { summary: 'undefined (авто)' },
      },
    },
    filledSegmentTriggers: {
      control: { type: 'boolean' },
      description:
        'Для **minimal** / **line** / **underline**: заливка **primary** активного сегмента, фон трека **backgroundSecondary**, индикатор **2px**.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined → false' },
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
        'Дочерние **TabItem** / **Tabs.Item**: порядок совпадает с порядком сегментов на треке (список создаётся внутри **Tabs**). Если задан непустой **items**, для списка вкладок не используется.',
      table: {
        type: { summary: 'React.ReactNode' },
        defaultValue: { summary: 'undefined' },
      },
      control: false, // ReactNode не контролируется через UI
    },
    items: {
      description:
        'Массив **TabsItemDefinition** — вкладки из данных (**label**, **children** — панели, **disabled**, **loading**, **skeleton** и др.); при непустом значении заменяет **children** для списка.',
      table: {
        type: { summary: 'TabsItemDefinition[]' },
        defaultValue: { summary: 'undefined' },
      },
      control: false,
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
        <TabItem
          value="inbox"
          label="Входящие"
          iconStart={<Icon name="IconExHome" size="md" />}
          badge={3}
        >
          <div style={tabsStoriesStyles.contentPadding16}>Контент «Входящие»</div>
        </TabItem>
        <TabItem value="folders" label="Папки" iconEnd={<Icon name="IconExSettings" size="md" />}>
          <div style={tabsStoriesStyles.contentPadding16}>Контент «Папки»</div>
        </TabItem>
        <TabItem
          value="archive"
          label="Архив"
          iconStart={<Icon name="IconExUser" size="md" />}
          badge={12}
        >
          <div style={tabsStoriesStyles.contentPadding16}>Контент «Архив»</div>
        </TabItem>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
  },
};

/** Горизонтально: вариант **line** с заливкой сегментов (**filledSegmentTriggers**) — прежний «классический» вид табов. */
export const LineHorizontal: Story = {
  args: {
    variant: TabsVariant.LINE,
    filledSegmentTriggers: true,
    children: (
      <>
        <TabItem value="a" label="Вкладка A">
          <div style={tabsStoriesStyles.contentPadding16}>Контент A</div>
        </TabItem>
        <TabItem value="b" label="Вкладка B">
          <div style={tabsStoriesStyles.contentPadding16}>Контент B</div>
        </TabItem>
      </>
    ),
  },
  parameters: { layout: 'padded' },
};

/** Горизонтально: **minimal** — только текст и **1px** полоска **primary** у активной вкладки, без серой базовой линии. */
export const MinimalHorizontal: Story = {
  args: {
    variant: TabsVariant.MINIMAL,
    ariaLabel: 'Разделы, минимальный вид',
    children: (
      <>
        <TabItem value="a" label="Вкладка A">
          <div style={tabsStoriesStyles.contentPadding16}>Контент A</div>
        </TabItem>
        <TabItem value="b" label="Вкладка B">
          <div style={tabsStoriesStyles.contentPadding16}>Контент B</div>
        </TabItem>
        <TabItem value="c" label="Вкладка C">
          <div style={tabsStoriesStyles.contentPadding16}>Контент C</div>
        </TabItem>
      </>
    ),
  },
  parameters: { layout: 'padded' },
};

/** Горизонтально: **line** без заливки — серая базовая линия на всю ширину трека (**TabsVariant.LINE**). */
export const TextVariantLineGrayFull: Story = {
  decorators: [
    (StoryComponent) => (
      <div style={{ ...tabsStoriesStyles.wideDashedPanel, width: 440 }}>
        <StoryComponent />
      </div>
    ),
  ],
  args: {
    variant: TabsVariant.LINE,
    filledSegmentTriggers: false,
    ariaLabel: 'Текстовый ряд, серая линия на всю ширину',
    defaultValue: 'a',
    children: (
      <>
        <TabItem value="a" label="Вкладка A">
          <div style={tabsStoriesStyles.contentPadding16}>Контент A</div>
        </TabItem>
        <TabItem value="b" label="Вкладка B">
          <div style={tabsStoriesStyles.contentPadding16}>Контент B</div>
        </TabItem>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          '**TabsVariant.LINE** без **filledSegmentTriggers**: только общая серая линия и скользящая **primary**.',
      },
    },
  },
};

/** Горизонтально: **underline** — серая линия только под рядом триггеров (**TabsVariant.UNDERLINE**). */
export const TextVariantUnderlineGrayItems: Story = {
  decorators: [
    (StoryComponent) => (
      <div style={{ ...tabsStoriesStyles.wideDashedPanel, width: 440 }}>
        <StoryComponent />
      </div>
    ),
  ],
  args: {
    variant: TabsVariant.UNDERLINE,
    filledSegmentTriggers: false,
    ariaLabel: 'Текстовый ряд, серая линия под вкладками',
    defaultValue: 'a',
    children: (
      <>
        <TabItem value="a" label="Вкладка A">
          <div style={tabsStoriesStyles.contentPadding16}>Контент A</div>
        </TabItem>
        <TabItem value="b" label="Вкладка B">
          <div style={tabsStoriesStyles.contentPadding16}>Контент B</div>
        </TabItem>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          '**TabsVariant.UNDERLINE**: серая базовая линия по ширине триггеров (**fit-content**).',
      },
    },
  },
};

/** Вкладки из пропа **items** (**TabsItemDefinition**): те же поля, что у **TabItem** в группе. */
export const WithItemsProp: Story = {
  args: {
    defaultValue: 'analytics',
    ariaLabel: 'Разделы из items',
    items: [
      {
        value: 'reports',
        label: 'Отчёты',
        children: (
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Отчёты</h3>
            <p>Панель задана через элемент массива **items** (**children** у строки описания).</p>
          </div>
        ),
      },
      {
        value: 'analytics',
        label: 'Аналитика',
        iconStart: <Icon name="IconExUser" size="md" />,
        children: (
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Аналитика</h3>
            <p>
              В той же строке можно передать **iconStart**, **badge**, **loading**, **skeleton** и
              т.д.
            </p>
          </div>
        ),
      },
      {
        value: 'settings',
        label: 'Настройки',
        children: (
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Настройки</h3>
            <p>Переключение работает так же, как при дочерних **TabItem**.</p>
          </div>
        ),
      },
    ] satisfies TabsItemDefinition[],
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Альтернатива дочерним **TabItem**: один массив **TabsItemDefinition** на корне **Tabs**.',
      },
    },
  },
};

/** Состояния **loading**, **skeleton**, **disabled** на вкладках с панелями контента. */
export const WithLoadingSkeletonDisabled: Story = {
  args: {
    defaultActiveTab: 'ready',
    ariaLabel: 'Вкладки с состояниями',
    children: (
      <>
        <TabItem value="ready" label="Готово">
          <div style={tabsStoriesStyles.contentPadding16}>
            <p>Обычная вкладка; переключение доступно.</p>
          </div>
        </TabItem>
        <TabItem value="loading" label="Загрузка…" loading>
          <div style={tabsStoriesStyles.contentPadding16}>
            <p>Контент панели (переключение на эту вкладку заблокировано, на триггере спиннер).</p>
          </div>
        </TabItem>
        <TabItem value="sk" label="" skeleton>
          <div style={tabsStoriesStyles.contentPadding16}>
            <p>Плейсхолдер сегмента; клик недоступен.</p>
          </div>
        </TabItem>
        <TabItem value="locked" label="Недоступно" disabled>
          <div style={tabsStoriesStyles.contentPadding16}>
            <p>Вкладка явно отключена через **disabled**.</p>
          </div>
        </TabItem>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          '**loading** — спиннер и **aria-busy**, выбор недоступен. **skeleton** — скелетон вместо триггера. **disabled** — отключённая кнопка.',
      },
    },
  },
};

/** Тот же сценарий **items**, но вариант **minimal** и одна строка в состоянии **loading**. */
export const WithItemsPropMinimalAndLoading: Story = {
  args: {
    variant: TabsVariant.MINIMAL,
    defaultValue: 'list',
    ariaLabel: 'Список из items, minimal',
    items: [
      {
        value: 'list',
        label: 'Список',
        children: (
          <div style={tabsStoriesStyles.contentPadding16}>
            <p>Вкладки из **items** с **TabsVariant.MINIMAL**.</p>
          </div>
        ),
      },
      {
        value: 'sync',
        label: 'Синхронизация',
        loading: true,
        children: (
          <div style={tabsStoriesStyles.contentPadding16}>
            <p>После завершения загрузки можно снять **loading**.</p>
          </div>
        ),
      },
      {
        value: 'archive',
        label: 'Архив',
        disabled: true,
        children: (
          <div style={tabsStoriesStyles.contentPadding16}>
            <p>Отключённая вкладка в данных.</p>
          </div>
        ),
      },
    ] satisfies TabsItemDefinition[],
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Комбинация **items**, **minimal** и полей **loading** / **disabled** в типе строки.',
      },
    },
  },
};

export const Default: Story = {
  args: {
    children: (
      <>
        <TabItem value="overview" label="Overview">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Overview</h3>
            <p>This is the overview content of the tabs component.</p>
          </div>
        </TabItem>
        <TabItem value="details" label="Details">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Details</h3>
            <p>Detailed information about the component.</p>
          </div>
        </TabItem>
        <TabItem value="settings" label="Settings">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Settings</h3>
            <p>Configuration options and settings.</p>
          </div>
        </TabItem>
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
        <TabItem value="overview" label="Overview">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Overview</h3>
            <p>This tab is not active by default.</p>
          </div>
        </TabItem>
        <TabItem value="details" label="Details">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Details</h3>
            <p>This tab is active by default.</p>
          </div>
        </TabItem>
        <TabItem value="settings" label="Settings">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Settings</h3>
            <p>This tab is not active by default.</p>
          </div>
        </TabItem>
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
        <TabItem value="home" label="🏠 Home">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Home</h3>
            <p>Welcome to the home page!</p>
          </div>
        </TabItem>
        <TabItem value="profile" label="👤 Profile">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Profile</h3>
            <p>User profile information.</p>
          </div>
        </TabItem>
        <TabItem value="settings" label="⚙️ Settings">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Settings</h3>
            <p>Application settings and preferences.</p>
          </div>
        </TabItem>
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
        <TabItem value="code" label="Code">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Code Example</h3>
            <pre style={tabsStoriesStyles.codeBlock}>
              {`import { Tabs } from './Tabs';
import { TabItem } from './TabItem';

<Tabs>
    <TabItem value="tab1" label="Tab 1">
      Content for tab 1
    </TabItem>
    <TabItem value="tab2" label="Tab 2">
      Content for tab 2
    </TabItem>
</Tabs>`}
            </pre>
          </div>
        </TabItem>
        <TabItem value="preview" label="Preview">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Live Preview</h3>
            <div style={tabsStoriesStyles.previewPanel}>
              <p>This is a live preview of the tabs component.</p>
            </div>
          </div>
        </TabItem>
        <TabItem value="docs" label="Documentation">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Documentation</h3>
            <div style={tabsStoriesStyles.docsStack}>
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
      <div style={tabsStoriesStyles.controlledContainer}>
        <p style={tabsStoriesStyles.controlledLabel}>
          Active tab: <strong>{activeTab}</strong>
        </p>
        <Tabs defaultActiveTab={activeTab} onChange={handleChange}>
          <TabItem value="tab1" label="Tab 1">
            <div style={tabsStoriesStyles.contentPadding16}>
              <h3>Tab 1 Content</h3>
              <p>This is controlled externally.</p>
            </div>
          </TabItem>
          <TabItem value="tab2" label="Tab 2">
            <div style={tabsStoriesStyles.contentPadding16}>
              <h3>Tab 2 Content</h3>
              <p>This is also controlled externally.</p>
            </div>
          </TabItem>
          <TabItem value="tab3" label="Tab 3">
            <div style={tabsStoriesStyles.contentPadding16}>
              <h3>Tab 3 Content</h3>
              <p>This is controlled externally as well.</p>
            </div>
          </TabItem>
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
        <TabItem value="overview" label="Overview">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Overview</h3>
            <p>This is the overview content in vertical tabs layout.</p>
            <p>
              Vertical tabs are useful when you have many tabs or when you want to save horizontal
              space.
            </p>
          </div>
        </TabItem>
        <TabItem value="details" label="Details">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Details</h3>
            <p>Detailed information about the component in vertical layout.</p>
            <p>You can see that tabs are now displayed on the left side.</p>
          </div>
        </TabItem>
        <TabItem value="settings" label="Settings">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Settings</h3>
            <p>Configuration options and settings in vertical layout.</p>
            <p>The active tab indicator is now on the right side of the trigger.</p>
          </div>
        </TabItem>
        <TabItem value="advanced" label="Advanced">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Advanced</h3>
            <p>Advanced settings and options in vertical layout.</p>
            <p>This demonstrates how vertical tabs can accommodate more content.</p>
          </div>
        </TabItem>
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
        <TabItem value="home" label="🏠 Home">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Home</h3>
            <p>Welcome to the home page in vertical tabs layout!</p>
          </div>
        </TabItem>
        <TabItem value="profile" label="👤 Profile">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Profile</h3>
            <p>User profile information in vertical layout.</p>
          </div>
        </TabItem>
        <TabItem value="messages" label="💬 Messages">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Messages</h3>
            <p>Your messages in vertical tabs layout.</p>
          </div>
        </TabItem>
        <TabItem value="settings" label="⚙️ Settings">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Settings</h3>
            <p>Application settings in vertical layout.</p>
          </div>
        </TabItem>
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
        <TabItem value="overview" label="Overview">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Overview</h3>
            <p>This is the overview content in horizontal tabs layout (default).</p>
          </div>
        </TabItem>
        <TabItem value="details" label="Details">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Details</h3>
            <p>Detailed information in horizontal layout.</p>
          </div>
        </TabItem>
        <TabItem value="settings" label="Settings">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Settings</h3>
            <p>Configuration options in horizontal layout.</p>
          </div>
        </TabItem>
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
        <TabItem
          value="overview"
          label="Overview"
          textOrientation={TabItemTextOrientation.VERTICAL}
        >
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Overview</h3>
            <p>This is the overview content in vertical tabs layout with vertical text.</p>
            <p>Vertical text is useful when you have limited horizontal space.</p>
          </div>
        </TabItem>
        <TabItem value="details" label="Details" textOrientation={TabItemTextOrientation.VERTICAL}>
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Details</h3>
            <p>Detailed information about the component in vertical layout with vertical text.</p>
          </div>
        </TabItem>
        <TabItem
          value="settings"
          label="Settings"
          textOrientation={TabItemTextOrientation.VERTICAL}
        >
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Settings</h3>
            <p>Configuration options and settings in vertical layout with vertical text.</p>
          </div>
        </TabItem>
        <TabItem
          value="advanced"
          label="Advanced"
          textOrientation={TabItemTextOrientation.VERTICAL}
        >
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Advanced</h3>
            <p>Advanced settings and options in vertical layout with vertical text.</p>
          </div>
        </TabItem>
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
        <TabItem
          value="overview"
          label="Overview"
          textOrientation={TabItemTextOrientation.VERTICAL}
          textPosition={TabItemTextPosition.LEFT}
        >
          <div style={tabsStoriesStyles.contentPadding16}>
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
          <div style={tabsStoriesStyles.contentPadding16}>
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
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Settings</h3>
            <p>Settings with left-aligned vertical text.</p>
          </div>
        </TabItem>
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
        <TabItem
          value="overview"
          label="Overview"
          textOrientation={TabItemTextOrientation.VERTICAL}
          textPosition={TabItemTextPosition.RIGHT}
        >
          <div style={tabsStoriesStyles.contentPadding16}>
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
          <div style={tabsStoriesStyles.contentPadding16}>
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
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Settings</h3>
            <p>Settings with right-aligned vertical text.</p>
          </div>
        </TabItem>
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
        <TabItem
          value="home"
          label="Home"
          textOrientation={TabItemTextOrientation.VERTICAL}
          iconStart={<Icon name="IconExHome" size="md" />}
        >
          <div style={tabsStoriesStyles.contentPadding16}>
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
          <div style={tabsStoriesStyles.contentPadding16}>
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
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Settings</h3>
            <p>Application settings with vertical text and icon.</p>
          </div>
        </TabItem>
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
        <TabItem value="overview" label="Overview">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Overview</h3>
            <p>This is the overview content. Tabs are positioned on the right side.</p>
          </div>
        </TabItem>
        <TabItem value="details" label="Details">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Details</h3>
            <p>Detailed information. Tabs are on the right, content is on the left.</p>
          </div>
        </TabItem>
        <TabItem value="settings" label="Settings">
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Settings</h3>
            <p>Configuration options. Tabs positioned on the right side.</p>
          </div>
        </TabItem>
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
        <TabItem
          value="overview"
          label="Overview"
          textOrientation={TabItemTextOrientation.VERTICAL}
        >
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Overview</h3>
            <p>Vertical tabs on the right with vertical text orientation.</p>
          </div>
        </TabItem>
        <TabItem value="details" label="Details" textOrientation={TabItemTextOrientation.VERTICAL}>
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Details</h3>
            <p>Detailed information with tabs on the right and vertical text.</p>
          </div>
        </TabItem>
        <TabItem
          value="settings"
          label="Settings"
          textOrientation={TabItemTextOrientation.VERTICAL}
        >
          <div style={tabsStoriesStyles.contentPadding16}>
            <h3>Settings</h3>
            <p>Settings with tabs on the right and vertical text.</p>
          </div>
        </TabItem>
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
