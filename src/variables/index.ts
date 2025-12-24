import { colors } from './colors';
import size from './size';
import { blur, additionalBlur, blurUtils, blurClasses } from './blur';
import { lightShadows, darkShadows, additionalShadows, additionalDarkShadows } from './shadows';

export default {
  colors,
  size,
  blur,
  shadows: { lightShadows, darkShadows, additionalShadows, additionalDarkShadows },
};

// Экспорт для удобства
export { colors, size, blur, additionalBlur, blurUtils, blurClasses };
export { lightShadows, darkShadows, additionalShadows, additionalDarkShadows };
export { themeColors, getThemeColor, getColor } from '../themes/colors/colorTheme';
