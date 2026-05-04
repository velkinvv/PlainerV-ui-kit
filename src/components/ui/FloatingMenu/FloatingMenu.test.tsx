/** Реальный styled-components */
jest.unmock('styled-components');

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/themes/ThemeProvider';
import { FloatingMenu } from './FloatingMenu';
import { FloatingMenuPlacement } from '@/types/ui';

const wrap = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('FloatingMenu', () => {
  it('рендерит toolbar с подписью', () => {
    wrap(
      <FloatingMenu aria-label="Тестовая панель" placement={FloatingMenuPlacement.BOTTOM_CENTER}>
        <FloatingMenu.Group>
          <FloatingMenu.GroupItem icon={<span>x</span>} aria-label="Пункт" />
        </FloatingMenu.Group>
      </FloatingMenu>,
    );
    expect(screen.getByRole('toolbar', { name: 'Тестовая панель' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Пункт' })).toBeInTheDocument();
  });
});
