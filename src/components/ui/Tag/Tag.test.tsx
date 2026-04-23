jest.unmock('styled-components');

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Icon } from '../Icon/Icon';
import { IconSize } from '../../../types/sizes';
import { Tag } from './Tag';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Tag', () => {
  it('рендерит текст', () => {
    renderWithTheme(<Tag>Tag</Tag>);
    expect(screen.getByText('Tag')).toBeInTheDocument();
  });

  it('клик и клавиатура при onClick', () => {
    const fn = jest.fn();
    renderWithTheme(<Tag onClick={fn}>X</Tag>);
    fireEvent.click(screen.getByText('X'));
    expect(fn).toHaveBeenCalled();
    screen.getByText('X').focus();
    fireEvent.keyDown(screen.getByText('X'), { key: 'Enter' });
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('иконки слева и справа', () => {
    renderWithTheme(
      <Tag leftIcon={<Icon name="IconExCopy" size={IconSize.XS} />} rightIcon={<Icon name="IconExCopy" size={IconSize.XS} />}>
        Tag
      </Tag>,
    );
    expect(screen.getByText('Tag')).toBeInTheDocument();
  });
});
