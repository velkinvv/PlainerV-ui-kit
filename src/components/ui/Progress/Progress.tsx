import React, { forwardRef, useMemo, useEffect, useRef, useId } from 'react';
import { clsx } from 'clsx';
import { useTheme } from 'styled-components';
import type { ProgressProps } from '../../../types/ui';
import {
  CircularCenterLabel,
  CircularCheckmark,
  CircularDescription,
  CircularInfoCard,
  CircularInfoDescription,
  CircularInfoText,
  CircularInfoTitle,
  CircularInfoValue,
  CircularProgressArc,
  CircularRightLabel,
  CircularTrack,
  CircularWithRightLabel,
  CircularWrapper,
  CircularSvg,
  getCircleSize,
  getCircleThickness,
  LinearContainer,
  LinearFill,
  LinearTrack,
  ProgressLabel,
  ProgressRoot,
  ProgressRow,
  ProgressValue,
  StepperContainer,
  StepperHeader,
  StepperCurrentStepLabel,
  StepperStepCounter,
  StepperNextStepInfo,
  LoadingSpinner,
  LinearLoadingSpinnerContainer,
} from './Progress.style';
import { Size } from '../../../types/sizes';
import {
  clampProgress,
  calculateStepperValue,
  getComputedStatus,
  getStatusColor,
  formatProgressValue,
  calculateCircleRadius,
  calculateCircleCircumference,
  calculateCircleOffset,
  getStepperSteps,
  getAccessibilityProps,
  formatEstimatedTime,
} from './handlers';

