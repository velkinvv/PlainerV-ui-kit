import { FloatingMenuOrientation } from '@/types/ui';
import {
  FLOATING_MENU_ITEM_PRESENCE_GAP_PX,
  FLOATING_MENU_SIZE_ANIMATION_RELEASE_MS,
  getFloatingMenuItemPresenceMotionProps,
} from '@/handlers/floatingMenuItemPresenceHandlers';

describe('floatingMenuItemPresenceHandlers', () => {
  it('FLOATING_MENU_SIZE_ANIMATION_RELEASE_MS равен 520', () => {
    expect(FLOATING_MENU_SIZE_ANIMATION_RELEASE_MS).toBe(520);
  });

  it('FLOATING_MENU_ITEM_PRESENCE_GAP_PX равен 2', () => {
    expect(FLOATING_MENU_ITEM_PRESENCE_GAP_PX).toBe(2);
  });

  it('getFloatingMenuItemPresenceMotionProps horizontal — width и marginRight', () => {
    const motionProps = getFloatingMenuItemPresenceMotionProps(false, {
      orientation: FloatingMenuOrientation.HORIZONTAL,
      isLastItem: false,
      contentSizePx: 48,
    });

    expect(motionProps.initial).toMatchObject({
      opacity: 0,
      width: 0,
      marginRight: 0,
    });
    expect(motionProps.animate).toMatchObject({
      opacity: 1,
      width: 48,
      marginRight: FLOATING_MENU_ITEM_PRESENCE_GAP_PX,
    });
  });

  it('getFloatingMenuItemPresenceMotionProps vertical — height и marginBottom', () => {
    const motionProps = getFloatingMenuItemPresenceMotionProps(false, {
      orientation: FloatingMenuOrientation.VERTICAL,
      isLastItem: false,
      contentSizePx: 36,
    });

    expect(motionProps.initial).toMatchObject({
      opacity: 0,
      height: 0,
      marginBottom: 0,
    });
    expect(motionProps.animate).toMatchObject({
      opacity: 1,
      height: 36,
      marginBottom: FLOATING_MENU_ITEM_PRESENCE_GAP_PX,
    });
  });

  it('getFloatingMenuItemPresenceMotionProps isLastItem — без trailing gap', () => {
    const motionProps = getFloatingMenuItemPresenceMotionProps(false, {
      orientation: FloatingMenuOrientation.HORIZONTAL,
      isLastItem: true,
    });

    expect(motionProps.animate).toMatchObject({
      marginRight: 0,
    });
  });

  it('getFloatingMenuItemPresenceMotionProps reducedMotion — без exit', () => {
    const motionProps = getFloatingMenuItemPresenceMotionProps(true, {
      orientation: FloatingMenuOrientation.HORIZONTAL,
    });

    expect(motionProps).toEqual({
      initial: false,
      animate: { opacity: 1 },
      exit: undefined,
    });
  });
});
