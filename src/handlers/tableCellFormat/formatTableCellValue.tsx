import React, { type ReactNode } from 'react';
import { LinkMode, type TableCellFormat, type TableCellFormatContext } from '@/types/ui';
import { Link } from '@/components/ui/Link/Link';
import { applyMaskPattern } from './applyMaskPattern';
import { formatTableCellCurrencyDisplay } from './formatTableCellCurrency';
import { formatTableCellDayjsDisplay } from './formatTableCellDateTime';
import { formatTableCellNumberDisplay } from './formatTableCellNumber';
import { formatTableCellPercentDisplay } from './formatTableCellPercent';
import { interpolateHrefTemplate } from './interpolateHrefTemplate';
import {
  TABLE_CELL_FORMAT_DEFAULT_LOCALE,
  TABLE_CELL_MASK_BANK_ACCOUNT_RU,
  TABLE_CELL_MASK_BANK_CARD,
  TABLE_CELL_MASK_INN_10,
  TABLE_CELL_MASK_INN_12,
  TABLE_CELL_MASK_PHONE_INT,
  TABLE_CELL_MASK_PHONE_RU,
  TABLE_CELL_MASK_SNILS,
} from './presetMasks';

/**
 * Проверка «пустого» значения ячейки для пресетов отображения.
 * @param value — сырое значение
 */
export function isEmptyTableCellValue(value: unknown): boolean {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }
  return false;
}

/**
 * Разрешение текста/узла подписи для ссылочных форматов.
 * @param label — статический узел или функция от контекста
 * @param params — контекст форматирования
 * @param fallbackString — запасная строка из значения ячейки
 */
function resolveTableCellLinkLabel<Row>(
  label: ReactNode | ((params: TableCellFormatContext<Row>) => ReactNode) | undefined,
  params: TableCellFormatContext<Row>,
  fallbackString: string,
): ReactNode {
  if (typeof label === 'function') {
    return label(params);
  }
  if (label !== undefined && label !== null) {
    return label;
  }
  return fallbackString;
}

/**
 * Сборка `mailto:` с query-параметрами.
 * @param emailAddress — адрес без префикса `mailto:`
 * @param subject — тема письма
 * @param body — тело письма
 */
function buildMailtoHref(emailAddress: string, subject?: string, body?: string): string {
  const mailParams = new URLSearchParams();
  if (subject != null && subject !== '') {
    mailParams.set('subject', subject);
  }
  if (body != null && body !== '') {
    mailParams.set('body', body);
  }
  const queryString = mailParams.toString();
  return queryString !== '' ? `mailto:${emailAddress}?${queryString}` : `mailto:${emailAddress}`;
}

function coerceTableCellBoolean(value: unknown): boolean | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'number') {
    return value !== 0;
  }
  if (typeof value === 'string') {
    const lowered = value.trim().toLowerCase();
    if (['true', '1', 'yes', 'да'].includes(lowered)) {
      return true;
    }
    if (['false', '0', 'no', 'нет'].includes(lowered)) {
      return false;
    }
  }
  return Boolean(value);
}

function extractDigitsOnly(rawValue: unknown): string {
  return String(rawValue ?? '').replace(/\D/g, '');
}

function resolveEnumMappedLabel(
  options:
    | Readonly<Record<string, ReactNode>>
    | ReadonlyArray<{ readonly value: string | number | boolean; readonly label: ReactNode }>,
  key: string,
): ReactNode | undefined {
  if (Array.isArray(options)) {
    const matchingEntry = options.find((entry) => String(entry.value) === key);
    return matchingEntry?.label;
  }
  const recordMapping = options as Readonly<Record<string, ReactNode>>;
  return recordMapping[key];
}

/**
 * Применяет декларативный формат и возвращает React-узел для ячейки.
 * @param params.value — значение поля
 * @param params.row — строка (опционально)
 * @param params.field — ключ колонки
 * @param params.rowIndex — индекс строки
 * @param params.format — описание формата из колонки
 */
