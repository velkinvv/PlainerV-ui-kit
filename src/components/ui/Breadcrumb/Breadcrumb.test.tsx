jest.unmock('styled-components');

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
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
    expect(screen.getByRole('navigation', { name: 'Крошки' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Главная' })).toHaveAttribute('href', '/');
    const current = screen.getByText('Здесь');
    expect(current).toHaveAttribute('aria-current', 'page');
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
});
