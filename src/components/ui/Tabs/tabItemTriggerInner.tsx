import React from 'react';
import {
  TabItemIconSlot,
  TabItemLoadingSlot,
  TabItemTriggerLabel,
  TabItemBadgeWrap,
} from './TabItem.style';
import { Badge } from '../Badge/Badge';
import {
  BadgeVariant,
  SpinnerVariant,
  type TabItemTextOrientation,
  type TabItemTextPosition,
} from '@/types/ui';
import { Size } from '@/types/sizes';
import { Spinner } from '../Spinner/Spinner';

/**
 * Содержимое кнопки вкладки: иконки, подпись, бейдж, при **loading** — спиннер.
 *
 * @param params.iconStart — иконка до подписи
 * @param params.iconEnd — иконка после подписи
 * @param params.label — подпись вкладки
 * @param params.badge — бейдж справа от текста
 * @param params.loading — показывать спиннер и слегка приглушить подпись
 * @param params.spinnerColor — цвет спиннера из темы (**theme.colors.primary**)
 * @param params.textOrientation — ориентация текста подписи (**horizontal** / **vertical**); вертикаль только у лейбла
 * @param params.textPosition — при вертикальном тексте позиция (**left** / **right**)
 */
export function renderTabItemTriggerInner(params: {
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  label?: React.ReactNode;
  badge?: React.ReactNode;
  loading: boolean;
  spinnerColor: string;
  textOrientation?: TabItemTextOrientation;
  textPosition?: TabItemTextPosition;
}): React.ReactNode {
  const { iconStart, iconEnd, label, badge, loading, spinnerColor, textOrientation, textPosition } =
    params;

  return (
    <>
      {iconStart ? <TabItemIconSlot>{iconStart}</TabItemIconSlot> : null}
      {label ? (
        <TabItemTriggerLabel
          $loading={loading}
          $textOrientation={textOrientation}
          $textPosition={textPosition}
        >
          {label}
        </TabItemTriggerLabel>
      ) : null}
      {iconEnd ? <TabItemIconSlot>{iconEnd}</TabItemIconSlot> : null}
      {badge != null && badge !== false ? (
        <TabItemBadgeWrap>
          <Badge variant={BadgeVariant.DEFAULT} size={Size.SM}>
            {badge}
          </Badge>
        </TabItemBadgeWrap>
      ) : null}
      {loading ? (
        <TabItemLoadingSlot>
          <Spinner
            size={Size.SM}
            color={spinnerColor}
            variant={SpinnerVariant.CIRCLE}
            thickness={2}
            ariaLabel="Загрузка"
          />
        </TabItemLoadingSlot>
      ) : null}
    </>
  );
}
