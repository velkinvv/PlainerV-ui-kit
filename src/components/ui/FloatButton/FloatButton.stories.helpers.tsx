import React, { useEffect, useRef, useState } from 'react';
import { IconSize } from '../../../types/sizes';
import { Icon } from '../Icon/Icon';
import { FloatButton } from './FloatButton';
import { FloatButtonBackTop } from './FloatButtonBackTop';
import { FloatButtonGroup } from './FloatButtonGroup';
import {
  FloatButtonStoriesAnchorBox,
  FloatButtonStoriesScrollBox,
  FloatButtonStoriesScrollInner,
} from './FloatButton.stories.style';

/**
 * Локальный якорь: кнопка позиционируется внутри бокса, а не в viewport.
 * @param props.children - Рендер с getContainer
 */
export const FloatButtonStoriesLocalAnchor: React.FC<{
  children: (getContainer: () => HTMLElement | null) => React.ReactNode;
}> = ({ children }) => {
  const boxRef = useRef<HTMLElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <FloatButtonStoriesAnchorBox ref={boxRef} aria-label="Локальный якорь FloatButton">
      {isReady ? children(() => boxRef.current) : null}
    </FloatButtonStoriesAnchorBox>
  );
};

/**
 * Демо якоря внутри прокручиваемого контейнера.
 */
export const FloatButtonInContainerDemo: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <FloatButtonStoriesScrollBox ref={containerRef} aria-label="Контейнер с прокруткой">
      <FloatButtonStoriesScrollInner>
        <p>Прокрутите блок. Кнопка закреплена в углу контейнера, не окна.</p>
        <p>Контент ниже нужен, чтобы появилась полоса прокрутки.</p>
      </FloatButtonStoriesScrollInner>
      {isReady ? (
        <FloatButton
          icon={<Icon name="IconPlainerPlus" size={IconSize.SM} />}
          aria-label="Добавить в контейнере"
          getContainer={() => containerRef.current}
          insetPx={16}
        />
      ) : null}
    </FloatButtonStoriesScrollBox>
  );
};

/**
 * Демо BackTop с кольцом прогресса внутри прокручиваемого блока.
 */
export const FloatButtonBackTopProgressDemo: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <FloatButtonStoriesScrollBox ref={containerRef} aria-label="Контейнер BackTop">
      <FloatButtonStoriesScrollInner>
        <p>Прокрутите вниз — появится кнопка «наверх» с кольцом прогресса.</p>
        <p>Порог показа снижен, чтобы демо работало в коротком блоке.</p>
      </FloatButtonStoriesScrollInner>
      {isReady ? (
        <FloatButtonBackTop
          showProgress
          visibilityHeight={40}
          getContainer={() => containerRef.current}
          getScrollContainer={() => containerRef.current ?? window}
          insetPx={16}
        />
      ) : null}
    </FloatButtonStoriesScrollBox>
  );
};

/**
 * Демо группы с items внутри локального якоря.
 */
export const FloatButtonGroupItemsDemo: React.FC = () => (
  <FloatButtonStoriesLocalAnchor>
    {(getContainer) => (
      <FloatButtonGroup
        aria-label="Действия"
        getContainer={getContainer}
        insetPx={16}
        triggerItem={{
          icon: <Icon name="IconPlainerPlus" size={IconSize.SM} />,
          ariaLabel: 'Открыть действия',
        }}
        items={[
          {
            id: 'search',
            icon: <Icon name="IconPlainerSearch" size={IconSize.SM} />,
            ariaLabel: 'Поиск',
          },
          {
            id: 'profile',
            icon: <Icon name="IconPlainerUser" size={IconSize.SM} />,
            ariaLabel: 'Профиль',
          },
        ]}
      />
    )}
  </FloatButtonStoriesLocalAnchor>
);

/**
 * Демо группы по children: последний child — триггер.
 */
export const FloatButtonGroupClickDemo: React.FC = () => (
  <FloatButtonStoriesLocalAnchor>
    {(getContainer) => (
      <FloatButtonGroup aria-label="Действия" getContainer={getContainer} insetPx={16}>
        <FloatButton
          icon={<Icon name="IconPlainerSearch" size={IconSize.SM} />}
          aria-label="Поиск"
          inGroup
        />
        <FloatButton
          icon={<Icon name="IconPlainerUser" size={IconSize.SM} />}
          aria-label="Профиль"
          inGroup
        />
        <FloatButton
          icon={<Icon name="IconPlainerPlus" size={IconSize.SM} />}
          aria-label="Открыть"
          inGroup
        />
      </FloatButtonGroup>
    )}
  </FloatButtonStoriesLocalAnchor>
);
