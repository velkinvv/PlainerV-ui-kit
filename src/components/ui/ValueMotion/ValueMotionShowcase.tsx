import React, { useMemo, useState } from 'react';
import { AvatarGroup } from '../AvatarGroup/AvatarGroup';
import { Badge, BadgePresence } from '../Badge/Badge';
import { Input } from '../inputs/Input/Input';
import { Pagination } from '../Pagination/Pagination';
import { Pill } from '../Pill/Pill';
import { Stepper } from '../Stepper/Stepper';
import { Tag } from '../Tag/Tag';
import { AvatarGroupVariant, AvatarStatus, BadgeVariant } from '../../../types/ui';
import type { PillStatus, TagColorVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';
import {
  ValueMotionShowcaseButton,
  ValueMotionShowcaseControls,
  ValueMotionShowcaseField,
  ValueMotionShowcaseHint,
  ValueMotionShowcasePreview,
  ValueMotionShowcaseRoot,
  ValueMotionShowcaseSection,
  ValueMotionShowcaseSelect,
  ValueMotionShowcaseTitle,
} from './ValueMotionShowcase.style';

/** Базовый набор аватаров для демо счётчика +N */
const showcaseAvatars = [
  {
    id: 'showcase-1',
    userName: 'Анна',
    status: AvatarStatus.ONLINE,
  },
  {
    id: 'showcase-2',
    userName: 'Борис',
    status: AvatarStatus.ONLINE,
  },
  {
    id: 'showcase-3',
    userName: 'Вера',
    status: AvatarStatus.OFFLINE,
  },
  {
    id: 'showcase-4',
    userName: 'Глеб',
    status: AvatarStatus.WARNING,
  },
  {
    id: 'showcase-5',
    userName: 'Дина',
    status: AvatarStatus.DANGER,
  },
  {
    id: 'showcase-6',
    userName: 'Егор',
    status: AvatarStatus.ONLINE,
  },
  {
    id: 'showcase-7',
    userName: 'Жанна',
    status: AvatarStatus.OFFLINE,
  },
  {
    id: 'showcase-8',
    userName: 'Илья',
    status: AvatarStatus.ONLINE,
  },
];

const tagMarkerColors: TagColorVariant[] = [
  'primary',
  'success',
  'warning',
  'danger',
  'info',
  'neutral',
];

const pillStatuses: PillStatus[] = ['default', 'success', 'warning', 'danger', 'info'];

/**
 * Интерактивная витрина анимаций ValueMotion / BadgePresence:
 * появление, пульс при смене значения, исчезновение.
 */
export const ValueMotionShowcase: React.FC = () => {
  const [messageCount, setMessageCount] = useState(3);
  const [isBadgeVisible, setIsBadgeVisible] = useState(true);
  const [avatarCount, setAvatarCount] = useState(showcaseAvatars.length);
  const [currentStep, setCurrentStep] = useState(2);
  const [currentPage, setCurrentPage] = useState(3);
  const [inputValue, setInputValue] = useState('Привет');
  const [isPillSelected, setIsPillSelected] = useState(false);
  const [pillStatus, setPillStatus] = useState<PillStatus>('default');
  const [tagColorIndex, setTagColorIndex] = useState(0);

  const visibleAvatars = useMemo(
    () => showcaseAvatars.slice(0, avatarCount),
    [avatarCount],
  );

  const tagColorVariant = tagMarkerColors[tagColorIndex] ?? 'primary';

  return (
    <ValueMotionShowcaseRoot aria-label="Витрина анимаций счётчиков и индикаторов">
      <ValueMotionShowcaseSection>
        <ValueMotionShowcaseTitle>Badge / BadgePresence</ValueMotionShowcaseTitle>
        <ValueMotionShowcaseHint>
          Появление, пульс при смене числа, layout при смене размера.
        </ValueMotionShowcaseHint>
        <ValueMotionShowcasePreview>
          <BadgePresence visible={isBadgeVisible} variant={BadgeVariant.DANGER} size={Size.SM}>
            {messageCount}
          </BadgePresence>
        </ValueMotionShowcasePreview>
        <ValueMotionShowcaseControls>
          <ValueMotionShowcaseButton
            type="button"
            onClick={() => setMessageCount((value) => value + 1)}
          >
            +1
          </ValueMotionShowcaseButton>
          <ValueMotionShowcaseButton
            type="button"
            onClick={() => setMessageCount((value) => Math.max(0, value - 1))}
          >
            −1
          </ValueMotionShowcaseButton>
          <ValueMotionShowcaseButton
            type="button"
            onClick={() => setIsBadgeVisible((value) => !value)}
          >
            {isBadgeVisible ? 'Скрыть' : 'Показать'}
          </ValueMotionShowcaseButton>
        </ValueMotionShowcaseControls>
      </ValueMotionShowcaseSection>

      <ValueMotionShowcaseSection>
        <ValueMotionShowcaseTitle>AvatarGroup — счётчик +N</ValueMotionShowcaseTitle>
        <ValueMotionShowcaseHint>
          Счётчик появляется и пульсирует при изменении количества скрытых аватаров.
        </ValueMotionShowcaseHint>
        <ValueMotionShowcasePreview>
          <AvatarGroup
            avatars={visibleAvatars}
            variant={AvatarGroupVariant.STACK}
            maxVisible={3}
            size={Size.MD}
          />
        </ValueMotionShowcasePreview>
        <ValueMotionShowcaseControls>
          <ValueMotionShowcaseButton
            type="button"
            onClick={() => setAvatarCount((value) => Math.min(showcaseAvatars.length, value + 1))}
          >
            Добавить аватар
          </ValueMotionShowcaseButton>
          <ValueMotionShowcaseButton
            type="button"
            onClick={() => setAvatarCount((value) => Math.max(1, value - 1))}
          >
            Убрать аватар
          </ValueMotionShowcaseButton>
        </ValueMotionShowcaseControls>
      </ValueMotionShowcaseSection>

      <ValueMotionShowcaseSection>
        <ValueMotionShowcaseTitle>Stepper compact — N/M</ValueMotionShowcaseTitle>
        <ValueMotionShowcaseHint>Пульс при смене текущего шага.</ValueMotionShowcaseHint>
        <ValueMotionShowcasePreview>
          <Stepper
            variant="compact"
            currentStep={currentStep}
            totalSteps={5}
            title="Оформление заказа"
            subtitle="Шаг с анимированным счётчиком"
          />
        </ValueMotionShowcasePreview>
        <ValueMotionShowcaseControls>
          <ValueMotionShowcaseButton
            type="button"
            onClick={() => setCurrentStep((value) => Math.max(1, value - 1))}
          >
            Предыдущий шаг
          </ValueMotionShowcaseButton>
          <ValueMotionShowcaseButton
            type="button"
            onClick={() => setCurrentStep((value) => Math.min(5, value + 1))}
          >
            Следующий шаг
          </ValueMotionShowcaseButton>
        </ValueMotionShowcaseControls>
      </ValueMotionShowcaseSection>

      <ValueMotionShowcaseSection>
        <ValueMotionShowcaseTitle>Pagination compact — текущая страница</ValueMotionShowcaseTitle>
        <ValueMotionShowcaseHint>Пульс при листании страниц в compact-режиме.</ValueMotionShowcaseHint>
        <ValueMotionShowcasePreview>
          <Pagination
            variant="compact"
            totalPages={10}
            page={currentPage}
            onPageChange={setCurrentPage}
          />
        </ValueMotionShowcasePreview>
        <ValueMotionShowcaseControls>
          <ValueMotionShowcaseButton
            type="button"
            onClick={() => setCurrentPage((value) => Math.max(1, value - 1))}
          >
            Страница назад
          </ValueMotionShowcaseButton>
          <ValueMotionShowcaseButton
            type="button"
            onClick={() => setCurrentPage((value) => Math.min(10, value + 1))}
          >
            Страница вперёд
          </ValueMotionShowcaseButton>
        </ValueMotionShowcaseControls>
      </ValueMotionShowcaseSection>

      <ValueMotionShowcaseSection>
        <ValueMotionShowcaseTitle>CharacterCounter — лимит символов</ValueMotionShowcaseTitle>
        <ValueMotionShowcaseHint>
          Появление при вводе и пульс при достижении лимита (не на каждый символ).
        </ValueMotionShowcaseHint>
        <ValueMotionShowcaseField>
          <Input
            label="Комментарий"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            maxLength={20}
            displayCharacterCounter
            characterCounterVisibilityThreshold={0}
            fullWidth
          />
        </ValueMotionShowcaseField>
      </ValueMotionShowcaseSection>

      <ValueMotionShowcaseSection>
        <ValueMotionShowcaseTitle>Pill — индикатор</ValueMotionShowcaseTitle>
        <ValueMotionShowcaseHint>
          Пульс при смене выбранного состояния или семантического статуса.
        </ValueMotionShowcaseHint>
        <ValueMotionShowcasePreview>
          <Pill
            selected={isPillSelected}
            status={pillStatus}
            onChange={(nextSelected) => setIsPillSelected(nextSelected)}
          >
            Статус
          </Pill>
        </ValueMotionShowcasePreview>
        <ValueMotionShowcaseControls>
          <ValueMotionShowcaseButton
            type="button"
            onClick={() => setIsPillSelected((value) => !value)}
          >
            Переключить selected
          </ValueMotionShowcaseButton>
          <ValueMotionShowcaseSelect
            aria-label="Статус Pill"
            value={pillStatus}
            onChange={(event) => setPillStatus(event.target.value as PillStatus)}
          >
            {pillStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </ValueMotionShowcaseSelect>
        </ValueMotionShowcaseControls>
      </ValueMotionShowcaseSection>

      <ValueMotionShowcaseSection>
        <ValueMotionShowcaseTitle>Tag — status marker</ValueMotionShowcaseTitle>
        <ValueMotionShowcaseHint>Пульс при смене цвета маркера в режиме marker.</ValueMotionShowcaseHint>
        <ValueMotionShowcasePreview>
          <Tag colorVariant={tagColorVariant} statusDisplay="marker">
            Статус задачи
          </Tag>
        </ValueMotionShowcasePreview>
        <ValueMotionShowcaseControls>
          <ValueMotionShowcaseButton
            type="button"
            onClick={() =>
              setTagColorIndex((index) => (index + 1) % tagMarkerColors.length)
            }
          >
            Следующий цвет
          </ValueMotionShowcaseButton>
        </ValueMotionShowcaseControls>
      </ValueMotionShowcaseSection>

      <ValueMotionShowcaseSection>
        <ValueMotionShowcaseTitle>Badge isDot</ValueMotionShowcaseTitle>
        <ValueMotionShowcaseHint>Точка уведомления с тем же lifecycle, что у Badge.</ValueMotionShowcaseHint>
        <ValueMotionShowcasePreview>
          <BadgePresence visible={isBadgeVisible} variant={BadgeVariant.DANGER} isDot />
        </ValueMotionShowcasePreview>
      </ValueMotionShowcaseSection>
    </ValueMotionShowcaseRoot>
  );
};
