import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Accordion } from './Accordion';
import { DOC_ACCORDION } from '@/components/ui/storyDocs/uiKitDocs';
import { glassLightTheme } from '@/themes/themes';
import { accordionStoriesStyles } from './Accordion.stories.styles';

const meta: Meta<typeof Accordion> = {
  title: 'UI Kit/Data Display/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_ACCORDION,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultOpen: {
      control: { type: 'boolean' },
      description: 'Открыт по умолчанию',
      table: { type: { summary: 'boolean' } },
    },
    allowMultiple: {
      control: { type: 'boolean' },
      description: 'Позволяет открывать несколько элементов одновременно',
      table: { type: { summary: 'boolean' } },
    },
    autoClose: {
      control: { type: 'boolean' },
      description: 'Автоматически закрывать другие элементы при открытии нового',
      table: { type: { summary: 'boolean' } },
    },
    onChange: {
      description: 'Сообщает об открытии или закрытии секции',
      table: {
        type: { summary: '(isOpen: boolean) => void' },
      },
    },
    firstItemBorderRadius: {
      control: { type: 'boolean' },
      description: 'Скругление верхних углов у первого элемента',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
    lastItemBorderRadius: {
      control: { type: 'boolean' },
      description: 'Скругление нижних углов у последнего элемента',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Accordion.Item value="item1" position="start">
          <Accordion.Trigger title="Accordion title" subtitle="Subtitle" />
          <Accordion.Content>
            When you start thinking a lot about your past, it becomes your present and you
            can&apos;t see your future without it. When
          </Accordion.Content>
        </Accordion.Item>
      </>
    ),
  },
};

