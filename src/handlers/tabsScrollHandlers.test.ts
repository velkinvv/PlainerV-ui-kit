import { TabsDirection } from '@/types/ui';
import { measureSegmentTriggerRelativeToTrack, scrollSegmentTriggerIntoView } from './tabsScrollHandlers';

describe('measureSegmentTriggerRelativeToTrack', () => {
  it('учитывает scrollLeft — offsetX не меняется при прокрутке трека', () => {
    const scrollLeft = 80;
    const trackElement = {
      getBoundingClientRect: () => ({ left: 100, right: 300, top: 0, bottom: 40 }),
      scrollLeft,
      scrollTop: 0,
    } as HTMLElement;

    const triggerElement = {
      getBoundingClientRect: () => ({ left: 120, right: 180, top: 4, bottom: 36 }),
    } as HTMLElement;

    const metrics = measureSegmentTriggerRelativeToTrack(trackElement, triggerElement);

    expect(metrics).toEqual({
      offsetX: 100,
      offsetY: 4,
      width: 60,
      height: 32,
    });
  });
});

describe('scrollSegmentTriggerIntoView', () => {
  it('сдвигает scrollLeft, если триггер обрезан слева', () => {
    const trackElement = {
      getBoundingClientRect: () => ({ left: 100, right: 300, top: 0, bottom: 40 }),
      scrollLeft: 50,
    } as HTMLElement;

    const triggerElement = {
      getBoundingClientRect: () => ({ left: 80, right: 140, top: 0, bottom: 40 }),
    } as HTMLElement;

    scrollSegmentTriggerIntoView(trackElement, triggerElement, TabsDirection.HORIZONTAL);
    expect(trackElement.scrollLeft).toBe(30);
  });
});
