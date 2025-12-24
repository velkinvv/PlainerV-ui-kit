import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { ThemeProvider } from '../../../themes/ThemeProvider';
import { Size } from '../../../types/sizes';
import { AvatarState, AvatarStatus } from '../../../types/ui';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Компонент аватара с поддержкой изображений и fallback',
      },
    },
  },
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: [...Object.values(Size)],
      description: 'Размер аватара',
    },
    state: {
      control: { type: 'select' },
      options: [...Object.values(AvatarState)],
      description: 'Состояние аватара',
    },
    src: {
      control: { type: 'text' },
      description: 'URL изображения',
    },
    alt: {
      control: { type: 'text' },
      description: 'Альтернативный текст',
    },
    text: {
      control: { type: 'text' },
      description: 'Текст для отображения в состоянии avatar',
    },
    status: {
      control: { type: 'select' },
      options: [...Object.values(AvatarStatus)],
      description: 'Статус пользователя для определения цвета Badge',
    },
    messageCount: {
      control: { type: 'number' },
      description: 'Количество сообщений для отображения в Badge',
    },
    userName: {
      control: { type: 'text' },
      description: 'Имя пользователя для генерации инициалов и цвета фона',
    },
    showTooltip: {
      control: { type: 'boolean' },
      description: 'Отображение тултипа',
    },
    tooltipText: {
      control: { type: 'text' },
      description: 'Кастомный текст для тултипа',
    },
    cursor: {
      control: { type: 'select' },
      options: ['default', 'pointer'],
      description: 'Тип курсора',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'User Avatar',
    status: AvatarStatus.ONLINE,
    messageCount: 5,
  },
};

export const Small: Story = {
  args: {
    size: Size.SM,
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'Small Avatar',
  },
};

export const Medium: Story = {
  args: {
    size: Size.MD,
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'Medium Avatar',
  },
};

export const Large: Story = {
  args: {
    size: Size.LG,
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'Large Avatar',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: Size.XL,
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'Extra Large Avatar',
  },
};

export const WithFallback: Story = {
  args: {
    size: Size.MD,
    fallback: 'JD',
  },
};

export const WithCustomFallback: Story = {
  args: {
    size: Size.LG,
    fallback: <span style={{ fontSize: '24px' }}>👤</span>,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar
        size={Size.SM}
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="Small"
      />
      <Avatar
        size={Size.MD}
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="Medium"
      />
      <Avatar
        size={Size.LG}
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="Large"
      />
      <Avatar
        size={Size.XL}
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="Extra Large"
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const WithText: Story = {
  args: {
    size: Size.MD,
    state: AvatarState.AVATAR,
    text: '+4',
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'User with text',
  },
};

export const WithMessageCount: Story = {
  args: {
    size: Size.MD,
    status: AvatarStatus.DANGER,
    messageCount: 12,
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'User with message count',
  },
};

export const PinState: Story = {
  args: {
    size: Size.MD,
    state: AvatarState.PIN,
    status: AvatarStatus.ONLINE,
    messageCount: 3,
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'Pinned user',
    onIconClick: () => console.log('Pin clicked'),
  },
};

export const CloseState: Story = {
  args: {
    size: Size.MD,
    state: AvatarState.CLOSE,
    status: AvatarStatus.WARNING,
    messageCount: 7,
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'User with close button',
    onIconClick: () => console.log('Close clicked'),
  },
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          state={AvatarState.OFFLINE}
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Offline"
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Offline</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          state={AvatarState.AVATAR}
          text="+4"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Avatar with text"
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>With Text</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          state={AvatarState.CLOSE}
          status={AvatarStatus.WARNING}
          messageCount={7}
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Close state"
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Close (Warning)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          state={AvatarState.PIN}
          status={AvatarStatus.ONLINE}
          messageCount={3}
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Pin state"
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Pin (Online)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          state={AvatarState.SUB}
          status={AvatarStatus.DANGER}
          messageCount={15}
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Sub state"
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Subscribe (Danger)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          state={AvatarState.CONTACT}
          status={AvatarStatus.OFFLINE}
          messageCount={2}
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Contact state"
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Contact (Offline)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          state={AvatarState.LIKE}
          status={AvatarStatus.ONLINE}
          messageCount={9}
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Like state"
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Like (Online)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          state={AvatarState.UNPIN}
          status={AvatarStatus.WARNING}
          messageCount={1}
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Unpin state"
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Unpin (Warning)</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Все состояния аватара согласно макету Figma',
      },
    },
  },
};

