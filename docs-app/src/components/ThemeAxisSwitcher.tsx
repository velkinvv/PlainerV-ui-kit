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
        <label className="docs-axis-control">
          <span>Color mode</span>
          <select
            value={state.colorMode}
            disabled={!canToggleColorMode}
            onChange={(event) =>
              onChange({ ...state, colorMode: event.target.value as ColorMode })
            }
          >
            <option value="light">light</option>
            <option value="dark">dark</option>
          </select>
        </label>

        <label className="docs-axis-control">
          <span>Density</span>
          <select
            value={state.density}
            disabled={!canToggleDensity}
            onChange={(event) => onChange({ ...state, density: event.target.value as Density })}
          >
            <option value="comfortable">comfortable</option>
            <option value="compact">compact</option>
          </select>
        </label>

        <label className="docs-axis-control">
          <span>Radius</span>
          <select
            value={state.radius}
            disabled={!canToggleRadius}
            onChange={(event) => onChange({ ...state, radius: event.target.value as Radius })}
          >
            <option value="md">md</option>
            <option value="lg">lg</option>
          </select>
        </label>

        <label className="docs-axis-control">
          <span>Palette</span>
          <select
            value={state.palette}
            disabled={!canTogglePalette}
            onChange={(event) => onChange({ ...state, palette: event.target.value as Palette })}
          >
            <option value="brand">brand</option>
            <option value="neutral">neutral</option>
          </select>
        </label>
      </div>
    </section>
  );
};
