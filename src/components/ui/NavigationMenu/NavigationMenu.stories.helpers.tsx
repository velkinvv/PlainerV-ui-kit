import React, { useCallback, useState } from 'react';
import { fn } from '@storybook/test';
import { NavigationMenu } from './NavigationMenu';
import type { NavigationMenuProps } from '@/types/ui';

/** Строка статуса: типографика Storybook */
const storyActiveStatusParagraphStyle: React.CSSProperties = {
  marginTop: 0,
  marginBottom: 12,
  fontSize: 13,
  fontFamily: 'system-ui, sans-serif',
};

const storyActiveStatusMutedStyle: React.CSSProperties = {
  opacity: 0.75,
};

const storyActiveStatusEmphasisStyle: React.CSSProperties = {
  fontWeight: 600,
};

const logActiveIdInActions = fn();

export type NavigationMenuStoryWithStateProps = {
  /** Начальный выбранный id при монтировании */
  initialActiveId: string | null;
  /** Пропсы меню без `children`, `activeId`, `onActiveChange`, `defaultActiveId` */
  navigationMenuProps?: Omit<
    NavigationMenuProps,
    'children' | 'activeId' | 'onActiveChange' | 'defaultActiveId'
  >;
  /** Пункты `NavigationMenuItem` */
  children: React.ReactNode;
};

/**
 * Обёртка для сторис: контролируемый `activeId`, строка «Активный пункт» и вызов в Actions.
 * @param initialActiveId — значение при первом рендере
 * @param navigationMenuProps — остальные пропсы {@link NavigationMenu}
 * @param children — пункты меню
 */
export const NavigationMenuStoryWithState: React.FC<NavigationMenuStoryWithStateProps> = ({
  initialActiveId,
  navigationMenuProps = {},
  children,
}) => {
  const [activeId, setActiveId] = useState<string | null>(initialActiveId);

  const handleActiveChange = useCallback((nextId: string) => {
    setActiveId(nextId);
    logActiveIdInActions(nextId);
  }, []);

  return (
    <div>
      <p role="status" aria-live="polite" style={storyActiveStatusParagraphStyle}>
        <span style={storyActiveStatusMutedStyle}>Активный пункт: </span>
        <span style={storyActiveStatusEmphasisStyle}>{activeId ?? '—'}</span>
      </p>
      <NavigationMenu
        {...navigationMenuProps}
        activeId={activeId}
        onActiveChange={handleActiveChange}
      >
        {children}
      </NavigationMenu>
    </div>
  );
};

type StoryArgsWithMenu = Partial<NavigationMenuProps> & {
  children?: React.ReactNode;
};

/**
 * Убирает из args CSF поля, которые задаёт {@link NavigationMenuStoryWithState}.
 * @param storyArgs — объект `args` из `render` в сторис
 */
export function pickNavigationMenuPropsFromStoryArgs(
  storyArgs: StoryArgsWithMenu,
): Omit<NavigationMenuProps, 'children' | 'activeId' | 'onActiveChange' | 'defaultActiveId'> {
  const {
    children: _unusedChildren,
    defaultActiveId: _unusedDefaultActiveId,
    activeId: _unusedActiveId,
    onActiveChange: _unusedOnActiveChange,
    ...menuProps
  } = storyArgs;
  return menuProps;
}

/**
 * Начальный `activeId` из `defaultActiveId` в args или запасной строкой.
 * @param storyArgs — args сторис
 * @param fallbackId — если в args нет строкового defaultActiveId
 */
export function initialActiveIdFromStoryArgs(
  storyArgs: StoryArgsWithMenu,
  fallbackId: string | null,
): string | null {
  const defaultActiveId = storyArgs.defaultActiveId;
  if (typeof defaultActiveId === 'string') {
    return defaultActiveId;
  }
  return fallbackId;
}