export const MultipleItems: Story = {
  args: {
    children: (
      <>
        <Accordion.Item value="item1" position="start">
          <Accordion.Trigger title="Getting Started" subtitle="Learn the basics" />
          <Accordion.Content>
            <p>To get started with ARSAIP:</p>
            <ol>
              <li>Clone the repository</li>
              <li>Install dependencies</li>
              <li>Run the development server</li>
            </ol>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2" position="center">
          <Accordion.Trigger title="Architecture" subtitle="System design" />
          <Accordion.Content>
            <p>ARSAIP follows a microservices architecture pattern:</p>
            <ul>
              <li>Independent services</li>
              <li>Shared UI components</li>
              <li>Centralized state management</li>
            </ul>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item3" position="center">
          <Accordion.Trigger title="Components" subtitle="UI library" />
          <Accordion.Content>
            <p>The UI library includes:</p>
            <ul>
              <li>Buttons and forms</li>
              <li>Navigation components</li>
              <li>Data display components</li>
              <li>Feedback components</li>
            </ul>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item4" position="last">
          <Accordion.Trigger title="Deployment" subtitle="Production setup" />
          <Accordion.Content>
            <p>Deployment options:</p>
            <ul>
              <li>Docker containers</li>
              <li>Kubernetes clusters</li>
              <li>Cloud platforms</li>
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
  },
};

export const DefaultOpen: Story = {
  args: {
    defaultOpen: true,
    children: (
      <>
        <Accordion.Item value="item1" position="start">
          <Accordion.Trigger title="Open by Default" subtitle="Pre-expanded content" />
          <Accordion.Content>
            This accordion item is open by default. You can see the content immediately.
          </Accordion.Content>
        </Accordion.Item>
      </>
    ),
  },
};

export const AllowMultiple: Story = {
  args: {
    allowMultiple: true,
    children: (
      <>
        <Accordion.Item value="item1" position="start">
          <Accordion.Trigger title="First Item" subtitle="Can be opened with others" />
          <Accordion.Content>
            This item can be opened simultaneously with other items.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2" position="center">
          <Accordion.Trigger title="Second Item" subtitle="Multiple items open" />
          <Accordion.Content>
            Multiple accordion items can be open at the same time.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item3" position="last">
          <Accordion.Trigger title="Third Item" subtitle="Independent behavior" />
          <Accordion.Content>
            Each item operates independently when allowMultiple is true.
          </Accordion.Content>
        </Accordion.Item>
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
        <Accordion.Item value="item1" position="start">
          <Accordion.Trigger title="📚 Documentation" subtitle="Comprehensive guides" />
          <Accordion.Content>
            <p>Comprehensive documentation for all components and services.</p>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2" position="center">
          <Accordion.Trigger title="⚙️ Configuration" subtitle="Setup instructions" />
          <Accordion.Content>
            <p>Configuration options and setup instructions.</p>
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item3" position="last">
          <Accordion.Trigger title="🚀 Deployment" subtitle="Production guides" />
          <Accordion.Content>
            <p>Deployment guides and best practices.</p>
          </Accordion.Content>
        </Accordion.Item>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
  },
};

export const Controlled: Story = {
  render: () => {
    const [openItems, setOpenItems] = React.useState<Set<string>>(new Set(['item1']));

    const _handleChange = (itemId: string, isOpen: boolean) => {
      const newOpenItems = new Set(openItems);
      if (isOpen) {
        newOpenItems.add(itemId);
      } else {
        newOpenItems.delete(itemId);
      }
      setOpenItems(newOpenItems);
    };

    return (
      <div style={accordionStoriesStyles.controlledContainer}>
        <p style={accordionStoriesStyles.controlledCaption}>
          Open items: {Array.from(openItems).join(', ')}
        </p>
        <Accordion>
          <Accordion.Item value="item1" position="start">
            <Accordion.Trigger title="Controlled Item 1" subtitle="External control" />
            <Accordion.Content>This item is controlled externally.</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item2" position="last">
            <Accordion.Trigger title="Controlled Item 2" subtitle="State management" />
            <Accordion.Content>This item is also controlled externally.</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  },
  parameters: {
    layout: 'padded',
  },
};

// Новые примеры с выравниванием
export const LeftAligned: Story = {
  args: {
    children: (
      <>
        <Accordion.Item value="item1" position="start">
          <Accordion.Trigger
            title="Left Aligned Title"
            subtitle="Default left alignment"
            align="left"
          />
          <Accordion.Content align="left">
            This content is left-aligned by default. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2" position="center">
          <Accordion.Trigger
            title="Another Left Item"
            subtitle="Consistent alignment"
            align="left"
          />
          <Accordion.Content align="left">
            All text in this accordion is aligned to the left side. This provides a clean, readable
            layout for most content types.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item3" position="last">
          <Accordion.Trigger title="Final Left Item" subtitle="Standard layout" align="left" />
          <Accordion.Content align="left">
            Left alignment is the most common choice for text content and provides excellent
            readability.
          </Accordion.Content>
        </Accordion.Item>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Аккордеон с выравниванием по левому краю (по умолчанию). Подходит для большинства случаев использования.',
      },
    },
  },
};

export const CenterAligned: Story = {
  args: {
    children: (
      <>
        <Accordion.Item value="item1" position="start">
          <Accordion.Trigger
            title="Center Aligned Title"
            subtitle="Centered content"
            align="center"
          />
          <Accordion.Content align="center">
            This content is center-aligned. Perfect for titles, short descriptions, or when you want
            to create a more balanced, symmetrical layout.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2" position="center">
          <Accordion.Trigger
            title="Centered Design"
            subtitle="Balanced appearance"
            align="center"
          />
          <Accordion.Content align="center">
            Center alignment works well for short text blocks and creates a more formal, structured
            appearance.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item3" position="last">
          <Accordion.Trigger
            title="Final Center Item"
            subtitle="Symmetrical layout"
            align="center"
          />
          <Accordion.Content align="center">
            Use center alignment when you want to emphasize the content or create a more formal
            presentation.
          </Accordion.Content>
        </Accordion.Item>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Аккордеон с выравниванием по центру. Идеально подходит для заголовков, коротких описаний или создания более сбалансированного дизайна.',
      },
    },
  },
};

export const RightAligned: Story = {
  args: {
    children: (
      <>
        <Accordion.Item value="item1" position="start">
          <Accordion.Trigger
            title="Right Aligned Title"
            subtitle="Right-side alignment"
            align="right"
          />
          <Accordion.Content align="right">
            This content is right-aligned. Useful for specific design requirements or when you need
            to align with other right-aligned elements on the page.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2" position="center">
          <Accordion.Trigger
            title="Right Side Design"
            subtitle="Alternative layout"
            align="right"
          />
          <Accordion.Content align="right">
            Right alignment can be used for special cases where you need to create visual balance or
            align with specific design patterns.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item3" position="last">
          <Accordion.Trigger
            title="Final Right Item"
            subtitle="Consistent right alignment"
            align="right"
          />
          <Accordion.Content align="right">
            Right alignment is less common but can be effective for specific design requirements or
            multilingual layouts.
          </Accordion.Content>
        </Accordion.Item>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Аккордеон с выравниванием по правому краю. Подходит для специальных дизайнерских решений или выравнивания с другими элементами интерфейса.',
      },
    },
  },
};

