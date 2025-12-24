// Re-export UI-related types
export * from './theme';
export * from './sizes';
export * from './ui';
export * from './redux';
export * from './icon';
export * from './ui';
export * from './redux';

// Common UI enums and interfaces that might be needed in forms/components
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  DELIVERING = 'delivering',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

// Basic interfaces for UI forms and displays
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User extends BaseEntity {
  phone: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: Date;
}

export interface Address {
  id: string;
  city: string;
  street: string;
  house: string;
  apartment?: string;
  postalCode?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Basic form DTOs that might be used in UI
export interface LoginDto {
  phone: string;
  password?: string;
  otp?: string;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  password: string;
  role?: UserRole;
}
