/** Реальный styled-components */
jest.unmock('styled-components');

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { FloatButton } from './FloatButton';
import { FloatButtonGroup } from './FloatButtonGroup';
import { FloatButtonBackTop } from './FloatButtonBackTop';

const wrap = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('FloatButton', () => {
  it('ставит data-placement bottom-end', () => {
    wrap(<FloatButton icon={<span>i</span>} aria-label="Добавить" />);
    expect(screen.getByRole('button', { name: 'Добавить' })).toBeInTheDocument();
    expect(document.querySelector('[data-float-button-root]')).toHaveAttribute(
      'data-placement',
      'bottom-end',
    );
  });

  it('getContainer → data-anchor=container', () => {
    const host = document.createElement('div');
    document.body.appendChild(host);
    wrap(
      <FloatButton icon={<span>i</span>} aria-label="В контейнере" getContainer={() => host} />,
    );
    expect(host.querySelector('[data-anchor="container"]')).toBeTruthy();
    host.remove();
  });
});

describe('FloatButton.Group', () => {
  it('Group click открывает веер из items', () => {
    wrap(
      <FloatButtonGroup
        aria-label="Действия"
        triggerItem={{ icon: <span>+</span>, ariaLabel: 'Открыть' }}
        items={[{ id: 'mail', icon: <span>m</span>, ariaLabel: 'Почта' }]}
      />,
    );
    expect(screen.queryByRole('menuitem', { name: 'Почта' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Открыть' }));
    expect(screen.getByRole('menuitem', { name: 'Почта' })).toBeInTheDocument();
  });
});

describe('FloatButton.BackTop', () => {
  it('скрыт до порога', () => {
    wrap(<FloatButtonBackTop visibilityHeight={400} aria-label="Наверх" />);
    expect(screen.queryByRole('button', { name: 'Наверх' })).toBeNull();
  });

  it('показывается после прокрутки и вызывает scrollTo', async () => {
    const scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;
    Object.defineProperty(window, 'scrollY', { configurable: true, value: 500 });
    wrap(<FloatButtonBackTop visibilityHeight={400} aria-label="Наверх" />);
    fireEvent.scroll(window);
    expect(await screen.findByRole('button', { name: 'Наверх' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Наверх' }));
    expect(scrollToMock).toHaveBeenCalled();
  });
});
