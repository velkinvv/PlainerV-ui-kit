/** Реальный styled-components */
jest.unmock('styled-components');

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Layout } from './Layout';
import { LayoutHeader } from './LayoutHeader';
import { LayoutContent } from './LayoutContent';
import { LayoutFooter } from './LayoutFooter';
import { LayoutSidebar } from './LayoutSidebar';

const wrap = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Layout shell', () => {
  it('Header-Content-Footer: banner / main / contentinfo', () => {
    wrap(
      <Layout>
        <LayoutHeader>Шапка</LayoutHeader>
        <LayoutContent>Контент</LayoutContent>
        <LayoutFooter>Подвал</LayoutFooter>
      </Layout>,
    );
    expect(screen.getByRole('banner')).toHaveTextContent('Шапка');
    expect(screen.getByRole('main')).toHaveTextContent('Контент');
    expect(screen.getByRole('contentinfo')).toHaveTextContent('Подвал');
    expect(document.querySelector('.ui-layout')).toHaveAttribute('data-scroll-mode', 'page');
    expect(document.querySelector('.ui-layout')).toHaveAttribute('data-has-sidebar', 'false');
  });

  it('scrollMode content → data-scroll на main', () => {
    wrap(
      <Layout scrollMode="content">
        <LayoutContent>Контент</LayoutContent>
      </Layout>,
    );
    expect(screen.getByRole('main')).toHaveAttribute('data-scroll', 'content');
  });
});

describe('Layout.Sidebar', () => {
  it('регистрирует ряд и complementary', () => {
    wrap(
      <Layout>
        <LayoutSidebar>Бок</LayoutSidebar>
        <LayoutContent>Контент</LayoutContent>
      </Layout>,
    );
    expect(document.querySelector('.ui-layout')).toHaveAttribute('data-has-sidebar', 'true');
    expect(screen.getByRole('complementary')).toHaveTextContent('Бок');
  });

  it('collapsible клик вызывает onCollapsedChange trigger', () => {
    const onCollapsedChange = jest.fn();
    wrap(
      <Layout>
        <LayoutSidebar collapsible onCollapsedChange={onCollapsedChange}>
          Бок
        </LayoutSidebar>
        <LayoutContent>Контент</LayoutContent>
      </Layout>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Свернуть панель' }));
    expect(onCollapsedChange).toHaveBeenCalledWith(true, 'trigger');
  });

  it('placement end → data-placement', () => {
    wrap(
      <Layout>
        <LayoutSidebar placement="end">Бок</LayoutSidebar>
        <LayoutContent>Контент</LayoutContent>
      </Layout>,
    );
    expect(screen.getByRole('complementary')).toHaveAttribute('data-placement', 'end');
  });
});

describe('Layout.Sidebar overlay и zero-width', () => {
  it('overlay развёрнутый → data-sidebar-overlay и spacer', () => {
    wrap(
      <Layout>
        <LayoutSidebar overlay defaultCollapsed={false}>
          Бок
        </LayoutSidebar>
        <LayoutContent>Контент</LayoutContent>
      </Layout>,
    );
    expect(document.querySelector('.ui-layout')).toHaveAttribute('data-sidebar-overlay', 'true');
    expect(document.querySelector('[data-layout-sidebar-gutter]')).toBeTruthy();
  });

  it('collapsedWidth 0: aside hidden, есть крайний триггер', () => {
    wrap(
      <Layout>
        <LayoutSidebar collapsed collapsedWidth={0} collapsible>
          Бок
        </LayoutSidebar>
        <LayoutContent>Контент</LayoutContent>
      </Layout>,
    );
    expect(document.querySelector('aside[aria-hidden="true"]')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Развернуть панель' })).toBeInTheDocument();
  });
});
