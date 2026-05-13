import React, { useState, createContext, useContext } from 'react';
import { clsx } from 'clsx';
import { AnimatePresence, useReducedMotion } from 'framer-motion';
import { Icon } from '../Icon/Icon';
import type { AccordionProps } from '../../../types/ui';
import { IconSize } from '../../../types/sizes';
import {
  AccordionContainer,
  AccordionItemContainer,
  AccordionTrigger,
  AccordionContent,
  ContentInner,
  AccordionHeader,
  AccordionTitle,
  AccordionSubtitle,
} from './Accordion.style';

// Контекст для управления состоянием аккордеона
interface AccordionContextType {
  openItems: Set<string>;
  toggleItem: (itemId: string) => void;
  allowMultiple?: boolean; // Позволяет открывать несколько элементов одновременно
  autoClose?: boolean; // Автоматически закрывать другие элементы при открытии нового
}

export const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
};

// Контекст для передачи itemId
const AccordionItemContext = createContext<string>('default');

export const useAccordionItemContext = () => {
  return useContext(AccordionItemContext);
};

// Основной компонент Accordion
export const Accordion: React.FC<AccordionProps> & {
  Item: React.FC<AccordionItemProps>;
  Trigger: React.FC<AccordionTriggerProps>;
  Content: React.FC<AccordionContentProps>;
} = ({
  children,
  className,
  defaultOpen = false,
  allowMultiple = false,
  autoClose = false,
  onChange,
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    defaultOpen ? new Set(['default']) : new Set(),
  );

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems);

    if (newOpenItems.has(itemId)) {
      // Закрываем элемент
      newOpenItems.delete(itemId);
    } else {
      // Открываем элемент
      if (!allowMultiple || autoClose) {
        // Если не разрешено множественное открытие или включен autoClose, закрываем все остальные
        newOpenItems.clear();
      }
      newOpenItems.add(itemId);
    }

    setOpenItems(newOpenItems);
    onChange?.(newOpenItems.has(itemId));
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, allowMultiple, autoClose }}>
      <AccordionContainer className={clsx('ui-accordion', className)}>
        {children}
      </AccordionContainer>
    </AccordionContext.Provider>
  );
};

// Интерфейсы для подкомпонентов
export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  position?: 'start' | 'center' | 'last';
}

export interface AccordionTriggerProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'title'
> {
  children?: React.ReactNode;
  title?: React.ReactNode; // Заголовок может содержать любые React компоненты
  subtitle?: React.ReactNode; // Подзаголовок может содержать любые React компоненты
  align?: 'left' | 'center' | 'right'; // Выравнивание заголовка
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right'; // Выравнивание содержимого
}

// Подкомпонент Item
export const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  className,
  value = 'default',
  position = 'center',
  ...props
}) => {
  return (
    <AccordionItemContext.Provider value={value}>
      <AccordionItemContainer
        className={clsx('ui-accordion-item', className)}
        data-value={value}
        $position={position}
        {...props}
      >
        {children}
      </AccordionItemContainer>
    </AccordionItemContext.Provider>
  );
};

// Подкомпонент Trigger
export const AccordionTriggerComponent: React.FC<AccordionTriggerProps> = ({
  children,
  className,
  title,
  subtitle,
  align = 'left',
  ...props
}) => {
  const { openItems, toggleItem } = useAccordionContext();
  const itemId = useAccordionItemContext();
  const isOpen = openItems.has(itemId);

  return (
    <AccordionTrigger
      className={clsx('ui-accordion-trigger', className)}
      onClick={() => toggleItem(itemId)}
      data-state={isOpen ? 'open' : 'closed'}
      {...props}
    >
      <AccordionHeader $align={align}>
        {title && <AccordionTitle $align={align}>{title}</AccordionTitle>}
        {subtitle && <AccordionSubtitle $align={align}>{subtitle}</AccordionSubtitle>}
        {children && !title && <AccordionTitle $align={align}>{children}</AccordionTitle>}
      </AccordionHeader>
      <Icon
        name="IconPlainerArrowLeft"
        className="chevron"
        size={IconSize.SM}
        // variant={IconVariant.PLAINER}
      />
    </AccordionTrigger>
  );
};

// Подкомпонент Content
export const AccordionContentComponent: React.FC<AccordionContentProps> = ({
  children,
  className,
  align = 'left',
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { openItems } = useAccordionContext();
  const itemId = useAccordionItemContext();
  const isOpen = openItems.has(itemId);

  return (
    <AnimatePresence>
      {isOpen && (
        <AccordionContent
          className={clsx('ui-accordion-content', className)}
          initial={
            prefersReducedMotion ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }
          }
          animate={{ height: 'auto', opacity: 1 }}
          exit={prefersReducedMotion ? { height: 0, opacity: 0.98 } : { height: 0, opacity: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2, ease: 'easeInOut' }}
        >
          <ContentInner $align={align} {...props}>
            {children}
          </ContentInner>
        </AccordionContent>
      )}
    </AnimatePresence>
  );
};

// Присваиваем подкомпоненты к основному компоненту
Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTriggerComponent;
Accordion.Content = AccordionContentComponent;
