import React from 'react';
import { Tabs, TabItem } from './Tabs';
import { Accordion } from './Accordion';
import { themeShowcaseStoriesStyles } from './ThemeShowcase.stories.styles';

/**
 * Демо вкладок для Theme Showcase (дочерние {@link TabItem} с панелями).
 */
export const ThemeShowcaseTabsBlock = () => (
  <Tabs defaultValue="overview" ariaLabel="Пример вкладок в Theme Showcase">
    <TabItem value="overview" label="Обзор">
      <div style={themeShowcaseStoriesStyles.showcasePanelContent}>
        Краткое описание и сводка по разделу.
      </div>
    </TabItem>
    <TabItem value="details" label="Детали">
      <div style={themeShowcaseStoriesStyles.showcasePanelContent}>
        Дополнительные параметры и настройки компонента.
      </div>
    </TabItem>
    <TabItem value="history" label="История">
      <div style={themeShowcaseStoriesStyles.showcasePanelContent}>
        Список последних изменений и версий.
      </div>
    </TabItem>
  </Tabs>
);

/**
 * Демо аккордеона для Theme Showcase ({@link Accordion.Item} + Trigger + Content).
 */
export const ThemeShowcaseAccordionBlock = () => (
  <Accordion autoClose>
    <Accordion.Item value="general" position="start">
      <Accordion.Trigger title="Общие сведения" subtitle="Описание компонента" />
      <Accordion.Content>
        <p style={themeShowcaseStoriesStyles.showcaseAccordionParagraph}>
          Базовое использование: один открытый пункт при <code>autoClose</code>.
        </p>
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="props" position="center">
      <Accordion.Trigger title="Свойства" subtitle="Основные пропсы" />
      <Accordion.Content>
        <p style={themeShowcaseStoriesStyles.showcaseAccordionParagraph}>
          <code>defaultOpen</code>, <code>allowMultiple</code>, <code>onChange</code> — см.
          Storybook «Accordion».
        </p>
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item value="tips" position="last">
      <Accordion.Trigger title="Подсказки" />
      <Accordion.Content>
        <p style={themeShowcaseStoriesStyles.showcaseAccordionParagraph}>
          Для вложенных форм и длинного текста задайте ширину контейнера карточки.
        </p>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion>
);
