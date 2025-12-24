import { renderHook } from '@testing-library/react';
import { render, screen } from '@testing-library/react';
import { useClickOutside } from './useClickOutside';

describe('useClickOutside', () => {
  it('возвращает ref', () => {
    const handler = jest.fn();
    const { result } = renderHook(() => useClickOutside(handler));

    expect(result.current).toBeDefined();
    expect(result.current.current).toBeNull();
  });

  it('вызывает handler при клике вне элемента', () => {
    const handler = jest.fn();
    const TestComponent = () => {
      const ref = useClickOutside<HTMLDivElement>(handler);
      return (
        <div>
          <div ref={ref} data-testid="inside">
            Внутри
          </div>
          <div data-testid="outside">Снаружи</div>
        </div>
      );
    };

    render(<TestComponent />);

    const outside = screen.getByTestId('outside');
    outside.click();

    expect(handler).toHaveBeenCalled();
  });

  it('не вызывает handler при клике внутри элемента', () => {
    const handler = jest.fn();
    const TestComponent = () => {
      const ref = useClickOutside<HTMLDivElement>(handler);
      return (
        <div ref={ref} data-testid="inside">
          Внутри
        </div>
      );
    };

    render(<TestComponent />);

    const inside = screen.getByTestId('inside');
    inside.click();

    expect(handler).not.toHaveBeenCalled();
  });

  it('не вызывает handler когда enabled=false', () => {
    const handler = jest.fn();
    const TestComponent = () => {
      const ref = useClickOutside<HTMLDivElement>(handler, false);
      return (
        <div>
          <div ref={ref} data-testid="inside">
            Внутри
          </div>
          <div data-testid="outside">Снаружи</div>
        </div>
      );
    };

    render(<TestComponent />);

    const outside = screen.getByTestId('outside');
    outside.click();

    expect(handler).not.toHaveBeenCalled();
  });
});
