import { Size, Table, TableBody, TableCell, TableHead, TableRow, Tag } from '@velkinvv/plainerv';

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
      <Table size="sm">
        <TableHead>
          <TableRow>
            <TableCell variant="head">Проп</TableCell>
            <TableCell variant="head">Тип</TableCell>
            <TableCell variant="head">Обяз.</TableCell>
            <TableCell variant="head">По умолчанию</TableCell>
            <TableCell variant="head">Описание</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((item) => (
            <TableRow key={item.name}>
              <TableCell>
                <code>{item.name}</code>
                {item.deprecated ? (
                  <Tag
                    className="docs-props-deprecated"
                    size={Size.XS}
                    colorVariant="danger"
                    appearance="outline"
                  >
                    deprecated
                  </Tag>
                ) : null}
              </TableCell>
              <TableCell>
                <code>{item.type || 'unknown'}</code>
              </TableCell>
              <TableCell>{boolLabel(item.required)}</TableCell>
              <TableCell>
                <code>{item.defaultValue || '—'}</code>
              </TableCell>
              <TableCell>{item.description || '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
