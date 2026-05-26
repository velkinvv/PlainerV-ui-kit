import React from 'react';

/** Результат разбиения потомков `Table` на шапку, тело и остальное. */
export type PartitionedTableChildren = {
  /** Секция `TableHead` */
  head: React.ReactElement | null;
  /** Секция `TableBody` */
  body: React.ReactElement | null;
  /** Прочие секции (`TableFoot` и т.д.) */
  other: React.ReactNode[];
};

/**
 * @param child — элемент React
 * @param displayName — `displayName` компонента секции
 */
function isTableSectionElement(child: React.ReactElement, displayName: string): boolean {
  const childType = child.type as { displayName?: string };
  return childType?.displayName === displayName;
}

/**
 * Делит `children` таблицы на шапку, тело и прочие секции (для split-scroll).
 * @param children — потомки `Table`
 */
export function partitionTableChildren(children: React.ReactNode): PartitionedTableChildren {
  const partitioned: PartitionedTableChildren = {
    head: null,
    body: null,
    other: [],
  };

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      if (child != null) {
        partitioned.other.push(child);
      }
      return;
    }

    if (isTableSectionElement(child, 'TableHead')) {
      partitioned.head = child;
      return;
    }

    if (isTableSectionElement(child, 'TableBody')) {
      partitioned.body = child;
      return;
    }

    partitioned.other.push(child);
  });

  return partitioned;
}
