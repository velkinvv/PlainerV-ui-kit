import React, { createContext, useContext, useMemo, type ReactNode } from 'react';

/**
 * Значение контекста формы: связь полей ввода с `<form>` через атрибут `form`.
 */
export interface FormContextValue {
  /** ID элемента `<form>` (для `form={formId}` у инпутов) */
  formId: string;
  /** Имя формы, если задано у `Form` */
  formName?: string;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

/**
 * Пропсы провайдера контекста формы
 */
export interface FormProviderProps {
  /** Уникальный идентификатор HTML-формы */
  formId: string;
  /** Имя формы (опционально) */
  formName?: string;
  /** Дочерние элементы (обычно содержимое `<form>`) */
  children: ReactNode;
}

/**
 * Провайдер контекста формы для компонента `Form` и полей `Input`.
 */
export const FormProvider: React.FC<FormProviderProps> = ({ formId, formName, children }) => {
  const value = useMemo(() => ({ formId, formName }), [formId, formName]);
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

/**
 * Доступ к контексту формы.
 *
 * @returns Объект с `formId` / `formName` или `undefined`, если компонент вне `FormProvider`
 */
export const useFormContext = (): FormContextValue | undefined => useContext(FormContext);

/**
 * @returns `formId` текущей формы или `undefined`
 */
export const useFormId = (): string | undefined => useFormContext()?.formId;

/**
 * @returns `formName` текущей формы или `undefined`
 */
export const useFormName = (): string | undefined => useFormContext()?.formName;
