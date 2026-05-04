import type { TagColorVariant } from '@/types/ui';

/** Одна строка демо-таблицы (макет: пользователь, тег, сервис, дата, действия). */
export type TableStoryDemoRow = {
  id: string;
  user: string;
  /** Подпись и палитра тега в колонке «Статус» */
  tag: { label: string; color: TagColorVariant };
  /** Название российского сервиса / площадки для колонки «Сервис» */
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
 * Набор строк для сторис «полная таблица»: русскоязычные ФИО, теги, площадки (ВКонтакте, Одноклассники, Рутуб и др.).
 */
export const TABLE_STORY_DEMO_ROWS: TableStoryDemoRow[] = [
  {
    id: '1',
    user: 'Альберт Смирнов',
    tag: { label: 'Активен', color: 'success' },
    socialChannel: 'ВКонтакте',
    login: 'смирнов_а',
    avatarSeed: 'Альберт Смирнов',
    dateLabel: '27.10.2024 8:00',
  },
  {
    id: '2',
    user: 'Мария Кузнецова',
    tag: { label: 'Ошибка', color: 'danger' },
    socialChannel: 'Одноклассники',
    login: 'кузнецова_м',
    avatarSeed: 'Мария Кузнецова',
    dateLabel: '27.10.2024 8:00',
  },
  {
    id: '3',
    user: 'Елена Морозова',
    tag: { label: 'Внимание', color: 'warning' },
    socialChannel: 'ВКонтакте',
    login: 'морозова_е',
    avatarSeed: 'Елена Морозова',
    dateLabel: '27.10.2024 8:00',
  },
  {
    id: '4',
    user: 'Пётр Волков',
    tag: { label: 'Нейтрально', color: 'neutral' },
    socialChannel: 'Рутуб',
    login: 'волков_п',
    avatarSeed: 'Пётр Волков',
    dateLabel: '27.10.2024 8:00',
  },
  {
    id: '5',
    user: 'Игорь Лебедев',
    tag: { label: 'Активен', color: 'success' },
    socialChannel: 'Дзен',
    login: 'лебедев_и',
    avatarSeed: 'Игорь Лебедев',
    dateLabel: '27.10.2024 8:00',
  },
  {
    id: '6',
    user: 'Светлана Орлова',
    tag: { label: 'Ошибка', color: 'danger' },
    socialChannel: 'ВК Видео',
    login: 'орлова_с',
    avatarSeed: 'Светлана Орлова',
    dateLabel: '27.10.2024 8:00',
    disableRow: true,
  },
  {
    id: '7',
    user: 'Дмитрий Соколов',
    tag: { label: 'На проверке', color: 'info' },
    socialChannel: 'Яндекс Музыка',
    login: 'соколов_д',
    avatarSeed: 'Дмитрий Соколов',
    dateLabel: '02.11.2024 14:30',
  },
  {
    id: '8',
    user: 'Анна Новикова',
    tag: { label: 'Черновик', color: 'secondary' },
    socialChannel: 'Кинопоиск',
    login: 'новикова_а',
    avatarSeed: 'Анна Новикова',
    dateLabel: '03.11.2024 9:15',
  },
  {
    id: '9',
    user: 'Сергей Козлов',
    tag: { label: 'Основной', color: 'primary' },
    socialChannel: 'MAX',
    login: 'козлов_с',
    avatarSeed: 'Сергей Козлов',
    dateLabel: '04.11.2024 11:45',
  },
  {
    id: '10',
    user: 'Ольга Попова',
    tag: { label: 'Архив', color: 'purple' },
    socialChannel: 'ВКонтакте',
    login: 'попова_о',
    avatarSeed: 'Ольга Попова',
    dateLabel: '05.11.2024 16:20',
  },
  {
    id: '11',
    user: 'Наталья Соловьёва',
    tag: { label: 'Активен', color: 'teal' },
    socialChannel: 'Одноклассники',
    login: 'соловьева_н',
    avatarSeed: 'Наталья Соловьёва',
    dateLabel: '06.11.2024 8:05',
  },
  {
    id: '12',
    user: 'Виктор Зайцев',
    tag: { label: 'Ожидает', color: 'cyan' },
    socialChannel: 'Рутуб',
    login: 'зайцев_в',
    avatarSeed: 'Виктор Зайцев',
    dateLabel: '07.11.2024 13:40',
  },
  {
    id: '13',
    user: 'Андрей Павлов',
    tag: { label: 'Активен', color: 'pink' },
    socialChannel: 'Дзен',
    login: 'павлов_а',
    avatarSeed: 'Андрей Павлов',
    dateLabel: '08.11.2024 19:00',
  },
  {
    id: '14',
    user: 'Анна Волкова',
    tag: { label: 'Локаль', color: 'success' },
    socialChannel: 'ВК Видео',
    login: 'волкова_а',
    avatarSeed: 'Анна Волкова',
    dateLabel: '09.11.2024 10:22',
  },
  {
    id: '15',
    user: 'Михаил Семёнов',
    tag: { label: 'Внимание', color: 'warning' },
    socialChannel: 'Яндекс Музыка',
    login: 'михаил_с',
    avatarSeed: 'Михаил Семёнов',
    dateLabel: '10.11.2024 7:55',
  },
  {
    id: '16',
    user: 'Екатерина Голубева',
    tag: { label: 'Отправлено', color: 'info' },
    socialChannel: 'Кинопоиск',
    login: 'голубева_е',
    avatarSeed: 'Екатерина Голубева',
    dateLabel: '11.11.2024 12:10',
  },
  {
    id: '17',
    user: 'Роман Фёдоров',
    tag: { label: 'Нейтрально', color: 'neutral' },
    socialChannel: 'ВКонтакте',
    login: 'федоров_р',
    avatarSeed: 'Роман Фёдоров',
    dateLabel: '12.11.2024 15:33',
  },
  {
    id: '18',
    user: 'Ирина Михайлова',
    tag: { label: 'Новый', color: 'primary' },
    socialChannel: 'Одноклассники',
    login: 'михайлова_и',
    avatarSeed: 'Ирина Михайлова',
    dateLabel: '13.11.2024 18:48',
  },
  {
    id: '19',
    user: 'Павел Алексеев',
    tag: { label: 'Ошибка', color: 'danger' },
    socialChannel: 'Рутуб',
    login: 'алексеев_п',
    avatarSeed: 'Павел Алексеев',
    dateLabel: '14.11.2024 6:12',
  },
  {
    id: '20',
    user: 'Константин Егоров',
    tag: { label: 'Удержан', color: 'secondary' },
    socialChannel: 'Дзен',
    login: 'егоров_к',
    avatarSeed: 'Константин Егоров',
    dateLabel: '15.11.2024 21:05',
    disableRow: true,
  },
];
