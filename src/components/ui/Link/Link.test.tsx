jest.unmock('styled-components');

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Link } from './Link';
import { LinkMode, ButtonVariant } from '../../../types/ui';

/**
 * Рендер с темой.
 * @param ui - Элемент с `Link`.
 */
const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Link', () => {
  it('в режиме text рендерит якорь', () => {
    renderWithTheme(
      <Link href="https://example.com/test" mode={LinkMode.TEXT}>
        Подпись
      </Link>,
    );
    const a = screen.getByRole('link', { name: 'Подпись' });
    expect(a).toHaveAttribute('href', 'https://example.com/test');
  });

  it('в режиме button использует Button с href', () => {
    renderWithTheme(
      <Link href="/docs" mode={LinkMode.BUTTON} variant={ButtonVariant.SECONDARY}>
        Документация
      </Link>,
    );
    const a = screen.getByRole('link', { name: 'Документация' });
    expect(a).toHaveAttribute('href', '/docs');
    expect(a).toHaveClass('ui-button');
  });

  it('для target=_blank дополняет rel', () => {
    renderWithTheme(
      <Link href="https://x.com" mode={LinkMode.TEXT} target="_blank">
        X
      </Link>,
    );
    const a = screen.getByRole('link', { name: 'X' });
    expect(a.getAttribute('rel')).toMatch(/noopener/);
    expect(a.getAttribute('rel')).toMatch(/noreferrer/);
  });
});