export const MixedAlignment: Story = {
  args: {
    children: (
      <>
        <Accordion.Item value="item1" position="start">
          <Accordion.Trigger
            title="Left Aligned Header"
            subtitle="With left content"
            align="left"
          />
          <Accordion.Content align="left">
            This item has left-aligned header and content. Perfect for standard text content and
            documentation.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2" position="center">
          <Accordion.Trigger
            title="Center Aligned Header"
            subtitle="With center content"
            align="center"
          />
          <Accordion.Content align="center">
            This item demonstrates center alignment for both header and content. Great for titles
            and short descriptions.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item3" position="center">
          <Accordion.Trigger title="Left Header" subtitle="With center content" align="left" />
          <Accordion.Content align="center">
            You can mix different alignments - left header with center content, or any other
            combination that fits your design needs.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item4" position="last">
          <Accordion.Trigger
            title="Right Aligned Header"
            subtitle="With right content"
            align="right"
          />
          <Accordion.Content align="right">
            This shows right alignment for both header and content. Useful for specific design
            requirements or RTL layouts.
          </Accordion.Content>
        </Accordion.Item>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Пример смешанного выравнивания - разные элементы аккордеона могут иметь разное выравнивание заголовков и содержимого в зависимости от дизайнерских требований.',
      },
    },
  },
};

export const AutoClose: Story = {
  args: {
    autoClose: true,
    children: (
      <>
        <Accordion.Item value="item1" position="start">
          <Accordion.Trigger title="First Item" subtitle="Auto-close enabled" />
          <Accordion.Content>
            When you open this item, all other items will automatically close. This creates a
            traditional accordion behavior where only one item can be open at a time.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2" position="center">
          <Accordion.Trigger title="Second Item" subtitle="Try opening this one" />
          <Accordion.Content>
            Opening this item will close the first one. The autoClose feature ensures that only one
            accordion item is open at any given time, providing a cleaner user experience.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item3" position="center">
          <Accordion.Trigger title="Third Item" subtitle="And this one too" />
          <Accordion.Content>
            This is the third item. When you open it, the previous items will close automatically.
            This behavior is useful for FAQ sections, navigation menus, or any interface where you
            want to focus on one piece of content at a time.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item4" position="last">
          <Accordion.Trigger title="Last Item" subtitle="Final example" />
          <Accordion.Content>
            This is the final item in the accordion. The autoClose feature works consistently across
            all items, ensuring a predictable and intuitive user experience.
          </Accordion.Content>
        </Accordion.Item>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Аккордеон с включенной функцией autoClose - при открытии любого элемента все остальные автоматически закрываются. Это создает традиционное поведение аккордеона, где одновременно может быть открыт только один элемент.',
      },
    },
  },
};

export const AutoCloseWithMultiple: Story = {
  args: {
    allowMultiple: true,
    autoClose: true,
    children: (
      <>
        <Accordion.Item value="item1" position="start">
          <Accordion.Trigger title="Multiple + AutoClose" subtitle="Combined behavior" />
          <Accordion.Content>
            This accordion has both allowMultiple and autoClose enabled. The autoClose behavior
            takes precedence - when you open any item, all others will close automatically.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2" position="center">
          <Accordion.Trigger title="Second Item" subtitle="AutoClose wins" />
          <Accordion.Content>
            Even though allowMultiple is true, autoClose overrides this behavior. This ensures
            consistent single-item-open behavior regardless of the allowMultiple setting.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item3" position="last">
          <Accordion.Trigger title="Third Item" subtitle="Priority order" />
          <Accordion.Content>
            The priority order is: autoClose {'>'} allowMultiple {'>'} default behavior. This gives
            you fine-grained control over accordion behavior.
          </Accordion.Content>
        </Accordion.Item>
      </>
    ),
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Пример комбинированного поведения - когда включены и allowMultiple, и autoClose, приоритет имеет autoClose. Это обеспечивает предсказуемое поведение аккордеона.',
      },
    },
  },
};

