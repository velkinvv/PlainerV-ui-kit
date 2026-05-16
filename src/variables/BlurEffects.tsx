import React from 'react';
import styled from 'styled-components';

/**
 * Интерфейс для эффекта размытия
 */
interface BlurEffect {
  name: string;
  value: string;
  description: string;
}

/**
 * Интерфейс для пропсов компонента BlurEffects
 */
interface BlurEffectsProps {
  /** Название категории */
  name: string;
  /** Описание категории */
  description?: string;
  /** Эффекты размытия */
  effects: BlurEffect[];
}

/**
 * Контейнер для эффектов размытия
 */
const EffectsContainer = styled.div`
  margin-bottom: 32px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

/**
 * Заголовок категории
 */
const CategoryTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

/**
 * Описание категории
 */
const CategoryDescription = styled.p`
  margin: 0 0 16px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

/**
 * Контейнер для эффектов
 */
const EffectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

/**
 * Контейнер для одного эффекта
 */
const EffectItem = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  background: ${({ theme }) => theme.colors.backgroundTertiary};
`;

/**
 * Демонстрационный блок с размытием (backdrop-filter)
 */
const BlurDemo = styled.div<{ blur: string }>`
  height: 120px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px 8px 0 0;

  /* Фоновый градиент */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      #ff6b6b,
      #4ecdc4,
      #45b7d1,
      #96ceb4,
      #feca57,
      #ff9ff3,
      #54a0ff
    );
    background-size: 400% 400%;
    animation: gradientShift 3s ease infinite;
  }

  /* Слой с размытием */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.backgroundSecondary};
    opacity: 0.8;
    backdrop-filter: ${({ blur }) => {
      const cleanValue = blur
        .replace(/backdrop-filter:\s*/, '')
        .replace(/filter:\s*/, '')
        .replace(/;$/, '');
      return cleanValue;
    }};
    -webkit-backdrop-filter: ${({ blur }) => {
      const cleanValue = blur
        .replace(/backdrop-filter:\s*/, '')
        .replace(/filter:\s*/, '')
        .replace(/;$/, '');
      return cleanValue;
    }};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Текст поверх размытия */
  & > span {
    position: relative;
    z-index: 2;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    font-size: 16px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

/**
 * Демонстрационный блок с фильтром (filter)
 */
const FilterDemo = styled.div<{ blur: string }>`
  height: 120px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #54a0ff);
  background-size: 400% 400%;
  animation: gradientShift 3s ease infinite;
  filter: ${({ blur }) => {
    const cleanValue = blur
      .replace(/backdrop-filter:\s*/, '')
      .replace(/filter:\s*/, '')
      .replace(/;$/, '');
    return cleanValue;
  }};

  /* Текст поверх размытия */
  & > span {
    position: relative;
    z-index: 2;
    color: white;
    font-weight: 600;
    font-size: 16px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

/**
 * Информация об эффекте
 */
const EffectInfo = styled.div`
  padding: 16px;
`;

/**
 * Название эффекта
 */
const EffectName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

/**
 * Описание эффекта
 */
const EffectDescription = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 8px;
  line-height: 1.4;
`;

/**
 * CSS значение эффекта
 */
const EffectValue = styled.div`
  font-size: 12px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: ${({ theme }) => theme.colors.textSecondary};
  background: ${({ theme }) => theme.colors.backgroundQuaternary};
  padding: 8px 12px;
  border-radius: 4px;
  display: block;
  cursor: pointer;
  transition: background-color 0.2s ease;
  word-break: break-all;
  line-height: 1.4;

  &:hover {
    background: ${({ theme }) => theme.colors.borderSecondary};
  }
`;

/**
 * Кнопка копирования
 */
const CopyButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 2;

  ${EffectItem}:hover & {
    opacity: 1;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.9);
  }
`;

/**
 * Компонент для отображения эффектов размытия
 */
export const BlurEffects: React.FC<BlurEffectsProps> = ({ name, description, effects }) => {
  /**
   * Функция для копирования эффекта в буфер обмена
   */
  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      // Можно добавить уведомление об успешном копировании
    } catch {
      // Копирование в буфер недоступно (например, без HTTPS) — игнорируем в демо-странице
    }
  };

  /**
   * Функция для определения типа эффекта
   */
  const isFilterEffect = (cssValue: string): boolean => {
    return cssValue.includes('filter:');
  };

  return (
    <EffectsContainer>
      <CategoryTitle>{name}</CategoryTitle>
      {description && <CategoryDescription>{description}</CategoryDescription>}

      <EffectsGrid>
        {effects.map((effect, index) => (
          <EffectItem key={index}>
            {isFilterEffect(effect.value) ? (
              <FilterDemo blur={effect.value}>
                <span>Фильтр</span>
                <CopyButton onClick={() => copyToClipboard(effect.value)}>Копировать</CopyButton>
              </FilterDemo>
            ) : (
              <BlurDemo blur={effect.value}>
                <span>Размытие</span>
                <CopyButton onClick={() => copyToClipboard(effect.value)}>Копировать</CopyButton>
              </BlurDemo>
            )}
            <EffectInfo>
              <EffectName>{effect.name}</EffectName>
              <EffectDescription>{effect.description}</EffectDescription>
              <EffectValue onClick={() => copyToClipboard(effect.value)}>
                {effect.value}
              </EffectValue>
            </EffectInfo>
          </EffectItem>
        ))}
      </EffectsGrid>
    </EffectsContainer>
  );
};
