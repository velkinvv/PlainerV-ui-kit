import React, { useMemo, useState } from 'react';
import {
  SidemenuHorizontalPlacement,
  SidemenuVerticalAlignment,
  type SidemenuItem,
  type SidemenuProps,
} from '@/types/ui';
import { Sidemenu } from './Sidemenu';
import { applySidemenuActiveId } from './Sidemenu.stories.helpers';
import {
  createSidemenuPlacementStoryThemeStyles,
  sidemenuPlacementStoriesStyles,
} from './Sidemenu.stories.placement.styles';
import { lightTheme } from '@/themes/themes';

/** Одна комбинация horizontal × vertical для матрицы сторис */
export type SidemenuPlacementCombination = {
  horizontalPlacement: SidemenuHorizontalPlacement;
  verticalAlignment: SidemenuVerticalAlignment;
};

/** Все 6 комбинаций позиционирования */
export const SIDEMENU_PLACEMENT_COMBINATIONS: SidemenuPlacementCombination[] = [
  {
    horizontalPlacement: SidemenuHorizontalPlacement.LEFT,
    verticalAlignment: SidemenuVerticalAlignment.TOP,
  },
  {
    horizontalPlacement: SidemenuHorizontalPlacement.LEFT,
    verticalAlignment: SidemenuVerticalAlignment.CENTER,
  },
  {
    horizontalPlacement: SidemenuHorizontalPlacement.LEFT,
    verticalAlignment: SidemenuVerticalAlignment.BOTTOM,
  },
  {
    horizontalPlacement: SidemenuHorizontalPlacement.RIGHT,
    verticalAlignment: SidemenuVerticalAlignment.TOP,
  },
  {
    horizontalPlacement: SidemenuHorizontalPlacement.RIGHT,
    verticalAlignment: SidemenuVerticalAlignment.CENTER,
  },
  {
    horizontalPlacement: SidemenuHorizontalPlacement.RIGHT,
    verticalAlignment: SidemenuVerticalAlignment.BOTTOM,
  },
];

const placementThemeStyles = createSidemenuPlacementStoryThemeStyles(lightTheme);

/**
 * Человекочитаемая подпись комбинации placement.
 * @param combination — horizontal + vertical
 */
export function formatSidemenuPlacementLabel(combination: SidemenuPlacementCombination): string {
  const horizontalLabel =
    combination.horizontalPlacement === SidemenuHorizontalPlacement.RIGHT ? 'right' : 'left';
  return `${horizontalLabel} / ${combination.verticalAlignment}`;
}

/**
 * Пример JSX-пропсов для документации сторис.
 * @param combination — horizontal + vertical
 * @param extraProps — дополнительные пропсы (edgeAttached, offScreenHoverReveal и т.д.)
 */
export function buildSidemenuPlacementCodeSnippet(
  combination: SidemenuPlacementCombination,
  extraProps: Partial<SidemenuProps> = {},
): string {
  const propLines = [
    `horizontalPlacement={SidemenuHorizontalPlacement.${combination.horizontalPlacement.toUpperCase()}}`,
    `verticalAlignment={SidemenuVerticalAlignment.${combination.verticalAlignment.toUpperCase()}}`,
  ];

  if (extraProps.edgeAttached === true) {
    propLines.push('edgeAttached');
  }
  if (extraProps.offScreenHoverReveal === true) {
    propLines.push('offScreenHoverReveal');
  }
  if (extraProps.variant != null) {
    propLines.push(`variant={SidemenuVariant.${String(extraProps.variant).toUpperCase()}}`);
  }

  return `<Sidemenu\n  items={items}\n  ${propLines.join('\n  ')}\n/>`;
}

export type SidemenuEdgeAttachedPlacementCellProps = {
  /** Комбинация placement */
  combination: SidemenuPlacementCombination;
  /** Пункты меню */
  items: SidemenuItem[];
  /** Дополнительные пропсы Sidemenu */
  sidemenuProps?: Omit<SidemenuProps, 'items' | 'horizontalPlacement' | 'verticalAlignment'>;
};

/**
 * Ячейка матрицы edgeAttached: колонна + блок контента в ограниченной высоте.
 */
