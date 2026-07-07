/**
 * Создаёт SVG data URI для демо-карусели (работает офлайн, без внешних CDN).
 * @param title — подпись на изображении
 * @param gradientStart — начальный цвет градиента
 * @param gradientEnd — конечный цвет градиента
 */
export function createCarouselDemoImageDataUri(
  title: string,
  gradientStart: string,
  gradientEnd: string,
): string {
  const svgMarkup = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540" viewBox="0 0 960 540">',
    '<defs>',
    '<linearGradient id="carouselDemoGradient" x1="0" y1="0" x2="1" y2="1">',
    `<stop offset="0%" stop-color="${gradientStart}"/>`,
    `<stop offset="100%" stop-color="${gradientEnd}"/>`,
    '</linearGradient>',
    '</defs>',
    '<rect width="960" height="540" fill="url(#carouselDemoGradient)"/>',
    `<text x="480" y="280" text-anchor="middle" fill="rgba(255,255,255,0.94)" font-size="34" font-family="Arial,sans-serif">${title}</text>`,
    '</svg>',
  ].join('');

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgMarkup)}`;
}
