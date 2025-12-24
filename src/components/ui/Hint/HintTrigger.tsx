import React from 'react';
import { HintTrigger as StyledHintTrigger, HintTourHighlight } from './Hint.style';
import { clsx } from 'clsx';
import { HintVisibilityTrigger } from '../../../types/ui';

// Реэкспорт для использования в Hint.tsx
export { HintTourHighlight };

/**
 * Пропсы для компонента HintTrigger
 */
export interface HintTriggerProps {
  triggerRef: React.RefObject<HTMLDivElement>;
  tourStep?: number;
  children: React.ReactNode;
  className?: string;
  visibilityTrigger: HintVisibilityTrigger;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
  onClick: (event: React.MouseEvent) => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  [key: string]: unknown;
}

/**
 * Компонент для рендеринга trigger элемента hint
 */
export const HintTrigger: React.FC<HintTriggerProps> = ({
  triggerRef,
  tourStep,
  children,
  className,
  visibilityTrigger,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onClick,
  onKeyDown,
  ...props
}) => {
  const triggerElement = (
    <StyledHintTrigger
      ref={triggerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={visibilityTrigger === HintVisibilityTrigger.CLICK ? 0 : undefined}
      className={clsx('ui-hint-trigger', className)}
      {...props}
    >
      {children}
    </StyledHintTrigger>
  );

  if (tourStep !== undefined) {
    return <HintTourHighlight>{triggerElement}</HintTourHighlight>;
  }

  return triggerElement;
};
