import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { CardVariant } from '../../../types/ui';
import { Size } from '../../../types/sizes';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Компонент карточки для отображения контента',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [...Object.values(CardVariant)],
      description: 'Вариант стилизации карточки',
    },
    size: {
      control: { type: 'select' },
      options: [...Object.values(Size)],
      description: 'Размер карточки',
    },
    padding: {
      control: { type: 'select' },
      options: [...Object.values(Size)],
      description: 'Внутренние отступы',
    },
    hoverable: {
      control: { type: 'boolean' },
      description: 'Эффект при наведении',
    },
    clickable: {
      control: { type: 'boolean' },
      description: 'Кликабельность',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Полная ширина',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3>Card Title</h3>
        <p>This is a basic card with some content.</p>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: CardVariant.ELEVATED,
    children: (
      <div>
        <h3>Elevated Card</h3>
        <p>This card has an enhanced elevated shadow effect with subtle border.</p>
        <p>Updated according to Figma design specifications.</p>
      </div>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: CardVariant.OUTLINED,
    children: (
      <div>
        <h3>Outlined Card</h3>
        <p>This card has an outlined border.</p>
      </div>
    ),
  },
};

export const Filled: Story = {
  args: {
    variant: CardVariant.FILLED,
    children: (
      <div>
        <h3>Filled Card</h3>
        <p>This card has a filled background.</p>
      </div>
    ),
  },
};

export const Small: Story = {
  args: {
    size: Size.SM,
    children: (
      <div>
        <h4>Small Card</h4>
        <p>Compact card with small size.</p>
      </div>
    ),
  },
};

export const Medium: Story = {
  args: {
    size: Size.MD,
    children: (
      <div>
        <h3>Medium Card</h3>
        <p>Standard sized card.</p>
      </div>
    ),
  },
};

export const Large: Story = {
  args: {
    size: Size.LG,
    children: (
      <div>
        <h2>Large Card</h2>
        <p>Large card with more space for content.</p>
      </div>
    ),
  },
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: (
      <div>
        <h3>Hoverable Card</h3>
        <p>Hover over this card to see the effect.</p>
      </div>
    ),
  },
};

export const Clickable: Story = {
  args: {
    clickable: true,
    onClick: () => alert('Card clicked!'),
    children: (
      <div>
        <h3>Clickable Card</h3>
        <p>Click this card to trigger an action.</p>
      </div>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    padding: undefined,
    children: (
      <div style={{ padding: '16px' }}>
        <h3>No Padding Card</h3>
        <p>This card has no internal padding.</p>
      </div>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: (
      <div>
        <h3>Full Width Card</h3>
        <p>This card takes the full width of its container.</p>
      </div>
    ),
  },
  parameters: {
    layout: 'padded',
  },
};

export const WithImage: Story = {
  args: {
    children: (
      <div>
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
          alt="Card Image"
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '8px 8px 0 0',
          }}
        />
        <div style={{ padding: '16px' }}>
          <h3>Card with Image</h3>
          <p>This card includes an image at the top.</p>
        </div>
      </div>
    ),
  },
};

