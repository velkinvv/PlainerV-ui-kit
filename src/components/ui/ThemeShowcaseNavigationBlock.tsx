import React, { useState } from 'react';
import { Pagination } from './Pagination';
import { Stepper } from './Stepper';
import type { StepperLinearStep } from '../../types/ui';
import { themeShowcaseStoriesStyles } from './ThemeShowcase.stories.styles';

const stepperSteps: StepperLinearStep[] = [
  { title: 'Контакты' },
  { title: 'Доставка' },
  { title: 'Оплата' },
];

/**
 * Pagination и Stepper для Theme Showcase.
 */
export const ThemeShowcaseNavigationBlock = () => {
  const [page, setPage] = useState(2);

  return (
    <div style={themeShowcaseStoriesStyles.verticalStackGap16}>
      <Pagination totalPages={8} page={page} onPageChange={setPage} />
      <Stepper variant="linear" steps={stepperSteps} activeStepIndex={1} />
    </div>
  );
};
