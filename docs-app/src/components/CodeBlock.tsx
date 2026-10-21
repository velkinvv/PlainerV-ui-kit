import { useMemo, useState } from 'react';
import { Button, ButtonVariant, Size } from '@velkinvv/plainerv';

type CodeBlockProps = {
  code: string;
};

const normalizeCode = (code: string) => code.replace(/\n+$/g, '');

export const CodeBlock = ({ code }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const normalizedCode = useMemo(() => normalizeCode(code), [code]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(normalizedCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="docs-code-block">
      <div className="docs-code-actions">
        <Button size={Size.SM} variant={ButtonVariant.OUTLINE} onClick={handleCopy}>
          {copied ? 'Скопировано' : 'Копировать'}
        </Button>
      </div>

      <pre>
        <code>{normalizedCode}</code>
      </pre>
    </div>
  );
};
