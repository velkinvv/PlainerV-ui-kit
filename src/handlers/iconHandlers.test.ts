import { IconSize, Size } from '../types/sizes';
import {
  getInputSideIconSizeForField,
  getInputSideIconSlotSizePx,
} from './iconHandlers';

describe('iconHandlers — слот боковой иконки поля', () => {
  it('getInputSideIconSizeForField сопоставляет размер поля и IconSize', () => {
    expect(getInputSideIconSizeForField(Size.XS)).toBe(IconSize.XS);
    expect(getInputSideIconSizeForField(Size.MD)).toBe(IconSize.MD);
    expect(getInputSideIconSizeForField(undefined)).toBe(IconSize.SM);
  });

  it('getInputSideIconSlotSizePx возвращает px из sizeMap', () => {
    expect(getInputSideIconSlotSizePx(Size.SM)).toBe(20);
    expect(getInputSideIconSlotSizePx(Size.MD)).toBe(24);
  });
});
