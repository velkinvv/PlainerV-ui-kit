import {
  applyCarouselKeyboardAction,
  resolveCarouselKeyboardAction,
} from './carouselKeyboardHandlers';
import { CarouselOrientation } from '../types/ui';

describe('carouselKeyboardHandlers', () => {
  it('resolveCarouselKeyboardAction возвращает действие по клавише', () => {
    expect(resolveCarouselKeyboardAction({ key: 'ArrowLeft' })).toBe('previous');
    expect(resolveCarouselKeyboardAction({ key: 'ArrowRight' })).toBe('next');
    expect(resolveCarouselKeyboardAction({ key: 'Home' })).toBe('first');
    expect(resolveCarouselKeyboardAction({ key: 'End' })).toBe('last');
    expect(resolveCarouselKeyboardAction({ key: 'Enter' })).toBeNull();
  });

  it('resolveCarouselKeyboardAction учитывает вертикальную ориентацию', () => {
    expect(
      resolveCarouselKeyboardAction({ key: 'ArrowUp' }, CarouselOrientation.VERTICAL),
    ).toBe('previous');
    expect(
      resolveCarouselKeyboardAction({ key: 'ArrowDown' }, CarouselOrientation.VERTICAL),
    ).toBe('next');
  });

  it('applyCarouselKeyboardAction переключает индекс с учётом loop', () => {
    expect(applyCarouselKeyboardAction('previous', 0, 3, false)).toBe(0);
    expect(applyCarouselKeyboardAction('previous', 0, 3, true)).toBe(2);
    expect(applyCarouselKeyboardAction('next', 2, 3, false)).toBe(2);
    expect(applyCarouselKeyboardAction('next', 2, 3, true)).toBe(0);
    expect(applyCarouselKeyboardAction('first', 2, 3, false)).toBe(0);
    expect(applyCarouselKeyboardAction('last', 0, 3, false)).toBe(2);
  });
});
