import { TabsDirection } from '@/types/ui';
import { scrollSegmentTriggerIntoView } from './tabsScrollHandlers';

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
