import React from 'react';
import { reactNodeToExportPlainText } from './reactNodeToExportPlainText';

describe('reactNodeToExportPlainText', () => {
  it('извлекает текст из children компонента', () => {
    const node = React.createElement('span', null, 'Активен');
    expect(reactNodeToExportPlainText(node)).toBe('Активен');
  });

  it('извлекает текст из пропа label', () => {
    const node = React.createElement('div', { label: 'Ошибка' });
    expect(reactNodeToExportPlainText(node)).toBe('Ошибка');
  });
});
