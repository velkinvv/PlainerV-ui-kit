import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from 'styled-components';
import { ThemeColorScheme, type ThemeType } from '../../../types/theme';
import type { StepperProps, StepperLinearStep, StepperTitleLayout } from '../../../types/ui';
import { Icon } from '../Icon/Icon';
import { IconSize } from '../../../types/sizes';
import { ValueMotion } from '../ValueMotion';
import {
  StepperBackButton,
  StepperCompactCounter,
  StepperCompactSvgWrap,
  StepperCompactSubtitle,
  StepperCompactTextCol,
  StepperCompactTitle,
  StepperLinearCircle,
  StepperLinearConnector,
  StepperLinearStepCell,
  StepperLinearStepHint,
  StepperLinearStepsRow,
  StepperLinearStepTitle,
  StepperLinearTextStack,
  StepperRoot,
} from './Stepper.style';
import {
  clampStepperActiveIndex,
  formatStepperCounterLabel,
  getCircleProgressStrokeDashoffset,
  getCompactRingProgressFraction,
  getLinearStepCircleVisual,
  getStepperStepAccessibleTitle,
  isLinearConnectorCompleted,
  resolveEffectiveStepperTitleLayout,
  resolveStepperAppearance,
} from './handlers';

const COMPACT_RING_R = 21;
const COMPACT_RING_STROKE = 4;
const COMPACT_SVG_SIZE = 52;

/** Длина окружности для SVG-дуги компактного кольца */
const compactRingCircumference = 2 * Math.PI * COMPACT_RING_R;

/**
 * Степпер навигации по макетам Figma (компакт с кольцом или линейная цепочка шагов).
 * @param props - Пропсы варианта `compact` или `linear` (дискриминант `variant`).
 * @param ref - Ref на корневой `nav`.
 */
export const Stepper = forwardRef<HTMLElement, StepperProps>((props, ref) => {
  const theme = useTheme() as ThemeType;
  const appearance = resolveStepperAppearance(
    props.appearance,
    theme.mode ?? ThemeColorScheme.LIGHT,
  );

  const backLabel = props.backButtonLabel ?? 'Назад';

  if (props.variant === 'compact') {
    return (
      <StepperCompactView
        ref={ref}
        appearance={appearance}
        backLabel={backLabel}
        currentStep={props.currentStep}
        totalSteps={props.totalSteps}
        title={props.title}
        subtitle={props.subtitle}
        onBack={props.onBack}
        className={props.className}
        fullWidth={props.fullWidth}
      />
    );
  }

  return (
    <StepperLinearView
      ref={ref}
      appearance={appearance}
      backLabel={backLabel}
      steps={props.steps}
      activeStepIndex={props.activeStepIndex}
      titleLayout={props.titleLayout}
      onBack={props.onBack}
      className={props.className}
      fullWidth={props.fullWidth}
    />
  );
});

Stepper.displayName = 'Stepper';

type InnerAppearanceProps = {
  appearance: ReturnType<typeof resolveStepperAppearance>;
  backLabel: string;
  onBack?: () => void;
  className?: string;
  fullWidth?: boolean;
};

const StepperCompactView = forwardRef<
  HTMLElement,
  InnerAppearanceProps & {
    currentStep: number;
    totalSteps: number;
    title: React.ReactNode;
    subtitle?: React.ReactNode;
  }
>(
  (
    {
      appearance,
      backLabel,
      onBack,
      className,
      fullWidth,
      currentStep,
      totalSteps,
      title,
      subtitle,
    },
    ref,
  ) => {
    const theme = useTheme() as ThemeType;
    const fraction = useMemo(
      () => getCompactRingProgressFraction(currentStep, totalSteps),
      [currentStep, totalSteps],
    );
    const dashoffset = useMemo(
      () => getCircleProgressStrokeDashoffset(compactRingCircumference, fraction),
      [fraction],
    );
    const counterText = useMemo(
      () => formatStepperCounterLabel(currentStep, totalSteps),
      [currentStep, totalSteps],
    );

    const trackStroke =
      appearance === 'dark'
        ? `color-mix(in srgb, ${theme.colors.onAccent ?? theme.colors.text} 12%, transparent)`
        : theme.colors.progressTrack;
    const progressStroke = theme.colors.progressFill;

    return (
      <StepperRoot
        ref={ref as React.Ref<HTMLElement>}
        $appearance={appearance}
        $fullWidth={fullWidth}
        className={className}
        aria-label="Прогресс по шагам"
      >
        {onBack ? (
          <StepperBackButton
            type="button"
            $appearance={appearance}
            aria-label={backLabel}
            onClick={onBack}
          >
            <Icon name="IconPlainerArrowLeft" size={IconSize.SM} color="currentColor" />
          </StepperBackButton>
        ) : null}
        <StepperCompactSvgWrap aria-hidden>
          <svg
            width={COMPACT_SVG_SIZE}
            height={COMPACT_SVG_SIZE}
            viewBox={`0 0 ${COMPACT_SVG_SIZE} ${COMPACT_SVG_SIZE}`}
          >
            <circle
              cx={COMPACT_SVG_SIZE / 2}
              cy={COMPACT_SVG_SIZE / 2}
              r={COMPACT_RING_R}
              fill="none"
              stroke={trackStroke}
              strokeWidth={COMPACT_RING_STROKE}
            />
            <circle
              cx={COMPACT_SVG_SIZE / 2}
              cy={COMPACT_SVG_SIZE / 2}
              r={COMPACT_RING_R}
              fill="none"
              stroke={progressStroke}
              strokeWidth={COMPACT_RING_STROKE}
              strokeLinecap="round"
              strokeDasharray={compactRingCircumference}
              strokeDashoffset={dashoffset}
              transform={`rotate(-90 ${COMPACT_SVG_SIZE / 2} ${COMPACT_SVG_SIZE / 2})`}
            />
          </svg>
          <ValueMotion as={StepperCompactCounter} contentKey={counterText}>
            {counterText}
          </ValueMotion>
        </StepperCompactSvgWrap>
        <StepperCompactTextCol $appearance={appearance}>
          <StepperCompactTitle>{title}</StepperCompactTitle>
          {subtitle != null ? (
            <StepperCompactSubtitle $appearance={appearance}>{subtitle}</StepperCompactSubtitle>
          ) : null}
        </StepperCompactTextCol>
      </StepperRoot>
    );
  },
);

