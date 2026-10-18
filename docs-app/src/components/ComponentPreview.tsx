import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
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
            <div className="docs-preview-placeholder">
              Интерактивный предпросмотр загружается...
            </div>
          }
        >
          <InteractivePreview code={code} />
        </Suspense>
      ) : (
        <div className="docs-preview-placeholder">
          Интерактивный предпросмотр загрузится при прокрутке.
        </div>
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
    <article className="docs-card" data-example-id={exampleId}>
      <div className="docs-preview-header">
        <h3>{title}</h3>
        {canShowCode ? (
          <div className="docs-preview-toggle" role="tablist" aria-label={`${title} view mode`}>
            <button
              type="button"
              className={mode === 'preview' ? 'docs-toggle-active' : ''}
              onClick={() => setMode('preview')}
            >
              Результат
            </button>
            <button
              type="button"
              className={mode === 'code' ? 'docs-toggle-active' : ''}
              onClick={() => setMode('code')}
            >
              Код
            </button>
          </div>
        ) : null}
      </div>

      {description ? <p>{description}</p> : null}

      {canShowCode && mode === 'code' ? (
        <CodeBlock code={code ?? ''} />
      ) : canShowCode ? (
        <DeferredInteractivePreview code={code ?? ''} deferredHeight={deferredHeight} />
      ) : (
        <div className="docs-preview-placeholder">
          Для этого примера код предпросмотра не задан.
        </div>
      )}
    </article>
  );
};
