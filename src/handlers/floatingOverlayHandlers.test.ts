import {
  getFloatingOverlayPlacementStyle,
  isFloatingOverlayPlacementReady,
} from './floatingOverlayHandlers';

describe('floatingOverlayHandlers placement', () => {
  it('не считает координаты готовыми, пока панель закрыта', () => {
    expect(isFloatingOverlayPlacementReady(false, true)).toBe(false);
    expect(isFloatingOverlayPlacementReady(false, false)).toBe(false);
  });

  it('считает координаты готовыми только после измерения при открытой панели', () => {
    expect(isFloatingOverlayPlacementReady(true, false)).toBe(false);
    expect(isFloatingOverlayPlacementReady(true, true)).toBe(true);
  });

  it('скрывает панель, пока координаты не измерены', () => {
    const placementStyle = getFloatingOverlayPlacementStyle({
      position: { x: 0, y: 0 },
      isPositionReady: false,
      zIndex: 12,
    });

    expect(placementStyle.left).toBe(0);
    expect(placementStyle.top).toBe(0);
    expect(placementStyle.visibility).toBe('hidden');
    expect(placementStyle.pointerEvents).toBe('none');
    expect(placementStyle.zIndex).toBe(12);
  });

  it('показывает панель на измеренных координатах без стартовой точки 0,0', () => {
    const placementStyle = getFloatingOverlayPlacementStyle({
      position: { x: 120, y: 48 },
      isPositionReady: true,
    });

    expect(placementStyle.left).toBe(120);
    expect(placementStyle.top).toBe(48);
    expect(placementStyle.visibility).toBe('visible');
    expect(placementStyle.pointerEvents).toBe('auto');
  });
});
