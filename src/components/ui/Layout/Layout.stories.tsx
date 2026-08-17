import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DOC_LAYOUT } from '@/components/ui/storyDocs/uiKitDocs';
import { Button } from '../buttons/Button/Button';
import { Layout } from './Layout';
import {
  LayoutStoriesFrame,
  LayoutStoriesPageScrollFrame,
  LayoutStoriesPlaceholder,
  LayoutStoriesTallFrame,
  LayoutStoriesTallPlaceholder,
} from './Layout.stories.style';

const meta: Meta<typeof Layout> = {
  title: 'UI Kit/Layout/Layout',
  component: Layout,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: DOC_LAYOUT,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    scrollMode: {
      control: 'radio',
      options: ['page', 'content'],
    },
    hasSidebar: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const Basic: Story = {
  render: () => (
    <LayoutStoriesFrame>
      <Layout minHeight="360px">
        <Layout.Header>
          <LayoutStoriesPlaceholder>Шапка</LayoutStoriesPlaceholder>
        </Layout.Header>
        <Layout.Content>
          <LayoutStoriesPlaceholder>Контент</LayoutStoriesPlaceholder>
        </Layout.Content>
      </Layout>
    </LayoutStoriesFrame>
  ),
};

export const HeaderContentFooter: Story = {
  render: () => (
    <LayoutStoriesFrame>
      <Layout minHeight="360px">
        <Layout.Header>
          <LayoutStoriesPlaceholder>Шапка</LayoutStoriesPlaceholder>
        </Layout.Header>
        <Layout.Content>
          <LayoutStoriesPlaceholder>Контент</LayoutStoriesPlaceholder>
        </Layout.Content>
        <Layout.Footer>
          <LayoutStoriesPlaceholder>Подвал</LayoutStoriesPlaceholder>
        </Layout.Footer>
      </Layout>
    </LayoutStoriesFrame>
  ),
};

export const HeaderSidebar: Story = {
  render: () => (
    <LayoutStoriesFrame>
      <Layout minHeight="360px">
        <Layout.Header>
          <LayoutStoriesPlaceholder>Шапка</LayoutStoriesPlaceholder>
        </Layout.Header>
        <Layout>
          <Layout.Sidebar>
            <LayoutStoriesPlaceholder>Сайдбар</LayoutStoriesPlaceholder>
          </Layout.Sidebar>
          <Layout.Content>
            <LayoutStoriesPlaceholder>Контент</LayoutStoriesPlaceholder>
          </Layout.Content>
        </Layout>
        <Layout.Footer>
          <LayoutStoriesPlaceholder>Подвал</LayoutStoriesPlaceholder>
        </Layout.Footer>
      </Layout>
    </LayoutStoriesFrame>
  ),
};

export const SidebarEnd: Story = {
  render: () => (
    <LayoutStoriesFrame>
      <Layout minHeight="360px">
        <Layout.Sidebar placement="end">
          <LayoutStoriesPlaceholder>Сайдбар справа</LayoutStoriesPlaceholder>
        </Layout.Sidebar>
        <Layout.Content>
          <LayoutStoriesPlaceholder>Контент</LayoutStoriesPlaceholder>
        </Layout.Content>
      </Layout>
    </LayoutStoriesFrame>
  ),
};

export const Collapsible: Story = {
  render: () => (
    <LayoutStoriesFrame>
      <Layout minHeight="360px">
        <Layout.Sidebar collapsible>
          <LayoutStoriesPlaceholder>Сайдбар</LayoutStoriesPlaceholder>
        </Layout.Sidebar>
        <Layout.Content>
          <LayoutStoriesPlaceholder>Контент</LayoutStoriesPlaceholder>
        </Layout.Content>
      </Layout>
    </LayoutStoriesFrame>
  ),
};

export const CustomTrigger: Story = {
  render: () => (
    <LayoutStoriesFrame>
      <Layout minHeight="360px">
        <Layout.Sidebar collapsible trigger={<Button>Меню</Button>}>
          <LayoutStoriesPlaceholder>Сайдбар</LayoutStoriesPlaceholder>
        </Layout.Sidebar>
        <Layout.Content>
          <LayoutStoriesPlaceholder>Контент</LayoutStoriesPlaceholder>
        </Layout.Content>
      </Layout>
    </LayoutStoriesFrame>
  ),
};

export const Overlay: Story = {
  render: () => (
    <LayoutStoriesFrame>
      <Layout minHeight="360px">
        <Layout.Sidebar overlay collapsible>
          <LayoutStoriesPlaceholder>Сайдбар поверх</LayoutStoriesPlaceholder>
        </Layout.Sidebar>
        <Layout.Content>
          <LayoutStoriesPlaceholder>Контент не сжимается в развёрнутом overlay</LayoutStoriesPlaceholder>
        </Layout.Content>
      </Layout>
    </LayoutStoriesFrame>
  ),
};

export const Responsive: Story = {
  render: () => (
    <LayoutStoriesFrame>
      <Layout minHeight="360px">
        <Layout.Sidebar collapsible breakpoint="lg">
          <LayoutStoriesPlaceholder>Сайдбар (брейкпоинт lg)</LayoutStoriesPlaceholder>
        </Layout.Sidebar>
        <Layout.Content>
          <LayoutStoriesPlaceholder>Сужайте окно — панель свернётся</LayoutStoriesPlaceholder>
        </Layout.Content>
      </Layout>
    </LayoutStoriesFrame>
  ),
};

export const StickyHeader: Story = {
  render: () => (
    <LayoutStoriesPageScrollFrame>
      <Layout>
        <Layout.Header sticky>
          <LayoutStoriesPlaceholder>Липкая шапка</LayoutStoriesPlaceholder>
        </Layout.Header>
        <Layout.Content>
          <LayoutStoriesTallPlaceholder>Прокрутите блок — шапка остаётся сверху.</LayoutStoriesTallPlaceholder>
        </Layout.Content>
      </Layout>
    </LayoutStoriesPageScrollFrame>
  ),
};

export const StickySidebar: Story = {
  render: () => (
    <LayoutStoriesPageScrollFrame>
      <Layout>
        <Layout.Sidebar sticky>
          <LayoutStoriesPlaceholder>Липкий сайдбар</LayoutStoriesPlaceholder>
        </Layout.Sidebar>
        <Layout.Content>
          <LayoutStoriesTallPlaceholder>Прокрутите блок — колонка остаётся в зоне прокрутки.</LayoutStoriesTallPlaceholder>
        </Layout.Content>
      </Layout>
    </LayoutStoriesPageScrollFrame>
  ),
};

export const ScrollModeContent: Story = {
  render: () => (
    <LayoutStoriesTallFrame>
      <Layout scrollMode="content" minHeight="100%">
        <Layout.Header>
          <LayoutStoriesPlaceholder>Шапка вне скролла</LayoutStoriesPlaceholder>
        </Layout.Header>
        <Layout.Content>
          <LayoutStoriesTallPlaceholder>Скролл только у основной области.</LayoutStoriesTallPlaceholder>
        </Layout.Content>
        <Layout.Footer>
          <LayoutStoriesPlaceholder>Подвал вне скролла</LayoutStoriesPlaceholder>
        </Layout.Footer>
      </Layout>
    </LayoutStoriesTallFrame>
  ),
};
