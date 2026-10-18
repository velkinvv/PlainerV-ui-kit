import { useState } from 'react';
import { getSnapshotDirectory } from '../versioning';
import { CodeBlock } from './CodeBlock';

type ArchivedPreviewProps = {
  version: string;
  componentSlug: string;
  exampleId: string;
  title: string;
  description?: string;
  code?: string;
  showCode?: boolean;
};

/**
 * Пример архивной версии: живой рендер старым китом невозможен (другая версия
 * React и другие API), поэтому показываем снятое превью и сниппет кода.
 */
export const ArchivedPreview = ({
  version,
  componentSlug,
  exampleId,
  title,
  description,
  code,
  showCode = true,
}: ArchivedPreviewProps) => {
  const [mode, setMode] = useState<'preview' | 'code'>('preview');
  const [isImageMissing, setIsImageMissing] = useState(false);

  const canShowCode = Boolean(code) && showCode;
  const snapshotUrl = `${getSnapshotDirectory(version)}/${componentSlug}/${exampleId}.png`;

  return (
    <article className="docs-card" data-example-id={exampleId} data-example-archived="true">
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
      ) : isImageMissing ? (
        <div className="docs-preview-placeholder">
          {canShowCode
            ? 'Для этой версии превью не снято; код примера актуальной версии доступен на вкладке «Код».'
            : 'Для этой версии превью не снято.'}
        </div>
      ) : (
        <img
          className="docs-archived-preview"
          src={snapshotUrl}
          alt={`Превью примера «${title}», версия ${version}`}
          loading="lazy"
          onError={() => setIsImageMissing(true)}
        />
      )}
    </article>
  );
};
