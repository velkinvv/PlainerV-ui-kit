import React from 'react';
import { darkTheme } from './colors/dark';
import { applyDarkThemeToDocument } from '../variables/cssVariables/css-variables';

// Примеры использования обновленной тёмной темы

export const DarkThemeExamples: React.FC = () => {
  React.useEffect(() => {
    // Применяем CSS переменные к документу
    applyDarkThemeToDocument();
  }, []);

  return (
    <div
      style={{
        backgroundColor: darkTheme.background,
        padding: '20px',
        fontFamily: 'Montserrat, sans-serif',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ color: darkTheme.text }}>Примеры тёмной темы (Figma макет)</h1>

      {/* Карточка с тёмным фоном */}
      <div
        style={{
          backgroundColor: darkTheme.backgroundSecondary,
          borderRadius: '20px',
          padding: '20px',
          margin: '20px 0',
          boxShadow: `0 4px 16px ${darkTheme.shadow}`,
          border: `1px solid ${darkTheme.border}`,
        }}
      >
        <h2 style={{ color: darkTheme.text }}>Карточка с тёмным фоном</h2>
        <p style={{ color: darkTheme.textSecondary }}>Вторичный текст с прозрачностью 0.8</p>
        <p style={{ color: darkTheme.textTertiary }}>Третичный текст с прозрачностью 0.6</p>
      </div>

      {/* Элемент с акцентным цветом */}
      <div
        style={{
          backgroundColor: darkTheme.primary,
          color: 'white',
          padding: '15px',
          borderRadius: '10px',
          margin: '20px 0',
          boxShadow: `0 4px 16px ${darkTheme.shadow}`,
        }}
      >
        Акцентный элемент с голубым цветом и специальной тенью
      </div>

      {/* Прогресс-бар */}
      <div
        style={{
          backgroundColor: darkTheme.progressBackground,
          borderRadius: '10px',
          height: '20px',
          margin: '20px 0',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            backgroundColor: darkTheme.progressFill,
            width: '55%',
            height: '100%',
            boxShadow: `0 2px 8px ${darkTheme.success}`,
          }}
        />
      </div>

      {/* Уведомление */}
      <div
        style={{
          backgroundColor: darkTheme.danger,
          color: 'white',
          padding: '15px',
          borderRadius: '10px',
          margin: '20px 0',
        }}
      >
        Уведомление с красным цветом
      </div>

      {/* Элемент с градиентом */}
      <div
        style={{
          background: `linear-gradient(135deg, ${darkTheme.primary}, ${darkTheme.backgroundSecondary})`,
          padding: '20px',
          borderRadius: '10px',
          margin: '20px 0',
          border: `1px solid ${darkTheme.border}`,
        }}
      >
        <p style={{ color: darkTheme.text }}>Элемент с градиентным фоном</p>
      </div>

      {/* Аватар */}
      <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: darkTheme.avatarBackground,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px 0',
          border: `2px solid ${darkTheme.border}`,
        }}
      >
        <span style={{ color: darkTheme.text }}>АВ</span>
      </div>

      {/* Индикатор онлайн статуса */}
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: darkTheme.avatarBackground,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px 0',
          position: 'relative',
        }}
      >
        <span style={{ color: darkTheme.text }}>АВ</span>
        <div
          style={{
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: darkTheme.success,
            border: `2px solid ${darkTheme.backgroundSecondary}`,
          }}
        />
      </div>

      {/* Изображение-заглушка */}
      <div
        style={{
          width: '200px',
          height: '150px',
          backgroundColor: darkTheme.imageBackground,
          borderRadius: '10px',
          margin: '20px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: darkTheme.textSecondary,
        }}
      >
        Изображение
      </div>

      {/* Кнопка */}
      <button
        style={{
          backgroundColor: darkTheme.primary,
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '500',
          boxShadow: `0 4px 16px ${darkTheme.shadow}`,
        }}
      >
        Кнопка с акцентным цветом
      </button>

      {/* Отключенный элемент */}
      <div
        style={{
          backgroundColor: darkTheme.backgroundQuaternary,
          color: darkTheme.textDisabled,
          padding: '15px',
          borderRadius: '8px',
          margin: '20px 0',
          opacity: 0.6,
        }}
      >
        Отключенный элемент
      </div>

      {/* Элемент с backdrop filter */}
      <div
        style={{
          backgroundColor: 'rgba(22, 36, 49, 0.8)',
          backdropFilter: 'blur(8px)',
          padding: '20px',
          borderRadius: '10px',
          margin: '20px 0',
          border: `1px solid ${darkTheme.border}`,
        }}
      >
        <p style={{ color: darkTheme.text }}>Элемент с backdrop filter</p>
      </div>
    </div>
  );
};

// Примеры использования CSS переменных для тёмной темы
export const DarkCSSVariablesExample: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-background)',
        padding: '20px',
        fontFamily: 'Montserrat, sans-serif',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ color: 'var(--color-text)' }}>Примеры с CSS переменными (Тёмная тема)</h1>

      <div
        style={{
          backgroundColor: 'var(--color-background-secondary)',
          color: 'var(--color-text)',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: 'var(--shadow-md)',
          border: '1px solid var(--color-border)',
        }}
      >
        Карточка с CSS переменными
      </div>

      <button
        style={{
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-primary)',
        }}
      >
        Кнопка с CSS переменными
      </button>

      <div
        style={{
          backgroundColor: 'var(--color-progress-background)',
          borderRadius: '10px',
          height: '20px',
          margin: '20px 0',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--color-progress-fill)',
            width: '55%',
            height: '100%',
            boxShadow: 'var(--shadow-success)',
          }}
        />
      </div>
    </div>
  );
};
