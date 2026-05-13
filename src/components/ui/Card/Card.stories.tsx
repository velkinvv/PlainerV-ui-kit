import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { Card } from './Card';
import { Calendar } from '../Calendar/Calendar';
import { Avatar } from '../Avatar/Avatar';
import { Badge } from '../Badge/Badge';
import { Button } from '../buttons/Button';
import { Divider } from '../Divider/Divider';
import { Progress } from '../Progress/Progress';
import { Typography } from '../Typography/Typography';
import { CardVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import { DOC_CARD } from '@/components/ui/storyDocs/uiKitDocs';
import { darkTheme } from '../../../themes/themes';
import {
  buildDarkCardSurfaceStyle,
  buildDarkTertiaryCardStyle,
  cardStoriesStyles,
} from './Card.stories.styles';

const meta: Meta<typeof Card> = {
  title: 'UI Kit/Surfaces/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_CARD,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [...Object.values(CardVariant)],
      description: 'Вариант стилизации карточки',
      table: {
        type: { summary: 'CardVariant: elevated, outlined или filled' },
      },
    },
    size: {
      control: { type: 'select' },
      options: [...Object.values(Size)],
      description: 'Размер карточки',
      table: {
        type: { summary: 'Size: XS, SM, MD, LG, XL' },
      },
    },
    padding: {
      control: { type: 'select' },
      options: [...Object.values(Size)],
      description: 'Внутренние отступы',
      table: {
        type: { summary: 'Size: XS, SM, MD, LG, XL' },
      },
    },
    hoverable: {
      control: { type: 'boolean' },
      description: 'Эффект при наведении',
      table: { type: { summary: 'boolean' } },
    },
    clickable: {
      control: { type: 'boolean' },
      description: 'Кликабельность',
      table: { type: { summary: 'boolean' } },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Полная ширина',
      table: { type: { summary: 'boolean' } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <Typography variant="h3">Card Title</Typography>
        <Typography>This is a basic card with some content.</Typography>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: CardVariant.ELEVATED,
    children: (
      <div>
        <Typography variant="h3">Elevated Card</Typography>
        <Typography>
          This card has an enhanced elevated shadow effect with subtle border.
        </Typography>
        <Typography>Карточка с усиленной тенью и лёгкой обводкой.</Typography>
      </div>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: CardVariant.OUTLINED,
    children: (
      <div>
        <Typography variant="h3">Outlined Card</Typography>
        <Typography>This card has an outlined border.</Typography>
      </div>
    ),
  },
};

export const Filled: Story = {
  args: {
    variant: CardVariant.FILLED,
    children: (
      <div>
        <Typography variant="h3">Filled Card</Typography>
        <Typography>This card has a filled background.</Typography>
      </div>
    ),
  },
};

export const Small: Story = {
  args: {
    size: Size.SM,
    children: (
      <div>
        <Typography variant="h4">Small Card</Typography>
        <Typography>Compact card with small size.</Typography>
      </div>
    ),
  },
};

export const Medium: Story = {
  args: {
    size: Size.MD,
    children: (
      <div>
        <Typography variant="h3">Medium Card</Typography>
        <Typography>Standard sized card.</Typography>
      </div>
    ),
  },
};

export const Large: Story = {
  args: {
    size: Size.LG,
    children: (
      <div>
        <Typography variant="h2">Large Card</Typography>
        <Typography>Large card with more space for content.</Typography>
      </div>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: (
      <div>
        <Typography variant="h3">Hoverable Card</Typography>
        <Typography>Hover over this card to see the effect.</Typography>
      </div>
    ),
  },
};

export const Clickable: Story = {
  args: {
    clickable: true,
    onClick: fn(),
    children: (
      <div>
        <Typography variant="h3">Clickable Card</Typography>
        <Typography>Click this card to trigger an action.</Typography>
      </div>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    padding: undefined,
    children: (
      <div style={cardStoriesStyles.noPaddingContent}>
        <Typography variant="h3">No Padding Card</Typography>
        <Typography>This card has no internal padding.</Typography>
      </div>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: (
      <div>
        <Typography variant="h3">Full Width Card</Typography>
        <Typography>This card takes the full width of its container.</Typography>
      </div>
    ),
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithImage: Story = {
  args: {
    children: (
      <div>
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
          alt="Card Image"
          style={cardStoriesStyles.imagePreview}
        />
        <div style={cardStoriesStyles.imageContent}>
          <Typography variant="h3">Card with Image</Typography>
          <Typography>This card includes an image at the top.</Typography>
        </div>
      </div>
    ),
  },
};

const darkSurfaceTheme = darkTheme;
const newsCardSurfaceStyle = buildDarkCardSurfaceStyle(
  darkSurfaceTheme,
  cardStoriesStyles.newsCardRoot,
);
const compositeCardSurfaceStyle = buildDarkCardSurfaceStyle(
  darkSurfaceTheme,
  cardStoriesStyles.compositeCard,
);
const primaryTaskSurfaceStyle = buildDarkTertiaryCardStyle(
  darkSurfaceTheme,
  cardStoriesStyles.taskPrimaryCard,
);
const rowTaskSurfaceStyle = buildDarkTertiaryCardStyle(
  darkSurfaceTheme,
  cardStoriesStyles.taskRowCard,
);

// Карточка новости — составной пример (на компонентах UI-kit + токены темы)
export const NewsCard: Story = {
  render: () => (
    <StyledThemeProvider theme={darkSurfaceTheme}>
      <Card variant={CardVariant.ELEVATED} style={newsCardSurfaceStyle}>
        <header style={cardStoriesStyles.newsHeader}>
          <div style={cardStoriesStyles.newsAuthorGroup}>
            <Avatar userName="Александр Филимонов" />
            <div>
              <Typography style={cardStoriesStyles.newsText} color={darkSurfaceTheme.colors.text}>
                Александр Филимонов
              </Typography>
              <Typography
                style={cardStoriesStyles.newsText}
                color={darkSurfaceTheme.colors.textSecondary}
              >
                3 мая 2022
              </Typography>
            </div>
          </div>
          <div style={cardStoriesStyles.newsActionGroup}>
            <Badge>124</Badge>
            <Button size={Size.SM}>Подробнее</Button>
          </div>
        </header>

        <section style={cardStoriesStyles.newsBodySection}>
          <Typography
            variant="h2"
            style={cardStoriesStyles.newsTitle}
            color={darkSurfaceTheme.colors.text}
          >
            Элементы политического процесса распределены по отраслям
          </Typography>
          <Typography
            style={cardStoriesStyles.newsText}
            color={darkSurfaceTheme.colors.textSecondary}
          >
            Пример композиции карточки на базовых компонентах UI-kit с токенами темы, без самописных
            декоративных блоков.
          </Typography>
        </section>

        <Divider />

        <section style={cardStoriesStyles.newsProgressSection}>
          <Progress value={55} variant="linear" label="Прогресс публикации" showValueLabel />
        </section>
      </Card>
    </StyledThemeProvider>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Две карточки: календарь и список дел (оба блока — на компонентах UI-kit)
export const CompositeCardsShowcase: Story = {
  render: () => (
    <StyledThemeProvider theme={darkSurfaceTheme}>
      <div style={cardStoriesStyles.compositeRoot}>
        <Card variant={CardVariant.ELEVATED} style={compositeCardSurfaceStyle}>
          <Typography
            variant="h3"
            style={cardStoriesStyles.compositeCardTitle}
            color={darkSurfaceTheme.colors.text}
          >
            Календарь
          </Typography>
          <Calendar
            embedded
            fullWidth
            locale="ru-RU"
            defaultVisibleMonth={new Date(2022, 4, 1)}
            defaultValue={new Date(2022, 4, 18)}
            showMonthPicker={false}
          />
        </Card>

        <Card variant={CardVariant.ELEVATED} style={compositeCardSurfaceStyle}>
          <Typography
            variant="h3"
            style={cardStoriesStyles.compositeCardTitle}
            color={darkSurfaceTheme.colors.text}
          >
            Список дел
          </Typography>
          <div style={cardStoriesStyles.tasksList}>
            <Card variant={CardVariant.FILLED} style={primaryTaskSurfaceStyle}>
              <Typography style={cardStoriesStyles.taskTitle} color={darkSurfaceTheme.colors.text}>
                Заголовок дела
              </Typography>
              <Typography
                style={cardStoriesStyles.taskTimePrimary}
                color={darkSurfaceTheme.colors.textSecondary}
              >
                20:00 28 сентября
              </Typography>
              <Progress value={55} variant="linear" showValueLabel />
            </Card>

            <Divider />

            {['21:00 28 сентября', '21:30 28 сентября', '22:00 28 сентября'].map((taskTime) => (
              <Card key={taskTime} variant={CardVariant.FILLED} style={rowTaskSurfaceStyle}>
                <Typography
                  style={cardStoriesStyles.taskTitle}
                  color={darkSurfaceTheme.colors.text}
                >
                  Заголовок дела
                </Typography>
                <Typography
                  style={cardStoriesStyles.taskTimeSecondary}
                  color={darkSurfaceTheme.colors.textSecondary}
                >
                  {taskTime}
                </Typography>
              </Card>
            ))}

            <Button fullWidth>Закрыть</Button>
          </div>
        </Card>
      </div>
    </StyledThemeProvider>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={cardStoriesStyles.variantsRow}>
      <Card variant={CardVariant.ELEVATED} style={cardStoriesStyles.variantCard}>
        <Typography variant="h4">Elevated</Typography>
        <Typography>Elevated variant</Typography>
      </Card>
      <Card variant={CardVariant.OUTLINED} style={cardStoriesStyles.variantCard}>
        <Typography variant="h4">Outlined</Typography>
        <Typography>Outlined variant</Typography>
      </Card>
      <Card variant={CardVariant.FILLED} style={cardStoriesStyles.variantCard}>
        <Typography variant="h4">Filled</Typography>
        <Typography>Filled variant</Typography>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={cardStoriesStyles.sizesRow}>
      <Card size={Size.SM} style={cardStoriesStyles.sizeCardSmall}>
        <Typography variant="h4">Small</Typography>
        <Typography>Small size</Typography>
      </Card>
      <Card size={Size.MD} style={cardStoriesStyles.sizeCardMedium}>
        <Typography variant="h3">Medium</Typography>
        <Typography>Medium size</Typography>
      </Card>
      <Card size={Size.LG} style={cardStoriesStyles.sizeCardLarge}>
        <Typography variant="h2">Large</Typography>
        <Typography>Large size</Typography>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
