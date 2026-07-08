import { ActionBarOrientation } from '@/types/ui';
import {
  ACTION_BAR_ITEM_PRESENCE_GAP_PX,
  ACTION_BAR_SIZE_ANIMATION_RELEASE_MS,
  getActionBarItemPresenceMotionProps,
} from '@/handlers/actionBarItemPresenceHandlers';

describe('actionBarItemPresenceHandlers', () => {
  it('ACTION_BAR_SIZE_ANIMATION_RELEASE_MS равен 520', () => {
    expect(ACTION_BAR_SIZE_ANIMATION_RELEASE_MS).toBe(520);
  });

  it('ACTION_BAR_ITEM_PRESENCE_GAP_PX равен 4', () => {
    expect(ACTION_BAR_ITEM_PRESENCE_GAP_PX).toBe(4);
  });

  it('getActionBarItemPresenceMotionProps vertical — height и marginBottom', () => {
    const motionProps = getActionBarItemPresenceMotionProps(false, {
      orientation: ActionBarOrientation.VERTICAL,
      isLastItem: false,
      contentSizePx: 48,
    });

    expect(motionProps.initial).toMatchObject({
      opacity: 0,
      height: 0,
      marginBottom: 0,
    });
    expect(motionProps.animate).toMatchObject({
      opacity: 1,
      height: 48,
      marginBottom: ACTION_BAR_ITEM_PRESENCE_GAP_PX,
    });
    expect(motionProps.exit).toMatchObject({
      opacity: 0,
      height: 0,
      marginBottom: 0,
    });
  });

  it('getActionBarItemPresenceMotionProps vertical isLastItem — без trailing gap', () => {
    const motionProps = getActionBarItemPresenceMotionProps(false, {
      orientation: ActionBarOrientation.VERTICAL,
      isLastItem: true,
    });

    expect(motionProps.animate).toMatchObject({
      marginBottom: 0,
    });
  });

  it('getActionBarItemPresenceMotionProps horizontal — width и marginRight', () => {
    const motionProps = getActionBarItemPresenceMotionProps(false, {
      orientation: ActionBarOrientation.HORIZONTAL,
      isLastItem: false,
      contentSizePx: 40,
    });

    expect(motionProps.initial).toMatchObject({
      opacity: 0,
      width: 0,
      marginRight: 0,
    });
    expect(motionProps.animate).toMatchObject({
      opacity: 1,
      width: 40,
      marginRight: ACTION_BAR_ITEM_PRESENCE_GAP_PX,
    });
    expect(motionProps.exit).toMatchObject({
      opacity: 0,
      width: 0,
      marginRight: 0,
    });
  });

  it('getActionBarItemPresenceMotionProps без contentSizePx — fallback auto', () => {
    const motionProps = getActionBarItemPresenceMotionProps(false, {
      orientation: ActionBarOrientation.HORIZONTAL,
    });

    expect(motionProps.animate).toMatchObject({
      width: 'auto',
    });
  });

  it('getActionBarItemPresenceMotionProps horizontal isLastItem — без trailing gap', () => {
    const motionProps = getActionBarItemPresenceMotionProps(false, {
      orientation: ActionBarOrientation.HORIZONTAL,
      isLastItem: true,
    });

    expect(motionProps.animate).toMatchObject({
      marginRight: 0,
    });
  });

  it('getActionBarItemPresenceMotionProps reducedMotion — без exit', () => {
    const motionProps = getActionBarItemPresenceMotionProps(true, {
      orientation: ActionBarOrientation.HORIZONTAL,
    });

    expect(motionProps).toEqual({
      initial: false,
      animate: { opacity: 1 },
      exit: undefined,
    });
  });
});
