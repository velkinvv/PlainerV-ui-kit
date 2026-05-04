import { mergeAnchorRel } from './linkHandlers';

describe('mergeAnchorRel', () => {
  it('для обычного target возвращает rel как есть', () => {
    expect(mergeAnchorRel(undefined, 'nofollow')).toBe('nofollow');
  });

  it('для _blank добавляет noopener и noreferrer', () => {
    const r = mergeAnchorRel('_blank', 'nofollow');
    expect(r).toContain('noopener');
    expect(r).toContain('noreferrer');
    expect(r).toContain('nofollow');
  });
});
