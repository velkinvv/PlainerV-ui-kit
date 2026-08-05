import {
  navigationMenuSubtreeContainsActiveId,
  resolveSidemenuActiveId,
} from './navigationMenuNestedHandlers';
import type { SidemenuItem } from '@/types/ui';

describe('resolveSidemenuActiveId', () => {
  it('возвращает null для пустого дерева', () => {
    expect(resolveSidemenuActiveId([])).toBeNull();
  });

  it('выбирает активный лист L1 без детей', () => {
    const items: SidemenuItem[] = [
      { id: 'home', label: 'Главная' },
      { id: 'settings', label: 'Настройки', active: true },
    ];
    expect(resolveSidemenuActiveId(items)).toBe('settings');
  });

  it('предпочитает активный лист L2, когда родитель тоже active', () => {
    const items: SidemenuItem[] = [
      {
        id: 'people',
        label: 'Люди',
        active: true,
        items: [
          { id: 'students', label: 'Ученики', active: true },
          { id: 'teachers', label: 'Учителя' },
        ],
      },
    ];
    expect(resolveSidemenuActiveId(items)).toBe('students');
  });

  it('выбирает родителя, если активен только он (без активного ребёнка)', () => {
    const items: SidemenuItem[] = [
      {
        id: 'people',
        label: 'Люди',
        active: true,
        items: [
          { id: 'students', label: 'Ученики' },
          { id: 'teachers', label: 'Учителя' },
        ],
      },
    ];
    expect(resolveSidemenuActiveId(items)).toBe('people');
  });

  it('предпочитает самый глубокий активный пункт (L3)', () => {
    const items: SidemenuItem[] = [
      {
        id: 'people',
        label: 'Люди',
        active: true,
        items: [
          {
            id: 'students',
            label: 'Ученики',
            active: true,
            items: [{ id: 'grade-5', label: '5 класс', active: true }],
          },
        ],
      },
    ];
    expect(resolveSidemenuActiveId(items)).toBe('grade-5');
  });

  it('выбирает первый по обходу активный лист среди сиблингов', () => {
    const items: SidemenuItem[] = [
      {
        id: 'people',
        label: 'Люди',
        items: [
          { id: 'students', label: 'Ученики', active: true },
          { id: 'teachers', label: 'Учителя', active: true },
        ],
      },
    ];
    expect(resolveSidemenuActiveId(items)).toBe('students');
  });
});

describe('navigationMenuSubtreeContainsActiveId', () => {
  it('находит активного потомка у родителя с active', () => {
    const nested = [
      { id: 'students', label: 'Ученики' },
      { id: 'teachers', label: 'Учителя' },
    ];
    expect(navigationMenuSubtreeContainsActiveId(nested, 'students')).toBe(true);
    expect(navigationMenuSubtreeContainsActiveId(nested, 'missing')).toBe(false);
  });
});
