import React from 'react';
import {
  HintContentWrapper,
  HintCloseButton,
  HintTextContent,
  HintIcon,
  HintActions,
  HintFooter,
  HintTourContainer,
  HintTourProgress,
  HintTourControls,
} from './Hint.style';
import { Button } from '../buttons/Button';
import { ButtonVariant, HintVisibilityTrigger, type HintAction } from '../../../types/ui';
import { Size } from '../../../types/sizes';

/**
 * Пропсы для компонента HintContent
 */
export interface HintContentProps {
  loading: boolean;
  renderLoading?: () => React.ReactNode;
  content: React.ReactNode;
  renderContent?: () => React.ReactNode;
  allowHTML: boolean;
  contentClassName?: string;
  virtualize: boolean;
  icon?: React.ReactNode;
  actions?: HintAction[];
  footer?: React.ReactNode;
  tourStep?: number;
  tourTotalSteps?: number;
  onTourNext?: () => void;
  onTourPrev?: () => void;
  showTourControls: boolean;
  visibilityTrigger: HintVisibilityTrigger;
  onCloseClick: (event: React.MouseEvent) => void;
}

/**
 * Компонент для рендеринга содержимого hint
 */
export const HintContent: React.FC<HintContentProps> = ({
  loading,
  renderLoading,
  content,
  renderContent,
  allowHTML,
  contentClassName,
  virtualize,
  icon,
  actions,
  footer,
  tourStep,
  tourTotalSteps,
  onTourNext,
  onTourPrev,
  showTourControls,
  visibilityTrigger,
  onCloseClick,
}) => {
  return (
    <HintContentWrapper>
      {loading ? (
        <HintTextContent className={contentClassName}>
          {renderLoading ? renderLoading() : <span>Загрузка...</span>}
        </HintTextContent>
      ) : (
        <>
          {icon && <HintIcon>{icon}</HintIcon>}
          <HintTextContent
            className={contentClassName}
            style={
              virtualize
                ? {
                    maxHeight: '400px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                  }
                : undefined
            }
          >
            {allowHTML && typeof content === 'string' ? (
              <span dangerouslySetInnerHTML={{ __html: content }} style={{ display: 'block' }} />
            ) : renderContent ? (
              renderContent()
            ) : (
              content
            )}
            {actions && actions.length > 0 && (
              <HintActions>
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    variant={action.variant || ButtonVariant.PRIMARY}
                    size={Size.SM}
                    onClick={action.onClick}
                  >
                    {action.label}
                  </Button>
                ))}
              </HintActions>
            )}
            {footer && <HintFooter>{footer}</HintFooter>}
            {tourStep !== undefined && (showTourControls || onTourNext || onTourPrev) && (
              <HintTourContainer>
                {tourTotalSteps !== undefined && (
                  <HintTourProgress>
                    <span>
                      Шаг {tourStep} из {tourTotalSteps}
                    </span>
                  </HintTourProgress>
                )}
                {(showTourControls || onTourNext || onTourPrev) && (
                  <HintTourControls>
                    {onTourPrev && (
                      <Button
                        variant={ButtonVariant.OUTLINE}
                        size={Size.SM}
                        onClick={onTourPrev}
                        disabled={tourStep === 1}
                      >
                        Назад
                      </Button>
                    )}
                    {onTourNext && (
                      <Button
                        variant={ButtonVariant.PRIMARY}
                        size={Size.SM}
                        onClick={onTourNext}
                        disabled={tourTotalSteps !== undefined && tourStep === tourTotalSteps}
                      >
                        {tourTotalSteps !== undefined && tourStep === tourTotalSteps
                          ? 'Завершить'
                          : 'Далее'}
                      </Button>
                    )}
                  </HintTourControls>
                )}
              </HintTourContainer>
            )}
          </HintTextContent>
        </>
      )}
      {visibilityTrigger === HintVisibilityTrigger.CLICK && (
        <HintCloseButton type="button" onClick={onCloseClick} aria-label="Закрыть подсказку" />
      )}
    </HintContentWrapper>
  );
};
