import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DOC_THEME_VARIANT_SELECTOR } from '@/components/ui/storyDocs/uiKitDocs';
import { Button } from '@/components/ui/buttons/Button';
import { Typography } from '@/components/ui/Typography';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ThemeVariantSelector } from './ThemeVariantSelector';
import { themeVariantSelectorStoriesStyles } from './ThemeVariantSelector.stories.styles';

const meta: Meta<typeof ThemeVariantSelector> = {
  title: 'UI Kit/Theming/ThemeVariantSelector',
  component: ThemeVariantSelector,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_THEME_VARIANT_SELECTOR,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Вариант оформления',
  render: () => <ThemeVariantSelector />,
};

export const WithColorSchemeToggle: Story = {
  name: 'Вариант + палитра',
  render: () => (
    <div style={themeVariantSelectorStoriesStyles.panel}>
      <div style={themeVariantSelectorStoriesStyles.controlsRow}>
        <ThemeVariantSelector />
        <ThemeToggle />
      </div>
      <Typography variant="body2" color="secondary">
        Два независимых переключателя: вариант (standard / glass / kidsBoys / kidsGirls) и палитра (light / dark).
      </Typography>
      <Button variant="primary">Primary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};

export const KidsBoysTheme: Story = {
  name: 'Детская (мальчики)',
  render: () => (
    <div style={themeVariantSelectorStoriesStyles.panel}>
      <Typography variant="h4">Kids Boys 8–11</Typography>
      <Typography variant="body2" color="secondary">
        Выберите «Детская (мальчики)» в селекторе и переключите светлую / тёмную палитру.
      </Typography>
      <div style={themeVariantSelectorStoriesStyles.controlsRow}>
        <ThemeVariantSelector />
        <ThemeToggle />
      </div>
      <div style={themeVariantSelectorStoriesStyles.controlsRow}>
        <Button variant="primary">Играть</Button>
        <Button variant="secondary">Учиться</Button>
        <Button variant="success">Молодец!</Button>
        <Button variant="warning">Внимание</Button>
      </div>
    </div>
  ),
};

export const KidsGirlsTheme: Story = {
  name: 'Детская (девочки)',
  render: () => (
    <div style={themeVariantSelectorStoriesStyles.panel}>
      <Typography variant="h4">Kids Girls 8–11</Typography>
      <Typography variant="body2" color="secondary">
        Выберите «Детская (девочки)» в селекторе и переключите светлую / тёмную палитру.
      </Typography>
      <div style={themeVariantSelectorStoriesStyles.controlsRow}>
        <ThemeVariantSelector />
        <ThemeToggle />
      </div>
      <div style={themeVariantSelectorStoriesStyles.controlsRow}>
        <Button variant="primary">Мечтать</Button>
        <Button variant="secondary">Творить</Button>
        <Button variant="success">Умница!</Button>
        <Button variant="warning">Осторожно</Button>
      </div>
    </div>
  ),
};
