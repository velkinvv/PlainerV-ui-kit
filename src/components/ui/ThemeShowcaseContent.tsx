import React, { useState, type CSSProperties, type ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { Button } from './buttons/Button';
import { Input } from './inputs/Input';
import { Modal } from './Modal';
import { Drawer } from './Drawer';
import { Sheet } from './Sheet';
import { Progress } from './Progress';
import { Spinner } from './Spinner';
import { Tooltip } from './Tooltip';
import { Dropdown, DropdownItem, DropdownTrigger } from './Dropdown';
import { Divider } from './Divider';
import { Grid } from './Grid/Grid';
import { GridItem } from './Grid/GridItem';
import { ThemeShowcaseBadgesAvatarsBlock } from './ThemeShowcaseBadgesAvatarsBlock';
import {
  ThemeShowcaseTabsBlock,
  ThemeShowcaseAccordionBlock,
} from './ThemeShowcaseTabsAccordionBlock';
import { ThemeShowcaseFormControlsBlock } from './ThemeShowcaseFormControlsBlock';
import { ThemeShowcaseExtendedInputsBlock } from './ThemeShowcaseExtendedInputsBlock';
import { ThemeShowcaseDisplayBlock } from './ThemeShowcaseDisplayBlock';
import { ThemeShowcaseNavigationBlock } from './ThemeShowcaseNavigationBlock';
import {
  ThemeShowcaseButtonControlsBlock,
  ThemeShowcaseSliderBlock,
} from './ThemeShowcaseControlsBlock';
import { ThemeShowcaseTableBlock } from './ThemeShowcaseTableBlock';
import { ThemeShowcaseCalendarBlock } from './ThemeShowcaseCalendarBlock';
import { ThemeShowcaseOverlaysBlock } from './ThemeShowcaseOverlaysBlock';
import { ThemeShowcaseNotificationsBlock } from './ThemeShowcaseNotificationsBlock';
import { Size } from '../../types/sizes';
import { ButtonVariant } from '../../types/ui';
import { themeShowcaseStoriesStyles } from './ThemeShowcase.stories.styles';

export interface ThemeShowcaseContentProps {
  /** Заголовок страницы обзора */
  pageTitle: string;
  /** Дополнительные стили заголовка (например, цвет текста в тёмной теме) */
  pageTitleStyle?: CSSProperties;
}

interface ShowcaseCardProps {
  /** Заголовок карточки секции */
  title: string;
  /** Содержимое секции */
  children: ReactNode;
  /** Растянуть на две колонки сетки */
  columnSpan?: number;
}

const ShowcaseCard = ({ title, children, columnSpan }: ShowcaseCardProps) => (
  <GridItem columnSpan={columnSpan}>
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  </GridItem>
);

/**
 * Полная сетка демонстрации компонентов UI-kit для Theme Showcase.
 */
export const ThemeShowcaseContent = ({ pageTitle, pageTitleStyle }: ThemeShowcaseContentProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [progressValue] = useState(65);

  return (
    <div style={themeShowcaseStoriesStyles.contentShell}>
      <h1 style={{ ...themeShowcaseStoriesStyles.pageHeading, ...pageTitleStyle }}>{pageTitle}</h1>

      <Grid columns={2} gap={Size.MD}>
        <ShowcaseCard title="Buttons">
          <div style={themeShowcaseStoriesStyles.buttonRow}>
            <Button variant={ButtonVariant.PRIMARY}>Primary</Button>
            <Button variant={ButtonVariant.SECONDARY}>Secondary</Button>
            <Button variant={ButtonVariant.OUTLINE}>Outline</Button>
            <Button variant={ButtonVariant.GHOST}>Ghost</Button>
            <Button variant={ButtonVariant.DANGER}>Danger</Button>
            <Button variant={ButtonVariant.SUCCESS}>Success</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="Button group & IconButton">
          <ThemeShowcaseButtonControlsBlock />
        </ShowcaseCard>

        <ShowcaseCard title="Inputs">
          <div style={themeShowcaseStoriesStyles.verticalStackGap16}>
            <Input
              label="Default Input"
              placeholder="Enter text..."
              value={inputValue}
              onChange={(changeEvent) => setInputValue(changeEvent.target.value)}
            />
            <Input
              label="Input with Error"
              placeholder="Error input"
              error="This field is required"
            />
            <Input label="Input with Success" placeholder="Success input" success />
            <Input label="Disabled Input" placeholder="Disabled" disabled />
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="Select, TextArea, Date & Time">
          <ThemeShowcaseExtendedInputsBlock />
        </ShowcaseCard>

        <ShowcaseCard title="Checkbox, Radio & Switch">
          <ThemeShowcaseFormControlsBlock />
        </ShowcaseCard>

        <ShowcaseCard title="Typography, Link & more">
          <ThemeShowcaseDisplayBlock />
        </ShowcaseCard>

        <ShowcaseCard title="Badges & Avatars">
          <ThemeShowcaseBadgesAvatarsBlock />
        </ShowcaseCard>

        <ShowcaseCard title="Progress & Spinner">
          <div style={themeShowcaseStoriesStyles.verticalStackGap16}>
            <Progress value={progressValue} />
            <div style={themeShowcaseStoriesStyles.horizontalGap16Center}>
              <Spinner size={Size.SM} />
              <Spinner size={Size.MD} />
              <Spinner size={Size.LG} />
            </div>
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="Slider">
          <ThemeShowcaseSliderBlock />
        </ShowcaseCard>

        <ShowcaseCard title="Tabs">
          <ThemeShowcaseTabsBlock />
        </ShowcaseCard>

        <ShowcaseCard title="Accordion">
          <ThemeShowcaseAccordionBlock />
        </ShowcaseCard>

        <ShowcaseCard title="Breadcrumb, Pagination & Stepper">
          <ThemeShowcaseNavigationBlock />
        </ShowcaseCard>

        <ShowcaseCard title="Table" columnSpan={2}>
          <ThemeShowcaseTableBlock />
        </ShowcaseCard>

        <ShowcaseCard title="Calendar" columnSpan={2}>
          <ThemeShowcaseCalendarBlock />
        </ShowcaseCard>

        <ShowcaseCard title="Tooltip & Dropdown">
          <div style={themeShowcaseStoriesStyles.horizontalGap16Center}>
            <Tooltip content="This is a tooltip">
              <Button>Hover for tooltip</Button>
            </Tooltip>
            <Dropdown
              trigger={
                <DropdownTrigger>
                  <Button variant={ButtonVariant.OUTLINE}>Dropdown</Button>
                </DropdownTrigger>
              }
            >
              <DropdownItem>Item 1</DropdownItem>
              <DropdownItem>Item 2</DropdownItem>
              <DropdownItem>Item 3</DropdownItem>
            </Dropdown>
          </div>
        </ShowcaseCard>

        <ShowcaseCard title="Popover & Hint">
          <ThemeShowcaseOverlaysBlock />
        </ShowcaseCard>

        <ShowcaseCard title="Toast & Snackbar">
          <ThemeShowcaseNotificationsBlock />
        </ShowcaseCard>

        <ShowcaseCard title="Divider">
          <div style={themeShowcaseStoriesStyles.verticalStackGap16}>
            <p>Content above divider</p>
            <Divider />
            <p>Content below divider</p>
          </div>
        </ShowcaseCard>
      </Grid>

      <div style={themeShowcaseStoriesStyles.overlayActionsSection}>
        <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
        <Button variant={ButtonVariant.OUTLINE} onClick={() => setDrawerOpen(true)}>
          Open Drawer
        </Button>
        <Button variant={ButtonVariant.OUTLINE} onClick={() => setSheetOpen(true)}>
          Open Sheet
        </Button>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Demo Modal">
        <p>Контент модального окна. Компоненты наследуют текущую тему.</p>
        <div style={themeShowcaseStoriesStyles.modalActionsRow}>
          <Button variant={ButtonVariant.SECONDARY} onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setModalOpen(false)}>Confirm</Button>
        </div>
      </Modal>

      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Demo Drawer"
        placement="right"
      >
        <p style={themeShowcaseStoriesStyles.showcaseAccordionParagraph}>
          Боковая панель справа. Закрытие по overlay или кнопке.
        </p>
      </Drawer>

      <Sheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        title="Demo Sheet"
        placement="bottom"
      >
        <p style={themeShowcaseStoriesStyles.showcaseAccordionParagraph}>
          Нижний лист (sheet) для мобильных сценариев.
        </p>
      </Sheet>
    </div>
  );
};
