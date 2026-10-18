import { type ReactNode, useEffect, useState } from 'react';

type ClientOnlyProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

/**
 * Интерактивные части документации (Playground, редакторы) рендерятся только
 * на клиенте. На сервере и при первом клиентском рендере отдаётся `fallback`,
 * поэтому разметка совпадает с prerender-версией и гидратация не расходится.
 */
export const ClientOnly = ({ children, fallback = null }: ClientOnlyProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <>{isMounted ? children : fallback}</>;
};
