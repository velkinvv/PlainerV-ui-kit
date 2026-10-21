import { Size, Tag } from '@velkinvv/plainerv';

type ComponentStatusBadgeProps = {
  status: string;
  since?: string;
};

type StatusColor = 'success' | 'info' | 'danger' | 'neutral';

const STATUS_LABELS: Record<string, string> = {
  stable: 'stable',
  beta: 'beta',
  deprecated: 'deprecated',
};

const STATUS_COLORS: Record<string, StatusColor> = {
  stable: 'success',
  beta: 'info',
  deprecated: 'danger',
};

/**
 * Статус и версия — две отдельные пилюли `Tag`: в одном `Badge` строка
 * «stable · since 0.1.0» не вмещалась и обрезалась.
 */
export const ComponentStatusBadge = ({ status, since }: ComponentStatusBadgeProps) => {
  const normalizedStatus = status.trim().toLowerCase();
  const label = STATUS_LABELS[normalizedStatus] ?? normalizedStatus;
  // `since` приходит из манифеста: при отсутствии данных там заглушка `unknown`.
  const hasSince = Boolean(since) && since !== 'unknown';

  return (
    <span className="docs-status-tags">
      <Tag
        size={Size.SM}
        colorVariant={STATUS_COLORS[normalizedStatus] ?? 'neutral'}
        statusDisplay="marker"
        maxWidth="100%"
        tooltipWhenTruncated
      >
        {label}
      </Tag>

      {hasSince ? (
        <Tag
          size={Size.SM}
          colorVariant="neutral"
          appearance="outline"
          maxWidth="100%"
          tooltipWhenTruncated
        >
          с {since}
        </Tag>
      ) : null}
    </span>
  );
};