export function formatTableCellValue<Row = unknown>(
  params: TableCellFormatContext<Row> & { format: TableCellFormat<Row> },
): React.ReactNode {
  const { value, row, field, rowIndex, format } = params;

  switch (format.type) {
    case 'custom':
      return format.renderCell({ value, row, field, rowIndex });

    case 'text': {
      if (isEmptyTableCellValue(value)) {
        return null;
      }
      let textBody = String(value);
      const transformMode = format.transform;
      if (transformMode === 'uppercase') {
        textBody = textBody.toUpperCase();
      } else if (transformMode === 'lowercase') {
        textBody = textBody.toLowerCase();
      } else if (transformMode === 'capitalize') {
        textBody =
          textBody.length > 0
            ? `${textBody[0]?.toUpperCase() ?? ''}${textBody.slice(1)}`
            : textBody;
      }
      return textBody;
    }

    case 'number': {
      const formattedNumber = formatTableCellNumberDisplay(
        value,
        format.locale ?? TABLE_CELL_FORMAT_DEFAULT_LOCALE,
        format.decimals,
        format.fallback,
      );
      return formattedNumber ?? null;
    }

    case 'currency': {
      const formattedCurrency = formatTableCellCurrencyDisplay(
        value,
        format.currency ?? undefined,
        format.locale ?? TABLE_CELL_FORMAT_DEFAULT_LOCALE,
        format.decimals ?? 2,
        format.fallback,
      );
      return formattedCurrency ?? null;
    }

    case 'percent': {
      const formattedPercent = formatTableCellPercentDisplay(
        value,
        format.locale ?? TABLE_CELL_FORMAT_DEFAULT_LOCALE,
        format.decimals ?? 0,
        format.fromFraction ?? true,
        format.fallback,
      );
      return formattedPercent ?? null;
    }

    case 'date': {
      const patternDate = format.pattern ?? 'DD.MM.YYYY';
      return formatTableCellDayjsDisplay(value, patternDate, format.fallback) ?? null;
    }

    case 'datetime': {
      const patternDateTime = format.pattern ?? 'DD.MM.YYYY HH:mm';
      return formatTableCellDayjsDisplay(value, patternDateTime, format.fallback) ?? null;
    }

    case 'time': {
      const patternTime = format.pattern ?? 'HH:mm';
      return formatTableCellDayjsDisplay(value, patternTime, format.fallback) ?? null;
    }

    case 'mask': {
      if (isEmptyTableCellValue(value)) {
        return null;
      }
      return applyMaskPattern(format.pattern, value);
    }

    case 'phone': {
      if (isEmptyTableCellValue(value)) {
        return null;
      }
      const phoneMask =
        format.mask ??
        (format.country === 'INT' ? TABLE_CELL_MASK_PHONE_INT : TABLE_CELL_MASK_PHONE_RU);
      const maskedPhone = applyMaskPattern(phoneMask, extractDigitsOnly(value));
      return maskedPhone !== '' ? maskedPhone : (format.fallback ?? null);
    }

    case 'bankAccount': {
      const bankDigits = extractDigitsOnly(value);
      if (bankDigits === '') {
        return format.fallback ?? null;
      }
      const maskedAccount = applyMaskPattern(TABLE_CELL_MASK_BANK_ACCOUNT_RU, bankDigits);
      return maskedAccount !== '' ? maskedAccount : (format.fallback ?? null);
    }

    case 'bankCard': {
      const cardDigits = extractDigitsOnly(value);
      if (cardDigits === '') {
        return format.fallback ?? null;
      }
      const maskedCard = applyMaskPattern(TABLE_CELL_MASK_BANK_CARD, cardDigits);
      return maskedCard !== '' ? maskedCard : (format.fallback ?? null);
    }

    case 'inn': {
      const innDigits = extractDigitsOnly(value);
      if (innDigits === '') {
        return format.fallback ?? null;
      }
      let maskedInn = '';
      if (innDigits.length === 10) {
        maskedInn = applyMaskPattern(TABLE_CELL_MASK_INN_10, innDigits);
      } else if (innDigits.length === 12) {
        maskedInn = applyMaskPattern(TABLE_CELL_MASK_INN_12, innDigits);
      } else {
        maskedInn = innDigits;
      }
      return maskedInn !== '' ? maskedInn : (format.fallback ?? null);
    }

    case 'snils': {
      const snilsDigits = extractDigitsOnly(value);
      if (snilsDigits === '') {
        return format.fallback ?? null;
      }
      const maskedSnils = applyMaskPattern(TABLE_CELL_MASK_SNILS, snilsDigits);
      return maskedSnils !== '' ? maskedSnils : (format.fallback ?? null);
    }

    case 'boolean': {
      const coercedBoolean = coerceTableCellBoolean(value);
      if (coercedBoolean === null) {
        return format.indeterminateLabel ?? null;
      }
      if (coercedBoolean) {
        return format.trueLabel ?? 'Да';
      }
      return format.falseLabel ?? 'Нет';
    }

    case 'enum': {
      if (value === null || value === undefined) {
        return format.fallback ?? null;
      }
      if (typeof value === 'string' && value.trim() === '') {
        return format.fallback ?? null;
      }
      const enumKey = String(value);
      const mappedLabel = resolveEnumMappedLabel(format.options, enumKey);
      if (mappedLabel !== undefined) {
        return mappedLabel;
      }
      return format.fallback ?? enumKey;
    }

    case 'email': {
      if (isEmptyTableCellValue(value)) {
        return format.fallback ?? null;
      }
      const emailAddress = String(value).trim();
      if (!emailAddress.includes('@')) {
        return format.fallback ?? emailAddress;
      }
      const subjectResolved =
        typeof format.subject === 'function' ? format.subject?.(row) : format.subject;
      const bodyResolved = typeof format.body === 'function' ? format.body?.(row) : format.body;
      const mailHref = buildMailtoHref(
        emailAddress,
        subjectResolved ?? undefined,
        bodyResolved ?? undefined,
      );
      const openInNewTabEmail = format.openInNewTab ?? false;
      const linkChildren = resolveTableCellLinkLabel(format.label, params, emailAddress);
      return (
        <Link
          mode={LinkMode.TEXT}
          href={mailHref}
          textVariant={format.textVariant ?? 'default'}
          target={openInNewTabEmail ? '_blank' : format.target}
        >
          {linkChildren}
        </Link>
      );
    }

    case 'link': {
      const displayFallback = isEmptyTableCellValue(value) ? '' : String(value);
      const resolvedHref =
        typeof format.href === 'function'
          ? format.href(params)
          : interpolateHrefTemplate(format.href, row);

      if (
        resolvedHref === false ||
        resolvedHref === null ||
        resolvedHref === undefined ||
        resolvedHref === ''
      ) {
        return format.fallback ?? (displayFallback !== '' ? displayFallback : null);
      }

      const hrefString = String(resolvedHref);
      const openInNewTabLink = format.openInNewTab ?? false;
      const linkLabel = resolveTableCellLinkLabel(
        format.label,
        params,
        displayFallback !== '' ? displayFallback : hrefString,
      );

      return (
        <Link
          mode={LinkMode.TEXT}
          href={hrefString}
          textVariant={format.textVariant ?? 'default'}
          target={openInNewTabLink ? '_blank' : format.target}
          rel={format.rel}
          download={format.download}
        >
          {linkLabel}
        </Link>
      );
    }

    default: {
      return null;
    }
  }
}