// Новая история для демонстрации карточки новости в соответствии с макетом Figma
export const NewsCard: Story = {
  render: () => (
    <Card
      variant={CardVariant.ELEVATED}
      style={{
        width: '742px',
        borderRadius: '20px',
        background: '#101C26',
        padding: '30px',
      }}
    >
      {/* Шапка новости */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px',
        }}
      >
        {/* Пользователь */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
          }}
        >
          {/* Аватар */}
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#C4C4C4',
              position: 'relative',
            }}
          >
            {/* Индикатор онлайн */}
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#94D263',
                border: '2px solid #101C26',
              }}
            />
          </div>

          {/* Информация о пользователе */}
          <div>
            <div
              style={{
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '400',
                marginBottom: '5px',
              }}
            >
              Александр Филимонов
            </div>
            <div
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '12px',
                fontWeight: '400',
              }}
            >
              3 мая 2022
            </div>
          </div>
        </div>

        {/* Действия */}
        <div
          style={{
            display: 'flex',
            gap: '14px',
            alignItems: 'center',
          }}
        >
          {/* Лайк */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px 8px 8px',
              background: '#162431',
              borderRadius: '25px',
              width: '77px',
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
              }}
            >
              ♥
            </div>
            <span
              style={{
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '400',
              }}
            >
              124
            </span>
          </div>

          {/* Меню */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              padding: '8px',
              background: '#162431',
              borderRadius: '25px',
              width: '40px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                }}
              />
              <div
                style={{
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                }}
              />
              <div
                style={{
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Контент */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          marginBottom: '25px',
        }}
      >
        <h2
          style={{
            color: '#FFFFFF',
            fontSize: '20px',
            fontWeight: '600',
            lineHeight: '1.3',
            margin: 0,
          }}
        >
          элементы политического процесса ассоциативно распределены по отраслям
        </h2>
        <p
          style={{
            color: '#FFFFFF',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '1.8',
            margin: 0,
          }}
        >
          Вот вам яркий пример современных тенденций - базовый вектор развития выявляет срочную
          потребность экспериментов, поражающих по своей масштабности и грандиозности. Внезапно,
          диаграммы связей неоднозначны и будут разоблачены. С учётом сложившейся международной
          обстановки, разбавленное изрядной долей эмпатии, рациональное мышление однозначно
          фиксирует необходимость направлений прогрессивного развития.
        </p>
      </div>

      {/* Изображения */}
      <div
        style={{
          display: 'flex',
          gap: '14px',
          alignItems: 'flex-start',
        }}
      >
        {/* Основное изображение */}
        <div
          style={{
            width: '427px',
            height: '316px',
            background: '#C4C4C4',
            borderRadius: '18px',
            flex: 1,
          }}
        />

        {/* Дополнительные изображения */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            width: '241px',
          }}
        >
          <div
            style={{
              width: '241px',
              height: '149px',
              background: '#C4C4C4',
              borderRadius: '18px',
            }}
          />

          {/* Изображение с оверлеем */}
          <div
            style={{
              width: '241px',
              height: '149px',
              background: '#C4C4C4',
              borderRadius: '18px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Оверлей */}
            <div
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                background: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(6px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '10px 20px',
                  background: 'rgba(22, 36, 49, 0.8)',
                  borderRadius: '10px',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                  }}
                >
                  📷
                </div>
                <span
                  style={{
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: '500',
                  }}
                >
                  6
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  ),
  parameters: {
    layout: 'padded',
  },
};

