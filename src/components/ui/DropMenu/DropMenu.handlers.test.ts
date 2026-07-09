import {
  isDropMenuTriggerOpenKey,
  mapDropMenuPropsToDropdown,
  normalizeDropMenuSelectedToArray,
} from './DropMenu.handlers';

describe('DropMenu handlers', () => {
  it('mapDropMenuPropsToDropdown: value приоритетнее selected', () => {
    const mapped = mapDropMenuPropsToDropdown({
      value: 'a',
      selected: 'b',
      usesRenderContentProp: false,
    });
    expect(mapped.value).toBe('a');
  });

  it('mapDropMenuPropsToDropdown: selected как fallback', () => {
    const mapped = mapDropMenuPropsToDropdown({
      selected: 'b',
      usesRenderContentProp: false,
    });
    expect(mapped.value).toBe('b');
  });

  it('mapDropMenuPropsToDropdown: visibility aliases', () => {
    const onVisibilityChange = jest.fn();
    const mapped = mapDropMenuPropsToDropdown({
      isVisible: true,
      onVisibilityChange,
      usesRenderContentProp: true,
    });
    expect(mapped.isMenuOpen).toBe(true);
    expect(mapped.onMenuOpenChange).toBe(onVisibilityChange);
    expect(mapped.triggerWrapClickToggle).toBe(false);
  });

  it('mapDropMenuPropsToDropdown: вызывает оба select-колбэка', () => {
    const onSelectItem = jest.fn();
    const onSelect = jest.fn();
    const mapped = mapDropMenuPropsToDropdown({
      onSelectItem,
      onSelect,
      usesRenderContentProp: false,
    });
    mapped.onSelect?.('x', undefined);
    expect(onSelectItem).toHaveBeenCalledWith('x', undefined);
    expect(onSelect).toHaveBeenCalledWith('x', undefined);
  });

  it('isDropMenuTriggerOpenKey', () => {
    expect(isDropMenuTriggerOpenKey('Enter')).toBe(true);
    expect(isDropMenuTriggerOpenKey(' ')).toBe(true);
    expect(isDropMenuTriggerOpenKey('ArrowDown')).toBe(true);
    expect(isDropMenuTriggerOpenKey('Escape')).toBe(false);
  });

  it('normalizeDropMenuSelectedToArray', () => {
    expect(normalizeDropMenuSelectedToArray(undefined)).toEqual([]);
    expect(normalizeDropMenuSelectedToArray('a')).toEqual(['a']);
    expect(normalizeDropMenuSelectedToArray(['a', 'b'])).toEqual(['a', 'b']);
  });
});
