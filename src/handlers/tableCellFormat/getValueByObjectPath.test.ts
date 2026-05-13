import { getValueByObjectPath } from './getValueByObjectPath';

describe('getValueByObjectPath', () => {
  it('читает вложенное поле', () => {
    const row = { user: { id: 'u1', name: 'Ann' } };
    expect(getValueByObjectPath(row, 'user.name')).toBe('Ann');
    expect(getValueByObjectPath(row, 'user.id')).toBe('u1');
  });

  it('возвращает undefined при разрыве пути', () => {
    expect(getValueByObjectPath({ user: null }, 'user.name')).toBeUndefined();
  });
});