export const AllMessageCounts: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          status={AvatarStatus.ONLINE}
          messageCount={1}
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="1 message"
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>1 сообщение (Online - зеленый)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          status={AvatarStatus.DANGER}
          messageCount={5}
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="5 messages"
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>5 сообщений (Danger - красный)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          status={AvatarStatus.WARNING}
          messageCount={99}
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="99 messages"
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>99 сообщений (Warning - желтый)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          status={AvatarStatus.OFFLINE}
          messageCount={150}
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="150 messages"
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>150+ сообщений (Offline - серый)</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Примеры Badge с разным количеством сообщений и статусами - демонстрирует разные цвета Badge в зависимости от статуса',
      },
    },
  },
};

export const MessageCountTest: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.SM}
          status={AvatarStatus.ONLINE}
          messageCount={3}
          alt="SM with messages"
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>SM с сообщениями</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          status={AvatarStatus.DANGER}
          messageCount={7}
          alt="MD with messages"
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>MD с сообщениями</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.LG}
          status={AvatarStatus.WARNING}
          messageCount={12}
          alt="LG with messages"
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>LG с сообщениями</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Тест отображения Badge с количеством сообщений на разных размерах аватара',
      },
    },
  },
};

export const MessageCountWithoutImage: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar size={Size.MD} status={AvatarStatus.ONLINE} messageCount={1} alt="1 message" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>1 сообщение (Online - без изображения)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar size={Size.MD} status={AvatarStatus.DANGER} messageCount={5} alt="5 messages" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>5 сообщений (Danger - без изображения)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar size={Size.MD} status={AvatarStatus.WARNING} messageCount={99} alt="99 messages" />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>
          99 сообщений (Warning - без изображения)
        </p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          status={AvatarStatus.OFFLINE}
          messageCount={150}
          alt="150 messages"
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>
          150+ сообщений (Offline - без изображения)
        </p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Badge с количеством сообщений и разными статусами без изображения - лучше видно цвета Badge',
      },
    },
  },
};

export const WithUserName: Story = {
  args: {
    size: Size.MD,
    userName: 'Иван Петров',
    status: AvatarStatus.ONLINE,
    messageCount: 8,
  },
  parameters: {
    docs: {
      description: {
        story: 'Аватар с именем пользователя - генерирует инициалы и цвет фона',
      },
    },
  },
};

export const UserNameExamples: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          userName="Александр Иванов"
          status={AvatarStatus.ONLINE}
          messageCount={3}
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Александр Иванов (Online)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar size={Size.MD} userName="Мария" status={AvatarStatus.DANGER} messageCount={7} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Мария (Danger)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          userName="Дмитрий Сергеевич"
          status={AvatarStatus.WARNING}
          messageCount={1}
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Дмитрий Сергеевич (Warning)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          userName="Анна-Мария"
          status={AvatarStatus.OFFLINE}
          messageCount={15}
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Анна-Мария (Offline)</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Примеры аватаров с разными именами пользователей - демонстрирует генерацию инициалов и цветов',
      },
    },
  },
};

export const UserNameWithImage: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          userName="Иван Петров"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Иван Петров"
          status={AvatarStatus.ONLINE}
          messageCount={5}
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>С изображением (Online)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          userName="Иван Петров"
          status={AvatarStatus.ONLINE}
          messageCount={5}
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Без изображения (fallback)</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Сравнение аватара с изображением и без - fallback использует userName для генерации инициалов и цвета',
      },
    },
  },
};

export const WithTooltip: Story = {
  args: {
    size: Size.MD,
    userName: 'Иван Петров',
    showTooltip: true,
    status: AvatarStatus.DANGER,
    messageCount: 12,
  },
  parameters: {
    docs: {
      description: {
        story: 'Аватар с тултипом - показывает имя пользователя при наведении',
      },
    },
  },
};

