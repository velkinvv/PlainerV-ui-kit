import React from 'react';
import { Popover } from './Popover/Popover';
import { Hint } from './Hint';
import { Button } from './buttons/Button';
import { ButtonVariant } from '../../types/ui';
import { themeShowcaseStoriesStyles } from './ThemeShowcase.stories.styles';

/**
 * Popover и Hint для Theme Showcase.
 */
export const ThemeShowcaseOverlaysBlock = () => (
  <div style={themeShowcaseStoriesStyles.horizontalGap16Center}>
    <Popover trigger={<Button variant={ButtonVariant.OUTLINE}>Popover</Button>} contentWidth={240}>
      <div style={themeShowcaseStoriesStyles.popoverPanel}>
        Всплывающая панель с произвольным содержимым.
      </div>
    </Popover>
    <Hint content="Краткая подсказка к элементу интерфейса">
      <Button variant={ButtonVariant.GHOST}>Hint</Button>
    </Hint>
  </div>
);
