/** Локаль по умолчанию для Intl-пресетов в форматировании ячеек. */
export const TABLE_CELL_FORMAT_DEFAULT_LOCALE = 'ru-RU' as const;

/** Дефолтная валюта для пресета `currency` при русской локали. */
export const TABLE_CELL_FORMAT_DEFAULT_CURRENCY = 'RUB' as const;

/** Телефон РФ (маска поверх только цифр входной строки). */
export const TABLE_CELL_MASK_PHONE_RU = '+7 (###) ###-##-##' as const;

/** Упрощённый международный вариант. */
export const TABLE_CELL_MASK_PHONE_INT = '+# ### ###-####' as const;

/** Банковский счёт РФ (20 цифр). */
export const TABLE_CELL_MASK_BANK_ACCOUNT_RU = '#### #### #### #### ####' as const;

/** Номер карты (16 цифр). */
export const TABLE_CELL_MASK_BANK_CARD = '#### #### #### ####' as const;

/** ИНН юридического лица (10 цифр подряд). */
export const TABLE_CELL_MASK_INN_10 = '##########' as const;

/** ИНН физлица / ИП (12 цифр подряд). */
export const TABLE_CELL_MASK_INN_12 = '############' as const;

/** СНИЛС. */
export const TABLE_CELL_MASK_SNILS = '###-###-### ##' as const;
