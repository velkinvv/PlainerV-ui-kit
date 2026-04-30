import type { Decorator, Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Button } from '../components/ui/buttons/Button';
import { Card } from '../components/ui/Card';
import { Typography } from '../components/ui/Typography';
import { ThemeProvider } from '../themes/ThemeProvider';
import { SnackbarProvider } from '../components/ui/Snackbar';
import { useSnackbar } from './useSnackbar';

const withSnackbar: Decorator = (Story) => (
  <ThemeProvider>
    <SnackbarProvider>
      <Story />
    </SnackbarProvider>
  </ThemeProvider>
);

const meta: Meta = {
  title: 'UI Kit/Hooks/useSnackbar',
  decorators: [withSnackbar],
  parameters: {
    docs: {
      description: {
        component: `
# useSnackbar

Компактные полосы у **нижнего** края экрана (портал в \`document.body\`). Отличается от Toast: одна строка, тёмная плашка, опциональная кнопка **действия**.

## Настройка

\`\`\`tsx
import { ThemeProvider, SnackbarProvider, useSnackbar } from '@velkinvv/plainerv';

<ThemeProvider>
  <SnackbarProvider placement="bottom-center">
    <App />
  </SnackbarProvider>
</ThemeProvider>
\`\`\`

## API

- **snackbars** — активные записи (\`SnackbarItem\`: \`id\`, \`message\`, \`duration\`, опционально \`actionLabel\`, \`onAction\`)
- **showSnackbar(message, options?)** — \`options.duration\` по умолчанию 4000 мс (\`0\` — без автоскрытия), \`actionLabel\` + \`onAction\` для кнопки справа
- **hideSnackbar(id)** / **clearSnackbars()**

Витрина полосы: **Components/Feedback/Snackbar** (компонент \`Snackbar\`).
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const BasicDemo = () => {
  const { snackbars, showSnackbar, clearSnackbars } = useSnackbar();
  return (
    <Card padding="lg">
      <Typography variant="h3" marginBottom="md">
        useSnackbar
      </Typography>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: 16 }}>
        <Button onClick={() => showSnackbar('Сохранено')}>Короткое</Button>
        <Button
          onClick={() =>
            showSnackbar('Элемент удалён', {
              actionLabel: 'Отменить',
              onAction: () => {},
              duration: 6000,
            })
          }
        >
          С действием
        </Button>
        <Button onClick={() => showSnackbar('Без таймера', { duration: 0 })}>duration: 0</Button>
        <Button variant="outlined" onClick={clearSnackbars} disabled={snackbars.length === 0}>
          Очистить ({snackbars.length})
        </Button>
      </div>
    </Card>
  );
};

export const Default: Story = {
  render: () => <BasicDemo />,
};

