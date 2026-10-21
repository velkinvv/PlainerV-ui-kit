import { Select } from '@velkinvv/plainerv';

type ColorMode = 'light' | 'dark';
type Density = 'comfortable' | 'compact';
type Radius = 'md' | 'lg';
type Palette = 'brand' | 'neutral';

type ThemeAxisState = {
  colorMode: ColorMode;
  density: Density;
  radius: Radius;
  palette: Palette;
};

type ThemeAxisSwitcherProps = {
  state: ThemeAxisState;
  onChange: (next: ThemeAxisState) => void;
  themes: readonly string[];
};

const colorModeOptions = [
  { value: 'light', label: 'light' },
  { value: 'dark', label: 'dark' },
];

const densityOptions = [
  { value: 'comfortable', label: 'comfortable' },
  { value: 'compact', label: 'compact' },
];

const radiusOptions = [
  { value: 'md', label: 'md' },
  { value: 'lg', label: 'lg' },
];

const paletteOptions = [
  { value: 'brand', label: 'brand' },
  { value: 'neutral', label: 'neutral' },
];

const hasThemeToken = (themes: readonly string[], token: string) => themes.includes(token);

export const ThemeAxisSwitcher = ({ state, onChange, themes }: ThemeAxisSwitcherProps) => {
  const canToggleColorMode = hasThemeToken(themes, 'colorMode') || hasThemeToken(themes, 'theme');
  const canToggleDensity = hasThemeToken(themes, 'density');
  const canToggleRadius = hasThemeToken(themes, 'radius');
  const canTogglePalette = hasThemeToken(themes, 'palette') || hasThemeToken(themes, 'theme');

  return (
    <section className="docs-axis-switcher" aria-label="Theme axis switcher">
      <h2>Theme Axis</h2>

      <div className="docs-axis-grid">
        <div className="docs-axis-control">
          <span>Color mode</span>
          <Select
            autoWidth
            options={colorModeOptions}
            value={state.colorMode}
            disabled={!canToggleColorMode}
            onChange={(event) =>
              onChange({ ...state, colorMode: event.target.value as ColorMode })
            }
          />
        </div>

        <div className="docs-axis-control">
          <span>Density</span>
          <Select
            autoWidth
            options={densityOptions}
            value={state.density}
            disabled={!canToggleDensity}
            onChange={(event) => onChange({ ...state, density: event.target.value as Density })}
          />
        </div>

        <div className="docs-axis-control">
          <span>Radius</span>
          <Select
            autoWidth
            options={radiusOptions}
            value={state.radius}
            disabled={!canToggleRadius}
            onChange={(event) => onChange({ ...state, radius: event.target.value as Radius })}
          />
        </div>

        <div className="docs-axis-control">
          <span>Palette</span>
          <Select
            autoWidth
            options={paletteOptions}
            value={state.palette}
            disabled={!canTogglePalette}
            onChange={(event) => onChange({ ...state, palette: event.target.value as Palette })}
          />
        </div>
      </div>
    </section>
  );
};
