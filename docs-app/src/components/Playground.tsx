import { useEffect, useMemo, useRef, useState } from 'react';
import * as React from 'react';
import * as Plainerv from '@velkinvv/plainerv';
import { Alert } from '@velkinvv/plainerv';
import {
  LiveEditor,
  LiveError,
  LivePreview,
  LiveProvider,
} from 'react-live';

type PlaygroundProps = {
  code: string;
};

const normalizeSnippet = (snippet: string) => {
  const trimmed = snippet.trim();
  if (!trimmed) {
    return '<div>Добавь пример компонента</div>';
  }

  return trimmed;
};

export const Playground = ({ code }: PlaygroundProps) => {
  const preparedCode = useMemo(() => normalizeSnippet(code), [code]);
  const [liveErrorMessage, setLiveErrorMessage] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // `react-live` в этой версии не отдаёт ошибку через props, поэтому следим за
  // своим блоком ошибки: если он не пуст — пример в песочнице не выполнился.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const readError = () => {
      const errorNode = container.querySelector('.docs-playground-error');
      setLiveErrorMessage(errorNode?.textContent?.trim() ?? '');
    };

    readError();

    const observer = new MutationObserver(readError);
    observer.observe(container, { childList: true, subtree: true, characterData: true });

    return () => observer.disconnect();
  }, [preparedCode]);

  return (
    <div className="docs-playground" ref={containerRef}>
      {/* Без `noInline`: примеры из DSL — это JSX-выражения, а `noInline`
          требует явного вызова `render(...)` и падал с SyntaxError. */}
      <LiveProvider
        code={preparedCode}
        scope={{ React, ...Plainerv }}
      >
        <div className="docs-playground-preview">
          <LivePreview />
        </div>

        <LiveError className="docs-playground-error" />

        {liveErrorMessage ? (
          <Alert severity="error" variant="outlined">
            Песочница выполнила код с ошибкой. Обычно причина в том, что пример ссылается на
            данные из описания компонента (например, <code>employeeRows</code>) — их нет в
            песочнице. Готовый результат и полный код смотрите в карточке примера выше.
          </Alert>
        ) : null}

        <div className="docs-playground-editor">
          <LiveEditor />
        </div>
      </LiveProvider>
    </div>
  );
};
