import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AvatarGroup } from './AvatarGroup';
import { AvatarGroupVariant, AvatarStatus } from '../../../types/ui';
import { Size } from '../../../types/sizes';

// Мокаем компонент Avatar
jest.mock('../Avatar/Avatar', () => ({
  Avatar: ({
    userName,
    alt,
    onClick,
    showTooltip,
    tooltipText,
    size,
    ...props
  }: {
    userName?: string;
    alt?: string;
    onClick?: () => void;
    showTooltip?: boolean;
    tooltipText?: string;
    size?: string;
    [key: string]: unknown;
  }) => (
    <div
      data-testid="avatar"
      data-user-name={userName}
      data-alt={alt}
      data-show-tooltip={showTooltip}
      data-tooltip-text={tooltipText}
      data-size={size}
      onClick={onClick}
      {...props}
    >
      {userName || alt || 'Avatar'}
    </div>
  ),
}));

describe('AvatarGroup', () => {
  const sampleAvatars = [
    {
      src: 'https://example.com/avatar1.jpg',
      alt: 'User 1',
      userName: 'John Doe',
      status: AvatarStatus.ONLINE,
    },
    {
      src: 'https://example.com/avatar2.jpg',
      alt: 'User 2',
      userName: 'Jane Smith',
      status: AvatarStatus.OFFLINE,
    },
    {
      src: 'https://example.com/avatar3.jpg',
      alt: 'User 3',
      userName: 'Bob Wilson',
      status: AvatarStatus.ONLINE,
    },
    {
      src: 'https://example.com/avatar4.jpg',
      alt: 'User 4',
      userName: 'Alice Johnson',
      status: AvatarStatus.WARNING,
    },
    {
      src: 'https://example.com/avatar5.jpg',
      alt: 'User 5',
      userName: 'Carol Brown',
      status: AvatarStatus.DANGER,
    },
  ];

  it('рендерит группу аватаров с вариантом stack по умолчанию', () => {
    render(<AvatarGroup avatars={sampleAvatars} />);

    const avatarGroup = screen.getByTestId('avatar-group');
    expect(avatarGroup).toBeInTheDocument();
    expect(avatarGroup).toHaveClass('ui-avatar-group');
  });

  it('отображает только максимальное количество аватаров', () => {
    render(<AvatarGroup avatars={sampleAvatars} maxVisible={3} />);

    const avatars = screen.getAllByTestId('avatar');
    expect(avatars).toHaveLength(3);
  });

  it('показывает счетчик дополнительных аватаров', () => {
    render(<AvatarGroup avatars={sampleAvatars} maxVisible={2} />);

    const counter = screen.getByText('+3');
    expect(counter).toBeInTheDocument();
    expect(counter).toHaveClass('ui-avatar-counter');
  });

  it('не показывает счетчик если все аватары видимы', () => {
    render(<AvatarGroup avatars={sampleAvatars.slice(0, 3)} maxVisible={3} />);

    const counter = screen.queryByText(/^\+/);
    expect(counter).not.toBeInTheDocument();
  });

  it('применяет правильный вариант отображения stack', () => {
    render(<AvatarGroup avatars={sampleAvatars} variant={AvatarGroupVariant.STACK} />);

    const avatarGroup = screen.getByTestId('avatar-group');
    expect(avatarGroup).toHaveClass('ui-avatar-group');
  });

  it('применяет правильный вариант отображения row', () => {
    render(<AvatarGroup avatars={sampleAvatars} variant={AvatarGroupVariant.ROW} />);

    const avatarGroup = screen.getByTestId('avatar-group');
    expect(avatarGroup).toHaveClass('ui-avatar-group');
  });

  it('передает правильные пропсы в Avatar компоненты', () => {
    render(<AvatarGroup avatars={sampleAvatars} showTooltip={true} />);

    const avatars = screen.getAllByTestId('avatar');
    expect(avatars[0]).toHaveAttribute('data-user-name', 'John Doe');
    expect(avatars[0]).toHaveAttribute('data-alt', 'User 1');
    expect(avatars[0]).toHaveAttribute('data-show-tooltip', 'true');
  });

  it('обрабатывает клики по аватарам', () => {
    const handleClick = jest.fn();
    const avatarsWithClick = sampleAvatars.map((avatar) => ({
      ...avatar,
      onClick: handleClick,
    }));

    render(<AvatarGroup avatars={avatarsWithClick} />);

    const firstAvatar = screen.getAllByTestId('avatar')[0];
    fireEvent.click(firstAvatar);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('показывает тултипы когда showTooltip=true', () => {
    render(<AvatarGroup avatars={sampleAvatars} showTooltip={true} />);

    const avatars = screen.getAllByTestId('avatar');
    avatars.forEach((avatar) => {
      expect(avatar).toHaveAttribute('data-show-tooltip', 'true');
    });
  });

  it('не показывает тултипы когда showTooltip=false', () => {
    render(<AvatarGroup avatars={sampleAvatars} showTooltip={false} />);

    const avatars = screen.getAllByTestId('avatar');
    avatars.forEach((avatar) => {
      expect(avatar).toHaveAttribute('data-show-tooltip', 'false');
    });
  });

  it('применяет кастомные CSS классы', () => {
    render(<AvatarGroup avatars={sampleAvatars} className="custom-class" />);

    const avatarGroup = screen.getByTestId('avatar-group');
    expect(avatarGroup).toHaveClass('custom-class');
  });

  it('работает с аватарами без изображений', () => {
    const avatarsWithoutImages = [
      { userName: 'John Doe' },
      { userName: 'Jane Smith' },
      { userName: 'Bob Wilson' },
    ];

    render(<AvatarGroup avatars={avatarsWithoutImages} />);

    const avatars = screen.getAllByTestId('avatar');
    expect(avatars).toHaveLength(3);
    expect(avatars[0]).toHaveAttribute('data-user-name', 'John Doe');
  });

  it('правильно обрабатывает счетчик с одним дополнительным аватаром', () => {
    render(<AvatarGroup avatars={sampleAvatars.slice(0, 4)} maxVisible={3} />);

    const counter = screen.getByText('+1');
    expect(counter).toBeInTheDocument();
  });

  it('правильно обрабатывает счетчик с множественными дополнительными аватарами', () => {
    render(<AvatarGroup avatars={sampleAvatars} maxVisible={2} />);

    const counter = screen.getByText('+3');
    expect(counter).toBeInTheDocument();
  });

  it('применяет правильный размер к аватарам', () => {
    render(<AvatarGroup avatars={sampleAvatars} size={Size.LG} />);

    const avatars = screen.getAllByTestId('avatar');
    avatars.forEach((avatar) => {
      expect(avatar).toHaveAttribute('data-size', Size.LG);
    });
  });

  it('работает с пустым массивом аватаров', () => {
    render(<AvatarGroup avatars={[]} />);

    const avatars = screen.queryAllByTestId('avatar');
    expect(avatars).toHaveLength(0);

    const counter = screen.queryByText(/^\+/);
    expect(counter).not.toBeInTheDocument();
  });
});