const ProgressComponent = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      size,
      variant = 'linear',
      thickness,
      circleSize,
      showValueLabel,
      label,
      info,
      formatValue,
      trackColor,
      progressColor,
      showCheckmarkOnComplete,
      status,
      applyStatusColorsToText = false,
      onStatusChange,
      steps,
      activeStep = 0,
      showNextStepInfo = true,
      onComplete,
      indeterminate = false,
      animated = true,
      animationDuration,
      customStatusIcon,
      showStatusIcon = true,
      statusLabels: _statusLabels,
      estimatedTime,
      speed,
      trackClassName,
      fillClassName,
      style,
      onStepClick,
      showGradient = false,
      showPercentage,
      bufferValue,
      onRetry,
      onPause,
      paused = false,
      segments,
      showAllSteps = false,
      stepperOrientation = 'horizontal',
      className,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    const labelId = useId();
    const descriptionId = useId();
    const animationId = useId();

    // Для степпера рассчитываем value автоматически на основе activeStep
    const computedValue = useMemo(
      () => calculateStepperValue(variant, steps, activeStep, value),
      [variant, steps, activeStep, value],
    );

    const progress = indeterminate ? 0 : clampProgress(computedValue, max);
    const isComplete = !indeterminate && progress >= 100;
    const prevStatusRef = useRef(status);
    const prevIsCompleteRef = useRef(false);

    // Определяем статус автоматически, если не передан явно
    const computedStatus = useMemo(
      () => getComputedStatus(status, isComplete),
      [status, isComplete],
    );

    // Вызываем колбек при изменении статуса
    useEffect(() => {
      if (onStatusChange && computedStatus !== prevStatusRef.current) {
        onStatusChange(computedStatus);
        prevStatusRef.current = computedStatus;
      }
    }, [computedStatus, onStatusChange]);

    // Вызываем колбек при завершении прогресса
    useEffect(() => {
      if (onComplete && isComplete && !prevIsCompleteRef.current) {
        onComplete();
        prevIsCompleteRef.current = true;
      } else if (!isComplete) {
        prevIsCompleteRef.current = false;
      }
    }, [isComplete, onComplete]);

    // Цвет прогресса в зависимости от статуса (из темы)
    const statusColor = useMemo(
      () => getStatusColor(progressColor, computedStatus, theme, status),
      [progressColor, computedStatus, theme, status],
    );

    // Для линейного варианта по умолчанию показываем текст, если не указано явно
    const shouldShowValueLabel =
      showValueLabel !== undefined ? showValueLabel : variant === 'linear';
    // showPercentage позволяет отдельно управлять показом процентов
    const shouldShowPercentage =
      showPercentage !== undefined ? showPercentage : shouldShowValueLabel;
    const formattedValue = useMemo(
      () => formatProgressValue(computedValue, max, progress, formatValue),
      [formatValue, max, progress, computedValue],
    );
    const percentageText = useMemo(() => `${Math.round(progress)}%`, [progress]);

    // Вычисляем размеры для кругового варианта на основе size, если не переданы явно
    const computedCircleSize = useMemo(
      () => circleSize ?? getCircleSize(size, theme),
      [circleSize, size, theme],
    );
    const computedThickness = useMemo(
      () => thickness ?? getCircleThickness(size, theme),
      [thickness, size, theme],
    );

    const circleRadius = useMemo(
      () => calculateCircleRadius(computedCircleSize, computedThickness),
      [computedCircleSize, computedThickness],
    );
    const circleCircumference = useMemo(
      () => calculateCircleCircumference(circleRadius),
      [circleRadius],
    );
    const circleOffset = useMemo(
      () => calculateCircleOffset(circleCircumference, progress),
      [circleCircumference, progress],
    );
    // Цвет для заполнения круга при завершении (используем statusColor)
    const fillColor = statusColor;

    const rootClassName = clsx('ui-progress', `ui-progress-${variant}`, className);
    const accessibilityProps = getAccessibilityProps(
      computedValue,
      max,
      label,
      info,
      computedStatus,
      indeterminate,
      label ? labelId : undefined,
      info ? descriptionId : undefined,
    );

    const renderLinear = () => {
      // Цвет для текста (тайтл и проценты) в зависимости от статуса и пропа applyStatusColorsToText
      const labelTextColor = applyStatusColorsToText ? statusColor : undefined;
      const valueTextColor = applyStatusColorsToText ? statusColor : undefined;

      // Дополнительная информация (время, скорость)
      const additionalInfo = [];
      if (estimatedTime !== undefined) {
        additionalInfo.push(formatEstimatedTime(estimatedTime));
      }
      if (speed) {
        additionalInfo.push(speed);
      }
      const additionalInfoText =
        additionalInfo.length > 0 ? ` • ${additionalInfo.join(' • ')}` : '';

      // Кнопки действий (повтор, пауза)
      const actionButtons = [];
      if (computedStatus === 'error' && onRetry) {
        actionButtons.push(
          <button
            key="retry"
            onClick={onRetry}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              border: '1px solid',
              borderColor: statusColor,
              color: statusColor,
              background: 'transparent',
              borderRadius: '4px',
              cursor: 'pointer',
              marginLeft: '8px',
            }}
          >
            Повторить
          </button>,
        );
      }
      if (onPause && computedStatus === 'loading') {
        actionButtons.push(
          <button
            key="pause"
            onClick={onPause}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              border: '1px solid',
              borderColor: statusColor || '#666',
              color: statusColor || '#666',
              background: 'transparent',
              borderRadius: '4px',
              cursor: 'pointer',
              marginLeft: '8px',
            }}
          >
            {paused ? 'Возобновить' : 'Пауза'}
          </button>,
        );
      }

      return (
        <ProgressRoot $variant="linear">
          <LinearContainer>
            {label && (
              <ProgressLabel id={labelId} $statusColor={labelTextColor} $animated={animated}>
                {label}
                {additionalInfoText && (
                  <span style={{ fontSize: '12px', opacity: 0.7, marginLeft: '8px' }}>
                    {additionalInfoText}
                  </span>
                )}
                {paused && (
                  <span style={{ fontSize: '12px', opacity: 0.7, marginLeft: '8px' }}>
                    (Приостановлено)
                  </span>
                )}
                {actionButtons}
              </ProgressLabel>
            )}
            <ProgressRow>
              <LinearTrack size={size} $trackColor={trackColor} className={trackClassName}>
                <LinearFill
                  $progress={progress}
                  $color={statusColor}
                  $animated={animated && !paused}
                  $animationDuration={animationDuration}
                  $indeterminate={indeterminate && !paused}
                  $loading={computedStatus === 'loading' && !paused}
                  $gradient={showGradient}
                  $size={size}
                  className={fillClassName}
                />
              </LinearTrack>
              {shouldShowPercentage && (
                <ProgressValue $variant="linear" $statusColor={valueTextColor} $animated={animated}>
                  {percentageText}
                </ProgressValue>
              )}
              {shouldShowValueLabel && !shouldShowPercentage && (
                <ProgressValue $variant="linear" $statusColor={valueTextColor} $animated={animated}>
                  {formattedValue}
                </ProgressValue>
              )}
            </ProgressRow>
          </LinearContainer>
        </ProgressRoot>
      );
    };

    const renderCircular = (withInfo = false) => {
      // Определяем, нужно ли показывать title в зависимости от размера
      const shouldShowTitle = size && size !== Size.XS && size !== Size.SM;
      // Для XS проценты справа, для остальных - в центре
      const isExtraSmall = size === Size.XS;
      // Показывать ли галочку при завершении
      const showCheckmark = showCheckmarkOnComplete && isComplete;

      const circleElement = (
        <CircularWrapper $size={computedCircleSize}>
          <CircularSvg viewBox={`0 0 ${computedCircleSize} ${computedCircleSize}`}>
            <CircularTrack
              cx={computedCircleSize / 2}
              cy={computedCircleSize / 2}
              r={circleRadius}
              strokeWidth={computedThickness}
              style={{ stroke: trackColor || undefined }}
            />
            <CircularProgressArc
              cx={computedCircleSize / 2}
              cy={computedCircleSize / 2}
              r={circleRadius}
              strokeWidth={computedThickness}
              strokeDasharray={
                indeterminate
                  ? undefined
                  : computedStatus === 'loading' && !indeterminate
                    ? `${circleCircumference * 0.25} ${circleCircumference}`
                    : circleCircumference
              }
              strokeDashoffset={
                showCheckmark
                  ? 0
                  : indeterminate
                    ? undefined
                    : computedStatus === 'loading' && !indeterminate
                      ? 0
                      : circleOffset
              }
              $color={statusColor}
              $animated={animated}
              $animationDuration={animationDuration}
              $indeterminate={indeterminate}
              $loading={computedStatus === 'loading'}
              $circumference={
                computedStatus === 'loading' && !indeterminate ? circleCircumference : undefined
              }
              $animationId={
                computedStatus === 'loading' && !indeterminate ? animationId : undefined
              }
            />
            {showCheckmark && (
              <circle
                cx={computedCircleSize / 2}
                cy={computedCircleSize / 2}
                r={circleRadius}
                fill={fillColor}
                style={{ transition: 'fill 0.3s ease-out' }}
              />
            )}
          </CircularSvg>
          {showCheckmark && computedStatus !== 'error' && showStatusIcon ? (
            <CircularCheckmark $size={computedCircleSize} $animated={animated}>
              {customStatusIcon || (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" />
                </svg>
              )}
            </CircularCheckmark>
          ) : computedStatus === 'loading' && !indeterminate && showStatusIcon ? (
            !isExtraSmall && (
              <CircularCenterLabel>
                <LoadingSpinner
                  $size={Math.min(computedCircleSize * 0.3, 24)}
                  $color={statusColor}
                />
              </CircularCenterLabel>
            )
          ) : (
            !isExtraSmall && (
              <CircularCenterLabel>
                {shouldShowValueLabel && (
                  <span style={{ color: applyStatusColorsToText ? statusColor : undefined }}>
                    {formattedValue}
                  </span>
                )}
                {shouldShowTitle && label && (
                  <CircularDescription
                    style={{ color: applyStatusColorsToText ? statusColor : undefined }}
                  >
                    {label}
                  </CircularDescription>
                )}
              </CircularCenterLabel>
            )
          )}
        </CircularWrapper>
      );

      // Для XS проценты справа от круга (если не показываем галочку)
      const circle =
        isExtraSmall && !showCheckmark ? (
          <CircularWithRightLabel>
            {circleElement}
            {shouldShowValueLabel && (
              <CircularRightLabel
                style={{ color: applyStatusColorsToText ? statusColor : undefined }}
              >
                {formattedValue}
              </CircularRightLabel>
            )}
          </CircularWithRightLabel>
        ) : (
          circleElement
        );

      if (!withInfo) {
        return circle;
      }

      const infoTitle = info?.title ?? label;
      const infoValue = shouldShowValueLabel ? (info?.value ?? formattedValue) : info?.value;
      const infoDescription = info?.description;

      return (
        <CircularInfoCard>
          {circle}
          <CircularInfoText id={descriptionId}>
            {infoTitle && <CircularInfoTitle>{infoTitle}</CircularInfoTitle>}
            <CircularInfoValue>{infoValue}</CircularInfoValue>
            {infoDescription && (
              <CircularInfoDescription>{infoDescription}</CircularInfoDescription>
            )}
          </CircularInfoText>
        </CircularInfoCard>
      );
    };

    const renderStepper = (isCircular = false) => {
      if (!steps || steps.length === 0) {
        // Если нет шагов, возвращаем обычный прогресс
        return isCircular ? renderCircular() : renderLinear();
      }

      const isVertical = stepperOrientation === 'vertical';
      const { currentStep, nextStep, totalSteps } = getStepperSteps(steps, activeStep);

      // Если нужно показать все шаги
      if (showAllSteps && !isCircular) {
        return (
          <StepperContainer
            role="group"
            aria-label="Шаги процесса"
            style={isVertical ? { flexDirection: 'row', gap: '16px' } : undefined}
          >
            <StepperHeader>
              <StepperStepCounter>
                {activeStep} из {totalSteps} шагов
              </StepperStepCounter>
            </StepperHeader>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '100%',
              }}
            >
              {steps.map((step, index) => {
                const stepIndex = index;
                const isCompleted = activeStep > stepIndex + 1;
                const isActive = activeStep === stepIndex + 1;

                return (
                  <div
                    key={step.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px',
                      borderRadius: '4px',
                      backgroundColor: isActive ? 'rgba(148, 210, 99, 0.1)' : 'transparent',
                      cursor: onStepClick ? 'pointer' : 'default',
                    }}
                    onClick={() => {
                      if (onStepClick) {
                        onStepClick(stepIndex, step);
                      }
                    }}
                  >
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: isCompleted
                          ? statusColor
                          : isActive
                            ? statusColor
                            : '#E0E0E0',
                        color: isCompleted || isActive ? '#ffffff' : '#666',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      {isCompleted ? '✓' : stepIndex + 1}
                    </div>
                    {step.icon && (
                      <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                        {step.icon}
                      </span>
                    )}
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? statusColor : '#666',
                        }}
                      >
                        {step.label}
                      </div>
                      {step.description && (
                        <div
                          style={{
                            fontSize: '12px',
                            color: '#999',
                            marginTop: '2px',
                          }}
                        >
                          {step.description}
                        </div>
                      )}
                    </div>
                    {isActive && (
                      <div
                        style={{
                          fontSize: '12px',
                          color: '#999',
                        }}
                      >
                        Текущий шаг
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {showNextStepInfo && nextStep && (
              <StepperNextStepInfo style={{ marginTop: '12px' }}>
                Далее - {nextStep.label}
              </StepperNextStepInfo>
            )}
          </StepperContainer>
        );
      }

      if (isCircular) {
        // Круговой вариант степпера
        const valueTextColor = applyStatusColorsToText ? statusColor : undefined;
        return (
          <StepperContainer
            role="group"
            aria-label="Шаги процесса"
            style={isVertical ? { flexDirection: 'row', gap: '16px' } : undefined}
          >
            <StepperHeader>
              {currentStep && (
                <StepperCurrentStepLabel aria-current="step">
                  {currentStep.icon && (
                    <span
                      style={{
                        marginRight: '6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                      }}
                    >
                      {currentStep.icon}
                    </span>
                  )}
                  {currentStep.label}
                </StepperCurrentStepLabel>
              )}
              <StepperStepCounter>
                {activeStep} из {totalSteps} шагов
              </StepperStepCounter>
            </StepperHeader>
            <CircularWrapper $size={computedCircleSize}>
              <CircularSvg viewBox={`0 0 ${computedCircleSize} ${computedCircleSize}`}>
                <CircularTrack
                  cx={computedCircleSize / 2}
                  cy={computedCircleSize / 2}
                  r={circleRadius}
                  strokeWidth={computedThickness}
                  style={{ stroke: trackColor || undefined }}
                />
                <CircularProgressArc
                  cx={computedCircleSize / 2}
                  cy={computedCircleSize / 2}
                  r={circleRadius}
                  strokeWidth={computedThickness}
                  strokeDasharray={indeterminate ? undefined : circleCircumference}
                  strokeDashoffset={indeterminate ? undefined : circleOffset}
                  $color={statusColor}
                  $animated={animated}
                  $animationDuration={animationDuration}
                  $indeterminate={indeterminate}
                  $loading={computedStatus === 'loading'}
                />
              </CircularSvg>
              <CircularCenterLabel>
                {shouldShowValueLabel && (
                  <span style={{ color: valueTextColor || undefined }}>{formattedValue}</span>
                )}
              </CircularCenterLabel>
            </CircularWrapper>
            {showNextStepInfo && nextStep && (
              <StepperNextStepInfo>Далее - {nextStep.label}</StepperNextStepInfo>
            )}
          </StepperContainer>
        );
      }

      // Линейный вариант степпера
      const valueTextColor = applyStatusColorsToText ? statusColor : undefined;
      return (
        <StepperContainer
          role="group"
          aria-label="Шаги процесса"
          style={isVertical ? { flexDirection: 'row', gap: '16px' } : undefined}
        >
          <StepperHeader>
            {currentStep && (
              <StepperCurrentStepLabel
                aria-current="step"
                $clickable={!!onStepClick}
                onClick={() => {
                  if (onStepClick && activeStep > 0) {
                    onStepClick(activeStep - 1, currentStep);
                  }
                }}
              >
                {currentStep.icon && (
                  <span
                    style={{ marginRight: '6px', display: 'inline-flex', alignItems: 'center' }}
                  >
                    {currentStep.icon}
                  </span>
                )}
                {currentStep.label}
              </StepperCurrentStepLabel>
            )}
            <StepperStepCounter>
              {activeStep} из {totalSteps} шагов
            </StepperStepCounter>
          </StepperHeader>
          <ProgressRoot $variant="linear">
            <LinearContainer>
              <ProgressRow>
                <LinearTrack size={size} $trackColor={trackColor}>
                  <LinearFill $progress={progress} $color={statusColor} $size={size} />
                </LinearTrack>
                {shouldShowValueLabel && (
                  <ProgressValue $variant="linear" $statusColor={valueTextColor}>
                    {formattedValue}
                  </ProgressValue>
                )}
              </ProgressRow>
            </LinearContainer>
          </ProgressRoot>
          {showNextStepInfo && nextStep && (
            <StepperNextStepInfo>Далее - {nextStep.label}</StepperNextStepInfo>
          )}
        </StepperContainer>
      );
    };

    const renderBuffer = () => {
      const bufferProgress = bufferValue ? clampProgress(bufferValue, max) : 0;
      const labelTextColor = applyStatusColorsToText ? statusColor : undefined;
      const valueTextColor = applyStatusColorsToText ? statusColor : undefined;

      return (
        <ProgressRoot $variant="linear">
          <LinearContainer>
            {label && (
              <ProgressLabel id={labelId} $statusColor={labelTextColor} $animated={animated}>
                {label}
              </ProgressLabel>
            )}
            <ProgressRow>
              <LinearTrack size={size} $trackColor={trackColor} className={trackClassName}>
                {/* Буферный слой */}
                <LinearFill
                  $progress={bufferProgress}
                  $color={trackColor ? `${trackColor}80` : undefined}
                  $animated={false}
                  $indeterminate={false}
                  $loading={false}
                  $gradient={false}
                  $size={size}
                  style={{ opacity: 0.3 }}
                />
                {/* Основной прогресс */}
                <LinearFill
                  $progress={progress}
                  $color={statusColor}
                  $animated={animated}
                  $animationDuration={animationDuration}
                  $indeterminate={indeterminate}
                  $loading={computedStatus === 'loading'}
                  $gradient={showGradient}
                  $size={size}
                  className={fillClassName}
                />
              </LinearTrack>
              {shouldShowPercentage && (
                <ProgressValue $variant="linear" $statusColor={valueTextColor} $animated={animated}>
                  {percentageText}
                </ProgressValue>
              )}
              {shouldShowValueLabel && !shouldShowPercentage && (
                <ProgressValue $variant="linear" $statusColor={valueTextColor} $animated={animated}>
                  {formattedValue}
                </ProgressValue>
              )}
              {computedStatus === 'loading' && !indeterminate && !paused && showStatusIcon && (
                <LinearLoadingSpinnerContainer>
                  <LoadingSpinner $size={16} $color={statusColor} />
                </LinearLoadingSpinnerContainer>
              )}
            </ProgressRow>
          </LinearContainer>
        </ProgressRoot>
      );
    };

    const renderSegmented = () => {
      const labelTextColor = applyStatusColorsToText ? statusColor : undefined;
      const valueTextColor = applyStatusColorsToText ? statusColor : undefined;

      if (!segments || segments.length === 0) {
        // Если нет сегментов, возвращаем обычный линейный прогресс
        return renderLinear();
      }

      // Сортируем сегменты по значению и вычисляем позиции
      const sortedSegments = [...segments].sort((a, b) => a.value - b.value);
      let currentPosition = 0;

      return (
        <ProgressRoot $variant="linear">
          <LinearContainer>
            {label && (
              <ProgressLabel id={labelId} $statusColor={labelTextColor} $animated={animated}>
                {label}
              </ProgressLabel>
            )}
            <ProgressRow>
              <LinearTrack size={size} $trackColor={trackColor} className={trackClassName}>
                {sortedSegments.map((segment, index) => {
                  const segmentProgress = clampProgress(segment.value, max);
                  const segmentWidth = segmentProgress - currentPosition;
                  const segmentLeft = currentPosition;
                  currentPosition = segmentProgress;

                  return (
                    <LinearFill
                      key={index}
                      $progress={segmentWidth}
                      $color={segment.color}
                      $animated={animated}
                      $animationDuration={animationDuration}
                      $indeterminate={false}
                      $loading={false}
                      $gradient={false}
                      $size={size}
                      style={{
                        left: `${segmentLeft}%`,
                        width: `${segmentWidth}%`,
                      }}
                    />
                  );
                })}
              </LinearTrack>
              {shouldShowPercentage && (
                <ProgressValue $variant="linear" $statusColor={valueTextColor} $animated={animated}>
                  {percentageText}
                </ProgressValue>
              )}
              {shouldShowValueLabel && !shouldShowPercentage && (
                <ProgressValue $variant="linear" $statusColor={valueTextColor} $animated={animated}>
                  {formattedValue}
                </ProgressValue>
              )}
            </ProgressRow>
            {segments.some(s => s.label) && (
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '8px',
                  flexWrap: 'wrap',
                  fontSize: '12px',
                }}
              >
                {sortedSegments.map((segment, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: segment.color,
                        borderRadius: '2px',
                      }}
                    />
                    {segment.label && <span>{segment.label}</span>}
                  </div>
                ))}
              </div>
            )}
          </LinearContainer>
        </ProgressRoot>
      );
    };

    const renderByVariant = () => {
      if (variant === 'stepper') {
        // Линейный вариант степпера
        return renderStepper(false);
      }

      if (variant === 'stepper-circle') {
        // Круговой вариант степпера
        return renderStepper(true);
      }

      if (variant === 'buffer') {
        // Вариант с буфером
        return renderBuffer();
      }

      if (variant === 'segmented') {
        // Сегментированный вариант
        return renderSegmented();
      }

      if (variant === 'circle') {
        return renderCircular();
      }

      if (variant === 'circle-info') {
        return renderCircular(true);
      }

      return renderLinear();
    };

    return (
      <div ref={ref} className={rootClassName} style={style} {...accessibilityProps} {...rest}>
        {renderByVariant()}
      </div>
    );
  },
);

ProgressComponent.displayName = 'Progress';

export const Progress = React.memo(ProgressComponent);
