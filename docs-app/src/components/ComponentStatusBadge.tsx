import { Badge } from '@velkinvv/plainerv';

type ComponentStatusBadgeProps = {
  status: string;
  since?: string;
};

const STATUS_LABELS: Record<string, string> = {
  stable: 'stable',
  beta: 'beta',
  deprecated: 'deprecated',
};

export const ComponentStatusBadge = ({ status, since }: ComponentStatusBadgeProps) => {
  const normalizedStatus = status.trim().toLowerCase();
  const label = STATUS_LABELS[normalizedStatus] ?? normalizedStatus;

  return <Badge>{since ? `${label} · since ${since}` : label}</Badge>;
};