export const TooltipExamples: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          userName="Александр Иванов"
          showTooltip={true}
          status={AvatarStatus.ONLINE}
          messageCount={3}
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>С userName и тултипом (Online)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          alt="Мария Сидорова"
          showTooltip={true}
          status={AvatarStatus.DANGER}
          messageCount={7}
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>С alt и тултипом (Danger)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar size={Size.MD} showTooltip={true} status={AvatarStatus.WARNING} messageCount={1} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Без userName/alt (дефолтный тултип)</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Примеры аватаров с тултипом - демонстрирует разные источники текста для тултипа',
      },
    },
  },
};

export const TooltipWithImage: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.LG}
          userName="Елена Козлова"
          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          alt="Елена Козлова"
          showTooltip={true}
          status={AvatarStatus.ONLINE}
          messageCount={9}
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>С изображением и тултипом (Online)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.LG}
          userName="Елена Козлова"
          showTooltip={true}
          status={AvatarStatus.ONLINE}
          messageCount={9}
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Без изображения, с тултипом</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Сравнение аватаров с тултипом - с изображением и без',
      },
    },
  },
};

export const AltTextExamples: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          userName="Иван Петров"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>userName как alt</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          userName="Иван Петров"
          alt="Кастомный alt текст"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Кастомный alt</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Дефолтный alt</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Примеры формирования alt атрибута для изображения - демонстрирует приоритет alt → userName → "Пользователь"',
      },
    },
  },
};

export const WithCustomTooltip: Story = {
  args: {
    size: Size.MD,
    userName: 'Иван Петров',
    tooltipText: 'Администратор системы',
    showTooltip: true,
    status: AvatarStatus.DANGER,
    messageCount: 25,
  },
  parameters: {
    docs: {
      description: {
        story: 'Аватар с кастомным текстом тултипа - tooltipText имеет приоритет над userName',
      },
    },
  },
};

export const TooltipTextExamples: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          userName="Иван Петров"
          tooltipText="Главный разработчик"
          showTooltip={true}
          status={AvatarStatus.ONLINE}
          messageCount={15}
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>Кастомный tooltipText (Online)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          userName="Мария Сидорова"
          showTooltip={true}
          status={AvatarStatus.DANGER}
          messageCount={7}
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>userName как тултип (Danger)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          alt="Александр Иванов"
          tooltipText="Менеджер проекта"
          showTooltip={true}
          status={AvatarStatus.WARNING}
          messageCount={3}
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>tooltipText + alt (Warning)</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Примеры использования tooltipText - демонстрирует приоритет tooltipText → userName → alt → "Пользователь"',
      },
    },
  },
};

export const WithCursorPointer: Story = {
  args: {
    size: Size.MD,
    userName: 'Иван Петров',
    cursor: 'pointer',
    status: AvatarStatus.ONLINE,
    messageCount: 5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Аватар с курсором pointer - показывает что элемент кликабельный',
      },
    },
  },
};

export const CursorExamples: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          userName="Иван Петров"
          cursor="pointer"
          status={AvatarStatus.ONLINE}
          messageCount={5}
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>cursor=&quot;pointer&quot; (Online)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          userName="Мария Сидорова"
          cursor="default"
          status={AvatarStatus.DANGER}
          messageCount={3}
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>cursor=&quot;default&quot; (Danger)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.MD}
          userName="Александр Иванов"
          onClick={() => console.log('Avatar clicked')}
          status={AvatarStatus.WARNING}
          messageCount={7}
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>С onClick (автоматически pointer)</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Примеры использования cursor - демонстрирует разные типы курсора',
      },
    },
  },
};

export const BadgeVariations: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <Avatar size={Size.SM} userName="Анна" status={AvatarStatus.ONLINE} messageCount={1} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>SM размер, 1 сообщение (Online)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar size={Size.MD} userName="Петр" status={AvatarStatus.DANGER} messageCount={5} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>MD размер, 5 сообщений (Danger)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar size={Size.LG} userName="Мария" status={AvatarStatus.WARNING} messageCount={99} />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>LG размер, 99 сообщений (Warning)</p>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Avatar
          size={Size.XL}
          userName="Александр"
          status={AvatarStatus.OFFLINE}
          messageCount={150}
        />
        <p style={{ marginTop: '8px', fontSize: '12px' }}>XL размер, 150+ (Offline)</p>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Демонстрация Badge с количеством сообщений и разными статусами на разных размерах аватара',
      },
    },
  },
};
