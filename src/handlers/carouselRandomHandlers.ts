/**
 * Создаёт последовательный порядок индексов слайдов [0, 1, …, n-1].
 * @param slideCount — число слайдов
 */
export function createCarouselSequentialOrder(slideCount: number): number[] {
  return Array.from({ length: slideCount }, (_value, index) => index);
}

/**
 * Создаёт детерминированный генератор псевдослучайных чисел.
 * @param seed — начальное значение seed
 */
function createSeededRandomGenerator(seed: number): () => number {
  let state = seed >>> 0;

  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

/**
 * Перемешивает массив индексов алгоритмом Fisher–Yates.
 * @param order — массив индексов для перемешивания
 * @param randomSeed — опциональный seed для детерминированного порядка
 */
export function shuffleCarouselDisplayOrder(order: number[], randomSeed?: number): number[] {
  const shuffledOrder = [...order];
  const random = randomSeed !== undefined ? createSeededRandomGenerator(randomSeed) : Math.random;

  for (let currentIndex = shuffledOrder.length - 1; currentIndex > 0; currentIndex -= 1) {
    const randomIndex = Math.floor(random() * (currentIndex + 1));
    const temporaryValue = shuffledOrder[currentIndex];
    shuffledOrder[currentIndex] = shuffledOrder[randomIndex];
    shuffledOrder[randomIndex] = temporaryValue;
  }

  return shuffledOrder;
}

/**
 * Формирует порядок отображения слайдов.
 * @param slideCount — число слайдов
 * @param random — перемешать порядок
 * @param randomSeed — seed для детерминированного shuffle
 */
export function createCarouselDisplayOrder(
  slideCount: number,
  random: boolean,
  randomSeed?: number,
): number[] {
  const sequentialOrder = createCarouselSequentialOrder(slideCount);

  if (!random || slideCount <= 1) {
    return sequentialOrder;
  }

  return shuffleCarouselDisplayOrder(sequentialOrder, randomSeed);
}

/**
 * Упорядочивает элементы по индексам отображения.
 * @param items — исходный массив
 * @param displayOrder — порядок индексов
 */
export function applyCarouselDisplayOrder<T>(items: T[], displayOrder: number[]): T[] {
  return displayOrder
    .map((sourceIndex) => items[sourceIndex])
    .filter((item): item is T => item !== undefined);
}

/**
 * Строит подпись набора слайдов для стабильного пересчёта порядка.
 * @param slideElements — React-элементы Carousel.Slide
 */
export function buildCarouselSlideOrderSignature(
  slideElements: Array<{ key?: string | number | null; props?: { slideId?: string } }>,
): string {
  return slideElements
    .map((slideElement, index) => slideElement.props?.slideId ?? String(slideElement.key ?? index))
    .join('|');
}
