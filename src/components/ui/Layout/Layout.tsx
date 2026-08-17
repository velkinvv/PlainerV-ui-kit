import React, { useCallback, useMemo, useState } from 'react';
import { clsx } from 'clsx';
import type {
  LayoutContentProps,
  LayoutFooterProps,
  LayoutHeaderProps,
  LayoutProps,
  LayoutSidebarPlacement,
  LayoutSidebarProps,
} from '../../../types/ui';
import { resolveLayoutScrollMode, shouldLayoutUseRowDirection } from './handlers';
import { LayoutContextProvider } from './LayoutContext';
import { LayoutContent } from './LayoutContent';
import { LayoutFooter } from './LayoutFooter';
import { LayoutHeader } from './LayoutHeader';
import { LayoutSidebar } from './LayoutSidebar';
import { LayoutRoot } from './Layout.style';

type LayoutComponent = React.FC<LayoutProps> & {
  Header?: React.FC<LayoutHeaderProps>;
  Footer?: React.FC<LayoutFooterProps>;
  Content?: React.FC<LayoutContentProps>;
  Sidebar?: React.FC<LayoutSidebarProps>;
};

const formatLayoutMinHeight = (minHeight: string | number | undefined): string => {
  if (minHeight == null) {
    return '100%';
  }
  if (typeof minHeight === 'number') {
    return `${minHeight}px`;
  }
  return minHeight;
};

/**
 * Каркас страницы: шапка, сайдбар, контент, подвал.
 *
 * @param props.hasSidebar - Принудительно ряд
 * @param props.scrollMode - page | content
 * @param props.minHeight - min-height корня
 * @param props.children - Слоты Layout.*
 */
const LayoutBase: React.FC<LayoutProps> = ({
  hasSidebar: hasSidebarProp,
  scrollMode: scrollModeProp,
  minHeight,
  className,
  children,
}) => {
  const scrollMode = resolveLayoutScrollMode(scrollModeProp);
  const [registeredSidebarCount, setRegisteredSidebarCount] = useState(0);
  const [sidebarPlacement, setSidebarPlacement] = useState<LayoutSidebarPlacement>('start');
  const [overlayActive, setOverlayActive] = useState(false);

  const registerSidebar = useCallback(() => {
    setRegisteredSidebarCount((currentCount) => currentCount + 1);
    return () => {
      setRegisteredSidebarCount((currentCount) => Math.max(0, currentCount - 1));
    };
  }, []);

  const hasSidebar = shouldLayoutUseRowDirection(hasSidebarProp, registeredSidebarCount);
  const isContentScroll = scrollMode === 'content';

  const contextValue = useMemo(
    () => ({
      scrollMode,
      hasSidebar,
      registerSidebar,
      sidebarPlacement,
      setSidebarPlacement,
      overlayActive,
      setOverlayActive,
    }),
    [hasSidebar, overlayActive, registerSidebar, scrollMode, sidebarPlacement],
  );

  return (
    <LayoutContextProvider value={contextValue}>
      <LayoutRoot
        className={clsx('ui-layout', className)}
        $direction={hasSidebar ? 'row' : 'column'}
        $minHeight={formatLayoutMinHeight(minHeight)}
        $height={isContentScroll ? '100%' : 'auto'}
        $overflow={isContentScroll ? 'hidden' : 'visible'}
        data-has-sidebar={hasSidebar ? 'true' : 'false'}
        data-scroll-mode={scrollMode}
        data-sidebar-overlay={overlayActive ? 'true' : undefined}
      >
        {children}
      </LayoutRoot>
    </LayoutContextProvider>
  );
};

LayoutBase.displayName = 'Layout';

export const Layout = LayoutBase as LayoutComponent;

Layout.Header = LayoutHeader;
Layout.Content = LayoutContent;
Layout.Footer = LayoutFooter;
Layout.Sidebar = LayoutSidebar;
