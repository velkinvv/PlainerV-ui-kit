import type { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

// Базовые типы для API ответов
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Базовые типы для запросов
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

// Типы для состояний загрузки
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface AsyncState<T = unknown> extends LoadingState {
  data: T | null;
  lastUpdated?: number;
}

// Типы для уведомлений
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  timestamp: number;
}

// Типы для UI состояния
export interface UIState {
  sidebar: {
    isCollapsed: boolean;
    activeItem: string | null;
  };
  theme: {
    mode: 'light' | 'dark';
    primaryColor: string;
  };
  notifications: Notification[];
}

// Типы для аутентификации
export interface AuthState {
  user: unknown | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Утилиты для создания типизированных хуков
export type AppDispatch = ReturnType<typeof configureStore>['dispatch'];
export type RootState = ReturnType<typeof configureStore>['getState'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Типы для RTK Query
export interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, unknown>;
}

// Типы для API endpoints
export interface ApiEndpoint {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  timeout?: number;
}

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  headers: Record<string, string>;
  endpoints: Record<string, ApiEndpoint>;
}
