import type { Decorator } from '@storybook/react';
import React, { useLayoutEffect } from 'react';
import {
  resolveStorybookGlobalsAxes,
  resolveStorybookThemeGlobalFromAxes,
  writeStorybookThemeAxes,
} from '../src/handlers/storybookThemeHandlers';

/**
 * Выставляет `data-theme` на `<html>` по осям themeVariant × colorScheme.
 */
export const withStorybookThemeDataAttribute: Decorator = (Story, context) => {
  const axes = resolveStorybookGlobalsAxes(context.globals);
  const dataTheme = resolveStorybookThemeGlobalFromAxes(axes.themeVariant, axes.colorScheme);

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', dataTheme);
    writeStorybookThemeAxes(axes);
  }, [dataTheme, axes.themeVariant, axes.colorScheme]);

  return <Story />;
};
