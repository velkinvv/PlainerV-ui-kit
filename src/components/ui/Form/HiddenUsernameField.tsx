import React from 'react';

/**
 * Скрытое поле имени пользователя для улучшения доступности
 * Рекомендуется добавлять в формы с полями пароля для соответствия стандартам доступности
 *
 * @see https://goo.gl/9p2vKq - Password forms should have (optionally hidden) username fields for accessibility
 */
export const HiddenUsernameField: React.FC = () => {
  return (
    <input
      type="text"
      autoComplete="username"
      style={{ display: 'none' }}
      tabIndex={-1}
      aria-hidden="true"
    />
  );
};
