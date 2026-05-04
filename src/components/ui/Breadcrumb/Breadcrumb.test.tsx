jest.unmock('styled-components');

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Icon } from '../Icon/Icon';
import { IconSize } from '../../../types/sizes';
import { Breadcrumb } from './Breadcrumb';
import type { BreadcrumbItem } from '../../../types/ui';

/**
 * Рендер с темой.
 * @param ui - Элемент с `Breadcrumb`.
 */
const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Breadcrumb', () => {
  it('не рендерится при пустом items', () => {
    const { container } = renderWithTheme(<Breadcrumb items={[]} />);
    expect(container.querySelector('nav')).toBeNull();
  });

  it('рендерит nav с aria-label и ссылки', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Главная', href: '/' },
      { label: 'Раздел', href: '/s' },
      { label: 'Здесь' },
    ];
    renderWithTheme(<Breadcrumb items={items} ariaLabel="Крошки" />);
    const nav = screen.getByRole('navigation', { name: 'Крошки' });
    expect(nav).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Главная' })).toHaveAttribute('href', '/');
    const current = nav.querySelector('[aria-current="page"]');
    expect(current).not.toBeNull();
    expect(current).toHaveTextContent('Здесь');
  });

  it('для target=_blank у ссылки есть rel', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Внешний', href: 'https://example.com', target: '_blank' },
      { label: 'Локальная' },
    ];
    renderWithTheme(<Breadcrumb items={items} />);
    const link = screen.getByRole('link', { name: 'Внешний' });
    expect(link.getAttribute('rel')).toMatch(/noopener/);
  });

  it('текущая страница как ссылка получает aria-current на a', () => {
    const items: BreadcrumbItem[] = [
      { label: 'Главная', href: '/' },
      { label: 'Здесь', href: '/here', current: true },
    ];
    renderWithTheme(<Breadcrumb items={items} />);
    const cur = screen.getByRole('link', { name: 'Здесь' });
    expect(cur).toHaveAttribute('aria-current', 'page');
  });

  it('сегмент ellipsis и иконка у крошки', () => {
    const onEllipsis = jest.fn();
    const items: BreadcrumbItem[] = [
      {
        id: 'home',
        label: 'Главная',
        href: '/',
        icon: <Icon name="IconExHome" size={IconSize.SM} color="currentColor" aria-hidden />,
      },
      { id: 'e', label: '…', ellipsis: true, onClick: onEllipsis, ellipsisAriaLabel: 'Ещё' },
      { id: 'news', label: 'Новости', href: '/news' },
      { id: 'cur', label: 'Новость' },
    ];
    renderWithTheme(<Breadcrumb items={items} />);
    expect(screen.getByRole('button', { name: 'Ещё' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Ещё' }));
    expect(onEllipsis).toHaveBeenCalled();
  });
});
