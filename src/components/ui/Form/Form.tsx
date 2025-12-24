import React, { type ReactNode } from 'react';
import { FormProvider } from '../../../contexts/FormContext';

/**
 * Пропсы компонента Form
 */
interface FormProps {
  /** Дочерние компоненты */
  children: ReactNode;
  /** ID формы для группировки полей */
  formId?: string;
  /** Имя формы */
  formName?: string;
  /** HTML атрибуты для элемента form */
  formProps?: React.FormHTMLAttributes<HTMLFormElement>;
  /** Обработчик отправки формы */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  /** CSS класс */
  className?: string;
}

/**
 * Компонент Form для группировки полей ввода
 * Обеспечивает контекст формы для всех дочерних компонентов
 * Помогает избежать предупреждений браузера о полях пароля вне формы
 */
export const Form: React.FC<FormProps> = ({
  children,
  formId,
  formName,
  formProps,
  onSubmit,
  className,
}) => {
  // Генерируем уникальный ID формы если не предоставлен
  const generatedFormId = formId || `form-${Math.random().toString(36).substr(2, 9)}`;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <FormProvider formId={generatedFormId} formName={formName}>
      <form
        id={generatedFormId}
        name={formName}
        onSubmit={handleSubmit}
        className={className}
        {...formProps}
      >
        {children}
      </form>
    </FormProvider>
  );
};
