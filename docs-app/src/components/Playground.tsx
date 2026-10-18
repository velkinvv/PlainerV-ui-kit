import { useMemo } from 'react';
import * as React from 'react';
import * as Plainerv from '@velkinvv/plainerv';
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

  return (
    <div className="docs-playground">
      <LiveProvider
        code={preparedCode}
        scope={{ React, ...Plainerv }}
        noInline
      >
        <div className="docs-playground-preview">
          <LivePreview />
        </div>

        <LiveError className="docs-playground-error" />

        <div className="docs-playground-editor">
          <LiveEditor />
        </div>
      </LiveProvider>
    </div>
  );
};
