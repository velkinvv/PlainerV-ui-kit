import {
  applyCarouselDisplayOrder,
  createCarouselDisplayOrder,
  createCarouselSequentialOrder,
  shuffleCarouselDisplayOrder,
} from './carouselRandomHandlers';

describe('carouselRandomHandlers', () => {
  it('createCarouselSequentialOrder возвращает последовательные индексы', () => {
    expect(createCarouselSequentialOrder(4)).toEqual([0, 1, 2, 3]);
    expect(createCarouselSequentialOrder(0)).toEqual([]);
  });

  it('createCarouselDisplayOrder не перемешивает при random=false', () => {
    expect(createCarouselDisplayOrder(3, false)).toEqual([0, 1, 2]);
  });

  it('createCarouselDisplayOrder перемешивает все индексы при random=true', () => {
    const displayOrder = createCarouselDisplayOrder(5, true);

    expect(displayOrder).toHaveLength(5);
    expect(displayOrder.sort((left, right) => left - right)).toEqual([0, 1, 2, 3, 4]);
  });

  it('createCarouselDisplayOrder с randomSeed даёт детерминированный порядок', () => {
    const firstOrder = createCarouselDisplayOrder(6, true, 42);
    const secondOrder = createCarouselDisplayOrder(6, true, 42);

    expect(firstOrder).toEqual(secondOrder);
    expect(firstOrder).not.toEqual([0, 1, 2, 3, 4, 5]);
  });

  it('shuffleCarouselDisplayOrder сохраняет все элементы', () => {
    const sourceOrder = [0, 1, 2, 3];
    const shuffledOrder = shuffleCarouselDisplayOrder(sourceOrder);

    expect(shuffledOrder.sort((left, right) => left - right)).toEqual(sourceOrder);
  });

  it('applyCarouselDisplayOrder переупорядочивает элементы', () => {
    const items = ['a', 'b', 'c'];
    expect(applyCarouselDisplayOrder(items, [2, 0, 1])).toEqual(['c', 'a', 'b']);
  });
});
