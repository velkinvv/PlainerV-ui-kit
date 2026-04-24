import type { TagColorVariant } from '@/types/ui';

/** Одна строка демо-таблицы (макет: пользователь, тег, соцсети, дата, действия). */
export type TableStoryDemoRow = {
  id: string;
  user: string;
  /** Подпись и палитра тега в колонке «State» */
  tag: { label: string; color: TagColorVariant };
  /** Текст платформы (нижний регистр как в макете) */
  socialChannel: string;
  /** Подпись рядом с аватаром */
  login: string;
  /** Строка для `Avatar.userName` / инициалов */
  avatarSeed: string;
  /** Уже отформатированная дата для ячейки */
  dateLabel: string;
  /** Строка в стиле disabled из макета */
  disableRow?: boolean;
};

/**
 * Набор строк для сторис «полная таблица» (имена как в референс-макете).
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
