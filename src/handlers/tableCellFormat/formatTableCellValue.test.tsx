import React from 'react';
import { formatTableCellValue } from './formatTableCellValue';

describe('formatTableCellValue', () => {
  it('рендерит ссылку для type link с подстановкой href', () => {
    const node = formatTableCellValue({
      value: 'Открыть',
      row: { id: '99' },
      field: 'x',
      rowIndex: 0,
      format: { type: 'link', href: '/item/{id}' },
    });
    expect(React.isValidElement(node)).toBe(true);
    if (React.isValidElement(node)) {
      expect(node.props.href).toBe('/item/99');
      expect(node.props.children).toBe('Открыть');
    }
  });

  it('применяет enum по записи', () => {
    const node = formatTableCellValue({
      value: 'a',
      row: {},
      field: 'status',
      rowIndex: 0,
      format: {
        type: 'enum',
        options: { a: 'Альфа', b: 'Бета' },
      },
    });
    expect(node).toBe('Альфа');
  });
});