// Специальная история для демонстрации Card в соответствии с макетом Figma
export const FigmaDesign: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        maxWidth: '800px',
      }}
    >
      {/* Календарь - как в макете */}
      <Card
        variant={CardVariant.ELEVATED}
        style={{
          width: '400px',
          borderRadius: '20px',
          background: 'linear-gradient(-19deg, rgba(6, 13, 21, 1) 0%, rgba(14, 26, 40, 1) 75%)',
        }}
      >
        <div style={{ padding: '20px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              padding: '0 5px',
            }}
          >
            <h3
              style={{
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '500',
                margin: 0,
              }}
            >
              Календарь
            </h3>
          </div>

          <div
            style={{
              background: '#101C26',
              borderRadius: '20px',
              padding: '10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                padding: '0 5px',
              }}
            >
              <h4
                style={{
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: '600',
                  margin: 0,
                }}
              >
                Май 2022
              </h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                  }}
                >
                  ←
                </button>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                  }}
                >
                  →
                </button>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '5px',
                textAlign: 'center',
              }}
            >
              {/* Дни недели */}
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                <div
                  key={day}
                  style={{
                    padding: '10px',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: '600',
                  }}
                >
                  {day}
                </div>
              ))}

              {/* Даты */}
              {Array.from({ length: 35 }, (_, i) => {
                const day = i + 1;
                const isActive = day === 18;
                const isInactive = day > 30;

                return (
                  <div
                    key={day}
                    style={{
                      padding: '5px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '36px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '14px',
                        fontWeight: isActive ? '600' : '400',
                        color: isInactive ? 'rgba(255, 255, 255, 0.4)' : '#FFFFFF',
                        background: isActive ? '#68D5F8' : 'transparent',
                        border: isInactive ? '1px solid #101C26' : '1px solid #F2F2F2',
                      }}
                    >
                      {day > 30 ? day - 30 : day}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Список дел - как в макете */}
      <Card
        variant={CardVariant.ELEVATED}
        style={{
          width: '400px',
          borderRadius: '20px',
          background: '#101C26',
        }}
      >
        <div style={{ padding: '20px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '20px',
            }}
          >
            <h3
              style={{
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: '500',
                margin: 0,
              }}
            >
              Список дел
            </h3>
          </div>

          {/* Первый элемент с прогрессом */}
          <div
            style={{
              background: 'linear-gradient(-19deg, rgba(6, 13, 21, 1) 0%, rgba(14, 26, 40, 1) 75%)',
              borderRadius: '20px',
              padding: '10px 15px 20px',
              marginBottom: '10px',
              border: '1px solid #1C3140',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px',
              }}
            >
              <h4
                style={{
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: '500',
                  margin: 0,
                }}
              >
                Заголовок дела
              </h4>
              <div
                style={{
                  background: '#1C3140',
                  borderRadius: '25px',
                  padding: '8px',
                  display: 'flex',
                  gap: '3px',
                }}
              >
                <div
                  style={{
                    width: '3px',
                    height: '3px',
                    background: '#FFFFFF',
                    borderRadius: '50%',
                  }}
                ></div>
                <div
                  style={{
                    width: '3px',
                    height: '3px',
                    background: '#FFFFFF',
                    borderRadius: '50%',
                  }}
                ></div>
                <div
                  style={{
                    width: '3px',
                    height: '3px',
                    background: '#FFFFFF',
                    borderRadius: '50%',
                  }}
                ></div>
              </div>
            </div>

            <div
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '14px',
                marginBottom: '15px',
              }}
            >
              20:00 28 сентября
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: '3px',
                  background: '#1C3140',
                  borderRadius: '2px',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: '55%',
                    height: '100%',
                    background: '#94D263',
                    borderRadius: '2px',
                    boxShadow: '0px 4px 11px 0px rgba(148, 210, 99, 0.2)',
                  }}
                ></div>
              </div>
              <span
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                55%
              </span>
            </div>
          </div>

          {/* Разделитель */}
          <div
            style={{
              height: '1px',
              background: '#1C3140',
              margin: '10px 0',
            }}
          ></div>

          {/* Обычные элементы */}
          {[1, 2, 3].map(i => (
            <div
              key={i}
              style={{
                padding: '0 15px 10px',
                marginBottom: '5px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '5px',
                }}
              >
                <h4
                  style={{
                    color: '#FFFFFF',
                    fontSize: '14px',
                    fontWeight: '500',
                    margin: 0,
                  }}
                >
                  Заголовок дела
                </h4>
                <div
                  style={{
                    background: '#F9F9F9',
                    borderRadius: '25px',
                    padding: '8px',
                    display: 'flex',
                    gap: '3px',
                  }}
                >
                  <div
                    style={{
                      width: '3px',
                      height: '3px',
                      background: 'rgba(255, 255, 255, 0.6)',
                      borderRadius: '50%',
                    }}
                  ></div>
                  <div
                    style={{
                      width: '3px',
                      height: '3px',
                      background: 'rgba(255, 255, 255, 0.6)',
                      borderRadius: '50%',
                    }}
                  ></div>
                  <div
                    style={{
                      width: '3px',
                      height: '3px',
                      background: 'rgba(255, 255, 255, 0.6)',
                      borderRadius: '50%',
                    }}
                  ></div>
                </div>
              </div>
              <div
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '14px',
                }}
              >
                21:00 28 сентября
              </div>
            </div>
          ))}

          {/* Кнопка закрытия */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <button
              style={{
                background: '#68D5F8',
                border: 'none',
                borderRadius: '59px',
                padding: '16px',
                cursor: 'pointer',
                color: '#FFFFFF',
                fontSize: '18px',
              }}
            >
              ✕
            </button>
          </div>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Card variant={CardVariant.ELEVATED} style={{ width: '200px' }}>
        <h4>Elevated</h4>
        <p>Elevated variant</p>
      </Card>
      <Card variant={CardVariant.OUTLINED} style={{ width: '200px' }}>
        <h4>Outlined</h4>
        <p>Outlined variant</p>
      </Card>
      <Card variant={CardVariant.FILLED} style={{ width: '200px' }}>
        <h4>Filled</h4>
        <p>Filled variant</p>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <Card size={Size.SM} style={{ width: '150px' }}>
        <h4>Small</h4>
        <p>Small size</p>
      </Card>
      <Card size={Size.MD} style={{ width: '200px' }}>
        <h3>Medium</h3>
        <p>Medium size</p>
      </Card>
      <Card size={Size.LG} style={{ width: '250px' }}>
        <h2>Large</h2>
        <p>Large size</p>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
