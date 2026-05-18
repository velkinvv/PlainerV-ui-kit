import type { Plugin } from 'vite';

/**
 * Плагин Vite для приложений с @velkinvv/plainerv.
 * Одна инстанция react, styled-components, framer-motion: dedupe + не пребандлить кит в optimizeDeps.
 * Иначе dist кита и отдельный prebundle styled-components дают o2 is not a function у shouldForwardProp.
 * Перенос shouldForwardProp в коде кита эту связку не чинит — только настройка у потребителя.
 */
export function plainervVite(): Plugin {
  return {
    name: 'plainerv-vite',
    config: () => ({
      resolve: {
        dedupe: ['react', 'react-dom', 'styled-components', 'framer-motion'],
      },
      optimizeDeps: {
        include: ['styled-components', 'framer-motion'],
        exclude: ['@velkinvv/plainerv'],
      },
    }),
  };
}
