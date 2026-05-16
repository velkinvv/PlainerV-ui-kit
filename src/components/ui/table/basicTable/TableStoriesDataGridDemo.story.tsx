import React, { useCallback, useMemo, useState } from 'react';
import { Avatar } from '../../Avatar/Avatar';
import { Checkbox } from '../../Checkbox/Checkbox';
import { Icon } from '../../Icon/Icon';
import { IconButton } from '../../buttons/IconButton/IconButton';
import { Tag } from '../../Tag/Tag';
import { Size, IconSize } from '@/types/sizes';
import { ButtonVariant, type TableSortDirection } from '@/types/ui';
import { TableContainer } from './TableContainer';
import { TableContainerScroll } from './TableContainerScroll';
import { Table } from './Table';
import { TableHead } from './TableHead';
import { TableBody } from './TableBody';
import { TableRow } from './TableRow';
import { TableCell } from './TableCell';
import { TableFooter } from './TableFooter';
import { TablePagination } from './TablePagination';
import { TableSortLabel } from './TableSortLabel';
import { getTableSelectionAggregate } from '@/handlers/tableSelectionHandlers';
import { clampTablePageZeroBased, getTableTotalPages, toggleTableSortDirection } from './handlers';
import { TABLE_STORY_DEMO_ROWS, type TableStoryDemoRow } from './tableStoryDemoData';
import {
  StoryLoadMoreHint,
  StoryTableInline,
  StoryTableLoadMore,
  StoryTableLoadMoreCell,
} from './Table.stories.style';

type SortKey = 'user' | 'state' | 'date';

/**
 * Демо «как в макете»: чекбоксы (в т.ч. indeterminate в шапке), теги, аватар + логин, даты, меню строки, «Загрузить больше», пагинация.
 * Только для Storybook; состояние хранится локально в `useState`.
 */
