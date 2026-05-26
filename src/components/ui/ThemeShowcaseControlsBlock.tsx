import React, { useState } from 'react';
import { Slider } from './Slider';
import { ButtonGroup } from './buttons/ButtonGroup';
import { Button } from './buttons/Button';
import { IconButton } from './buttons/IconButton';
import { Icon } from './Icon';
import { ButtonVariant } from '../../types/ui';
import { IconSize, Size } from '../../types/sizes';
import { themeShowcaseStoriesStyles } from './ThemeShowcase.stories.styles';

/**
 * ButtonGroup и IconButton для Theme Showcase.
 */
export const ThemeShowcaseButtonControlsBlock = () => {
  const [activeButtonIndex, setActiveButtonIndex] = useState(0);

  return (
    <div style={themeShowcaseStoriesStyles.verticalStackGap16}>
      <ButtonGroup
        selectable
        activeIndex={activeButtonIndex}
        onActiveIndexChange={setActiveButtonIndex}
      >
        <Button variant={ButtonVariant.OUTLINE}>День</Button>
        <Button variant={ButtonVariant.OUTLINE}>Неделя</Button>
        <Button variant={ButtonVariant.OUTLINE}>Месяц</Button>
      </ButtonGroup>
      <div style={themeShowcaseStoriesStyles.badgeAvatarRow}>
        <IconButton
          variant={ButtonVariant.PRIMARY}
          aria-label="Добавить"
          icon={<Icon name="IconExPlus" size={IconSize.SM} />}
        />
        <IconButton
          variant={ButtonVariant.OUTLINE}
          aria-label="Настройки"
          icon={<Icon name="IconExSettings" size={IconSize.SM} />}
        />
        <IconButton
          variant={ButtonVariant.GHOST}
          aria-label="Удалить"
          icon={<Icon name="IconExTrash" size={IconSize.SM} />}
        />
      </div>
    </div>
  );
};

/**
 * Slider для Theme Showcase.
 */
export const ThemeShowcaseSliderBlock = () => {
  const [sliderValue, setSliderValue] = useState(45);

  return (
    <Slider
      label="Громкость"
      value={sliderValue}
      onChange={setSliderValue}
      min={0}
      max={100}
      size={Size.MD}
      fullWidth
    />
  );
};
