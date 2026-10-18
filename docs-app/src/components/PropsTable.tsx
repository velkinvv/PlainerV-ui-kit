type PropItem = {
  name: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
  description?: string;
  deprecated?: boolean;
};

type PropsTableProps = {
  items: readonly PropItem[];
};

const boolLabel = (value: boolean | undefined) => (value ? 'Да' : 'Нет');

export const PropsTable = ({ items }: PropsTableProps) => {
  if (items.length === 0) {
    return <p className="docs-props-empty">Для этого компонента пока нет данных по пропсам.</p>;
  }

  return (
    <div className="docs-props-wrap">
      <table className="docs-props-table">
        <thead>
          <tr>
            <th>Проп</th>
            <th>Тип</th>
            <th>Обяз.</th>
            <th>По умолчанию</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.name}>
              <td>
                <code>{item.name}</code>
                {item.deprecated ? <span className="docs-props-deprecated">deprecated</span> : null}
              </td>
              <td>
                <code>{item.type || 'unknown'}</code>
              </td>
              <td>{boolLabel(item.required)}</td>
              <td>
                <code>{item.defaultValue || '—'}</code>
              </td>
              <td>{item.description || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
