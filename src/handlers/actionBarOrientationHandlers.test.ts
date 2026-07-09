import { ActionBarOrientation } from '@/types/ui';
import {
  DEFAULT_ACTION_BAR_DYNAMIC_SIZE_INSET_PX,
  resolveActionBarDynamicMaxSizeCss,
  resolveActionBarLayoutOptions,
} from '@/handlers/actionBarOrientationHandlers';

describe('actionBarOrientationHandlers', () => {
  it('resolveActionBarDynamicMaxSizeCss возвращает max-height для vertical', () => {
    expect(resolveActionBarDynamicMaxSizeCss(ActionBarOrientation.VERTICAL, 16)).toBe(
      'calc(100vh - 32px)',
    );
  });

  it('resolveActionBarDynamicMaxSizeCss возвращает max-width для horizontal', () => {
    expect(resolveActionBarDynamicMaxSizeCss(ActionBarOrientation.HORIZONTAL, 16)).toBe(
      'calc(100vw - 32px)',
    );
  });

  it('resolveActionBarLayoutOptions по умолчанию — horizontal без dynamicSize', () => {
    expect(resolveActionBarLayoutOptions({})).toEqual({
      orientation: ActionBarOrientation.HORIZONTAL,
      dynamicSize: false,
    });
  });

  it('resolveActionBarLayoutOptions учитывает legacy dynamicHeight', () => {
    expect(
      resolveActionBarLayoutOptions({
        dynamicHeight: true,
      }),
    ).toEqual({
      orientation: ActionBarOrientation.VERTICAL,
      dynamicSize: true,
    });
  });

  it('resolveActionBarLayoutOptions явные пропсы имеют приоритет над legacy', () => {
    expect(
      resolveActionBarLayoutOptions({
        orientation: ActionBarOrientation.HORIZONTAL,
        dynamicSize: true,
        dynamicHeight: true,
      }),
    ).toEqual({
      orientation: ActionBarOrientation.HORIZONTAL,
      dynamicSize: true,
    });
  });

  it('DEFAULT_ACTION_BAR_DYNAMIC_SIZE_INSET_PX равен 16', () => {
    expect(DEFAULT_ACTION_BAR_DYNAMIC_SIZE_INSET_PX).toBe(16);
  });
});
