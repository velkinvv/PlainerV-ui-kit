import React from 'react';
import { lightTheme } from './colors/light';
import { applyLightThemeToDocument } from '../variables/cssVariables/css-variables';

// Примеры использования обновленной светлой темы

export const LightThemeExamples: React.FC = () => {
  React.useEffect(() => {
    // Применяем CSS переменные к документу
    applyLightThemeToDocument();
  }, []);

  return (
    <div
      style={{
        backgroundColor: lightTheme.background,
        padding: '20px',
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      <h1 style={{ color: lightTheme.text }}>Примеры светлой темы (Figma макет)</h1>

      {/* Карточка с белым фоном */}
      <div
        style={{
          backgroundColor: lightTheme.backgroundSecondary,
          borderRadius: '20px',
          padding: '20px',
          margin: '20px 0',
          boxShadow: `0 4px 16px ${lightTheme.shadow}`,
          border: `1px solid ${lightTheme.border}`,
        }}
      >
        <h2 style={{ color: lightTheme.text }}>Карточка с белым фоном</h2>
        <p style={{ color: lightTheme.textSecondary }}>Вторичный текст с прозрачностью 0.8</p>
        <p style={{ color: lightTheme.textTertiary }}>Третичный текст с прозрачностью 0.6</p>
      </div>

      {/* Элемент с акцентным цветом */}
      <div
        style={{
          backgroundColor: lightTheme.primary,
          color: 'white',
          padding: '15px',
          borderRadius: '10px',
          margin: '20px 0',
          boxShadow: `0 4px 16px ${lightTheme.shadow}`,
        }}
      >
        Акцентный элемент с голубым цветом и специальной тенью
      </div>

      {/* Прогресс-бар */}
      <div
        style={{
          backgroundColor: lightTheme.progressBackground,
          borderRadius: '10px',
          height: '20px',
          margin: '20px 0',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            backgroundColor: lightTheme.progressFill,
            width: '55%',
            height: '100%',
            boxShadow: `0 2px 8px ${lightTheme.success}`,
          }}
        />
      </div>

      {/* Уведомление */}
      <div
        style={{
          backgroundColor: lightTheme.danger,
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
          background: `linear-gradient(135deg, ${lightTheme.primary}, ${lightTheme.backgroundSecondary})`,
          padding: '20px',
          borderRadius: '10px',
          margin: '20px 0',
          border: `1px solid ${lightTheme.border}`,
        }}
      >
        Элемент с градиентным фоном
      </div>

      {/* Аватар */}
      <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: lightTheme.avatarBackground,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20px 0',
          border: `2px solid ${lightTheme.border}`,
        }}
      >
        <span style={{ color: lightTheme.text }}>АВ</span>
      </div>

      {/* Изображение-заглушка */}
      <div
        style={{
          width: '200px',
          height: '150px',
          backgroundColor: lightTheme.imageBackground,
          borderRadius: '10px',
          margin: '20px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: lightTheme.textSecondary,
        }}
      >
        Изображение
      </div>

      {/* Кнопка */}
      <button
        style={{
          backgroundColor: lightTheme.primary,
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '500',
          boxShadow: `0 4px 16px ${lightTheme.shadow}`,
        }}
      >
        Кнопка с акцентным цветом
      </button>

      {/* Отключенный элемент */}
      <div
        style={{
          backgroundColor: lightTheme.backgroundQuaternary,
          color: lightTheme.textDisabled,
          padding: '15px',
          borderRadius: '8px',
          margin: '20px 0',
          opacity: 0.6,
        }}
      >
        Отключенный элемент
      </div>
    </div>
  );
};

// Примеры использования CSS переменных
export const CSSVariablesExample: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-background)',
        padding: '20px',
        fontFamily: 'Montserrat, sans-serif',
      }}
    >
      <h1 style={{ color: 'var(--color-text)' }}>Примеры с CSS переменными</h1>

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
    </div>
  );
};
