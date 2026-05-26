import 'styled-components';
import type { ThemeType, ThemeColorScheme } from '../types/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {
    mode: ThemeColorScheme;
  }
}
