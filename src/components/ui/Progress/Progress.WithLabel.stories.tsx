import type { Meta } from '@storybook/react';
import { Progress } from './Progress';
import legacyMeta, {
  AccessibilityExample,
  AwaitState,
  BestPractices,
  CustomStatusIcon,
  CustomStatusLabels,
  LinearWithLabel,
  ShowPercentage,
  StepperAllSteps,
  StepperCircular,
  StepperInteractive,
  StepperLinear,
  StepperWithClickableSteps,
  StepperWithIcons,
  StepperWithoutInfo,
  UseStepperHook,
  VerticalStepper,
  WithEstimatedTime,
} from './Progress.stories.legacy';

const meta: Meta<typeof Progress> = {
  ...(legacyMeta as Meta<typeof Progress>),
  title: 'UI Kit/Data Display/Progress/WithLabel',
};

export default meta;

export {
  AccessibilityExample,
  AwaitState,
  BestPractices,
  CustomStatusIcon,
  CustomStatusLabels,
  LinearWithLabel,
  ShowPercentage,
  StepperAllSteps,
  StepperCircular,
  StepperInteractive,
  StepperLinear,
  StepperWithClickableSteps,
  StepperWithIcons,
  StepperWithoutInfo,
  UseStepperHook,
  VerticalStepper,
  WithEstimatedTime,
};
