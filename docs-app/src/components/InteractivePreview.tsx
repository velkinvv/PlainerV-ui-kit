import React from 'react';
import * as Plainerv from '@velkinvv/plainerv';
import { LiveError, LivePreview, LiveProvider } from 'react-live';

type InteractivePreviewProps = {
  code: string;
};

const InteractivePreview = ({ code }: InteractivePreviewProps) => (
  <LiveProvider code={code} scope={{ React, ...Plainerv }}>
    <div className="docs-playground-preview">
      <LivePreview />
    </div>
    <LiveError className="docs-playground-error" />
  </LiveProvider>
);

export default InteractivePreview;
