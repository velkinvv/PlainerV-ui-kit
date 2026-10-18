import { useMemo, useState } from 'react';

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
      <button type="button" className="docs-code-copy" onClick={handleCopy}>
        {copied ? 'Скопировано' : 'Копировать'}
      </button>
      <pre>
        <code>{normalizedCode}</code>
      </pre>
    </div>
  );
};