export const SidemenuEdgeAttachedPlacementCell: React.FC<SidemenuEdgeAttachedPlacementCellProps> = ({
  combination,
  items,
  sidemenuProps,
}) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? 'home');
  const resolvedItems = useMemo(
    () => applySidemenuActiveId(items, activeId),
    [items, activeId],
  );
  const isRightPlacement = combination.horizontalPlacement === SidemenuHorizontalPlacement.RIGHT;

  const sidemenuNode = (
    <Sidemenu
      {...sidemenuProps}
      edgeAttached
      horizontalPlacement={combination.horizontalPlacement}
      verticalAlignment={combination.verticalAlignment}
      items={resolvedItems}
      onItemClick={(item) => setActiveId(item.id)}
    />
  );

  return (
    <article style={sidemenuPlacementStoriesStyles.matrixCell}>
      <header
        style={{
          ...sidemenuPlacementStoriesStyles.matrixCellHeader,
          ...placementThemeStyles.matrixCellHeader,
        }}
      >
        {formatSidemenuPlacementLabel(combination)}
      </header>
      <div style={sidemenuPlacementStoriesStyles.matrixCellBody}>
        {!isRightPlacement ? sidemenuNode : null}
        <main
          style={{
            ...sidemenuPlacementStoriesStyles.matrixCellMain,
            ...placementThemeStyles.matrixCellMain,
          }}
        >
          <p style={{ margin: 0 }}>
            edgeAttached: колонна на всю высоту ячейки; verticalAlignment выравнивает блок пунктов
            между шапкой и footer.
          </p>
          <pre
            style={{
              ...sidemenuPlacementStoriesStyles.codeSnippet,
              ...placementThemeStyles.codeSnippet,
            }}
          >
            {buildSidemenuPlacementCodeSnippet(combination, {
              edgeAttached: true,
              ...sidemenuProps,
            })}
          </pre>
        </main>
        {isRightPlacement ? sidemenuNode : null}
      </div>
    </article>
  );
};

export type SidemenuFixedPlacementScrollSectionProps = {
  /** Комбинация placement */
  combination: SidemenuPlacementCombination;
  /** Пункты меню */
  items: SidemenuItem[];
  /** Заголовок секции */
  title: string;
  /** Пояснение режима (плавающая / off-screen) */
  description: string;
  /** Дополнительные пропсы Sidemenu */
  sidemenuProps?: Omit<SidemenuProps, 'items' | 'horizontalPlacement' | 'verticalAlignment'>;
};

/**
 * Полноэкранная секция для fixed-режимов (плавающая панель или off-screen): одна комбинация на экран.
 */
export const SidemenuFixedPlacementScrollSection: React.FC<SidemenuFixedPlacementScrollSectionProps> = ({
  combination,
  items,
  title,
  description,
  sidemenuProps,
}) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? 'home');
  const resolvedItems = useMemo(
    () => applySidemenuActiveId(items, activeId),
    [items, activeId],
  );

  return (
    <section
      style={{
        ...sidemenuPlacementStoriesStyles.scrollSectionRoot,
        ...placementThemeStyles.scrollSectionRoot,
      }}
    >
      <p
        style={{
          ...sidemenuPlacementStoriesStyles.scrollSectionLabel,
          ...placementThemeStyles.scrollSectionLabel,
        }}
      >
        <strong>{title}</strong>
        <br />
        {formatSidemenuPlacementLabel(combination)}
        <br />
        <span style={{ opacity: 0.85 }}>{description}</span>
        <pre
          style={{
            ...sidemenuPlacementStoriesStyles.codeSnippet,
            ...placementThemeStyles.codeSnippet,
          }}
        >
          {buildSidemenuPlacementCodeSnippet(combination, sidemenuProps)}
        </pre>
      </p>
      <Sidemenu
        {...sidemenuProps}
        horizontalPlacement={combination.horizontalPlacement}
        verticalAlignment={combination.verticalAlignment}
        items={resolvedItems}
        onItemClick={(item) => setActiveId(item.id)}
      />
    </section>
  );
};

export type SidemenuPlacementMatrixPageProps = {
  /** Заголовок страницы матрицы */
  title: string;
  /** Вводный текст */
  intro: string;
  /** Подсказка под заголовком секции */
  sectionHint: string;
  /** Дочерние ячейки / секции */
  children: React.ReactNode;
};

/** Обёртка документации для матриц placement */
export const SidemenuPlacementMatrixPage: React.FC<SidemenuPlacementMatrixPageProps> = ({
  title,
  intro,
  sectionHint,
  children,
}) => (
  <div style={sidemenuPlacementStoriesStyles.matrixPageRoot}>
    <header>
      <h2 style={sidemenuPlacementStoriesStyles.matrixSectionTitle}>{title}</h2>
      <p style={sidemenuPlacementStoriesStyles.matrixIntro}>{intro}</p>
      <p style={sidemenuPlacementStoriesStyles.matrixSectionHint}>{sectionHint}</p>
    </header>
    {children}
  </div>
);