export function TableStoriesDataGridDemo(): React.ReactElement {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [selectedIds, setSelectedIds] = useState(() => new Set<string>(['2']));
  const [orderBy, setOrderBy] = useState<SortKey>('user');
  const [order, setOrder] = useState<TableSortDirection>('asc');
  const [loadMoreClicks, setLoadMoreClicks] = useState(0);

  const sortedRows = useMemo(() => {
    const copy = [...TABLE_STORY_DEMO_ROWS];
    copy.sort((firstRow, secondRow) => {
      let compareResult = 0;
      if (orderBy === 'user') {
        compareResult = firstRow.user.localeCompare(secondRow.user, 'ru');
      } else if (orderBy === 'state') {
        compareResult = firstRow.tag.color.localeCompare(secondRow.tag.color, 'ru');
      } else {
        compareResult = firstRow.dateLabel.localeCompare(secondRow.dateLabel, 'ru');
      }
      return order === 'asc' ? compareResult : -compareResult;
    });
    return copy;
  }, [order, orderBy]);

  const totalPages = useMemo(
    () => getTableTotalPages(sortedRows.length, rowsPerPage),
    [sortedRows.length, rowsPerPage],
  );
  const safePage = useMemo(() => clampTablePageZeroBased(page, totalPages), [page, totalPages]);

  const pageSlice = useMemo(() => {
    const start = safePage * rowsPerPage;
    return sortedRows.slice(start, start + rowsPerPage);
  }, [safePage, rowsPerPage, sortedRows]);

  const pageIds = useMemo(() => pageSlice.map((row) => row.id), [pageSlice]);
  const selectionAggregate = useMemo(
    () => getTableSelectionAggregate(pageIds, selectedIds),
    [pageIds, selectedIds],
  );

  const toggleSelectAllOnPage = useCallback(() => {
    setSelectedIds((previousSelectedIds) => {
      const nextSelectedIds = new Set(previousSelectedIds);
      const isFull = selectionAggregate === 'all';
      const isPartial = selectionAggregate === 'partial';
      if (isFull || isPartial) {
        pageIds.forEach((rowId) => {
          nextSelectedIds.delete(rowId);
        });
      } else {
        pageIds.forEach((rowId) => {
          nextSelectedIds.add(rowId);
        });
      }
      return nextSelectedIds;
    });
  }, [pageIds, selectionAggregate]);

  const toggleRow = useCallback((rowId: string) => {
    setSelectedIds((previousSelectedIds) => {
      const nextSelectedIds = new Set(previousSelectedIds);
      if (nextSelectedIds.has(rowId)) {
        nextSelectedIds.delete(rowId);
      } else {
        nextSelectedIds.add(rowId);
      }
      return nextSelectedIds;
    });
  }, []);

  const handleSortClick = useCallback(
    (sortKey: SortKey) => {
      if (orderBy === sortKey) {
        setOrder(toggleTableSortDirection(order));
      } else {
        setOrderBy(sortKey);
        setOrder('asc');
      }
    },
    [order, orderBy],
  );

  const renderTag = useCallback((row: TableStoryDemoRow) => {
    return (
      <Tag
        colorVariant={row.tag.color}
        appearance="outline"
        size={Size.SM}
        leftIcon={<Icon name="IconExLayers" size={IconSize.SM} color="currentColor" />}
      >
        {row.tag.label}
      </Tag>
    );
  }, []);

  return (
    <TableContainer elevated>
      <TableContainerScroll embeddedPaginationBelow>
        <Table striped size="md" aria-label="Демо таблицы с выбором строк и тегами">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  size={Size.SM}
                  checked={selectionAggregate === 'all'}
                  indeterminate={selectionAggregate === 'partial'}
                  onChange={() => {
                    toggleSelectAllOnPage();
                  }}
                  aria-label="Выбрать все на странице"
                />
              </TableCell>
              <TableCell activeColumn={orderBy === 'user'}>
                <TableSortLabel
                  active={orderBy === 'user'}
                  direction={orderBy === 'user' ? order : false}
                  onClick={() => {
                    handleSortClick('user');
                  }}
                >
                  Пользователь
                </TableSortLabel>
              </TableCell>
              <TableCell activeColumn={orderBy === 'state'}>
                <TableSortLabel
                  active={orderBy === 'state'}
                  direction={orderBy === 'state' ? order : false}
                  onClick={() => {
                    handleSortClick('state');
                  }}
                >
                  Статус
                </TableSortLabel>
              </TableCell>
              <TableCell>Сервис</TableCell>
              <TableCell>Профиль</TableCell>
              <TableCell align="right" activeColumn={orderBy === 'date'}>
                <TableSortLabel
                  active={orderBy === 'date'}
                  direction={orderBy === 'date' ? order : false}
                  onClick={() => {
                    handleSortClick('date');
                  }}
                >
                  Дата
                </TableSortLabel>
              </TableCell>
              <TableCell padding="checkbox" align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {pageSlice.map((row) => {
              const checked = selectedIds.has(row.id);
              const rowDisabled = Boolean(row.disableRow);
              return (
                <TableRow key={row.id} selected={checked} disabled={rowDisabled}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      size={Size.SM}
                      checked={checked}
                      disabled={rowDisabled}
                      onChange={() => {
                        if (!rowDisabled) {
                          toggleRow(row.id);
                        }
                      }}
                      aria-label={`Выбрать строку ${row.user}`}
                    />
                  </TableCell>
                  <TableCell>{row.user}</TableCell>
                  <TableCell>{renderTag(row)}</TableCell>
                  <TableCell>{row.socialChannel}</TableCell>
                  <TableCell>
                    <StoryTableInline>
                      <Avatar size={Size.SM} userName={row.avatarSeed} />
                      <span>{row.login}</span>
                    </StoryTableInline>
                  </TableCell>
                  <TableCell align="right">{row.dateLabel}</TableCell>
                  <TableCell padding="checkbox" align="center">
                    <IconButton
                      type="button"
                      variant={ButtonVariant.GHOST}
                      size={Size.SM}
                      aria-label={`Действия для ${row.user}`}
                      disabled={rowDisabled}
                      icon={<Icon name="IconExDots" size={IconSize.SM} color="currentColor" />}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <StoryTableLoadMoreCell>
                <StoryTableLoadMore
                  type="button"
                  onClick={() => {
                    setLoadMoreClicks((clickCount) => clickCount + 1);
                  }}
                >
                  Загрузить больше
                  <Icon name="PhosphorArrowFatLineDown" size={IconSize.SM} color="currentColor" />
                  {loadMoreClicks > 0 ? (
                    <StoryLoadMoreHint>({loadMoreClicks})</StoryLoadMoreHint>
                  ) : null}
                </StoryTableLoadMore>
              </StoryTableLoadMoreCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainerScroll>

      <TablePagination
        embeddedInTableCard
        count={sortedRows.length}
        page={safePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[2, 3, 5]}
        onPageChange={(_event, nextPageZeroBased) => {
          setPage(nextPageZeroBased);
        }}
        onRowsPerPageChange={(changeEvent) => {
          const nextPageSize = Number(changeEvent.target.value);
          setRowsPerPage(nextPageSize);
          setPage(0);
        }}
        size={Size.SM}
      />
    </TableContainer>
  );
}
