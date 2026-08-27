import { Size } from '../types/sizes';
import { BorderRadiusHandler, InputSizeHandler } from './uiHandlers';
import { resolveControlBorderRadius, resolveControlMinHeight } from './controlChromeHandlers';

describe('controlChromeHandlers', () => {
  it('высота совпадает с InputSizeHandler для того же size', () => {
    expect(resolveControlMinHeight(Size.SM)).toBe(InputSizeHandler(Size.SM));
    expect(resolveControlMinHeight(Size.MD)).toBe(InputSizeHandler(Size.MD));
    expect(resolveControlMinHeight(Size.LG)).toBe(InputSizeHandler(Size.LG));
  });

  it('радиус берётся из theme.borderRadius, а не из size кнопки', () => {
    expect(resolveControlBorderRadius(Size.MD)).toBe(BorderRadiusHandler(Size.MD));
    expect(resolveControlBorderRadius(Size.LG)).toBe(BorderRadiusHandler(Size.LG));
    expect(resolveControlBorderRadius(Size.MD)).not.toBe(BorderRadiusHandler(Size.SM));
  });
});
