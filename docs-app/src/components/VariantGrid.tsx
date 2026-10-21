import { Card } from '@velkinvv/plainerv';
import { CodeBlock } from './CodeBlock';

type VariantItem = {
  readonly id: string;
  readonly title: string;
  readonly code?: string;
  readonly description?: string;
};

type VariantGroup = {
  readonly id: string;
  readonly title: string;
  readonly columns?: number;
  readonly items: readonly VariantItem[];
};

type VariantGridProps = {
  group: VariantGroup;
};

export const VariantGrid = ({ group }: VariantGridProps) => {
  const columns = Math.max(1, Math.min(group.columns ?? 3, 4));

  return (
    <section className="docs-variants-section">
      <h2>{group.title}</h2>
      <div
        className="docs-variants-grid"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {group.items.map((item) => (
          <Card key={item.id} fullWidth>
            <h3>{item.title}</h3>
            {item.description ? <p>{item.description}</p> : null}
            {item.code ? <CodeBlock code={item.code} /> : null}
          </Card>
        ))}
      </div>
    </section>
  );
};
