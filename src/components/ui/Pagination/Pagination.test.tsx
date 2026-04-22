/** Реальный styled-components — иначе мок ломает IconButton */
jest.unmock('styled-components');

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Pagination } from './Pagination';
import { buildPaginationSegments } from './handlers';

const wrap = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('buildPaginationSegments', () => {
  it('возвращает пустой массив при totalPages < 1', () => {
    expect(buildPaginationSegments(0, 1, 1)).toEqual([]);
  });

  it('для малого числа страниц возвращает все номера подряд', () => {
    expect(buildPaginationSegments(5, 3, 1).map((s) => (s.kind === 'page' ? s.page : '…'))).toEqual(
      [1, 2, 3, 4, 5],
    );
  });

  it('для большого числа страниц вставляет разрывы', () => {
    const segs = buildPaginationSegments(20, 10, 1);
    const kinds = segs.map((s) => s.kind);
    expect(kinds).toContain('gap');
    expect(segs.filter((s) => s.kind === 'page').map((s) => s.page)).toContain(1);
    expect(segs.filter((s) => s.kind === 'page').map((s) => s.page)).toContain(20);
    expect(segs.filter((s) => s.kind === 'page').map((s) => s.page)).toContain(10);
  });
});

describe('Pagination', () => {
  it('не рендерится при totalPages < 1', () => {
    const { container } = wrap(<Pagination totalPages={0} />);
    expect(container.firstChild).toBeNull();
  });

  it('переключает страницу в неконтролируемом режиме', () => {
    wrap(<Pagination totalPages={5} defaultPage={1} ariaLabel="Тест пагинации" />);
    fireEvent.click(screen.getByRole('button', { name: 'Страница 3' }));
    expect(screen.getByRole('button', { name: 'Страница 3' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('вызывает onPageChange в контролируемом режиме', () => {
    const onPageChange = jest.fn();
    wrap(<Pagination totalPages={4} page={2} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Страница 4' }));
    expect(onPageChange).toHaveBeenCalledWith(4);
  });
});
