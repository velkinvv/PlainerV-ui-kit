import { useState } from 'react';
import { Alert, Card, SegmentedControl, Size } from '@velkinvv/plainerv';
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
    <div data-example-id={exampleId} data-example-archived="true">
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
        ) : isImageMissing ? (
          <>
            <Alert severity="warning" variant="outlined">
              {canShowCode
                ? `Превью для версии ${version} не снято — ниже пример из актуальной версии кита.`
                : `Превью для версии ${version} не снято, код примера для неё недоступен.`}
            </Alert>
            {canShowCode ? <CodeBlock code={code ?? ''} /> : null}
          </>
        ) : (
          <img
            className="docs-archived-preview"
            src={snapshotUrl}
            alt={`Превью примера «${title}», версия ${version}`}
            loading="lazy"
            onError={() => setIsImageMissing(true)}
          />
        )}
      </Card>
    </div>
  );
};