StepperCompactView.displayName = 'StepperCompactView';

const StepperLinearView = forwardRef<
  HTMLElement,
  InnerAppearanceProps & {
    steps: StepperLinearStep[];
    activeStepIndex: number;
    titleLayout?: StepperTitleLayout;
  }
>(
  (
    { appearance, backLabel, onBack, className, fullWidth, steps, activeStepIndex, titleLayout },
    ref,
  ) => {
    const active = clampStepperActiveIndex(activeStepIndex, steps.length);
    const rootRef = useRef<HTMLElement | null>(null);
    const [containerWidthPx, setContainerWidthPx] = useState<number | null>(null);

    /**
     * Сливает внешний ref с локальным для ResizeObserver.
     * @param node - Корневой nav.
     */
    const setMergedRef = (node: HTMLElement | null) => {
      rootRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    };

    useEffect(() => {
      const element = rootRef.current;
      if (!element || typeof ResizeObserver === 'undefined') {
        return undefined;
      }
      const resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];
        const width = entry?.contentRect?.width;
        if (typeof width === 'number') {
          setContainerWidthPx(width);
        }
      });
      resizeObserver.observe(element);
      setContainerWidthPx(element.getBoundingClientRect().width);
      return () => {
        resizeObserver.disconnect();
      };
    }, []);

    const resolvedTitleLayout = resolveEffectiveStepperTitleLayout(titleLayout, containerWidthPx);

    return (
      <StepperRoot
        ref={setMergedRef}
        $appearance={appearance}
        $fullWidth={fullWidth}
        className={className}
        aria-label="Шаги процесса"
        data-title-layout={resolvedTitleLayout}
      >
        {onBack ? (
          <StepperBackButton
            type="button"
            $appearance={appearance}
            aria-label={backLabel}
            onClick={onBack}
          >
            <Icon name="IconPlainerArrowLeft" size={IconSize.SM} color="currentColor" />
          </StepperBackButton>
        ) : null}
        <StepperLinearStepsRow>
          {steps.map((step, index) => {
            const visual = getLinearStepCircleVisual(index, active);
            const hint = step.stepLabel ?? `Шаг ${index + 1}`;
            const isMuted = index > active;
            const showConnector = index < steps.length - 1;
            const connectorDone = isLinearConnectorCompleted(index, active);
            const accessibleTitle = getStepperStepAccessibleTitle(step.title);

            return (
              <React.Fragment key={index}>
                <StepperLinearStepCell $titleLayout={resolvedTitleLayout} title={accessibleTitle}>
                  <StepperLinearCircle $visual={visual} $appearance={appearance}>
                    {index + 1}
                  </StepperLinearCircle>
                  <StepperLinearTextStack $titleLayout={resolvedTitleLayout}>
                    <StepperLinearStepHint $appearance={appearance}>{hint}</StepperLinearStepHint>
                    <StepperLinearStepTitle
                      $appearance={appearance}
                      $muted={isMuted}
                      $titleLayout={resolvedTitleLayout}
                    >
                      {step.title}
                    </StepperLinearStepTitle>
                  </StepperLinearTextStack>
                </StepperLinearStepCell>
                {showConnector ? (
                  <StepperLinearConnector $completed={connectorDone} $appearance={appearance} />
                ) : null}
              </React.Fragment>
            );
          })}
        </StepperLinearStepsRow>
      </StepperRoot>
    );
  },
);

StepperLinearView.displayName = 'StepperLinearView';
