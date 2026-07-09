jest.unmock('styled-components');

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Size } from '../../../types/sizes';
import { List } from './List';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('List', () => {
  it('рендерит unordered ul с пунктами', () => {
    const { container } = renderWithTheme(
      <List>
        <List.Item>Один</List.Item>
        <List.Item>Два</List.Item>
      </List>,
    );

    expect(container.querySelector('ul.ui-list')).not.toBeNull();
    expect(screen.getByText('Один')).toBeInTheDocument();
    expect(screen.getByText('Два')).toBeInTheDocument();
  });

  it('ordered рендерит ol и data-marker-style numbers', () => {
    const { container } = renderWithTheme(
      <List variant="ordered">
        <List.Item>A</List.Item>
      </List>,
    );

    const listElement = container.querySelector('ol.ui-list');
    expect(listElement).not.toBeNull();
    expect(listElement).toHaveAttribute('data-marker-style', 'numbers');
  });

  it('markerStyle lower-letters', () => {
    const { container } = renderWithTheme(
      <List variant="ordered" markerStyle="lower-letters">
        <List.Item>Буква</List.Item>
      </List>,
    );
    expect(container.querySelector('.ui-list')).toHaveAttribute(
      'data-marker-style',
      'lower-letters',
    );
  });

  it('несовместимый markerStyle нормализуется', () => {
    const { container } = renderWithTheme(
      <List variant="ordered" markerStyle="bullet">
        <List.Item>X</List.Item>
      </List>,
    );
    expect(container.querySelector('.ui-list')).toHaveAttribute('data-marker-style', 'numbers');
  });

  it('вложенный список', () => {
    const { container } = renderWithTheme(
      <List variant="ordered">
        <List.Item>
          Родитель
          <List variant="unordered" markerStyle="bullet">
            <List.Item>Дочерний</List.Item>
          </List>
        </List.Item>
      </List>,
    );

    expect(container.querySelectorAll('.ui-list').length).toBe(2);
    expect(screen.getByText('Дочерний')).toBeInTheDocument();
  });

  it('List.Icon при markerStyle icon', () => {
    const { container } = renderWithTheme(
      <List variant="unordered" markerStyle="icon">
        <List.Item>
          <List.Icon name="IconExCheck" />
          С иконкой
        </List.Item>
      </List>,
    );

    expect(container.querySelector('.ui-list-icon')).not.toBeNull();
    expect(screen.getByText('С иконкой')).toBeInTheDocument();
    expect(container.querySelector('.ui-list')).toHaveAttribute('data-marker-style', 'icon');
  });

  it('size SM прокидывается в data-size', () => {
    const { container } = renderWithTheme(
      <List size={Size.SM}>
        <List.Item>SM</List.Item>
      </List>,
    );
    expect(container.querySelector('.ui-list')).toHaveAttribute('data-size', Size.SM);
  });
});
