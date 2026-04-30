import type { TagColorVariant } from '@/types/ui';

/** ╨Ю╨┤╨╜╨░ ╤Б╤В╤А╨╛╨║╨░ ╨┤╨╡╨╝╨╛-╤В╨░╨▒╨╗╨╕╤Ж╤Л (╨╝╨░╨║╨╡╤В: ╨┐╨╛╨╗╤М╨╖╨╛╨▓╨░╤В╨╡╨╗╤М, ╤В╨╡╨│, ╤Б╨╛╤Ж╤Б╨╡╤В╨╕, ╨┤╨░╤В╨░, ╨┤╨╡╨╣╤Б╤В╨▓╨╕╤П). */
export type TableStoryDemoRow = {
  id: string;
  user: string;
  /** ╨Я╨╛╨┤╨┐╨╕╤Б╤М ╨╕ ╨┐╨░╨╗╨╕╤В╤А╨░ ╤В╨╡╨│╨░ ╨▓ ╨║╨╛╨╗╨╛╨╜╨║╨╡ ┬лState┬╗ */
  tag: { label: string; color: TagColorVariant };
  /** ╨в╨╡╨║╤Б╤В ╨┐╨╗╨░╤В╤Д╨╛╤А╨╝╤Л (╨╜╨╕╨╢╨╜╨╕╨╣ ╤А╨╡╨│╨╕╤Б╤В╤А ╨║╨░╨║ ╨▓ ╨╝╨░╨║╨╡╤В╨╡) */
  socialChannel: string;
  /** ╨Я╨╛╨┤╨┐╨╕╤Б╤М ╤А╤П╨┤╨╛╨╝ ╤Б ╨░╨▓╨░╤В╨░╤А╨╛╨╝ */
  login: string;
  /** ╨б╤В╤А╨╛╨║╨░ ╨┤╨╗╤П `Avatar.userName` / ╨╕╨╜╨╕╤Ж╨╕╨░╨╗╨╛╨▓ */
  avatarSeed: string;
  /** ╨г╨╢╨╡ ╨╛╤В╤Д╨╛╤А╨╝╨░╤В╨╕╤А╨╛╨▓╨░╨╜╨╜╨░╤П ╨┤╨░╤В╨░ ╨┤╨╗╤П ╤П╤З╨╡╨╣╨║╨╕ */
  dateLabel: string;
  /** ╨б╤В╤А╨╛╨║╨░ ╨▓ ╤Б╤В╨╕╨╗╨╡ disabled ╨╕╨╖ ╨╝╨░╨║╨╡╤В╨░ */
  disableRow?: boolean;
};

/**
 * ╨Э╨░╨▒╨╛╤А ╤Б╤В╤А╨╛╨║ ╨┤╨╗╤П ╤Б╤В╨╛╤А╨╕╤Б ┬л╨┐╨╛╨╗╨╜╨░╤П ╤В╨░╨▒╨╗╨╕╤Ж╨░┬╗ (╨╕╨╝╨╡╨╜╨░ ╨║╨░╨║ ╨▓ ╤А╨╡╤Д╨╡╤А╨╡╨╜╤Б-╨╝╨░╨║╨╡╤В╨╡).
 */
export const TABLE_STORY_DEMO_ROWS: TableStoryDemoRow[] = [
  {
    id: '1',
    user: 'Albert Flores',
    tag: { label: 'Tag', color: 'success' },
    socialChannel: 'facebook',
    login: 'login',
    avatarSeed: 'Albert Flores',
    dateLabel: '27.10.2024 8:00',
  },
  {
    id: '2',
    user: 'Jane Cooper',
    tag: { label: 'Tag', color: 'danger' },
    socialChannel: 'twitter',
    login: 'login',
    avatarSeed: 'Jane Cooper',
    dateLabel: '27.10.2024 8:00',
  },
  {
    id: '3',
    user: 'Jenny Wilson',
    tag: { label: 'Tag', color: 'warning' },
    socialChannel: 'facebook',
    login: 'login',
    avatarSeed: 'Jenny Wilson',
    dateLabel: '27.10.2024 8:00',
  },
  {
    id: '4',
    user: 'Kristin Watson',
    tag: { label: 'Tag', color: 'neutral' },
    socialChannel: 'twitter',
    login: 'login',
    avatarSeed: 'Kristin Watson',
    dateLabel: '27.10.2024 8:00',
  },
  {
    id: '5',
    user: 'Cody Fisher',
    tag: { label: 'Tag', color: 'success' },
    socialChannel: 'facebook',
    login: 'login',
    avatarSeed: 'Cody Fisher',
    dateLabel: '27.10.2024 8:00',
  },
  {
    id: '6',
    user: 'Esther Howard',
    tag: { label: 'Tag', color: 'danger' },
    socialChannel: 'twitter',
    login: 'login',
    avatarSeed: 'Esther Howard',
    dateLabel: '27.10.2024 8:00',
    disableRow: true,
  },
];
