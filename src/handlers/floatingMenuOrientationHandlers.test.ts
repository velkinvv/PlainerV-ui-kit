import { FloatingMenuOrientation } from '@/types/ui';
import {
  DEFAULT_FLOATING_MENU_DYNAMIC_SIZE_INSET_PX,
  resolveFloatingMenuDynamicMaxSizeCss,
  resolveFloatingMenuOrientation,
} from '@/handlers/floatingMenuOrientationHandlers';

describe('floatingMenuOrientationHandlers', () => {
  it('DEFAULT_FLOATING_MENU_DYNAMIC_SIZE_INSET_PX равен 16', () => {
    expect(DEFAULT_FLOATING_MENU_DYNAMIC_SIZE_INSET_PX).toBe(16);
  });

  it('resolveFloatingMenuDynamicMaxSizeCss horizontal — max-width по vw', () => {
    expect(resolveFloatingMenuDynamicMaxSizeCss(FloatingMenuOrientation.HORIZONTAL, 16)).toBe(
      'calc(100vw - 32px)',
    );
  });

  it('resolveFloatingMenuDynamicMaxSizeCss vertical — max-height по vh', () => {
    expect(resolveFloatingMenuDynamicMaxSizeCss(FloatingMenuOrientation.VERTICAL, 16)).toBe(
      'calc(100vh - 32px)',
    );
  });

  it('resolveFloatingMenuOrientation по умолчанию — horizontal', () => {
    expect(resolveFloatingMenuOrientation()).toBe(FloatingMenuOrientation.HORIZONTAL);
  });
});
