import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Alert, Card, SegmentedControl, Size } from '@velkinvv/plainerv';
import { CodeBlock } from './CodeBlock';

const InteractivePreview = lazy(() => import('./InteractivePreview'));

type DeferredInteractivePreviewProps = {
  code: string;
  deferredHeight?: number;
};

const DeferredInteractivePreview = ({ code, deferredHeight }: DeferredInteractivePreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      data-preview-canvas="true"
      style={{ height: deferredHeight ? `${deferredHeight}px` : undefined }}
    >
      {isVisible ? (
        <Suspense
          fallback={
            <Alert severity="info" variant="outlined">
              Интерактивный предпросмотр загружается...
            </Alert>
          }
        >
          <InteractivePreview code={code} />
        </Suspense>
      ) : (
        <Alert severity="info" variant="outlined">
          Интерактивный предпросмотр загрузится при прокрутке.
        </Alert>
      )}
    </div>
  );
};

type ComponentPreviewProps = {
  exampleId?: string;
  title: string;
  description?: string;
  code?: string;
  showCode?: boolean;
  deferredHeight?: number;
};

export const ComponentPreview = ({
  exampleId,
  title,
  description,
  code,
  showCode = true,
  deferredHeight,
}: ComponentPreviewProps) => {
  const [mode, setMode] = useState<'preview' | 'code'>('preview');
  const canShowCode = Boolean(code) && showCode;

  return (
    <div data-example-id={exampleId}>
      <Card fullWidth>
        <div className="docs-preview-header">
          <h3>{title}</h3>
          {canShowCode ? (
            <SegmentedControl
              className="docs-preview-toggle"
              size={Size.SM}
              ariaLabel={`${title} view mode`}
              value={mode}
              options={[
                { value: 'preview', label: 'Результат' },
                { value: 'code', label: 'Код' },
              ]}
              onChange={(nextValue) => setMode(nextValue as 'preview' | 'code')}
            />
          ) : null}
        </div>

        {description ? <p>{description}</p> : null}

        {canShowCode && mode === 'code' ? (
          <CodeBlock code={code ?? ''} />
        ) : canShowCode ? (
          <DeferredInteractivePreview code={code ?? ''} deferredHeight={deferredHeight} />
        ) : (
          <Alert severity="info" variant="outlined">
            Для этого примера код предпросмотра не задан.
          </Alert>
        )}
      </Card>
    </div>
  );
};
