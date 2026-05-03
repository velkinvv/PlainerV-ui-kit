import type { TagColorVariant } from '@/types/ui';

/** Одна строка демо-таблицы (макет: пользователь, тег, соцсеть, дата, действия). */
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
 * Набор строк для сторис «полная таблица» (имена как в референс-макете + доп. строки для прокрутки и пагинации).
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
  {
    id: '7',
    user: 'Robert Fox',
    tag: { label: 'Review', color: 'info' },
    socialChannel: 'linkedin',
    login: 'r.fox',
    avatarSeed: 'Robert Fox',
    dateLabel: '02.11.2024 14:30',
  },
  {
    id: '8',
    user: 'Annette Black',
    tag: { label: 'Draft', color: 'secondary' },
    socialChannel: 'instagram',
    login: 'annette.b',
    avatarSeed: 'Annette Black',
    dateLabel: '03.11.2024 9:15',
  },
  {
    id: '9',
    user: 'Darrell Steward',
    tag: { label: 'Tag', color: 'primary' },
    socialChannel: 'telegram',
    login: 'dsteward',
    avatarSeed: 'Darrell Steward',
    dateLabel: '04.11.2024 11:45',
  },
  {
    id: '10',
    user: 'Ralph Edwards',
    tag: { label: 'Archive', color: 'purple' },
    socialChannel: 'facebook',
    login: 'ralph_e',
    avatarSeed: 'Ralph Edwards',
    dateLabel: '05.11.2024 16:20',
  },
  {
    id: '11',
    user: 'Courtney Henry',
    tag: { label: 'Tag', color: 'teal' },
    socialChannel: 'twitter',
    login: 'courtney',
    avatarSeed: 'Courtney Henry',
    dateLabel: '06.11.2024 8:05',
  },
  {
    id: '12',
    user: 'Marvin McKinney',
    tag: { label: 'Pending', color: 'cyan' },
    socialChannel: 'linkedin',
    login: 'mmckinney',
    avatarSeed: 'Marvin McKinney',
    dateLabel: '07.11.2024 13:40',
  },
  {
    id: '13',
    user: 'Floyd Miles',
    tag: { label: 'Tag', color: 'pink' },
    socialChannel: 'instagram',
    login: 'floyd',
    avatarSeed: 'Floyd Miles',
    dateLabel: '08.11.2024 19:00',
  },
  {
    id: '14',
    user: 'Анна Волкова',
    tag: { label: 'Локаль', color: 'success' },
    socialChannel: 'telegram',
    login: 'anna.v',
    avatarSeed: 'Anna Volkova',
    dateLabel: '09.11.2024 10:22',
  },
  {
    id: '15',
    user: 'James Hall',
    tag: { label: 'Tag', color: 'warning' },
    socialChannel: 'facebook',
    login: 'james_h',
    avatarSeed: 'James Hall',
    dateLabel: '10.11.2024 7:55',
  },
  {
    id: '16',
    user: 'Theresa Webb',
    tag: { label: 'Sent', color: 'info' },
    socialChannel: 'twitter',
    login: 'twebb',
    avatarSeed: 'Theresa Webb',
    dateLabel: '11.11.2024 12:10',
  },
  {
    id: '17',
    user: 'Ronald Richards',
    tag: { label: 'Tag', color: 'neutral' },
    socialChannel: 'linkedin',
    login: 'ronald.r',
    avatarSeed: 'Ronald Richards',
    dateLabel: '12.11.2024 15:33',
  },
  {
    id: '18',
    user: 'Leslie Alexander',
    tag: { label: 'New', color: 'primary' },
    socialChannel: 'instagram',
    login: 'leslie_a',
    avatarSeed: 'Leslie Alexander',
    dateLabel: '13.11.2024 18:48',
  },
  {
    id: '19',
    user: 'Brooklyn Simmons',
    tag: { label: 'Tag', color: 'danger' },
    socialChannel: 'facebook',
    login: 'brooklyn',
    avatarSeed: 'Brooklyn Simmons',
    dateLabel: '14.11.2024 6:12',
  },
  {
    id: '20',
    user: 'Jerome Bell',
    tag: { label: 'Hold', color: 'secondary' },
    socialChannel: 'telegram',
    login: 'jerome.bell',
    avatarSeed: 'Jerome Bell',
    dateLabel: '15.11.2024 21:05',
    disableRow: true,
  },
];
