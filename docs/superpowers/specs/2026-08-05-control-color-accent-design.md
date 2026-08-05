# Design: `color` accent for Slider, SegmentedControl, Chip, Pagination, Tabs

## Goal

Same API as Switch / Checkbox / RadioButton: `color?: ControlColor | string` via `resolveControlAccentColors`.

## Defaults

| Component | Default `color` | Reason |
|-----------|-----------------|--------|
| Slider / RangeSlider / SliderInput | `info` | Current track/thumb fill |
| Pagination | `info` | Current active page |
| SegmentedControl | `primary` | Current selected segment |
| Chip / Chips | `primary` | Current selected chip |
| Tabs | `primary` | Current active tab |

## Priority

Validation / semantic `status` / `error` override `color` when present. Otherwise accent comes from `color`.

## Resolver

`info` maps to `theme.colors.info` / `infoHover` (not primary). `primary` stays on primary tokens.

## Out of scope

Progress, Rating, Pulse, Pill/Tag, Toast.
