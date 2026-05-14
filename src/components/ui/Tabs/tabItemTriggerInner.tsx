import React from 'react';
import {
  TabItemIconSlot,
  TabItemLoadingSlot,
  TabItemTriggerLabel,
  TabItemVerticalTextWrap,
  TabItemBadgeWrap,
} from './TabItem.style';
import { Badge } from '../Badge/Badge';
import { BadgeVariant } from '@/types/ui';
import { Size } from '@/types/sizes';
import { Spinner } from '../Spinner/Spinner';
import { Size } from '@/types/sizes';
import { SpinnerVariant } from '@/types/ui';

/**
 * Содержимое кнопки вкладки: иконки, подпись, бейдж, при **loading** — спиннер.
 *
 * @param params.iconStart — иконка до подписи
 * @param params.iconEnd — иконка после подписи
 * @param params.label — подпись вкладки
 * @param params.badge — бейдж справа от текста
 * @param params.loading — показывать спиннер и слегка приглушить подпись
 * @param params.spinnerColor — цвет спиннера из темы (**theme.colors.primary**)
 * @param params.shouldWrapText — обёртка для вертикального текста (позиция RIGHT)
 */
export function renderTabItemTriggerInner(params: {
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  label?: React.ReactNode;
  badge?: React.ReactNode;
  loading: boolean;
  spinnerColor: string;
  shouldWrapText: boolean;
}): React.ReactNode {
  const { iconStart, iconEnd, label, badge, loading, spinnerColor, shouldWrapText } = params;

  const inner = (
    <>
      {iconStart ? <TabItemIconSlot>{iconStart}</TabItemIconSlot> : null}
      {label ? <TabItemTriggerLabel $loading={loading}>{label}</TabItemTriggerLabel> : null}
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

  return shouldWrapText ? <TabItemVerticalTextWrap>{inner}</TabItemVerticalTextWrap> : inner;
}
