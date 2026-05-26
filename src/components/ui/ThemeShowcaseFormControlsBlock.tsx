import React, { useState } from 'react';
import { Checkbox } from './Checkbox';
import { RadioButtonGroup } from './RadioButton';
import { Switch } from './Switch';
import type { RadioButtonGroupOption } from '../../types/ui';
import { themeShowcaseStoriesStyles } from './ThemeShowcase.stories.styles';

const radioOptions: RadioButtonGroupOption[] = [
  { value: 'option-a', label: 'Вариант A' },
  { value: 'option-b', label: 'Вариант B' },
  { value: 'option-c', label: 'Вариант C' },
];

/**
 * Checkbox, RadioButtonGroup и Switch для Theme Showcase.
 */
export const ThemeShowcaseFormControlsBlock = () => {
  const [isAgreed, setIsAgreed] = useState(true);
  const [radioValue, setRadioValue] = useState('option-a');
  const [isNotificationsOn, setIsNotificationsOn] = useState(false);

  return (
    <div style={themeShowcaseStoriesStyles.verticalStackGap16}>
      <Checkbox
        label="Согласие с условиями"
        checked={isAgreed}
        onChange={(changeEvent) => setIsAgreed(changeEvent.target.checked)}
      />
      <RadioButtonGroup
        label="Выбор варианта"
        options={radioOptions}
        value={radioValue}
        onChange={(changeEvent) => setRadioValue(changeEvent.target.value)}
      />
      <Switch
        label="Уведомления"
        checked={isNotificationsOn}
        onChange={(changeEvent) => setIsNotificationsOn(changeEvent.target.checked)}
      />
    </div>
  );
};
