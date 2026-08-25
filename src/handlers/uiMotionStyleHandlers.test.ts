import { getFloatingOverlayMotionTransitionValue } from './uiMotionStyleHandlers';

describe('getFloatingOverlayMotionTransitionValue', () => {
  it('не анимирует left и top, чтобы панель не вылетала из (0, 0)', () => {
    const transitionValue = getFloatingOverlayMotionTransitionValue('0.2s', 'ease-out');

    expect(transitionValue).toContain('opacity');
    expect(transitionValue).toContain('visibility');
    expect(transitionValue).toContain('transform');
    expect(transitionValue).not.toMatch(/\ball\b/);
    expect(transitionValue).not.toContain('left');
    expect(transitionValue).not.toContain('top');
  });
});
