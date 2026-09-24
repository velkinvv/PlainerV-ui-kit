import { Badge } from './Badge';
import { Size } from '../../../types/sizes';
import { BadgeVariant } from '../../../types/ui';
import { defineComponentDocs } from '../../../docs/defineComponentDocs';

export default defineComponentDocs({
  meta: {
    name: 'Badge',
    group: 'Data Display',
    platform: 'web',
    since: '0.3.4',
    status: 'stable',
    description: 'Компактный индикатор: число, dot-режим, варианты палитры и размеры.',
  },
  examples: [
    {
      id: 'counter-default',
      title: 'Счётчик',
      description: 'Обычный бейдж с числом.',
      code: '<Badge variant={BadgeVariant.DEFAULT}>3</Badge>',
      render: () => <Badge variant={BadgeVariant.DEFAULT}>3</Badge>,
      showCode: true,
      themes: ['theme', 'colorMode'],
      layout: 'inline',
    },
    {
      id: 'dot-mode',
      title: 'Dot-режим',
      description: 'Точка без текстового содержимого.',
      code: '<Badge variant={BadgeVariant.DEFAULT_MAIN} isDot />',
      render: () => <Badge variant={BadgeVariant.DEFAULT_MAIN} isDot />,
      showCode: true,
      themes: ['theme', 'colorMode'],
      layout: 'inline',
    },
    {
      id: 'sizes',
      title: 'Размеры',
      description: 'Размеры от XS до LG для текстового бейджа.',
      code: '<><Badge size={Size.XS}>XS</Badge><Badge size={Size.SM}>SM</Badge><Badge size={Size.MD}>MD</Badge><Badge size={Size.LG}>LG</Badge></>',
      render: () => (
        <>
          <Badge size={Size.XS}>XS</Badge>{' '}
          <Badge size={Size.SM}>SM</Badge>{' '}
          <Badge size={Size.MD}>MD</Badge>{' '}
          <Badge size={Size.LG}>LG</Badge>
        </>
      ),
      showCode: true,
      themes: ['theme', 'colorMode'],
      layout: 'inline',
    },
  ],
  variants: [
    {
      id: 'variant-matrix',
      title: 'Варианты',
      columns: 3,
      items: [
        {
          id: 'default',
          title: 'Default',
          code: '<Badge variant={BadgeVariant.DEFAULT}>3</Badge>',
          render: () => <Badge variant={BadgeVariant.DEFAULT}>3</Badge>,
        },
        {
          id: 'outline',
          title: 'Outline',
          code: '<Badge variant={BadgeVariant.OUTLINE}>3</Badge>',
          render: () => <Badge variant={BadgeVariant.OUTLINE}>3</Badge>,
        },
        {
          id: 'warning',
          title: 'Warning',
          code: '<Badge variant={BadgeVariant.WARNING}>3</Badge>',
          render: () => <Badge variant={BadgeVariant.WARNING}>3</Badge>,
        },
      ],
    },
  ],
  props: {
    mode: 'autogen',
  },
  a11y: {
    notes: ['Если бейдж кликабелен, укажите понятный aria-label.'],
  },
  related: [
    { name: 'Tag', href: '/components/tag' },
    { name: 'Avatar', href: '/components/avatar' },
  ],
});