export const WithoutOuterBorderRadius: Story = {
  name: 'Без внешних скруглений',
  args: {
    firstItemBorderRadius: false,
    lastItemBorderRadius: false,
    children: (
      <>
        <Accordion.Item value="item1" position="start">
          <Accordion.Trigger title="Первый элемент" subtitle="Без верхних скруглений" />
          <Accordion.Content>
            У корневого Accordion задано firstItemBorderRadius=false — верх аккордеона ровный.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2" position="center">
          <Accordion.Trigger title="Средний элемент" subtitle="Без изменений" />
          <Accordion.Content>Средние элементы не затрагиваются отдельными пропсами.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item3" position="last">
          <Accordion.Trigger title="Последний элемент" subtitle="Без нижних скруглений" />
          <Accordion.Content>
            lastItemBorderRadius=false убирает скругление только у нижних углов последнего элемента.
          </Accordion.Content>
        </Accordion.Item>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Оба пропса выключены: аккордеон без скругления сверху и снизу — удобно вставлять во внешний контейнер с собственным radius.',
      },
    },
  },
};

export const WithoutFirstItemBorderRadius: Story = {
  name: 'Без скругления первого элемента',
  args: {
    firstItemBorderRadius: false,
    children: (
      <>
        <Accordion.Item value="item1" position="start">
          <Accordion.Trigger title="Первый элемент" />
          <Accordion.Content>Только верхние углы без скругления.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2" position="last">
          <Accordion.Trigger title="Последний элемент" />
          <Accordion.Content>Нижние углы остаются скруглёнными.</Accordion.Content>
        </Accordion.Item>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'firstItemBorderRadius=false — у первого Accordion.Item обнуляются border-top-left/right-radius.',
      },
    },
  },
};

export const WithoutLastItemBorderRadius: Story = {
  name: 'Без скругления последнего элемента',
  args: {
    lastItemBorderRadius: false,
    children: (
      <>
        <Accordion.Item value="item1" position="start">
          <Accordion.Trigger title="Первый элемент" />
          <Accordion.Content>Верхние углы остаются скруглёнными.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2" position="last">
          <Accordion.Trigger title="Последний элемент" />
          <Accordion.Content>Нижние углы без скругления.</Accordion.Content>
        </Accordion.Item>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'lastItemBorderRadius=false — у последнего Accordion.Item обнуляются border-bottom-left/right-radius.',
      },
    },
  },
};

export const EmbeddedInContainer: Story = {
  name: 'Встроенный в карточку',
  render: () => (
    <div style={accordionStoriesStyles.embeddedContainer}>
      <Accordion firstItemBorderRadius={false} lastItemBorderRadius={false} autoClose>
        <Accordion.Item value="item1" position="start">
          <Accordion.Trigger title="Секция 1" subtitle="Встроенный аккордеон" />
          <Accordion.Content>
            Внешний контейнер задаёт скругление; аккордеон примыкает к краям без двойного radius.
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item2" position="center">
          <Accordion.Trigger title="Секция 2" />
          <Accordion.Content>Средние элементы сохраняют разделители из темы.</Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item3" position="last">
          <Accordion.Trigger title="Секция 3" />
          <Accordion.Content>Нижний край аккордеона совпадает с нижним краем карточки.</Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Типичный сценарий: firstItemBorderRadius и lastItemBorderRadius = false внутри родителя с border-radius.',
      },
    },
  },
};

export const GlassVibrancy: Story = {
  name: 'Glass vibrancy',
  render: () => (
    <StyledThemeProvider theme={glassLightTheme}>
      <div
        style={{
          ...accordionStoriesStyles.glassDemoCanvas,
          background: glassLightTheme.surfaceMaterial?.pageBackground,
          backgroundAttachment: 'fixed',
        }}
      >
        <Accordion autoClose>
          <Accordion.Item value="item1" position="start">
            <Accordion.Trigger title="Glass аккордеон" subtitle="Лёгкая прозрачность" />
            <Accordion.Content>
              В темах glassLight / glassDark фон полупрозрачный, backdrop-filter из theme.accordions.settings.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item2" position="center">
            <Accordion.Trigger title="Разделители" subtitle="borderSecondary" />
            <Accordion.Content>Границы между секциями берутся из палитры glass-темы.</Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item3" position="last">
            <Accordion.Trigger title="Hover" />
            <Accordion.Content>При наведении фон секции слегка усиливается.</Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </div>
    </StyledThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Демо glassLightTheme. В Storybook можно также переключить глобальную тему на glassLight / glassDark.',
      },
    },
  },
};
